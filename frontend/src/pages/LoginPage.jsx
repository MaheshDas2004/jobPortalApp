import React from 'react';
import reactLogo from '../assets/react.svg';
import heroGif from '../assets/pp.gif';

export default function LoginPage() {
  // Login logic removed — this page only contains presentational frontend markup.

  return (
    <div className="flex">
      {/* Left Side - Image only with overlay + small yellow logo */}
  {/* ensure a solid yellow background so GIF transparency doesn't show gray underneath */}
  <div className="w-1/2 relative">
        <img
          src={heroGif}
          alt="Illustration GIF"
          className="absolute inset-0 w-full h-full"
        />

        {/* Overlay text on GIF (title + subtitle) */}
        <div className="absolute left-12 bottom-20 z-30 text-left">
          <h1 className="text-4xl font-extrabold text-gray-900">JobTrackPro</h1>
          <p className="mt-3 text-sm text-gray-800 max-w-xs">
            Find jobs, track applications, and connect with recruiters.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-12 relative">
        {/* Top Header */}
        <div className="absolute top-8 right-8 text-right">
          <h2 className="text-3xl font-bold text-gray-900">JobTrackPro</h2>
          <p className="text-sm font-semibold text-gray-600 mt-1">For Job Seekers</p>
        </div>

        {/* Main Form Container */}
        <div className="w-full max-w-xl">
          {/* Welcome Section */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Log in</h1>
            <p className="text-base text-gray-700">Access your job dashboard</p>
          </div>

          {/* Login Form Card */}
          <div className="bg-white p-10 mb-8">
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-5 py-4 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-base"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-4 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-base"
                />
              </div>

              {/* Login Button */}
              <button className="w-full bg-black text-white font-bold py-4 px-6 border-2 border-black hover:bg-white hover:text-black transition-colors text-lg mt-6 uppercase tracking-wide">
                LOG IN
              </button>

              {/* Links */}
              <div className="mt-6 flex justify-between items-center">
                <a href="#" className="text-sm font-bold text-gray-900 hover:underline uppercase">Forgot password?</a>
                <a href="#" className="text-sm font-bold text-gray-900 hover:underline uppercase">Are you a recruiter?</a>
              </div>
            </div>
          </div>

          {/* Sign Up CTA */}
          <div className="bg-white p-6 text-center">
            <p className="text-gray-900 font-bold mb-4 uppercase">New to JobTrackPro?</p>
            <button className="w-full bg-white text-black font-bold py-3 px-6 border-2 border-black hover:bg-black hover:text-white transition-colors uppercase">
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}