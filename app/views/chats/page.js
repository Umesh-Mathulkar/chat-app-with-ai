"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaPaperPlane, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader/Loader";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { clearChats } from "@/app/store/chatSlice";

const Users = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    chatRoomId,
  } = useSelector((state) => state.chat);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(clearChats())
        setIsLoading(true);
        const res = await axios.post("/api/users/fetch");
        const users = res.data.users.filter(
          (user) => session && user.email !== session.user.email
        ); // Exclude the logged-in user
        setUsers(users);

        // Set a minimum loading time for the first load only
        if (firstLoad) {
          const MIN_LOADING_TIME = 5000;
          const endTime = Date.now() + MIN_LOADING_TIME;
          const remainingTime = endTime - Date.now();
          if (remainingTime > 0) {
            setTimeout(() => {
              setIsLoading(false);
              setFirstLoad(false);
            }, remainingTime);
          } else {
            setIsLoading(false);
            setFirstLoad(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [session]);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return (
    <Loader isLoading={isLoading}>
      <div className="min-h-screen users-gradient-bg flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {session && (
          <div className="absolute top-0 right-0 m-6 flex items-center space-x-4">
            <div className="relative w-10 h-10 overflow-hidden rounded-full">
          
              <Image
                className="w-full h-full object-cover shadow-lg"
                src={session.user.image}
                alt="Profile Picture"
                width={100}
                height={100}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
            </div>
            <div>
              <p className="text-base font-semibold text-white hover:text-white/70 cursor-pointer transition-colors duration-300 ease-in-out">
                {session.user.name}
              </p>
              <p className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out">
                {session.user.email}
              </p>
            </div>
            <button
              onClick={() => signOut()}
              className="text-white hover:text-white/70 transition-colors duration-300 ease-in-out"
            >
              <FaSignOutAlt className="h-6 w-6" />
            </button>
          </div>
        )}

        <div className="max-w-md w-full bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden mt-10 md:mt-0">
          <div className="px-8 py-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <FaUser className="h-8 w-8 mr-2 text-white/70" />
                User List
              </h2>
            </div>
            <div className="divide-y divide-white/20">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="py-4 px-2 group hover:bg-white/20 transition-all duration-300 ease-in-out rounded-lg flex flex-col sm:flex-row items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                    </div>
                    <div>
                      <Link
                        href={`/views/gemini/${user.email}`}
                        className="block name text-lg font-semibold text-white hover:text-white/70 transition-colors duration-300 ease-in-out"
                      >
                        {user.name}
                      </Link>
                      <p className="text-base font-medium text-white/70 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    {" "}
                    {/* Add margin top on small devices */}
                    <Link href={`/views/gemini/${user.email}`}>
                      <FaPaperPlane className="h-6 w-6 text-white/70 cursor-pointer hover:text-white transition-colors duration-300 ease-in-out" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default Users;
