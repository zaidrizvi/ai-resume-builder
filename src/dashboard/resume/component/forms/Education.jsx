import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, Trash2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

const Education = () => {
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false)
  const params = useParams();
  
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      gpa: "",
    },
  ]);

  // Only load data from context when component first mounts
  useEffect(() => {
    if (resumeInfo?.education && resumeInfo.education.length > 0) {
      setEducationalList(resumeInfo.education);
    }
  }, []); // Empty dependency array - only runs once on mount

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const {name, value} = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };
   
  const AddNewEducation = () => {
    setEducationalList([...educationalList,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        gpa: '',
      }
    ]);
  }

  const RemoveEducation = (index) => {
    const newList = [...educationalList];
    newList.splice(index, 1);
    setEducationalList(newList);
  }

  const onSave = () => {
    setLoading(true);
    
    // Update context first
    setResumeInfo({
      ...resumeInfo,
      education: educationalList
    });
    
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(resp => {
      console.log(resp);
      setLoading(false);
      toast('Details updated!');
    }, (error) => {
      setLoading(false);
      toast('Server Error, Please try again!');
    });
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p className="text-gray-500 text-sm mb-4">Add your educational experience in reverse chronological order</p>

      {educationalList.map((item, index) => (
        <div key={index} className="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-primary">Education #{index + 1}</h3>
            {educationalList.length > 1 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => RemoveEducation(index)}
                className="h-8 w-8 p-0 text-red-500"
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Institution Name</label>
              <Input
                name="universityName"
                onChange={(e) => handleChange(e, index)}
                value={item.universityName || ""}
                placeholder="e.g. Vivekananda Institute of Professional Studies"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Degree</label>
              <Input 
                name="degree" 
                onChange={(e) => handleChange(e, index)} 
                value={item.degree || ""}
                placeholder="e.g. Bachelor of Computer Applications"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Major/Specialization</label>
              <Input 
                name="major" 
                onChange={(e) => handleChange(e, index)} 
                value={item.major || ""}
                placeholder="e.g. Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <Input 
                type="month" 
                name="startDate" 
                onChange={(e) => handleChange(e, index)}
                value={item.startDate || ""}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <Input 
                type="month" 
                name="endDate" 
                onChange={(e) => handleChange(e, index)}
                value={item.endDate || ""}
              />
            </div>

            <div>
              <label className="block text-sm font-medium ">GPA/Marks</label>
              <Input 
                name="gpa" 
                onChange={(e) => handleChange(e, index)}
                value={item.gpa || ""}
                placeholder="e.g. 7.52/10.0, expected 8.0/10.0 at graduation"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <Button 
          variant="outline" 
          onClick={AddNewEducation} 
          className="text-primary flex items-center gap-1"
        >
          <span>+ Add Education</span>
        </Button>
        
        <Button 
          disabled={loading} 
          onClick={onSave}
          className="bg-primary hover:bg-primary/90"
        >
          {loading ? <LoaderCircle className="animate-spin mr-2" size={16} /> : null}
          Save Details  
        </Button>
      </div>
    </div>
  );
};

export default Education;