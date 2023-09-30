import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { isLoaded, isSignedIn } = useAuth();
  return (
    <div className="flex flex-row justify-between bg-sky-300 border-slate-200 w-full p-2">
      <Link className="bg-slate-200 rounded-md py-1 px-2 text-lg shadow-md" href="/">Home</Link>
      {isSignedIn ? <SignOutButton><button className="bg-slate-200 rounded-md py-1 px-2 text-lg shadow-md">Log Out</button></SignOutButton> : <SignInButton>Log In</SignInButton>}
    </div>
  )
}
