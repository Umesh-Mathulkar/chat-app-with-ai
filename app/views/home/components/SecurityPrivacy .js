import React from 'react';
import { MdLock, MdSecurity, MdUpdate, MdGavel } from 'react-icons/md';

const SecurityPrivacy = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Your Trust, Our Priority</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Security & Privacy
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Protecting your conversations is at the core of everything we do.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <MdLock className="text-indigo-600 w-10 h-10" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">End-to-End Encryption</h3>
                <p className="text-gray-600">
                  Every message is encrypted from start to finish, ensuring that only you and the person you&apos;re communicating with can read what is sent.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MdSecurity className="text-indigo-600 w-10 h-10" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Data Privacy</h3>
                <p className="text-gray-600">
                  Your personal data belongs to you. We don&apos;t sell it to advertisers or third parties.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MdUpdate className="text-indigo-600 w-10 h-10" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Regular Updates</h3>
                <p className="text-gray-600">
                  We continuously update our systems to tackle the latest security threats and ensure your data remains protected.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MdGavel className="text-indigo-600 w-10 h-10" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Transparent Policies</h3>
                <p className="text-gray-600">
                  Our terms and policies are designed to be clear and understandable, so you know exactly how your information is used.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPrivacy;
