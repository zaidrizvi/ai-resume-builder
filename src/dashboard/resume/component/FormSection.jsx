import React, { useState } from "react";
import PersonalDetails from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import ProjectsForm from "./forms/Projectform";
import { Link, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";


const FormSection = () => {
  const [activeForm, setActive] = useState(1);
  const [enabledNext, setEnabledNext] = useState(false);
  const { resumeId } = useParams();

  const handleNext = () => {
    if (enabledNext) {
      setActive(activeForm + 1);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="flex gap-2">
              Home
            </Button>
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          {activeForm > 1 && (
            <Button size="sm" onClick={() => setActive(activeForm - 1)}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enabledNext}
            className="flex gap-2"
            onClick={handleNext}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Form sections */}
      {activeForm === 1 ? (
        <PersonalDetails enabledNext={(v) => setEnabledNext(v)} />
      ) : activeForm === 2 ? (
        <Summery enabledNext={(v) => setEnabledNext(v)} />
      ) : activeForm === 3 ? (
        <ProjectsForm enabledNext={(v) => setEnabledNext(v)} />
      ) : activeForm === 4 ? (
        <Experience enabledNext={(v) => setEnabledNext(v)} />
      ) : activeForm === 5 ? (
        <Education enabledNext={(v) => setEnabledNext(v)} />
      ) : activeForm === 6 ? (
        <Skills enabledNext={(v) => setEnabledNext(v)} />
      ) : activeForm === 7 ? (
        <Navigate to={"/my-resume/" + resumeId + "/view"} />
      ) : null}
    </div>
  );
};

export default FormSection;