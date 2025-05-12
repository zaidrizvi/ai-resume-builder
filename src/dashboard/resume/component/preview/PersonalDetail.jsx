import React from 'react'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'

const PersonalDetail = ({resumeInfo}) => {
  return (
    <div>
      <h2 className='font-bold text-lg text-center'
        style={{color:resumeInfo?.themeColor}}>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
        
      <h2 className='text-center text-sm font-medium'>{resumeInfo?.jobTitle}</h2>
      
      <div className='flex items-center justify-center gap-1 mt-1'>
        <h2 className='text-center font-normal text-xs'
          style={{color:resumeInfo?.themeColor}}>{resumeInfo?.address}</h2>
      </div>
        
      <div className='flex justify-center gap-4 mt-2'>
        <div className='flex items-center gap-1'>
          <Phone size={12} style={{color:resumeInfo?.themeColor}} />
          <h2 className='font-normal text-xs'
            style={{color:resumeInfo?.themeColor}}>{resumeInfo?.phone}</h2>
        </div>
            
        <div className='flex items-center gap-1'>
          <Mail size={12} style={{color:resumeInfo?.themeColor}} />
          <h2 className='font-normal text-xs'
            style={{color:resumeInfo?.themeColor}}>{resumeInfo?.email}</h2>
        </div>
            
        {resumeInfo?.github && (
          <div className='flex items-center gap-1'>
            <Github size={12} style={{color:resumeInfo?.themeColor}} />
            <a href={resumeInfo.github} 
              className='font-normal text-xs'
              style={{color:resumeInfo?.themeColor}}
              target="_blank" 
              rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        )}
            
        {resumeInfo?.linkedin && (
          <div className='flex items-center gap-1'>
            <Linkedin size={12} style={{color:resumeInfo?.themeColor}} />
            <a href={resumeInfo.linkedin} 
              className='font-normal text-xs'
              style={{color:resumeInfo?.themeColor}}
              target="_blank" 
              rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        )}
      </div>
        
      <hr className='border-2 my-2'
        style={{borderColor:resumeInfo?.themeColor}}/>
    </div>
  )
}

export default PersonalDetail