// mark as client component
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to /views/chats after successful login
  useEffect(() => {
    if (session) {
      router.push('/views/chats');
    }
  }, [session]);

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Image
          className="mb-8 rounded-full"
          src={session.user.image}
          alt="Profile Picture"
          width={144}
          height={144}
        />
        <h2 className="text-2xl mb-2">Welcome, {session.user.name}!</h2>
        <p className="mb-4">{session.user.email}</p>
        <button
          className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style={{ transition: "all .15s ease" }}
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-2xl mb-2">Please sign in</h2>
      <button
        className="bg-blue-600 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => signIn('google')}
      >
        Sign in with Google
      </button>
    </div>
  );
}
