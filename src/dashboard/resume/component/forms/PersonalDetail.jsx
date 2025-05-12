import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, Github, Linkedin } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalDetail({enabledNext}) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("---", resumeInfo)
    }, [resumeInfo])

    const handleInputChange = (e) => {
        enabledNext(false);
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            [name]: value
        }));
    }

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            data: formData
        };

        GlobalApi.UpdateResumeDetail(params?.resumeId, data)
            .then(resp => {
                console.log(resp);
                enabledNext(true);
                setLoading(false);
                toast("Details updated");
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Failed to update details");
            })
    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" required onChange={handleInputChange} defaultValue={resumeInfo?.lastName} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" required defaultValue={resumeInfo?.jobTitle} onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" required defaultValue={resumeInfo?.address} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone" required defaultValue={resumeInfo?.phone} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>User Email</label>
                        <Input name="email" required defaultValue={resumeInfo?.email} onChange={handleInputChange} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Github size={18} className='text-gray-500' />
                        <div className='w-full'>
                            <label className='text-sm'>GitHub Profile</label>
                            <Input 
                                name="github" 
                                placeholder="https://github.com/username" 
                                defaultValue={resumeInfo?.github} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Linkedin size={18} className='text-gray-500' />
                        <div className='w-full'>
                            <label className='text-sm'>LinkedIn Profile</label>
                            <Input 
                                name="linkedin" 
                                placeholder="https://linkedin.com/in/username" 
                                defaultValue={resumeInfo?.linkedin} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>
                </div>

                <div className='mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetail;