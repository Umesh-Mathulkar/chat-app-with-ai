// TermsAndConditions.js
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Legal</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Terms and Conditions
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Please read these terms and conditions carefully before using Our Service.
          </p>
        </div>

        <div className="mt-10 text-left">
          <h3 className="text-lg font-semibold text-gray-800">Acknowledgment</h3>
          <p className="mt-2 text-gray-600">
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you do not have permission to access the Service.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6">User Accounts</h3>
          <p className="mt-2 text-gray-600">
            When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times.
          </p>

          {/* Add more sections as needed */}

          <h3 className="text-lg font-semibold text-gray-800 mt-6">Termination</h3>
          <p className="mt-2 text-gray-600">
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>

          {/* Add more sections as needed */}

          <h3 className="text-lg font-semibold text-gray-800 mt-6">Governing Law</h3>
          <p className="mt-2 text-gray-600">
            These Terms shall be governed and construed in accordance with the laws of the country you reside in, without regard to its conflict of law provisions.
          </p>

          {/* Add more sections as needed */}

          <h3 className="text-lg font-semibold text-gray-800 mt-6">Changes</h3>
          <p className="mt-2 text-gray-600">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
          </p>

          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
