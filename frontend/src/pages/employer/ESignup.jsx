import React, { useState } from 'react';

export default function ESignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
    companyLocation: "",
    jobTitle: "",
    department: "",
    yearsOfExperience: "",
    linkedinProfile: "",
    termsAccepted: false
  });

  const [currentStep, setCurrentStep] = useState(1);

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees"
  ];

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
    "Manufacturing",
    "Consulting",
    "Other"
  ];

  const experienceLevels = [
    "Less than 1 year",
    "1-3 years",
    "3-5 years",
    "5-10 years",
    "10+ years"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
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
      <div className="w-1/2 bg-white flex flex-col items-center p-8 h-full overflow-y-auto">
        {/* Progress Indicator */}
        <div className="w-full max-w-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-10 h-10 border-2 font-black ${
                  currentStep >= step ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? 'bg-black' : 'bg-gray-300'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between text-xs font-bold uppercase">
            <span>Personal</span>
            <span>Company</span>
            <span>Details</span>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="w-full max-w-lg flex flex-col">
          {/* Welcome Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create Recruiter Account</h1>
            <p className="text-sm text-gray-700">Start hiring top talent today</p>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
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
          )}

          {/* Step 2: Company Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Acme Corporation"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Company Website</label>
                <input
                  type="url"
                  name="companyWebsite"
                  placeholder="https://company.com"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Company Size *</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 focus:outline-none focus:bg-white font-mono text-sm"
                >
                  <option value="">Select company size</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Industry *</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 focus:outline-none focus:bg-white font-mono text-sm"
                >
                  <option value="">Select industry</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Company Location *</label>
                <input
                  type="text"
                  name="companyLocation"
                  placeholder="Mumbai, India"
                  value={formData.companyLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>
            </div>
          )}

          {/* Step 3: Recruiter Details */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Your Job Title *</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="e.g., HR Manager, Talent Acquisition Lead"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Department</label>
                <input
                  type="text"
                  name="department"
                  placeholder="e.g., Human Resources"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">Years of Recruiting Experience *</label>
                <select
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 focus:outline-none focus:bg-white font-mono text-sm"
                >
                  <option value="">Select experience</option>
                  {experienceLevels.map(exp => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1 uppercase">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedinProfile"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedinProfile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
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
                    I agree to the Terms of Service and Privacy Policy. I understand that my company information will be verified.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="flex-1 bg-white text-black font-bold py-3 px-4 border-2 border-black hover:bg-gray-100 transition-colors uppercase tracking-wide"
              >
                BACK
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="flex-1 bg-black text-white font-bold py-3 px-4 border-2 border-black hover:bg-gray-800 transition-colors uppercase tracking-wide"
              >
                NEXT
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 bg-black text-white font-bold py-3 px-4 border-2 border-black hover:bg-gray-800 transition-colors uppercase tracking-wide"
              >
                CREATE ACCOUNT
              </button>
            )}
          </div>

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