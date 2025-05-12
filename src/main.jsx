import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signinpage from "./auth/sign-in/index.jsx";
import Home from "./Home";
import Dashboard from "./dashboard";

import { ClerkProvider } from '@clerk/clerk-react';
import EditResume from "./dashboard/resume/[resumeId]/edit";
import ViewResume from "./my-resume/[resumeId]/view";
import AboutUs from "./AboutUs/AboutUs";
import ContactForm from "./ContactUs/ContactForm";
import MyAccountPage from "./MyAccountPage/MyAccountPage";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element:<EditResume/>
      }
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <Signinpage />,
  },
  {
    path:'/my-resume/:resumeId/view',
    element:<ViewResume/>
  },
  {
    path: "/about",
    element: <AboutUs/>
  },

  {
    path: "/contact",
    element: <ContactForm/>
  },
  {
    path: "/account",
    element: <MyAccountPage/>
  }

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);