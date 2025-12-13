import React, { useState } from 'react';

export default function ESignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  });



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employer signup:', formData);
    // Here you would call API to create employer account
  };

  return (
    <div className="flex h-screen w-screen fixed inset-0 overflow-hidden">
      {/* Left Side - Image */}
      <div className="w-1/2 relative h-full shrink-0">
        <img
          src="/lgr.jpeg"
          alt="Recruiter Illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black"></div>

        <div className="absolute left-12 bottom-20 z-30 text-left">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
            Hire Matrix
          </h1>
          <p className="mt-3 text-lg text-white max-w-md drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
            Join thousands of recruiters finding top talent on our platform.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-8 h-full overflow-y-auto">
        {/* Main Form Container */}
        <div className="w-full max-w-lg flex flex-col">
          {/* Welcome Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create Recruiter Account</h1>
            <p className="text-sm text-gray-700">Complete your profile after signup</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
                <p className="text-xs font-bold text-gray-600 mt-1">Min. 8 characters with letters and numbers</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-5 h-5 border-2 border-black mt-1"
                />
                <span className="text-xs font-bold text-gray-900">
                  I agree to the Terms of Service and Privacy Policy. Complete your company profile after signup.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-3 px-4 border-2 border-black hover:bg-gray-800 transition-colors uppercase tracking-wide mt-6"
            >
              CREATE ACCOUNT
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-xs font-bold text-gray-900 uppercase">
              Already have an account?{' '}
              <span className="underline cursor-pointer hover:text-gray-600">
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}