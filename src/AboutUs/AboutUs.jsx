import React from "react";
import Header from "@/components/custom/Header";
import { BookOpen, Users, Lightbulb, Github } from "lucide-react";

const AboutUs = () => {
  return (

    
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About This Project</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            An AI-powered resume builder created as a college project to help students craft effective resumes.
          </p>
        </div>
        
        {/* Project Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
          <p className="text-gray-600 mb-4">
            This AI Resume Builder was developed as part of a college project focused on applying modern web development technologies and AI integration. The goal was to create a tool that helps students and recent graduates create professional resumes without prior design experience.
          </p>
          <p className="text-gray-600">
            The application leverages AI to suggest content improvements, optimize for ATS systems, and provide templates that highlight strengths effectively.
          </p>
        </div>
        
        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 ml-3">AI Content Suggestions</h3>
              </div>
              <p className="text-gray-600">
                Intelligent content recommendations to improve resume effectiveness and readability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 ml-3">Modern Templates</h3>
              </div>
              <p className="text-gray-600">
                Professional designs tailored for different academic backgrounds and career paths.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Member</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
                YD
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Syed Md Zaid Rizvi</h3>
                <p className="text-gray-600">Computer Science Student</p>
                <div className="flex items-center mt-2">
                  <a href="https://github.com/yourusername" className="flex items-center text-blue-600 hover:text-blue-800">
                    <Github className="h-4 w-4 mr-1" />
                    https://github.com/zaidrizvi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Technologies Used */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technologies Used</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <span className="font-medium">React</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <span className="font-medium">Strapi</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <span className="font-medium">Tailwind CSS</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <span className="font-medium">Gemini </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-6 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">© 2025 AI Resume Builder | College Project</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;