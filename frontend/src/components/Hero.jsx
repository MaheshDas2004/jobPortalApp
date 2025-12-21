import React from 'react'
import { Sparkles, Search, Briefcase, Users, Layers, Zap } from 'lucide-react'
import qt from '../assets/qt.jpeg'
import { useAuth } from '../context/AuthContext'

const Hero = ({ jobCategories = [] }) => {
  const { user, userType, isLoggedIn, isEmployer, isCandidate } = useAuth();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <img
            src={qt}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black"></div>
        </div>
        
        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-16 sm:py-24 md:py-32 lg:py-40">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <Sparkles className="h-4 w-4 animate-spin-slow inline mr-2" />
              50,000+ LIVE OPPORTUNITIES
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-none tracking-tighter">
              {isEmployer ? (
                <>
                  Find Top
                  <br />
                  <span className="text-gray-300">Talent Fast</span>
                </>
              ) : isCandidate ? (
                <>
                  Welcome Back,
                  <br />
                  <span className="text-gray-300">{user?.fullName?.split(' ')[0]}</span>
                </>
              ) : (
                <>
                  Your Career
                  <br />
                  <span className="text-gray-300">Starts Here</span>
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto font-medium">
              {isEmployer ? (
                "Connect with skilled professionals and build your dream team. Post jobs, review applications, and hire faster than ever."
              ) : isCandidate ? (
                "Ready to take the next step in your career? Discover personalized job recommendations and apply with confidence."
              ) : (
                "Join millions of professionals finding their dream jobs. Real opportunities, real growth, real impact."
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 max-w-lg mx-auto">
              {isEmployer ? (
                <>
                  <a href="/post-job" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-black hover:bg-gray-200 transition-all text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl">
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                    POST A JOB
                  </a>
                  <a href="/employer-dashboard" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-black border-2 border-white hover:bg-white hover:text-black transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                    MY DASHBOARD
                  </a>
                </>
              ) : isCandidate ? (
                <>
                  <a href="/job-portal" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-black hover:bg-gray-200 transition-all text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl">
                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    BROWSE JOBS
                  </a>
                  <a href="/jobs/applied" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-black border-2 border-white hover:bg-white hover:text-black transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                    MY APPLICATIONS
                  </a>
                </>
              ) : (
                <>
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-black hover:bg-gray-200 transition-all text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl">
                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    FIND YOUR DREAM JOB
                  </button>
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-black border-2 border-white hover:bg-white hover:text-black transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                    EXPLORE JOBS
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero