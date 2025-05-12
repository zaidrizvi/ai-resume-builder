import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt = "Job Title: {jobTitle}, Based on this job title, generate a comprehensive list of skills for an ATS-friendly resume. Format the result as a JSON object with the following categories: 'languages' (programming languages), 'databases', 'tools' (tools and technologies), and 'softSkills'. Each category should contain a comma-separated string of relevant skills and in tools first add all technologies. maximum 8-9 "

function Skills() {
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  const [skillsList, setSkillsList] = useState({
    languages: '',
    databases: '',
    tools: '',
    softSkills: '',
  });

  // 🔁 This runs only once to load initial data
  useEffect(() => {
    if (resumeInfo?.skills) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo?.skills]);

  const handleChange = (field, value) => {
    const updatedSkills = {
      ...skillsList,
      [field]: value,
    };
    setSkillsList(updatedSkills);

    // ✅ Directly update context in this handler (no infinite loop)
    setResumeInfo((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  const generateSkillsFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast.error('Please add a Job Title first!');
      return;
    }

    try {
      setAiLoading(true);
      const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
      console.log('Prompt Sent to AI:', PROMPT);

      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();

      const parsedResult = JSON.parse(responseText);
      console.log('AI Generated Skills:', parsedResult);

      // Update skills with the AI generated content
      const aiSkills = {
        languages: parsedResult.languages || '',
        databases: parsedResult.databases || '',
        tools: parsedResult.tools || '',
        softSkills: parsedResult.softSkills || '',
      };

      setSkillsList(aiSkills);
      
      // Update context
      setResumeInfo((prev) => ({
        ...prev,
        skills: aiSkills,
      }));

      toast.success('Skills generated successfully!');
    } catch (error) {
      console.error('Error generating skills from AI:', error);
      toast.error('Failed to generate skills. Try again!');
    } finally {
      setAiLoading(false);
    }
  };

  const onSave = () => {
    setLoading(true);
    
    // Convert any arrays to strings before sending
    const processedSkills = {
      languages: Array.isArray(skillsList.languages) ? skillsList.languages.join(', ') : skillsList.languages,
      databases: Array.isArray(skillsList.databases) ? skillsList.databases.join(', ') : skillsList.databases,
      tools: Array.isArray(skillsList.tools) ? skillsList.tools.join(', ') : skillsList.tools,
      softSkills: Array.isArray(skillsList.softSkills) ? skillsList.softSkills.join(', ') : skillsList.softSkills
    };
    
    const data = {
      data: {
        skills: processedSkills,
      },
    };
    
    console.log('Sending data:', data);
    
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((resp) => {
        setLoading(false);
        toast.success('Details updated!');
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error response:', error);
        console.error('Response details:', error.response?.data);
        toast.error('Server Error, Try again!');
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg">Skills</h2>
          <p className="text-gray-600">Add your top professional key skills</p>
        </div>
        <Button
          variant="outline"
          onClick={generateSkillsFromAI}
          type="button"
          size="sm"
          className="border-primary text-primary flex gap-2"
          disabled={aiLoading}
        >
          {aiLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />} 
          Generate from AI
        </Button>
      </div>

      <div className="mt-7 space-y-4">
        <div>
          <label className="font-semibold">Languages</label>
          <Input
            className="mt-2"
            placeholder="Python, JavaScript, Java, C++..."
            value={skillsList.languages}
            onChange={(e) => handleChange('languages', e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Databases</label>
          <Input
            className="mt-2"
            placeholder="MySQL, MongoDB, PostgreSQL, Firebase..."
            value={skillsList.databases}
            onChange={(e) => handleChange('databases', e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Tools & Technologies</label>
          <Input
            className="mt-2"
            placeholder="React, Docker, AWS, Git..."
            value={skillsList.tools}
            onChange={(e) => handleChange('tools', e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Soft Skills</label>
          <Input
            className="mt-2"
            placeholder="Communication, Teamwork, Problem-solving..."
            value={skillsList.softSkills}
            onChange={(e) => handleChange('softSkills', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <Button 
          onClick={onSave} 
          disabled={loading}
        >
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Skills;