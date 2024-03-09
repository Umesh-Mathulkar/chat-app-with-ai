// mark as client component
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "@/app/logo/logo.png";
import {
  FaShieldAlt,
  FaRegThumbsUp,
  FaLock,
  FaVideo,
  FaUserFriends,
  FaGlobe,
  FaGoogle,
} from "react-icons/fa"; // Import the icons you want to use
import Eye from "./Eye";
import Eyes from "./Eyes";
export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to /views/chats after successful login
  useEffect(() => {
    if (session) {
      router.push("/views/chats");
    }
  }, [session]);

  return (
    <div className=" bg-gradient-to-r from-purple-500 to-indigo-600">
      <div>
        <p className="text-5xl text-white logo p-2">ChatMan</p>
      </div>
    
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center md:p-10">
          <div className="rounded-lg p-8 bg-white/30 backdrop-blur-md shadow-lg relative">
            <Eyes />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
              <div className="flex flex-col justify-center space-y-7">
                <h2 className="text-4xl font-extrabold text-white mb-4 ">
                  Welcome to ChatMan
                </h2>
                <p className="text-lg text-gray-100 mb-8 ">
                  Join our global community of users who trust ChatMan for
                  secure, seamless, and real-time communication. Stay connected
                  with your loved ones, share your precious moments, and create
                  unforgettable memories together.
                </p>
                <ul className="text-sm text-gray-100 space-y-2 mb-4 list-disc pl-6">
                  <li className="flex items-center gap-3">
                    <FaLock className="text-blue-100" /> Secure messaging with
                    end-to-end encryption
                  </li>
                  <li className="flex items-center gap-3">
                    <FaVideo className="text-blue-100" /> High-definition video
                    and crystal-clear voice calls
                  </li>
                  <li className="flex items-center gap-3">
                    <FaUserFriends className="text-blue-100" /> Intuitive
                    interface with effortless navigation
                  </li>
                  <li className="flex items-center gap-3">
                    <FaGlobe className="text-blue-100" /> Connect with people
                    across the globe in real-time
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                <Image
                  src={Logo}
                  alt="ChatMan Logo"
                  className="w-32 h-32 rounded-xl"
                />
                <button
                  className="bg-indigo-700 text-white flex items-center gap-3 font-bold py-3 px-8 rounded-full shadow-md hover:bg-indigo-800 transition duration-300 ease-in-out"
                  onClick={() => signIn("google")}
                >
                  <FaGoogle size={20} /> Sign In with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
