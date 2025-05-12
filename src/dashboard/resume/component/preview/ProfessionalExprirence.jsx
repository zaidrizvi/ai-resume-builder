import React from "react";

const ProfessionalExprirence = ({ resumeInfo }) => {
  return (
    <div className='my-6'>
      <h2 
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor
        }}
      >
        Professional Experience
      </h2>
      <hr 
        style={{
          borderColor: resumeInfo?.themeColor
        }} 
      />
      
      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2 
            className='text-sm font-bold'
            style={{
              color: resumeInfo?.themeColor
            }}
          >
            {experience?.title}
          </h2>
          <h2 className='text-xs flex justify-between'>
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience.endDate}
            </span>
          </h2>
          
          {/* Experience content with styled lists */}
          <div 
            className='text-xs my-2 experience-content' 
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }} 
          />
        </div>
      ))}
      
      {/* Add inline style to ensure proper list styling */}
      <style jsx>{`
        .experience-content ul {
          list-style-type: disc;
          margin-left: 1.25rem;
          margin-top: 0.5rem;
        }
        
        .experience-content li {
          margin-bottom: 0.25rem;
          padding-left: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default ProfessionalExprirence;