import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "./../../../service/GlobalApi";

import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AddResume = ({ onResumeAdded }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState();
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    setloading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumetitle,
        resumeid: uuid,
        userEmail: user?.primaryEmailAddress.emailAddress,
        userName: user?.fullName,
      },
    };

    GlobalApi.CreateNewResume(data).then(
      (response) => {
        console.log(response.data.data.documentId);
        if (response) {
          setloading(false);
          setOpenDialog(false);
          
          // Call the callback function if provided
          if (onResumeAdded) {
            onResumeAdded();
          }
          
          navigation('/dashboard/resume/' + response.data.data.documentId + "/edit");
        }
      },
      (error) => {
        console.error(error);
        setloading(false);
      }
    );
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center 
        bg-secondary dark:bg-gray-800 rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-sm cursor-pointer 
        border-dotted dark:border-gray-600"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare className="text-gray-500 dark:text-gray-400" />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">Create New Resume</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Add a title for your new resume
            </DialogDescription>

            <Input
              className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
              placeholder="Enter the Title"
              onChange={(e) => setResumetitle(e.target.value)}
            />

            <div className="flex justify-end items-center gap-5 mt-4">
              <Button 
                onClick={() => setOpenDialog(false)} 
                variant="ghost" 
                className="dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>

              <Button
                disabled={!resumetitle || loading}
                onClick={() => onCreate()}
                className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;