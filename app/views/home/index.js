// components/home/Home.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "@/app/logo/logo.png";

import { handleInstallPrompt } from "./utils/handleInstallPrompt";
import Eyes from "@/app/Eyes";

import { FaGoogle } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import FeatureList from "./FeatureList";
import UserLoveList from "./UserLoveList";
import Link from "next/link";



export default function HomeComponent() {
  const { data: session } = useSession();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const router = useRouter();
  const [showFeatures, setShowFeatures] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFeatures(prev => !prev);
    }, 9000); // This should match the duration of your CSS animation
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (session) {
      router.push("/views/chats");
    }
  }, [session]);

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
    <div 
      className="bg-gray-50 min-h-screen flex flex-col items-center justify-center transition ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isHovered ? 'scale-75' : 'scale-100'}`}>
        <div className="text-center mb-8">
          <h1 className="text-6xl font-thin text-gray-900 mb-6 logo">ChatMan</h1>
          <p className="text-xl text-gray-600">
            Secure. Seamless. Effortless.
          </p>
        </div>
      </div>
      {isHovered && (
        <div className="bg-white rounded-lg shadow-md p-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Discover ChatMan</h2>
            <p className="text-lg text-gray-600 mt-3">
              A trusted platform for real-time communication across the globe. Connect with ease and share moments that matter.
            </p>
          </div>
          <div className="mt-6">
            {/* Conditional rendering for the lists with fade-in/out effect */}
            {showFeatures ? <FeatureList /> : <UserLoveList />}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Image component needs to be defined or imported */}
          <Image src={Logo} alt="ChatMan Logo" className="w-48 h-48 object-cover rounded-full" />
          <div className="flex flex-col items-center gap-2">
          <button
            className="bg-gray-800 text-white flex items-center gap-4 font-semibold py-3 px-8 rounded-md shadow hover:bg-gray-700 transition duration-300 ease-in-out"
            onClick={() => signIn("google")}
          >
            <FaGoogle size={20} /> Sign in with Google
          </button>
          <p className="text-xs text-gray-600">By signing in, you agree to our <Link href={'/views/terms-conditions'} className="text-blue-500 underline"> Terms of Service and Privacy Policy </Link></p>
          </div>
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-2 border border-gray-300 text-gray-800 py-3 px-6 rounded-md transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <BiDownload size={24} />
            <span className="text-lg">Install ChatMan</span>
          </button>
        </div>
      </div>
      )}
      </div>

    )
  }

