import React, { useState } from 'react';
import {
  Search, MapPin, Briefcase, Clock, Building2, Heart, Share2,
  ChevronDown, Filter, Zap, Users, Calendar, CheckCircle2,
  X, Award, TrendingUp
} from 'lucide-react';

const Jobs = () => {
  const [selectedFilters, setSelectedFilters] = useState(['Live']);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdowns, setOpenDropdowns] = useState({
    sortBy: false,
    status: false,
    type: false,
    locations: false,
    timing: false,
    skills: false,
    categories: false
  });

  const filterCategories = [
    {
      title: 'Status',
      options: ['Live', 'Expired', 'Closed', 'Recent'],
      count: 1,
      hasSearch: false
    },
    {
      title: 'Type',
      options: ['In Office', 'Remote', 'Field Work', 'Hybrid'],
      hasSearch: false
    },
    {
      title: 'Locations',
      options: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Gurgaon'],
      hasSearch: true
    },
    {
      title: 'Timing',
      options: ['Full Time', 'Part Time', 'Flexible', 'Contract'],
      hasSearch: false
    },
    {
      title: 'Skills',
      options: ['Communication', 'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Excel'],
      hasSearch: true
    }
  ];

  const jobListings = [
    {
      id: 1,
      title: 'Business Executive',
      company: 'NoBrokerHood',
      logo: '🏢',
      color: 'from-pink-500 to-rose-500',
      experience: 'No prior experience required',
      location: 'Hyderabad, Surat, Mangaluru + 5',
      workType: 'On Field',
      jobType: 'Full Time',
      salary: '₹ 3.5 LPA - 6 LPA',
      tags: ['Client Support', 'Communication Skills', 'Negotiation', '+1'],
      category: 'Fresher',
      postedDate: 'Posted Dec 8, 2025',
      daysLeft: '1 day left',
      applied: 1
    },
    {
      id: 2,
      title: 'Actuarial Risk Consultant',
      company: 'Willis Towers Watson',
      logo: 'wtw',
      color: 'from-purple-500 to-indigo-500',
      experience: 'No prior experience required',
      location: 'Gurgaon',
      workType: 'In Office',
      jobType: 'Full Time',
      salary: '₹ 8 LPA - 12 LPA',
      tags: ['Communication Skills', 'Python', 'R (Programming Language)'],
      category: 'Fresher',
      postedDate: 'Posted Dec 8, 2025',
      daysLeft: '13 days left',
      applied: 13
    },
    {
      id: 3,
      title: 'HR Consulting Analyst',
      company: 'Willis Towers Watson',
      logo: 'wtw',
      color: 'from-blue-500 to-cyan-500',
      experience: 'No prior experience required',
      location: 'Gurgaon',
      workType: 'In Office',
      jobType: 'Full Time',
      salary: '₹ 6 LPA - 10 LPA',
      tags: ['Business Acumen', 'Communication Skills', 'Excel Data Analysis', '+1'],
      category: 'Fresher',
      postedDate: 'Posted Dec 8, 2025',
      daysLeft: '13 days left',
      applied: 13
    },
    {
      id: 4,
      title: 'Apprentice Research Analyst',
      company: 'Factset',
      logo: '📊',
      color: 'from-emerald-500 to-teal-500',
      experience: '0-2 years',
      location: 'Hyderabad',
      workType: 'In Office',
      jobType: 'Full Time',
      salary: '₹ 4 LPA - 7 LPA',
      tags: ['Research', 'Data Analysis', 'Financial Markets'],
      category: 'Fresher',
      postedDate: 'Posted Dec 7, 2025',
      daysLeft: '2 days left',
      applied: 24
    }
  ];

  const featuredOpportunities = [
    {
      id: 1,
      title: "PPIs At L'Oréal + Intrapreneurship & International Recognition",
      logo: '🎯',
      color: 'bg-indigo-600'
    },
    {
      id: 2,
      title: 'Win Cash Prizes + PPIs With Asian Paints!',
      logo: '🎨',
      color: 'bg-pink-600'
    },
    {
      id: 3,
      title: 'Executive / Assistant Manager Hiring',
      logo: '💼',
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      title: 'Unstop Career League 2025',
      logo: '🏆',
      color: 'bg-purple-600'
    },
    {
      id: 5,
      title: 'Hero Campus Challenge Season 10: PPIs & Prizes Worth ₹25 Lakhs',
      logo: '🏍️',
      color: 'bg-red-600'
    },
    {
      id: 6,
      title: 'Novartis NEST 2.0: Grab PPIs And Cash Prize Worth 75 Lakhs',
      logo: '💊',
      color: 'bg-blue-600'
    },
    {
      id: 7,
      title: "Atharva 2026: The 39th Edition – Where The Dawn Ignites Every Star",
      logo: '⭐',
      color: 'bg-orange-600'
    },
    {
      id: 8,
      title: 'Nation With Namo NationBuilding Case Competition Season 3',
      logo: '🇮🇳',
      color: 'bg-green-600'
    }
  ];

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const toggleFilter = (filter) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content - Fixed Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 xl:gap-8" style={{ height: 'calc(100vh - 6rem)' }}>
          {/* Sidebar Filters - Fixed but scrollable */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0 overflow-y-auto bg-white border-2 border-black"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', maxHeight: '100%' }}>
            <div className="p-4 sm:p-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black">All Filters</h2>
                  <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">
                    {selectedFilters.length}
                  </span>
                </div>
                <button className="text-sm font-bold hover:underline">
                  Clear All
                </button>
              </div>

              {/* Quick Apply Button */}
              <button className="w-full py-3 bg-gray-100 border-2 border-gray-300 text-black font-black text-sm hover:border-black transition mb-6 flex items-center justify-center gap-2">
                <Zap className="h-4 w-4" strokeWidth={2.5} />
                Quick Apply
              </button>

              {/* Sort By */}
              <div className="mb-6 pb-6 border-b-2 border-gray-200">
                <button 
                  onClick={() => toggleDropdown('sortBy')}
                  className="w-full flex items-center justify-between text-sm font-black mb-3"
                >
                  <span>Sort By</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${openDropdowns.sortBy ? 'rotate-180' : ''}`} 
                    strokeWidth={2.5} 
                  />
                </button>
                {openDropdowns.sortBy && (
                  <div className="space-y-2 mt-3">
                    {['Most Recent', 'Most Applied', 'Ending Soon', 'Salary: High to Low'].map((option, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <div className="w-5 h-5 border-2 border-black flex items-center justify-center bg-white">
                        </div>
                        <span className="text-sm font-semibold group-hover:underline">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Categories */}
              {filterCategories.map((category, idx) => (
                <div
                  key={idx}
                  className={`mb-6 ${idx !== filterCategories.length - 1 ? 'pb-6 border-b-2 border-gray-200' : ''}`}
                >
                  <button 
                    onClick={() => toggleDropdown(category.title.toLowerCase())}
                    className="w-full flex items-center justify-between text-sm font-black mb-4"
                  >
                    <div className="flex items-center gap-2">
                      <span>{category.title}</span>
                      {category.count && (
                        <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">
                          {category.count}
                        </span>
                      )}
                    </div>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform ${openDropdowns[category.title.toLowerCase()] ? 'rotate-180' : ''}`} 
                      strokeWidth={2.5} 
                    />
                  </button>

                  {/* Filter Options */}
                  {openDropdowns[category.title.toLowerCase()] && (
                    <div className="space-y-2">
                      {/* Search for Locations and Skills */}
                      {category.hasSearch && (
                        <div className="relative mb-3">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" strokeWidth={2.5} />
                          <input
                            type="text"
                            placeholder={`Search ${category.title}`}
                            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 focus:border-black outline-none text-sm font-semibold"
                          />
                        </div>
                      )}
                      
                      {category.options.map((option, optIdx) => (
                        <label
                          key={optIdx}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <div
                            className={`w-5 h-5 border-2 border-black flex items-center justify-center ${
                              selectedFilters.includes(option) ? 'bg-black' : 'bg-white'
                            }`}
                          >
                            {selectedFilters.includes(option) && (
                              <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={3} />
                            )}
                          </div>
                          <span className="text-sm font-semibold group-hover:underline">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Categories Section */}
              <div className="mb-6">
                <button 
                  onClick={() => toggleDropdown('categories')}
                  className="w-full flex items-center justify-between text-sm font-black mb-4"
                >
                  <span>Categories</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${openDropdowns.categories ? 'rotate-180' : ''}`} 
                    strokeWidth={2.5} 
                  />
                </button>

                {openDropdowns.categories && (
                  <>
                    {/* Search Categories */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" strokeWidth={2.5} />
                      <input
                        type="text"
                        placeholder="Search Categories"
                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 focus:border-black outline-none text-sm font-semibold"
                      />
                    </div>

                    {/* Suggestions */}
                    <div className="mb-3">
                      <p className="text-xs font-bold text-gray-600 mb-2">Suggestions</p>
                      <div className="flex flex-wrap gap-2">
                        {['Accounting & Taxation', 'Administration', 'Administration & Staff'].map((tag, idx) => (
                          <button
                            key={idx}
                            className="px-3 py-1.5 bg-white border-2 border-gray-300 hover:border-black text-xs font-bold transition"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area - Primary scroll area */}
          <div className="flex-1 min-w-0 overflow-y-auto bg-gray-50"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', maxHeight: '100%' }}>
            {/* Job Listings */}
            <div className="space-y-4 pb-6">{jobListings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Logo */}
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-linear-to-br ${job.color} flex items-center justify-center border-2 border-black mx-auto sm:mx-0`}>
                        {job.logo === 'wtw' ? (
                          <span className="text-white font-black text-xl">wtw</span>
                        ) : (
                          <span className="text-4xl">{job.logo}</span>
                        )}
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-black mb-1 group-hover:underline cursor-pointer wrap-break-words">
                              {job.title}
                            </h3>
                            <p className="text-sm font-bold text-gray-600">{job.company}</p>
                          </div>
                          <div className="flex gap-2 sm:shrink-0">
                            <button
                              onClick={() => toggleSaveJob(job.id)}
                              className="p-2 border-2 border-gray-300 hover:border-black transition"
                            >
                              <Heart
                                className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-black' : ''}`}
                                strokeWidth={2.5}
                              />
                            </button>
                            <button className="p-2 border-2 border-gray-300 hover:border-black transition">
                              <Share2 className="h-5 w-5" strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>

                        {/* Job Meta Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                            <Briefcase className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                            <span className="truncate">{job.experience}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                            <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                            <span className="truncate">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                            <Building2 className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                            <span className="truncate">{job.workType}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                            <Clock className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                            <span className="truncate">{job.jobType}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 border border-gray-300 text-xs font-bold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Category Badge */}
                        <div className="inline-block px-3 py-1 bg-gray-200 border border-gray-400 text-xs font-bold mb-4">
                          {job.category}
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t-2 border-gray-200 gap-3">
                          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                            <div>
                              <span className="font-semibold text-gray-600">{job.postedDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-600 shrink-0" strokeWidth={2.5} />
                              <span className="font-bold text-blue-600">{job.daysLeft}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-blue-600 shrink-0" strokeWidth={2.5} />
                              <span className="font-bold text-blue-600">{job.applied} Applied</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-green-600">{job.salary}</span>
                            <span className="text-green-600">💰</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Sidebar - Fixed but scrollable if needed */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0 overflow-y-auto bg-blue-50 border-2 border-black"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', maxHeight: '100%' }}>
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-black mb-4">Featured</h3>
              <div className="space-y-3">
                {featuredOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="bg-white border-2 border-black p-3 sm:p-4 hover:shadow-lg transition cursor-pointer group"
                  >
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${opp.color} flex items-center justify-center text-xl sm:text-2xl shrink-0 border-2 border-black`}>
                        {opp.logo}
                      </div>
                      <p className="text-xs font-bold leading-tight group-hover:underline">
                        {opp.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;