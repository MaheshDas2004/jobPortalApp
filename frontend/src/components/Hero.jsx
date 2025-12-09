import React from 'react'
import { Sparkles, Search, Briefcase, Users, Layers, Zap } from 'lucide-react'
import qt from '../assets/qt.jpeg'

const Hero = ({ jobCategories = [] }) => {
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
              Your Career
              <br />
              <span className="text-gray-300">Starts Here</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto font-medium">
              Join millions of professionals finding their dream jobs. Real opportunities, real growth, real impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 max-w-lg mx-auto">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-black hover:bg-gray-200 transition-all text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                FIND YOUR DREAM JOB
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-black border-2 border-white hover:bg-white hover:text-black transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                EXPLORE JOBS
              </button>
            </div>

            {/* Search Bar in Hero */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-4 sm:p-6 border-2 border-black shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <input type="text" placeholder="Job Title" className="w-full px-3 py-2 sm:py-3 border-2 border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:bg-white text-sm transition-all" />
                  <input type="text" placeholder="Location" className="w-full px-3 py-2 sm:py-3 border-2 border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:bg-white text-sm transition-all" />
                  <select className="w-full px-3 py-2 sm:py-3 border-2 border-gray-300 bg-gray-50 text-gray-900 appearance-none focus:outline-none focus:border-black focus:bg-white text-sm transition-all">
                    <option value="">All Categories</option>
                    {jobCategories.map(cat => <option key={cat.title} value={cat.title}>{cat.title}</option>)}
                  </select>
                  <button className="px-4 py-2 sm:py-3 bg-black text-white font-black hover:bg-gray-900 transition-all text-sm flex items-center justify-center gap-2">
                    <Search className="h-4 w-4" />
                    SEARCH NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Hero