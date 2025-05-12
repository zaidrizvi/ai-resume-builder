import React from 'react'

function EducationalPreview({resumeInfo}) {
  return (
    <div className='my-4'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor
        }}
      >Education</h2>
      <hr style={{
        borderColor: resumeInfo?.themeColor
      }} />
      
      {resumeInfo?.education?.map((education, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'
            style={{
              color: resumeInfo?.themeColor
            }}
          >{education.universityName}</h2>
          <h2 className='text-xs flex justify-between font-bold'>
            {education?.degree}  {education?.major}
            <span>{education?.startDate} - {education?.endDate}</span>
          </h2>
          
          {/* Display GPA if it exists */}
          {education?.gpa && (
            <p className='text-xs mt-1 font-medium'>
              GPA: {education.gpa}
            </p>
          )}
          

        </div>
      ))}
    </div>
  )
}

export default EducationalPreview