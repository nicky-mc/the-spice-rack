"use client";
import { useState } from "react";
import Image from "next/image";
import { SignIn, SignUp, useUser } from "@clerk/nextjs";

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/spice.png"
          alt="The Spice Rack logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold text-white text-center sm:text-left">
          Welcome to The Spice Rack
        </h1>
        <p className="text-lg text-white text-center sm:text-left">
          Join us and spice up your social media experience! 🌶 <br />️
          Don&apos;t be naughty! Not like that!
        </p>

        {!isSignedIn && (
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <button
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              onClick={() => setShowSignUp(true)}
            >
              Sign Up
            </button>
            <button
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 text-white"
              onClick={() => setShowSignIn(true)}
            >
              Sign In
            </button>
          </div>
        )}
      </main>

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="modal modal-open">
          <div className="modal-box">
            <SignUp />
            <div className="modal-action">
              <button className="btn" onClick={() => setShowSignUp(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="modal modal-open">
          <div className="modal-box">
            <SignIn />
            <div className="modal-action">
              <button className="btn" onClick={() => setShowSignIn(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-white">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/about"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          About Us
        </a>
      </footer>
    </div>
  );
}
