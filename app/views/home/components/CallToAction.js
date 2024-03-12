import React, { useEffect, useState } from 'react';
import {  signIn } from "next-auth/react";
import { MdArrowForward, MdCloudDownload } from 'react-icons/md';
import { handleInstallPrompt } from '../utils/handleInstallPrompt';

const CallToAction = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
          event.preventDefault();
          setDeferredPrompt(event);
        };
    
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    
        return () => {
          window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
      }, []);
    
      const handleInstallClick = () => {
        handleInstallPrompt(deferredPrompt, setDeferredPrompt);
      };
    
    
  return (
    <div className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 text-center">
          <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to Chat Smarter?
          </h2>
          <p className="mt-4 text-xl leading-6 text-indigo-200">
            Join the future of communication with ChatMan.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <button  onClick={() => signIn("google")} href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                <MdArrowForward className="mr-2" />
                Sign Up for Free
              </button>
            </div>
            <div className="ml-3 inline-flex">
              <button   onClick={handleInstallClick} href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400">
                <MdCloudDownload className="mr-2" />
                Download Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
