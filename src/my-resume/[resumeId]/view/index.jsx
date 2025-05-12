import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Download, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../service/GlobalApi";
import { RWebShare } from "react-web-share";
import ResumePreview from "@/dashboard/resume/component/ResumePreview";
import { Card, CardContent } from "@/components/ui/card";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    setIsLoading(true);
    GlobalApi.GetResumeById(resumeId)
      .then((resp) => {
        console.log(resp.data.data);
        setResumeInfo(resp.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching resume:", error);
        setIsLoading(false);
      });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="min-h-screen bg-gray-50">
        <div id="no-print">
          <Header />

          <div className="max-w-5xl mx-auto px-4 py-12">
            <Card className="mb-10 overflow-hidden border-none shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <h2 className="text-center text-3xl font-bold">
                  Congratulations! 🎉
                </h2>
                <p className="text-center text-lg mt-2 opacity-90">
                  Your AI-generated resume is ready to showcase your potential!
                </p>
              </div>

              <CardContent className="p-6">
                <p className="text-center text-gray-600 mb-8">
                  Download your professional resume or share the unique URL with
                  your network.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                  <Button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-5"
                    size="lg"
                  >
                    <Download size={20} />
                    Download Resume
                  </Button>

                  <RWebShare
                    data={{
                      text: `Check out my professional resume created with AI`,
                      url:
                        import.meta.env.VITE_BASE_URL +
                        "/my-resume/" +
                        resumeId +
                        "/view",
                      title:
                        resumeInfo?.firstName +
                        " " +
                        resumeInfo?.lastName +
                        "'s Resume",
                    }}
                    onClick={() => console.log("shared successfully!")}
                  >
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 px-6 py-5"
                      size="lg"
                    >
                      <Share2 size={20} />
                      Share Resume
                    </Button>
                  </RWebShare>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-16">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
          ) : (

            <div
              id="print-area"
              className="bg-white shadow-xl rounded-lg overflow-hidden"
              style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
            >
              <ResumePreview />
            </div>
          )}
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
