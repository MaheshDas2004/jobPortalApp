import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import UseFetch from '../../hooks/UseFetch';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  // Custom Hook
  const { fetchData, loading: apiLoading, error: friendlyError } = UseFetch({
    url: "http://localhost:3000/api/auth/signup",
    method: "POST"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be 6+ characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const result = await fetchData({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });

    if (result) {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="flex h-screen w-screen fixed inset-0 overflow-hidden">

      <div className="w-1/2 relative h-full">
        <img src="/mr.jpeg" alt="" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute left-12 bottom-20 text-white">
          <h1 className="text-4xl font-extrabold drop-shadow-xl">Hire Matrix</h1>
          <p className="mt-3 text-lg drop-shadow-xl">
            Find your dream job and track applications with ease.
          </p>
        </div>
      </div>

      <div className="w-1/2 bg-white flex items-center justify-center p-8 h-full overflow-y-auto">
        <div className="w-full max-w-lg">

          <h1 className="text-3xl font-extrabold text-center mb-2">Sign up</h1>
          <p className="text-center text-gray-700 mb-6">Create your job seeker account</p>

          {/* Friendly API Error */}
          {friendlyError && (
            <div className="bg-red-50 border-2 border-red-500 p-4 mb-4">
              <p className="text-red-700 font-bold text-sm uppercase">
                {friendlyError}
              </p>
            </div>
          )}

          {/* Success Message */}
          {isSubmitted && (
            <div className="bg-green-50 border-2 border-green-500 p-4 mb-4 flex space-x-3">
              <CheckCircle className="text-green-600 h-5 w-5" />
              <div>
                <p className="font-bold text-green-800 text-sm uppercase">
                  Account Created Successfully!
                </p>
                <p className="text-green-700 text-xs">
                  Welcome to Hire Matrix. You can now sign in.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="text-xs font-bold uppercase">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={apiLoading}
                className="w-full px-4 py-3 border-2 bg-gray-100"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold uppercase">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={apiLoading}
                className="w-full px-4 py-3 border-2 bg-gray-100"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={apiLoading}
                  className="w-full px-4 py-3 border-2 bg-gray-100 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-bold uppercase">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={apiLoading}
                  className="w-full px-4 py-3 border-2 bg-gray-100 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                disabled={apiLoading}
                className="h-4 w-4 border-2"
              />
              <label className="text-xs font-bold uppercase cursor-pointer">
                I agree to the Terms & Privacy Policy
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-red-500 text-xs mt-1 ml-7">{errors.agreeTerms}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={apiLoading}
              className="w-full bg-black text-white font-bold py-3 border-2 border-black hover:bg-white hover:text-black transition flex items-center justify-center space-x-2"
            >
              {apiLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

          </form>

          <p className="text-center mt-4 text-sm font-bold">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;