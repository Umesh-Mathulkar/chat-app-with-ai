import React from 'react';


const ResumeHeader = ({ name, email, phone }) => (
  <div className="flex flex-col items-center py-8 bg-gray-100">
    <h1 className="text-4xl font-bold text-gray-700">{name}</h1>
    <p className="text-md text-gray-600">{email} | {phone}</p>
  </div>
);

const ResumeSection = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-700 mb-4">{title}</h2>
    {children}
  </div>
);

const Resume = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 shadow-lg">
      <ResumeHeader
        name="John Doe"
        email="john.doe@example.com"
        phone="(555) 555-5555"
      />

      <ResumeSection title="Professional Summary">
        <p className="text-sm">
          A passionate and driven software developer with a strong foundation in
          JavaScript and React.js, seeking to leverage my skills in a dynamic team
          to deliver high-quality software solutions.
        </p>
      </ResumeSection>

      <ResumeSection title="Skills">
        <ul className="list-disc list-inside text-sm">
          <li><strong>JavaScript</strong> - Advanced</li>
          <li><strong>React.js</strong> - Intermediate</li>
          {/* Add more skills here */}
        </ul>
      </ResumeSection>

      <ResumeSection title="Education">
        <div className="text-sm">
          <h3 className="font-bold">B.Tech in Computer Science</h3>
          <p>XYZ University, 2020 - 2024</p>
        </div>
      </ResumeSection>

      <ResumeSection title="Projects">
        <div className="text-sm">
          <h3 className="font-bold">Project Name</h3>
          <p>Description of the project and technologies used.</p>
        </div>
        {/* Add more projects here */}
      </ResumeSection>

      {/* Add more sections like Experience, Certifications, etc. */}
    </div>
  );
};

export default Resume;
