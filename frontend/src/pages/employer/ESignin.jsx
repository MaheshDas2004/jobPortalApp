import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ESignin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlechange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/employee/signin", formData, {
        withCredentials: true
      });

      if (res.data?.user) {
        // Store user type for AuthContext
        localStorage.setItem('userType', 'employee');
        
        // Update auth context with user data
        login(res.data.user, 'employee');
        
        setIsSubmitted(true);

        setTimeout(() => {
          navigate("/"); // redirect to home page
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signin failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
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

          {error && (
            <div className="bg-red-50 border-2 border-red-500 p-4 mb-4">
              <p className="text-red-700 font-bold text-sm uppercase">{error}</p>
            </div>
          )}

          {isSubmitted && (
            <div className="bg-green-50 border-2 border-green-500 p-4 mb-4 flex space-x-3">
              <CheckCircle className="text-green-600 h-5 w-5" />
              <div>
                <p className="font-bold text-green-800 text-sm uppercase">Login Successful!</p>
                <p className="text-green-700 text-xs">Redirecting to dashboard...</p>
              </div>
            </div>
          )}

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
                  disabled={loading || isSubmitted}
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
                  disabled={loading || isSubmitted}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-black bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white font-mono text-sm"
                />
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || isSubmitted}
                className="w-full bg-black text-white font-bold py-3 px-4 border-2 border-black hover:bg-white hover:text-black transition-colors text-base mt-4 uppercase tracking-wide disabled:opacity-50"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </button>

              {/* Links */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-900 hover:underline uppercase cursor-pointer">Forgot password?</span>
                <Link to="/" className="text-xs font-bold text-gray-900 hover:underline uppercase cursor-pointer">Are you a job seeker?</Link>
              </div>
            </div>
          </div>

          {/* Sign Up CTA */}
          <div className="bg-white p-3 text-center">
            <p className="text-gray-900 font-bold mb-2 uppercase text-sm">New to Hire Matrix?</p>
            <Link to="/emp-signup" className="w-full bg-white text-black font-bold py-2 px-4 border-2 border-black hover:bg-black hover:text-white transition-colors uppercase text-sm inline-block">
              Create Recruiter Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}