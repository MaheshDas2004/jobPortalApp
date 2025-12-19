import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, LogOut, LayoutDashboard, Briefcase } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Sidebar from './Sidebar'
import hmxLogo from '../assets/HMX.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const navigate = useNavigate();
  
  const { user, userType, isLoggedIn, isEmployer, isCandidate, logout } = useAuth();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setShowProfileSidebar(false);
      setIsOpen(false);
      navigate('/');
    }
  };

  // Disable/enable scrolling when sidebar is open/closed
  useEffect(() => {
    if (showProfileSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showProfileSidebar]);

  const toggleProfileSidebar = () => {
    setShowProfileSidebar(!showProfileSidebar);
  };

  return (
    <nav className="bg-white border-b-2 border-black sticky top-0 z-50 w-full">
      <div className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
        <div className="flex justify-between items-center">
          {/* Logo - conditional redirect based on user type */}
          <Link 
            to={isEmployer ? "/employer-dashboard" : "/"} 
            className="flex items-center shrink-0 gap-1 sm:gap-2"
          >
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

          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {/* Show Home only for candidates or non-logged-in users */}
            {(!isLoggedIn || isCandidate) && (
              <Link to="/" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap transition-colors">
                Home
              </Link>
            )}
            <Link to="/about-us" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap transition-colors">
              About Us
            </Link>
            
            {!isLoggedIn && (
              <>
                <Link to="/job-portal" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap transition-colors">
                  Browse Jobs
                </Link>
                <Link to="/intro" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap transition-colors">
                  For Recruiters
                </Link>
              </>
            )}
            
            {isCandidate && (
              <Link to="/job-portal" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap transition-colors">
                Browse Jobs
              </Link>
            )}
            
            {isEmployer && (
              <>
                <Link to="/post-job" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap transition-colors">
                  Post Job
                </Link>
                <Link to="/employer-dashboard" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap transition-colors">
                  Dashboard
                </Link>
              </>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-2 xl:gap-4 shrink-0">
            {isLoggedIn ? (
              <button 
                onClick={toggleProfileSidebar}
                className="flex items-center justify-center w-10 h-10 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex gap-2">
                <div className="relative group">
                  <button className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap px-2 py-2 transition-colors">
                    Sign In ▼
                  </button>
                  <div className="absolute right-0 top-full w-48 bg-white border-2 border-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/cand-signin" className="block px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors uppercase">
                      Candidate Login
                    </Link>
                    <Link to="/emp-signin" className="block px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors uppercase border-t border-gray-200">
                      Employer Login
                    </Link>
                  </div>
                </div>
                <div className="relative group">
                  <button className="bg-black text-white font-bold py-2 px-4 sm:px-6 border-2 border-black hover:bg-white hover:text-black transition-colors text-xs sm:text-sm uppercase whitespace-nowrap">
                    Sign Up ▼
                  </button>
                  <div className="absolute right-0 top-full w-48 bg-white border-2 border-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/cand-signup" className="block px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors uppercase">
                      Join as Candidate
                    </Link>
                    <Link to="/emp-signup" className="block px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors uppercase border-t border-gray-200">
                      Join as Employer
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

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
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="mt-4 sm:mt-6 pb-4 sm:pb-6 border-t-2 border-black pt-4 sm:pt-6 space-y-3 sm:space-y-4">
            {/* Common Links */}
            {/* Show Home only for candidates or non-logged-in users */}
            {(!isLoggedIn || isCandidate) && (
              <Link to="/" onClick={() => setIsOpen(false)} className="block text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase transition-colors">
                Home
              </Link>
            )}
            <Link to="/about-us" onClick={() => setIsOpen(false)} className="block text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase transition-colors">
              About Us
            </Link>
            
            {/* Role-based Links */}
            {!isLoggedIn && (
              <>
                <Link to="/job-portal" onClick={() => setIsOpen(false)} className="block text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase transition-colors">
                  Browse Jobs
                </Link>
                <Link to="/intro" onClick={() => setIsOpen(false)} className="block text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase transition-colors">
                  For Recruiters
                </Link>
              </>
            )}
            
            {isCandidate && (
              <Link to="/job-portal" onClick={() => setIsOpen(false)} className="block text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase transition-colors">
                Browse Jobs
              </Link>
            )}
            
            {isEmployer && (
              <>
                <Link to="/post-job" onClick={() => setIsOpen(false)} className="block text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase transition-colors">
                  Post Job
                </Link>
                <Link to="/employer-dashboard" onClick={() => setIsOpen(false)} className="block text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase transition-colors">
                  Dashboard
                </Link>
              </>
            )}

            <div className="flex flex-col gap-2 sm:gap-3 pt-3 sm:pt-4 border-t-2 border-black">
              {isLoggedIn ? (
                <>
                  <div className="px-2 py-2 bg-gray-50 border-2 border-black">
                    <p className="text-xs text-gray-600 uppercase">
                      {isEmployer ? 'Employer' : 'Candidate'}
                    </p>
                    <p className="text-sm font-bold text-gray-900">{user?.fullName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  
                  <Link 
                    to={isEmployer ? "/employer-dashboard" : "/candidate-dashboard"} 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center gap-3 text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase py-2 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                    Dashboard
                  </Link>
                  
                  {isEmployer && (
                    <Link to="/post-job" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase py-2 transition-colors">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                      Post Job
                    </Link>
                  )}
                  
                  <button onClick={handleLogout} className="flex items-center gap-3 text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase py-2 transition-colors text-left">
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 uppercase font-bold">Sign In As:</p>
                    <Link to="/cand-signin" onClick={() => setIsOpen(false)} className="block text-center text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase py-2 border border-gray-300 transition-colors">
                      Candidate
                    </Link>
                    <Link to="/emp-signin" onClick={() => setIsOpen(false)} className="block text-center text-sm sm:text-base font-bold text-gray-900 hover:text-gray-600 uppercase py-2 border border-gray-300 transition-colors">
                      Employer
                    </Link>
                  </div>
                  <div className="space-y-2 mt-4">
                    <p className="text-xs text-gray-600 uppercase font-bold">Join As:</p>
                    <Link to="/cand-signup" onClick={() => setIsOpen(false)} className="block w-full bg-black text-white font-bold py-2 sm:py-3 px-4 sm:px-6 border-2 border-black hover:bg-white hover:text-black transition-colors text-sm sm:text-base uppercase text-center">
                      Candidate
                    </Link>
                    <Link to="/emp-signup" onClick={() => setIsOpen(false)} className="block w-full bg-gray-800 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 border-2 border-gray-800 hover:bg-white hover:text-gray-800 transition-colors text-sm sm:text-base uppercase text-center">
                      Employer
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Sidebar Overlay */}
      {showProfileSidebar && (
        <>
          {/* Shadow overlay */}
          <div 
            className="fixed inset-0  bg-black/75 z-45"
            onClick={() => setShowProfileSidebar(false)}
          />
          
          {/* Sidebar */}
          <div className="z-50">
            <Sidebar 
              isOpen={showProfileSidebar}
              onClose={() => setShowProfileSidebar(false)}
              user={user}
              isEmployer={isEmployer}
              isCandidate={isCandidate}
              onLogout={handleLogout}
            />
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbar