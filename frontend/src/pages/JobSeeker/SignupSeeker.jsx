import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import hmxLogo from '../../assets/HMX.png';

const SignupSeeker = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="flex h-screen w-screen fixed inset-0 overflow-hidden">
      {/* Left Side - Image/GIF */}
      <div className="w-1/2 relative h-full shrink-0">
        <img
          src="/mr.jpeg"
          alt="Job Seeker Illustration"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black"></div>

        {/* Overlay text on image */}
        <div className="absolute left-12 bottom-20 z-30 text-left">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">Hire Matrix</h1>
          <p className="mt-3 text-lg text-white max-w-s drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
            Find your dream job and track applications with ease.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-8 h-full overflow-y-auto">
        {/* Main Form Container */}
        <div className="w-full max-w-lg flex flex-col justify-center">
          {/* Welcome Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Sign up</h1>
            <p className="text-sm text-gray-700">Create your job seeker account</p>
          </div>

          {/* Signup Form Card */}
          <div className="bg-white p-4 mb-4">
            <div className="space-y-4">
              {/* Full Name Field */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3 pt-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  id="agreeTerms"
                  className="h-4 w-4 border-2 border-black mt-0.5 cursor-pointer accent-black shrink-0"
                />
                <label htmlFor="agreeTerms" className="text-xs font-bold text-gray-900 cursor-pointer leading-tight uppercase">
                  I agree to the{' '}
                  <span className="underline hover:text-gray-600 transition cursor-pointer">
                    Terms & Conditions
                  </span>{' '}
                  and{' '}
                  <span className="underline hover:text-gray-600 transition cursor-pointer">
                    Privacy Policy
                  </span>
                </label>
              </div>

              {/* Signup Button */}
              <button 
                onClick={handleSubmit}
                className="w-full bg-black text-white font-bold py-3 px-4 border-2 border-black hover:bg-white hover:text-black transition-colors text-base mt-4 uppercase tracking-wide"
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Login CTA */}
          <div className="bg-white p-3 text-center">
            <p className="text-gray-900 font-bold mb-2 uppercase text-sm">Already have an account?</p>
            <a href="/login" className="w-full bg-white text-black font-bold py-2 px-4 border-2 border-black hover:bg-black hover:text-white transition-colors uppercase text-sm inline-block">
              Login Here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSeeker;