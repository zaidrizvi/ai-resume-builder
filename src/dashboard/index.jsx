import React, { useEffect, useState, useCallback } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from "../../service/GlobalApi";
import ResumeItems from './components/ResumeItems';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getResumeList = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await GlobalApi.getUserResume(user.primaryEmailAddress.emailAddress);
      setResumeList(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
      setError("Failed to load your resumes. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    if (isLoaded && user) {
      getResumeList();
    }
  }, [isLoaded, user, getResumeList]);

  return (
    <div className="w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="font-bold text-3xl text-gray-800 dark:text-gray-100">My Resume</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Start Creating AI Resume for Your Next Job Role</p>
      </header>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500 dark:text-blue-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AddResume onResumeAdded={getResumeList} />
          {resumeList.map((resume, index) => (
            <ResumeItems
              resume={resume}
              key={resume.id || index}
              refreshData={getResumeList}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;