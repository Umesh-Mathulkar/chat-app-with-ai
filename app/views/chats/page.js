"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaPaperPlane, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Users() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.post("/api/users/fetch");
        const users = res.data.users.filter(
          (user) => session && user.email !== session.user.email
        ); // Exclude the logged-in user
        setUsers(users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [session]);
  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-indigo-800 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
    {session && (
      <div className="absolute top-0 right-0 m-6 flex items-center space-x-4">
        <img
          src={session.user.image}
          alt={session.user.name}
          className="w-10 h-10 rounded-full"
        />
        <p className="text-sm text-white">{session.user.email}</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white rounded-full px-4 py-1"
        >
          Sign Out
        </button>
      </div>
    )}
   <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaUser className="h-8 w-8 mr-2 text-gray-600" />
            User List
          </h2>
          </div>
          <div className="divide-y divide-gray-300">
            {users.map((user) => (
              <div
                key={user._id}
                className="py-4 px-2 group hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="absolute inset-0 w-full h-full rounded-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                  </div>
                  <div>
                    <Link
                      href={`/views/gemini/${user.email}`}
                      className="block text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300 ease-in-out"
                    >
                      {user.name}
                    </Link>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <Link href={`/views/gemini/${user.email}`}>
                  {" "}
                  <FaPaperPlane className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-300 ease-in-out" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
