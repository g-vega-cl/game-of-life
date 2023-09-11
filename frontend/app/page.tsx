"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  //TODO, remove and do this in navbar with proper onSucess
  const user = useSession();
  // console.log('user', user)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>{user?.data?.user?.name}</p>
        <button onClick={() => signIn('google')}>Click me to auth</button>
        {/* TODO, CLEARLY THIS NEEDS TO CHANGE. */}
        <p></p>
        
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </main>
  );
}
