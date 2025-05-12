import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from './../../../../../service/AIModal' 

const prompt = "Job Title: {jobTitle}, Based on job title give me a list of summary for 3 experience levels - Experienced, Mid Level, and Fresher. Each summary should be in 3-4 lines, and return the result in an array format. Each object should have 'summary' and 'experience_level' fields in JSON format."

function Summery({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [summery, setSummery] = useState('')
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([])

    useEffect(() => {
        if (summery) {
            setResumeInfo({
                ...resumeInfo,
                summery: summery
            })
        }
    }, [summery])

    const GenerateSummeryFromAI = async () => {
        if (!resumeInfo?.jobTitle) {
            toast.error('Please add a Job Title first!')
            return
        }

        try {
            setLoading(true)
            const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle)
            console.log('Prompt Sent to AI:', PROMPT)

            const result = await AIChatSession.sendMessage(PROMPT)
            const responseText = await result.response.text()

            const parsedResult = JSON.parse(responseText)
            console.log('AI Generated Summaries:', parsedResult)

            // Check if the response has a summaries property, otherwise use the response directly
            const summaries = parsedResult.summaries || parsedResult
            setAiGeneratedSummeryList(Array.isArray(summaries) ? summaries : [])
        } catch (error) {
            console.error('Error generating summary from AI:', error)
            toast.error('Failed to generate summary. Try again!')
        } finally {
            setLoading(false)
        }
    }

    const onSave = (e) => {
        e.preventDefault()

        if (!summery) {
            toast.error('Summary cannot be empty!')
            return
        }

        setLoading(true)

        const data = {
            data: {
                summery: summery
            }
        }

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            console.log('Resume Updated:', resp)
            enabledNext(true)
            toast.success('Details updated successfully!')
        }).catch(error => {
            console.error('Error updating resume:', error)
            toast.error('Failed to update. Try again!')
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Summary</h2>
                <p className="text-gray-600">Add a professional summary for your job title.</p>

                <form className="mt-7" onSubmit={onSave}>
                    <div className="flex justify-between items-end">
                        <label className="font-semibold">Add Summary</label>
                        <Button
                            variant="outline"
                            onClick={GenerateSummeryFromAI}
                            type="button"
                            size="sm"
                            className="border-primary text-primary flex gap-2"
                        >
                            <Brain className="h-4 w-4" /> Generate from AI
                        </Button>
                    </div>

                    <Textarea
                        className="mt-5"
                        required
                        value={summery || resumeInfo?.summery || ''}
                        onChange={(e) => setSummery(e.target.value)}
                        placeholder="Write a brief professional summary..."
                    />

                    <div className="mt-2 flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummeryList.length > 0 && (
                <div className="my-5">
                    <h2 className="font-bold text-lg mb-3">Suggestions</h2>
                    {aiGeneratedSummeryList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSummery(item?.summary)}
                            className="p-5 shadow-md my-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-all"
                        >
                            <h3 className="font-semibold text-primary mb-1">Level: {item?.experience_level}</h3>
                            <p className="text-gray-700">{item?.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Summery