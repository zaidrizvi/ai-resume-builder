import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetail from "./preview/PersonalDetail";
import SummeryPreview from "./preview/SummeryPreview";
import ProfessionalExprirence from "./preview/ProfessionalExprirence";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";
import ProjectsSection from "./preview/ProjectsSection";

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  const defaultThemeColor = "#000000";
  const themeColor = resumeInfo?.themeColor || defaultThemeColor;

  return (
    <div className="shadow-lg h-full p-8 border-t-[20px]" style={{ borderColor: themeColor }}>
    <style>
      {`
        .resume-preview hr {
          border-color: ${themeColor};
        }
        
        /* Add vertical space optimization */
        .resume-preview > div {
          margin-bottom: 8px;
        }
        
        /* Make Technologies section more compact */
        .resume-preview > div:nth-last-child(2),
        .resume-preview > div:last-child {
          margin-bottom: 0;
        }
      `}
    </style>

      <div className="resume-preview">
        {/* Personal detail */}
        <PersonalDetail resumeInfo={resumeInfo} />

        {/* Summary */}
        <SummeryPreview resumeInfo={resumeInfo} />
        {/* {Project} */}

        <ProjectsSection resumeInfo={resumeInfo}/>

        {/* Professional Experience */}
        <ProfessionalExprirence resumeInfo={resumeInfo} />

        {/* Educational */}
        <EducationalPreview resumeInfo={resumeInfo} />

        {/* Skills */}
        <SkillsPreview resumeInfo={resumeInfo} />


      </div>
    </div>
  );
};

export default ResumePreview;
