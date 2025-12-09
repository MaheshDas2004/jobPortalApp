import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import hmxLogo from '../assets/HMX.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b-2 border-black sticky top-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-6 py-1">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <img src={hmxLogo} alt="Hire Matrix" className="lg:h-15 lg:w-27 sm:h-12 sm:w-12" />
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">Hire Matrix</h1>
              {/* <p className="hidden sm:block text-xs font-semibold text-gray-600 uppercase">Career Platform</p> */}
            </div>
          </div>

          {/* Desktop Menu - Hidden on mobile, shown on md and up */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <Link to="/" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap">Home</Link>
            <Link to="/job-portal" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap">Browse Jobs</Link>
            <Link to="/about-us"className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap">About Us</Link>
            <Link to="/intro" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap">For Recruiters</Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 shrink-0">
            <Link to="/login" className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 hover:text-gray-600 uppercase whitespace-nowrap px-2 py-2">
              Sign In
            </Link>
            <Link to='/signup-seeker' className="bg-black text-white font-bold py-2 px-4 sm:px-6 border-2 border-black hover:bg-white hover:text-black transition-colors text-xs sm:text-sm uppercase whitespace-nowrap">
              Sign Up
            </Link>
          </div>

          {/* Mobile/Tablet Menu Button - Shown on screens smaller than lg */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-black block transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black block ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black block transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile/Tablet Menu */}
        {isOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t-2 border-black pt-6 space-y-4 animate-in">
            <a href="#" className="block text-sm font-bold text-gray-900 hover:text-gray-600 uppercase">Home</a>
            <a href="#" className="block text-sm font-bold text-gray-900 hover:text-gray-600 uppercase">Browse Jobs</a>
            <a href="#" className="block text-sm font-bold text-gray-900 hover:text-gray-600 uppercase">My Applications</a>
            <a href="#" className="block text-sm font-bold text-gray-900 hover:text-gray-600 uppercase">For Recruiters</a>
            <div className="flex flex-col gap-3 pt-4">
              <button className="text-sm font-bold text-gray-900 hover:text-gray-600 uppercase">
                Sign In
              </button>
              <button className="w-full bg-black text-white font-bold py-2 px-6 border-2 border-black hover:bg-white hover:text-black transition-colors text-sm uppercase">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
