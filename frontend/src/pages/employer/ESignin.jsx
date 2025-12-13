import React, { useState } from 'react';

export default function ESignin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handlechange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
  }

  return (
    <div className="flex h-screen w-screen fixed inset-0 overflow-hidden">
      {/* Left Side - Image/GIF */}
      <div className="w-1/2 relative h-full shrink-0">
        <img
          src="/lgr.jpeg"
          alt="Recruiter Illustration"
          className="w-full h-full "
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black"></div>

        {/* Overlay text on image */}
        <div className="absolute left-12 bottom-20 z-30 text-left">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">Hire Matrix</h1>
          <p className="mt-3 text-lg text-white max-w-s drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
            Find top talent, manage candidates, and build your team.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-8 h-full overflow-y-auto">
        {/* Main Form Container */}
        <div className="w-full max-w-lg flex flex-col justify-center">
          {/* Welcome Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Recruiter Sign In</h1>
            <p className="text-sm text-gray-700">Access your recruiter dashboard</p>
          </div>

          {/* Login Form Card */}
          <div className="bg-white p-4 mb-4">
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handlechange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handlechange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              {/* Sign In Button */}
              <button 
                onClick={handleSubmit}
                className="w-full bg-black text-white font-bold py-3 px-4 border-2 border-black hover:bg-white hover:text-black transition-colors text-base mt-4 uppercase tracking-wide"
              >
                SIGN IN
              </button>

              {/* Links */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-900 hover:underline uppercase cursor-pointer">Forgot password?</span>
                <span className="text-xs font-bold text-gray-900 hover:underline uppercase cursor-pointer">Are you a job seeker?</span>
              </div>
            </div>
          </div>

          {/* Sign Up CTA */}
          <div className="bg-white p-3 text-center">
            <p className="text-gray-900 font-bold mb-2 uppercase text-sm">New to Hire Matrix?</p>
            <button className="w-full bg-white text-black font-bold py-2 px-4 border-2 border-black hover:bg-black hover:text-white transition-colors uppercase text-sm">
              Create Recruiter Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}