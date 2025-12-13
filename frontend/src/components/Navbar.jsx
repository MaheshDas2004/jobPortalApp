import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import axios from 'axios';
import hmxLogo from '../assets/HMX.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/auth/isloggedin",
        { withCredentials: true }
      );

      if (res.data.isLoggedin) {
        setUser(res.data.user);
      }
    } catch (err) {
      // Silently handle auth check - user is not logged in
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();

    // Listen for auth state changes
    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setShowProfileMenu(false);
      setIsOpen(false);
      
      // Notify other components about logout
      window.dispatchEvent(new Event('authStateChanged'));
      
      navigate('/');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="bg-white border-b-2 border-black sticky top-0 z-50 w-full">
      <div className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 gap-1 sm:gap-2">
            <img 
              src={hmxLogo} 
              alt="Hire Matrix" 
              className="h-8 w-8 sm:h-12 sm:w-12 lg:h-15 lg:w-27 object-contain" 
            />
            <div className="flex flex-col">
              <h1 className="text-base sm:text-xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
                Hire Matrix
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <Link to="/" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap transition-colors">
              Home
            </Link>
            <Link to="/job-portal" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap transition-colors">
              Browse Jobs
            </Link>
            <Link to="/about-us" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap transition-colors">
              About Us
            </Link>
            
            <Link to="/intro" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap transition-colors">
              For Recruiters
            </Link>
          </div>

          {/* Auth Buttons / Profile */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 shrink-0">
            {isLoggedIn ? (
              <div 
                className="relative"
                onMouseEnter={() => setShowProfileMenu(true)}
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                <button 
                  className="flex items-center justify-center w-10 h-10 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors"
                  aria-label="Profile menu"
                >
                  <User className="w-5 h-5" />
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 top-full w-48 bg-white border-2 border-black shadow-lg">
                    <div className="px-4 py-3 border-b-2 border-black">
                      <p className="text-xs text-gray-600 uppercase">Logged in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user?.fullName}</p>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors uppercase"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors uppercase text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/cand-signin" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap px-2 py-2 transition-colors">
                  Sign In
                </Link>
                <Link to='/cand-signup' className="bg-black text-white font-bold py-2 px-4 sm:px-6 border-2 border-black hover:bg-white hover:text-black transition-colors text-xs sm:text-sm uppercase whitespace-nowrap">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1 sm:gap-1.5 p-2 z-50"
            aria-label="Toggle menu"
          >
            <span className={`w-5 sm:w-6 h-0.5 bg-black block transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5 sm:translate-y-2' : ''}`}></span>
            <span className={`w-5 sm:w-6 h-0.5 bg-black block transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 sm:w-6 h-0.5 bg-black block transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5 sm:-translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="mt-4 sm:mt-6 pb-4 sm:pb-6 border-t-2 border-black pt-4 sm:pt-6 space-y-3 sm:space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase transition-colors">
              Home
            </Link>
            <Link to="/job-portal" onClick={() => setIsOpen(false)} className="block text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase transition-colors">
              Browse Jobs
            </Link>
            <Link to="/about-us" onClick={() => setIsOpen(false)} className="block text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase transition-colors">
              About Us
            </Link>
            <Link to="/intro" onClick={() => setIsOpen(false)} className="block text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase transition-colors">
              For Recruiters
            </Link>

            <div className="flex flex-col gap-2 sm:gap-3 pt-3 sm:pt-4 border-t-2 border-black">
              {isLoggedIn ? (
                <>
                  <div className="px-2 py-2 bg-gray-50 border-2 border-black">
                    <p className="text-xs text-gray-600 uppercase">Logged in as</p>
                    <p className="text-sm font-bold text-gray-900">{user?.fullName}</p>
                  </div>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase py-2 transition-colors">
                    <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase py-2 transition-colors text-left">
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/cand-signin" onClick={() => setIsOpen(false)} className="text-center text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase py-2 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/cand-signup" onClick={() => setIsOpen(false)} className="w-full bg-black text-white font-bold py-2 sm:py-3 px-4 sm:px-6 border-2 border-black hover:bg-white hover:text-black transition-colors text-sm sm:text-base uppercase text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}