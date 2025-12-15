import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SigninSeeker({ setUser }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [friendlyError, setFriendlyError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (isSubmitted) setIsSubmitted(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFriendlyError(null);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData,
        { withCredentials: true } // ✅ HTTP-only cookie ke liye
      );

      // ✅ Backend JWT cookie me set karega
      if (res.data?.user) {
        setUser(res.data.user); // frontend me user state set
      }

      setFormData({ email: "", password: "" });
      setIsSubmitted(true);

      setTimeout(() => {
        // Notify navbar to update just before redirect
        window.dispatchEvent(new Event('authStateChanged'));
        setIsSubmitted(false);
        navigate("/"); // redirect
      }, 1500);
    } catch (err) {
      if (err.response?.data?.message) setFriendlyError(err.response.data.message);
      else setFriendlyError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen fixed inset-0 overflow-hidden">
      {/* Left Side */}
      <div className="w-1/2 relative h-full">
        <img src="/lg.jpeg" alt="" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute left-12 bottom-20 text-white">
          <h1 className="text-4xl font-extrabold drop-shadow-xl">Hire Matrix</h1>
          <p className="mt-3 text-lg drop-shadow-xl">
            Find jobs, track applications, and connect with recruiters.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex items-center justify-center p-8 h-full overflow-y-auto">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-extrabold text-center mb-2">Sign In</h1>
          <p className="text-center text-gray-700 mb-6">Access your job dashboard</p>

          {friendlyError && (
            <div className="bg-red-50 border-2 border-red-500 p-4 mb-4">
              <p className="text-red-700 font-bold text-sm uppercase">{friendlyError}</p>
            </div>
          )}

          {isSubmitted && (
            <div className="bg-green-50 border-2 border-green-500 p-4 mb-4 flex space-x-3">
              <CheckCircle className="text-green-600 h-5 w-5" />
              <div>
                <p className="font-bold text-green-800 text-sm uppercase">Login Successful!</p>
                <p className="text-green-700 text-xs">Redirecting to your dashboard...</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase">Email</label>
              <input
                type="text"
                name="email"
                disabled={loading}
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 bg-gray-100"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs font-bold uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  disabled={loading}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 bg-gray-100 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-bold py-3 border-2 border-black hover:bg-white hover:text-black transition flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-4 text-sm font-bold">
            Don't have an account?{" "}
            <Link to="/cand-signup" className="underline" >Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
