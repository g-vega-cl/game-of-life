"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  //TODO, remove and do this in navbar with proper onSucess
  const session = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>{session?.data?.user?.name}</p>
        <button onClick={() => signIn('google')}>Click me to auth</button>
        {/* TODO, Remove this code and use chakraUI */}
        <p></p>
        
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </main>
  );
}
