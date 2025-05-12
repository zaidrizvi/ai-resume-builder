import { Loader2Icon, MoreVertical } from 'lucide-react'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeItems({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      console.log(resp);
      toast('Resume Deleted!');
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      console.error("Error deleting resume:", error);
      toast('Failed to delete resume', { type: 'error' });
      setLoading(false);
    })
  }

  return (
    <div className="">
      {/* Only wrap the main part in Link, not the dropdown */}
      <div>
        <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
          <div
            className="p-14 bg-gradient-to-b
            from-pink-100 via-purple-200 to-blue-200
            dark:from-pink-900/30 dark:via-purple-900/40 dark:to-blue-900/50
            h-[280px] rounded-t-lg border-t-4"
            style={{
              borderColor: resume?.themeColor,
            }}
          >
            <div className="flex items-center justify-center h-[180px]">
              <img src="/cv.png" width={80} height={80} alt="Resume" />
            </div>
          </div>
        </Link>

        <div
          className="border p-3 flex justify-between text-black dark:text-white rounded-b-lg shadow-lg"
          style={{
            background: resume?.themeColor,
          }}
        >
          <h2 className="text-sm">{resume.title}</h2>
          {/* Dropdown outside of Link */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className='h-4 w-4 cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700" onClick={() => navigation('/dashboard/resume/' + resume.documentId + "/edit")}>Edit</DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700" onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>View</DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700" onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>Download</DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-200 dark:hover:bg-gray-700" onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-gray-100">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-300">
              This action cannot be undone. This will permanently delete your resume
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading} className="dark:bg-red-600 dark:hover:bg-red-700">
              {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeItems;