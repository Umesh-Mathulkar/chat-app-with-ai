import React from "react";
import {
  MdAssignmentTurnedIn,
  MdLightbulbOutline,
  MdTrendingUp,
} from "react-icons/md";

const stepsData = [
  {
    icon: MdAssignmentTurnedIn,
    title: "Step 1: Conversation Analysis",
    description: "ChatMan analyzes your messages to understand your language patterns and preferences.",
  },
  {
    icon: MdLightbulbOutline,
    title: "Step 2: Learning & Adapting",
    description: "The AI integrates this knowledge to provide personalized suggestions and responses.",
  },
  {
    icon: MdTrendingUp,
    title: "Step 3: Continuous Improvement",
    description: "With each interaction, ChatMan becomes more attuned to your communication style.",
  },
];

const Step = ({ icon: Icon, title, description, size }) => {
  return (
    <li className="flex flex-col md:flex-row items-center text-gray-600">
      <div className="md:w-1/2">
        <span className="text-indigo-600 text-lg font-semibold">{title}</span>
        <p className="mt-2">{description}</p>
      </div>
      <div className="md:w-1/2">
        <Icon size={size} className="text-indigo-600" />
      </div>
    </li>
  );
};

const HowItWorks = ({ iconSize=60 }) => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Understanding the Process
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            How ChatMan Adapts
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Your personal AI companion that evolves with every conversation.
          </p>
        </div>

        <div className="mt-10">
          <ul className="space-y-8">
            {stepsData.map((step, index) => (
              <Step
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                size={iconSize}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default HowItWorks;
