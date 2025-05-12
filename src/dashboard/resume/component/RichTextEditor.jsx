import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
import { 
  BtnBold, 
  BtnBulletList, 
  BtnItalic, 
  BtnLink, 
  BtnNumberedList, 
  BtnStrikeThrough, 
  BtnUnderline, 
  Editor, 
  EditorProvider, 
  Separator, 
  Toolbar 
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = `Position title: {positionTitle}

Please provide 4-5 professional bullet points describing experience for this position that I can use in my resume. Focus on impactful, action-oriented statements with measurable achievements where possible And Concise Do not mention experience level.`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue, currentTitle }) {
  // Initialize with defaultValue OR empty string to avoid undefined
  const [value, setValue] = useState(defaultValue || '');
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  
  // Add useEffect to update the value when defaultValue changes
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);
  
  const processResponse = (text) => {
    try {
      // Check for JSON format with bullet_points key
      const bulletPointsMatch = text.match(/"bullet_points"\s*:\s*\[(.*?)\]/s);
      if (bulletPointsMatch && bulletPointsMatch[1]) {
        // Extract the array content
        const arrayContent = bulletPointsMatch[1];
        // Split by commas followed by quotes to get individual items
        const items = arrayContent.split('", "');
        // Clean up the items (remove extra quotes and commas)
        const cleanItems = items.map(item => 
          item.replace(/^"/, '').replace(/"$/, '').trim()
        );
        
        // Create HTML list
        return `<ul>${cleanItems.map(point => `<li>${point}</li>`).join('')}</ul>`;
      }
      
      // Try standard JSON parsing
      // First, find anything that looks like a JSON object
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonText = jsonMatch[0];
        try {
          const parsedData = JSON.parse(jsonText);
          
          // Check for bulletPoints key
          if (Array.isArray(parsedData.bulletPoints)) {
            return `<ul>${parsedData.bulletPoints.map(point => `<li>${point}</li>`).join('')}</ul>`;
          }
          // Check for bullet_points key
          else if (Array.isArray(parsedData.bullet_points)) {
            return `<ul>${parsedData.bullet_points.map(point => `<li>${point}</li>`).join('')}</ul>`;
          }
        } catch (e) {
          console.log('JSON parsing failed, continuing with other methods');
        }
      }
    } catch (e) {
      console.log('Error in JSON processing:', e);
    }
    
    // Fallback to text processing
    let points = [];
    
    // Split by newlines or by bullet points
    const lines = text.split(/[\n\r]+/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      // Remove any bullet point markers or numbering
      const cleanLine = trimmed
        .replace(/^\s*["-•*,]\s+/, '') // Remove bullet markers
        .replace(/^\s*\d+\.\s+/, ''); // Remove numbering
      
      if (cleanLine) points.push(cleanLine);
    }
    
    // Create HTML list
    return `<ul>${points.map(point => `<li>${point}</li>`).join('')}</ul>`;
  };

  const GenerateSummaryFromAI = async () => {
    if (!currentTitle) {
      toast('Please Add Position Title');
      return;
    }
    
    setLoading(true);
    const prompt = PROMPT.replace('{positionTitle}', currentTitle);
    
    try {
      const result = await AIChatSession.sendMessage(prompt);
      const text = await result.response.text();
      console.log('Original response:', text);
      
      const processedText = processResponse(text);
      console.log('Processed response:', processedText);
      
      setValue(processedText);
      
      // Trigger the change event to update parent component
      const fakeEvent = { target: { value: processedText } };
      onRichTextEditorChange(fakeEvent);
    } catch (error) {
      console.error('Error generating summary:', error);
      toast('Failed to generate summary. Please try again.', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  
  // For debugging
  useEffect(() => {
    console.log("RichTextEditor received defaultValue:", defaultValue);
    console.log("RichTextEditor current value:", value);
  }, [defaultValue, value]);
  
  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;