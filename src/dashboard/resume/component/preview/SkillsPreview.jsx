import React from 'react';

const SkillsPreview = ({ resumeInfo }) => {
  const { themeColor, skills } = resumeInfo || {};

  // Helper function to safely display skills
  const formatSkill = (skill) => {
    if (Array.isArray(skill)) return skill.join(', ');
    return skill || '';
  };

  return (
    <div className="my-6 text-[13px]">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: themeColor }}
      >
        Technologies
      </h2>
      <hr style={{ borderColor: themeColor }} />

      <div className="mt-3 space-y-2">
        {skills?.languages && (
          <div>
            <span className="font-semibold">Languages: </span>
            {formatSkill(skills.languages)}
          </div>
        )}
        {skills?.databases && (
          <div>
            <span className="font-semibold">Databases: </span>
            {formatSkill(skills.databases)}
          </div>
        )}
        {skills?.tools && (
          <div>
            <span className="font-semibold">Tools & Technology: </span>
            {formatSkill(skills.tools)}
          </div>
        )}
        {skills?.softSkills && (
          <div>
            <span className="font-semibold">Soft Skills: </span>
            {formatSkill(skills.softSkills)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsPreview;