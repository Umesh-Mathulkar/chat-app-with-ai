// AIFeatures.js
import React from "react";
import {
  MdLanguage,
  MdLightbulbOutline,
  MdComment,
  MdCode,
} from "react-icons/md";

const AIFeatures = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Intelligent Chatting
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Smart AI Features
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Experience the future of communication with AI that understands you.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <MdLanguage size={24} />
                </div>

                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Natural Language Understanding
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our AI comprehends the nuances of language, ensuring nothing
                gets lost in translation.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <MdLightbulbOutline size={24} />
                </div>

                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Learning & Adaptation
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                The more you chat, the smarter it gets. Tailoring suggestions to
                your style and needs.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <MdComment size={24} />
                </div>

                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Smart Suggestions
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Receive context-aware suggestions that help you communicate more
                effectively.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <MdCode size={24} />
                </div>

                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Seamless Integration
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Integrates smoothly with your daily apps for an uninterrupted
                chatting experience.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;
