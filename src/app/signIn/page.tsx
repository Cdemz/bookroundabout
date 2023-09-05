"use client";
import React, { useState } from "react";

const page: React.FC = () => {
  const [signIn, toggle] = useState<boolean>(true);

  return (
    <div className="bg-white rounded-10 shadow-lg relative overflow-hidden w-ful max-w-full min-h-400">
      <div
        className={`absolute top-0 h-full transition-all duration-600 left-0 w-1/2 ${
          signIn ? "opacity-0" : "opacity-1 z-5 transform translate-x-full"
        }`}
      >
        {/* Sign Up Container */}
        <form className="bg-white flex items-center justify-center flex-col h-full px-50 text-center">
          <h1 className="font-bold m-0">Create Account</h1>
          <input
            type="text"
            placeholder="Name"
            className="bg-eee border-none px-15 py-12 m-8 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-eee border-none px-15 py-12 m-8 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-eee border-none px-15 py-12 m-8 w-full"
          />
          <button className="border-1 border-ff4b2b bg-ff4b2b text-white text-12 font-bold px-45 py-12 uppercase transition-transform transform-80ms ease-in active:scale-95 focus:outline-none">
            Sign Up
          </button>
        </form>
      </div>

      <div
        className={`absolute top-0 h-full transition-all duration-600 left-0 w-1/2 ${
          signIn ? "opacity-1 z-2" : "opacity-0 transform translate-x-full"
        }`}
      >
        {/* Sign In Container */}
        <form className="bg-white flex items-center justify-center flex-col h-full px-50 text-center">
          <h1 className="font-bold m-0">Sign in</h1>
          <input
            type="email"
            placeholder="Email"
            className="bg-eee border-none px-15 py-12 m-8 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-eee border-none px-15 py-12 m-8 w-full"
          />
          <a href="#" className="text-333 text-14 text-decoration-none m-15">
            Forgot your password?
          </a>
          <button className="border-1 border-ff4b2b bg-ff4b2b text-white text-12 font-bold px-45 py-12 uppercase transition-transform transform-80ms ease-in active:scale-95 focus:outline-none">
            Sign In
          </button>
        </form>
      </div>

      <div
        className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 z-100 ${
          signIn ? "transform translate-x-0" : "transform translate-x-(-100%)"
        }`}
      >
        <div
          className={`bg-gradient-to-r from-ff4b2b to-ff416c relative left-(-100%) h-full w-200% transform translate-x-0 transition-transform duration-600 ${
            signIn ? "transform translate-x-50%" : "transform translate-x-0"
          }`}
        >
          <div className="absolute flex items-center justify-center flex-col px-40 text-center h-full w-1/2">
            <h1 className="font-bold">Welcome Back!</h1>
            <p className="text-14 font-100 leading-20 tracking-0.5 m-20 0 30px">
              To keep connected with us please login with your personal info
            </p>
            <button
              onClick={() => toggle(true)}
              className="border-1 border-ff4b2b bg-transparent border-color-ff4b2b text-ff4b2b text-12 font-bold px-45 py-12 uppercase"
            >
              Sign In
            </button>
          </div>
          <div className="absolute right-0 h-full w-1/2 transform translate-x-0">
            <h1 className="font-bold">Hello, Friend!</h1>
            <p className="text-14 font-100 leading-20 tracking-0.5 m-20 0 30px">
              Enter your personal details and start your journey with us
            </p>
            <button
              onClick={() => toggle(false)}
              className="border-1 border-ff4b2b bg-transparent border-color-ff4b2b text-ff4b2b text-12 font-bold px-45 py-12 uppercase"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
