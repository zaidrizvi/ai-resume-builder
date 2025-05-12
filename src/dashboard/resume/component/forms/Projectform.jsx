import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, Plus, Trash2, Sparkles } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal' 

// Prompt to generate project descriptions
const prompt = "Generate a detailed description for a project titled '{title}' using the technologies '{technologies}'. Create 3 bullet points that highlight the key features, technical implementations, and achievements of this project. Each bullet point should be concise and small yet informative, focusing on what was built, the technical challenges overcome, and the impact of the project. Return the result as an array of strings, with each string representing one bullet point."

function ProjectsForm({enabledNext}) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    
    const [loading, setLoading] = useState(false);
    const [aiGenerating, setAiGenerating] = useState(false);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
    const [projects, setProjects] = useState([
        { 
            title: '', 
            link: '', 
            description: '', 
            technologies: '' 
        }
    ]);

    useEffect(() => {
        // Initialize projects from resumeInfo if available
        if(resumeInfo?.projects && resumeInfo.projects.length > 0) {
            setProjects(resumeInfo.projects);
        }
    }, []);

    const generateProjectDescriptionFromAI = async (index) => {
        const project = projects[index];
        
        if (!project.title || !project.technologies) {
            toast.error('Please add both Project Title and Technologies before generating a description!');
            return;
        }
        
        try {
            setAiGenerating(true);
            setCurrentProjectIndex(index);
            
            const customPrompt = prompt
                .replace('{title}', project.title)
                .replace('{technologies}', project.technologies);
                
            console.log('Prompt Sent to AI:', customPrompt);
            
            const result = await AIChatSession.sendMessage(customPrompt);
            const responseText = await result.response.text();
            
            console.log('Raw AI response:', responseText);
            
            // Parse the response safely
            const parsedResult = JSON.parse(responseText);
            console.log('AI Generated Project Description:', parsedResult);
            
            // Process the response to create bullet points
            let bulletPoints = [];
            
            if (Array.isArray(parsedResult)) {
                // If it's already an array
                bulletPoints = parsedResult.map(item => {
                    if (typeof item === 'string') {
                        return item;
                    } else if (typeof item === 'object') {
                        // Extract text field or stringify the object
                        return item.text || item.point || item.description || 
                               Object.values(item).find(val => typeof val === 'string') || 
                               JSON.stringify(item);
                    }
                    return String(item);
                });
            } else if (typeof parsedResult === 'object') {
                // Check for common array properties
                const arrayProp = parsedResult.points || parsedResult.description || 
                                 parsedResult.bulletPoints || parsedResult.items;
                
                if (arrayProp && Array.isArray(arrayProp)) {
                    bulletPoints = arrayProp.map(item => {
                        if (typeof item === 'string') return item;
                        if (typeof item === 'object') {
                            return item.text || item.point || item.description || 
                                   Object.values(item).find(val => typeof val === 'string') || 
                                   JSON.stringify(item);
                        }
                        return String(item);
                    });
                } else {
                    // Try to create bullet points from object properties
                    bulletPoints = Object.entries(parsedResult)
                        .filter(([key, value]) => !key.startsWith('_') && typeof value === 'string')
                        .map(([key, value]) => value);
                        
                    if (bulletPoints.length === 0) {
                        // Last resort: just stringify each property
                        bulletPoints = Object.entries(parsedResult).map(([key, value]) => {
                            if (typeof value === 'string') return value;
                            if (typeof value === 'object' && value !== null) {
                                return JSON.stringify(value).replace(/[{}"]/g, '');
                            }
                            return String(value);
                        });
                    }
                }
            } else if (typeof parsedResult === 'string') {
                // If it's a string, split by newlines
                bulletPoints = parsedResult.split('\n').filter(item => item.trim());
            }
            
            // Ensure each bullet point starts with a bullet character
            const formattedBulletPoints = bulletPoints.map(point => {
                const trimmed = point.trim();
                if (!trimmed) return '';
                
                // Remove any existing bullet character at the start
                const cleanPoint = trimmed.replace(/^[•\-*]\s*/, '');
                
                // Add bullet character
                return `• ${cleanPoint}`;
            }).filter(point => point); // Remove empty items
            
            // Join with newlines
            const formattedDescription = formattedBulletPoints.join('\n');
            
            // Update the project description
            handleProjectChange(index, 'description', formattedDescription);
            
            toast.success('Project description generated!');
        } catch (error) {
            console.error('Error generating project description from AI:', error);
            toast.error('Failed to generate project description. Please try again!');
        } finally {
            setAiGenerating(false);
            setCurrentProjectIndex(null);
        }
    };

    const handleProjectChange = (index, field, value) => {
        enabledNext(false);
        
        const updatedProjects = [...projects];
        updatedProjects[index][field] = value;
        setProjects(updatedProjects);
        
        setResumeInfo(prev => ({
            ...prev,
            projects: updatedProjects
        }));
    };

    const addProject = () => {
        setProjects([...projects, { 
            title: '', 
            link: '', 
            description: '', 
            technologies: '' 
        }]);
    };

    const removeProject = (index) => {
        if (projects.length > 1) {
            const updatedProjects = [...projects];
            updatedProjects.splice(index, 1);
            setProjects(updatedProjects);
            
            setResumeInfo(prev => ({
                ...prev,
                projects: updatedProjects
            }));
        } else {
            toast.error("You must have at least one project!");
        }
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        
        const data = {
            data: {
                projects: projects.map(({ id, ...rest }) => rest)
            }
        };
        
        // Debug the exact data being sent
        console.log("Sending data to API:", JSON.stringify(data));
        
        GlobalApi.UpdateResumeDetail(params?.resumeId, data)
            .then(resp => {
                console.log("Success response:", resp);
                enabledNext(true);
                setLoading(false);
                toast("Projects updated");
            })
            .catch((error) => {
                setLoading(false);
                // Log more detailed error information
                console.error("Error details:", error.response?.data);
                console.error("Full error object:", error);
                toast.error("Failed to update projects");
            });
    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Projects</h2>
            <p>Showcase your best work and technical skills</p>

            <form onSubmit={onSave}>
                {projects.map((project, index) => (
                    <div key={index} className='mt-5 border p-4 rounded-lg'>
                        <div className='flex justify-between items-center mb-3'>
                            <h3 className='font-medium'>Project {index + 1}</h3>
                            {projects.length > 1 && (
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => removeProject(index)}
                                >
                                    <Trash2 size={16} className='text-red-500' />
                                </Button>
                            )}
                        </div>
                        
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='col-span-2'>
                                <label className='text-sm'>Project Title</label>
                                <Input 
                                    value={project.title} 
                                    required
                                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)} 
                                />
                            </div>
                            
                            <div className='col-span-2'>
                                <label className='text-sm'>Project Link (Optional)</label>
                                <Input 
                                    value={project.link} 
                                    placeholder="https://github.com/username/project" 
                                    onChange={(e) => handleProjectChange(index, 'link', e.target.value)} 
                                />
                            </div>
                                    
                            <div className='col-span-2'>
                                <label className='text-sm'>Technologies Used</label>
                                <Input 
                                    value={project.technologies} 
                                    placeholder="React, Node.js, MongoDB, etc." 
                                    required
                                    onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)} 
                                />
                            </div>
                            
                            <div className='col-span-2'>
                                <div className='flex justify-between items-center'>
                                    <label className='text-sm'>Project Description</label>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => generateProjectDescriptionFromAI(index)}
                                        disabled={aiGenerating}
                                        className='flex gap-1 items-center'
                                    >
                                        {aiGenerating && currentProjectIndex === index ? (
                                            <LoaderCircle size={14} className='animate-spin' />
                                        ) : (
                                            <Sparkles size={14} className='text-yellow-500' />
                                        )}
                                        Generate with AI
                                    </Button>
                                </div>
                                <p className='text-xs text-gray-500 mb-1'>
                                    Enter bullet points on separate lines or use AI to generate
                                </p>
                                <Textarea 
                                    value={project.description} 
                                    required
                                    rows={5}
                                    placeholder="• Built a modular React.js frontend using Tailwind CSS
• Followed component-based architecture and clean coding practices
• Integrated with a Spring Boot backend"
                                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>
                ))}
                
                <div className='mt-4'>
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addProject}
                        className="w-full"
                    >
                        <Plus size={16} className='mr-2' /> Add Another Project
                    </Button>
                </div>

                <div className='mt-5 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save Projects'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProjectsForm;