import React from 'react';
import { useUser, UserProfile } from '@clerk/clerk-react';
import { Settings, FileText, Lock, LogOut } from 'lucide-react';
import Header from '@/components/custom/Header';

const MyAccountPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  // If the user data is still loading
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If the user is not signed in
  if (!isSignedIn) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Account</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your account details.</p>
          <a 
            href="/auth/sign-in" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md inline-block transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  // If the user is signed in
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header/>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header section with user info */}
        <div className="bg-blue-600 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="mb-4 sm:mb-0 sm:mr-6">
              {user.hasImage ? (
                <img 
                  src={user.imageUrl} 
                  alt={user.fullName || 'User'} 
                  className="h-24 w-24 rounded-full border-4 border-white"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-blue-400 flex items-center justify-center border-4 border-white">
                  <span className="text-2xl font-bold text-white">
                    {(user.firstName?.[0] || '') + (user.lastName?.[0] || '')}
                  </span>
                </div>
              )}
            </div>
            <div className="text-center sm:text-left text-white">
              <h1 className="text-2xl font-bold">{user.fullName || 'User'}</h1>
              <p className="text-blue-100">{user.primaryEmailAddress?.emailAddress}</p>
              <p className="text-blue-200 text-sm mt-1">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Tab-like navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Sidebar */}
          <div className="bg-gray-50 p-6 border-r border-gray-200">
            <nav className="space-y-1">
              <a 
                href="#profile" 
                className="flex items-center px-3 py-2 text-gray-700 bg-white rounded-md shadow-sm group"
              >
                <Settings className="mr-3 h-5 w-5 text-gray-500 group-hover:text-blue-500" />
                <span className="truncate">Profile Settings</span>
              </a>
              <a 
                href="/dashboard" 
                className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md group"
              >
                <FileText className="mr-3 h-5 w-5 text-gray-500 group-hover:text-blue-500" />
                <span className="truncate">My Resumes</span>
              </a>
              <a 
                href="#security" 
                className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md group"
              >
                <Lock className="mr-3 h-5 w-5 text-gray-500 group-hover:text-blue-500" />
                <span className="truncate">Security</span>
              </a>
              <button 
                className="w-full flex items-center px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-md group"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-500 group-hover:text-red-500" />
                <span className="truncate">Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Main content area */}
          <div className="p-6 md:col-span-3">
            <div id="profile">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Settings</h2>
              
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6">
                Your profile is managed by our authentication provider. Click the button below to edit your details.
              </div>
              
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                onClick={() => {
                  // You can open Clerk's user profile here
                  // This is just a placeholder - you would typically use Clerk's UserProfile component
                }}
              >
                Edit Profile
              </button>

              {/* Embed Clerk's UserProfile component */}
              <div className="mt-8">
                <UserProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;