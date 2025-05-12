import React from "react";

const ProjectsSection = ({ resumeInfo }) => {
  // Helper function to process description text and handle objects
  const processDescription = (description) => {
    if (!description) return [];
    
    // Split by new lines
    return description.split("\n").map(point => {
      const trimmedPoint = point.trim();
      
      // Skip empty lines
      if (!trimmedPoint) return null;
      
      // If the point contains "[object Object]", it might be from an incorrectly formatted AI response
      if (trimmedPoint.includes("[object Object]")) {
        // Try to create a generic bullet point
        return "• Project feature or implementation detail";
      }
      
      // Remove leading bullet characters if present
      const cleanPoint = trimmedPoint.replace(/^[•\- /*]\s*/, '');
      
      // Return clean point
      return cleanPoint;
    }).filter(Boolean); // Remove null/empty items
  };

  return (
    <div className="mt-4">
      {/* Header styling similar to "Professional Experience" */}
      <div className="text-center mb-2">
        <h2 className="font-bold text-sm">Projects</h2>
        <hr className="border-t border-black mt-1" />
      </div>
      
      {resumeInfo?.projects &&
        resumeInfo.projects.map((project, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <h3 className="font-bold text-sm">
                {project.title}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-xs font-normal"
                    style={{ color: resumeInfo?.themeColor }}
                  >
                    ↗
                  </a>
                )}
              </h3>
            </div>
            
            {project.technologies && (
              <p className="text-xs italic mt-1">
                <span className="font-medium">Technologies:</span>{" "}
                {project.technologies}
              </p>
            )}
            
            <ul className="list-disc ml-5 text-xs">
              {processDescription(project.description).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default ProjectsSection;