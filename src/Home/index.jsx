import Header from "@/components/custom/Header";
import { UserButton, useAuth } from "@clerk/clerk-react";
import React from "react";
import { ArrowRight, FileText, Zap, RefreshCw, CheckCircle, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  
  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

  const LearnMore = () => {
    if (isSignedIn) {
      navigate("/about");
    } else {
      navigate("/auth/sign-in");
    }
  }
 

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Hero Section */}
        <div className="py-12 md:py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Build Your Perfect <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Resume With AI</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Create professional, ATS-friendly resumes in minutes. Our AI assistant helps you craft the perfect resume tailored to your industry and experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button  onClick={LearnMore} className="bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium flex items-center justify-center">
                Learn More
              </button>
            </div>
            <div className="pt-6 flex gap-4">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="ml-2 text-sm text-gray-600">ATS-Friendly</span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="ml-2 text-sm text-gray-600">AI-Powered</span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="ml-2 text-sm text-gray-600">Free Templates</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative">
              <div className="w-64 h-80 md:w-80 md:h-96 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-lg shadow-xl transform rotate-3 absolute"></div>
              <div className="w-64 h-80 md:w-80 md:h-96 bg-white rounded-lg shadow-xl relative z-10 p-6 border border-blue-100">
                <div className="h-4 w-24 bg-blue-100 rounded mb-4"></div>
                <div className="h-3 w-full bg-gray-100 rounded mb-3"></div>
                <div className="h-3 w-5/6 bg-gray-100 rounded mb-3"></div>
                <div className="h-3 w-4/6 bg-gray-100 rounded mb-6"></div>
                <div className="h-4 w-20 bg-blue-100 rounded mb-4"></div>
                <div className="h-3 w-full bg-gray-100 rounded mb-3"></div>
                <div className="h-3 w-full bg-gray-100 rounded mb-3"></div>
                <div className="h-4 w-20 bg-blue-100 rounded mb-4 mt-6"></div>
                <div className="h-3 w-4/6 bg-gray-100 rounded mb-3"></div>
                <div className="h-3 w-5/6 bg-gray-100 rounded mb-3"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">AI Resume Builder</span></h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:border-blue-100">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                <Zap className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Our advanced AI analyzes job descriptions to help you create perfectly tailored resumes.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:border-blue-100">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:from-indigo-200 group-hover:to-indigo-300 transition-all duration-300">
                <FileText className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ATS-Friendly</h3>
              <p className="text-gray-600">Ensure your resume gets past Applicant Tracking Systems with our optimized templates.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:border-blue-100">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-indigo-300 transition-all duration-300">
                <RefreshCw className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
              <p className="text-gray-600">Create a professional resume in minutes, not hours. Save and update anytime.</p>
            </div>
          </div>
        </div>
        
       
        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl my-12 px-6 md:px-12 shadow-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Land Your Dream Job?</h2>
            <p className="text-blue-100 mb-8">Join thousands of job seekers who have successfully used our AI Resume Builder to get more interviews.</p>
            <button 
              onClick={handleGetStarted}
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-medium text-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Build Your Resume Now
            </button>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className=" p-2 rounded">
                  <img src="/Logo.png" alt="Logo" className="h-8 w-8" />
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Resume Builder</span>
              </div>
              <p className="text-gray-500 mt-2 max-w-md">Create professional, ATS-friendly resumes with our AI-powered resume builder.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-500 hover:text-blue-600">Features</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-blue-600">Templates</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-blue-600">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-500 hover:text-blue-600">About Us</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-blue-600">Careers</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-blue-600">Contact</a></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-500 hover:text-blue-600">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-blue-600">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-blue-600">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">© 2025 Resume Builder AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;