export default {
  firstName: "James",
  lastName: "Carter",
  jobTitle: "full stack developer",
  address: "525 N tryon Street, NC 28117",
  phone: "(123)-456-7890",
  email: "exmaple@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  themeColor: "#ff6666",
  summery:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  experience: [
    {
      id: 1,
      title: "Full Stack Developer",
      companyName: "Amazon",
      city: "New York",
      state: "NY",
      startDate: "Jan 2021",
      endDate: "",
      currentlyWorking: true,
      workSummery:
        " Designed, developed, and maintained full-stack applications using React and Node.js.\n" +
        "• Implemented responsive user interfaces with React, ensuring seamless user experiences across\n" +
        "various devices and browsers.\n" +
        "• Maintaining the React Native in-house organization application." +
        "• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end" +
        "and back-end systems.",
    },
    {
      id: 2,
      title: "Frontend Developer",
      companyName: "Google",
      city: "Charlotte",
      state: "NC",
      startDate: "May 2019",
      endDate: "Jan 2021",
      currentlyWorking: false,
      workSummery:
        " Designed, developed, and maintained full-stack applications using React and Node.js." +
        "• Implemented responsive user interfaces with React, ensuring seamless user experiences across" +
        "various devices and browsers." +
        "• Maintaining the React Native in-house organization application." +
        "• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end" +
        "and back-end systems.",
    },
  ],
  education: [
    {
      id: 1,
      universityName: "Western Illinois University",
      startDate: "yyyy-MM-dd",
      endDate: "yyyy-MM-dd",
      degree: "Master",
      major: "Computer Science",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      gpa: "7.52",
    },
    {
      id: 2,
      universityName: "Western Illinois University",
      startDate: "yyyy-MM-dd",
      endDate: "yyyy-MM-dd",
      degree: "Master",
      major: "Computer Science",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    },
  ],

  projects: [
    {
      title: "AI Resume Analyzer",
      link: "https://github.com/zaid-dev/ai-resume-analyzer",
      description:
        "An AI-powered web app that analyzes resumes and provides tailored improvement suggestions based on job descriptions and best industry practices.",
      technologies:
        "React, Node.js, Express.js, MongoDB, OpenAI API, Tailwind CSS",
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python"],
    databases: ["MySQL", "MongoDB"],
    tools: ["React", "React Native", "Node.js", "Express", "Angular"],
    softSkills: ["Communication", "Problem-solving", "Teamwork", "Leadership"],
  },
};
