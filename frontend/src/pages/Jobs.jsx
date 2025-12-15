import React, { useState } from 'react';
import {
  Search, MapPin, Briefcase, Clock, Building2, Heart, Share2,
  ChevronDown, Filter, Zap, Users, Calendar, CheckCircle2,
  X, Award, TrendingUp, Menu
} from 'lucide-react';

const Jobs = () => {
  const [selectedFilters, setSelectedFilters] = useState(['Live']);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({
    sortBy: false,
    status: false,
    type: false,
    locations: false,
    timing: false,
    skills: false,
    categories: false
  });

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

  const FiltersSidebar = ({ isMobile = false }) => (
    <div className="h-full bg-white border-2 border-black flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8" style={{ scrollbarWidth: 'thin' }}>
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-base md:text-lg font-black">All Filters</h2>
            <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">
              {selectedFilters.length}
            </span>
          </div>
          <button className="text-xs md:text-sm font-bold hover:underline">
            Clear All
          </button>
        </div>

        {/* Quick Apply Button */}
        <button className="w-full py-2.5 md:py-3 bg-gray-100 border-2 border-gray-300 text-black font-black text-xs md:text-sm hover:border-black transition mb-6 flex items-center justify-center gap-2">
          <Zap className="h-4 w-4" strokeWidth={2.5} />
          Quick Apply
        </button>

        {/* Sort By */}
        <div className="mb-6 pb-6 border-b-2 border-gray-200">
          <button 
            onClick={() => toggleDropdown('sortBy')}
            className="w-full flex items-center justify-between text-xs md:text-sm font-black mb-3"
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
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-black flex items-center justify-center bg-white shrink-0">
                  </div>
                  <span className="text-xs md:text-sm font-semibold group-hover:underline">
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
              className="w-full flex items-center justify-between text-xs md:text-sm font-black mb-4"
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

            {openDropdowns[category.title.toLowerCase()] && (
              <div className="space-y-2">
                {category.hasSearch && (
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" strokeWidth={2.5} />
                    <input
                      type="text"
                      placeholder={`Search ${category.title}`}
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 focus:border-black outline-none text-xs md:text-sm font-semibold"
                    />
                  </div>
                )}
                
                {category.options.map((option, optIdx) => (
                  <label
                    key={optIdx}
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => toggleFilter(option)}
                  >
                    <div
                      className={`w-4 h-4 md:w-5 md:h-5 border-2 border-black flex items-center justify-center shrink-0 ${
                        selectedFilters.includes(option) ? 'bg-black' : 'bg-white'
                      }`}
                    >
                      {selectedFilters.includes(option) && (
                        <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-xs md:text-sm font-semibold group-hover:underline">
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
            className="w-full flex items-center justify-between text-xs md:text-sm font-black mb-4"
          >
            <span>Categories</span>
            <ChevronDown 
              className={`h-4 w-4 transition-transform ${openDropdowns.categories ? 'rotate-180' : ''}`} 
              strokeWidth={2.5} 
            />
          </button>

          {openDropdowns.categories && (
            <>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" strokeWidth={2.5} />
                <input
                  type="text"
                  placeholder="Search Categories"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 focus:border-black outline-none text-xs md:text-sm font-semibold"
                />
              </div>

              <div className="mb-3">
                <p className="text-xs font-bold text-gray-600 mb-2">Suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {['Accounting & Taxation', 'Administration', 'Administration & Staff'].map((tag, idx) => (
                    <button
                      key={idx}
                      className="px-2 md:px-3 py-1 md:py-1.5 bg-white border-2 border-gray-300 hover:border-black text-xs font-bold transition"
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
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 md:mb-4 leading-tight">
              Browse All
              <span className="bg-white text-black px-3 md:px-4 py-1 inline-block transform -skew-x-6 ml-2 md:ml-3">
                Jobs
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 font-medium">
              Discover thousands of opportunities and find the perfect job for your career!
            </p>
          </div>
        </div>
      </header>

      {/* Mobile Filter Button */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b-2 border-black px-4 py-3">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-black text-white font-black text-sm"
        >
          <Filter className="h-4 w-4" strokeWidth={2.5} />
          Filters ({selectedFilters.length})
        </button>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white">
            <div className="flex items-center justify-between p-4 border-b-2 border-black">
              <h2 className="text-lg font-black">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="h-6 w-6" strokeWidth={2.5} />
              </button>
            </div>
            <div className="h-[calc(100%-4rem)] overflow-y-auto">
              <FiltersSidebar isMobile={true} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Desktop Layout */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 xl:w-96 shrink-0">
            <div className="sticky top-4" style={{ height: 'calc(100vh - 2rem)' }}>
              <FiltersSidebar />
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1 min-w-0">
            <div className="space-y-4 md:space-y-6">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className="p-3 sm:p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      {/* Logo */}
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 bg-linear-to-br ${job.color} flex items-center justify-center border-2 border-black mx-auto sm:mx-0`}>
                        {job.logo === 'wtw' ? (
                          <span className="text-white font-black text-lg md:text-xl">wtw</span>
                        ) : (
                          <span className="text-2xl md:text-4xl">{job.logo}</span>
                        )}
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg md:text-xl font-black mb-1 group-hover:underline cursor-pointer wrap-break-words">
                              {job.title}
                            </h3>
                            <p className="text-xs sm:text-sm font-bold text-gray-600">{job.company}</p>
                          </div>
                          <div className="flex gap-2 sm:shrink-0 justify-center sm:justify-start">
                            <button
                              onClick={() => toggleSaveJob(job.id)}
                              className="p-2 border-2 border-gray-300 hover:border-black transition"
                            >
                              <Heart
                                className={`h-4 w-4 md:h-5 md:w-5 ${savedJobs.includes(job.id) ? 'fill-black' : ''}`}
                                strokeWidth={2.5}
                              />
                            </button>
                            <button className="p-2 border-2 border-gray-300 hover:border-black transition">
                              <Share2 className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>

                        {/* Job Meta Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
                          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
                            <Briefcase className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" strokeWidth={2.5} />
                            <span className="truncate">{job.experience}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
                            <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" strokeWidth={2.5} />
                            <span className="truncate">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
                            <Building2 className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" strokeWidth={2.5} />
                            <span className="truncate">{job.workType}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700">
                            <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" strokeWidth={2.5} />
                            <span className="truncate">{job.jobType}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                          {job.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 md:px-3 py-0.5 md:py-1 bg-gray-100 border border-gray-300 text-xs font-bold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Category Badge */}
                        <div className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-gray-200 border border-gray-400 text-xs font-bold mb-3 md:mb-4">
                          {job.category}
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 md:pt-4 border-t-2 border-gray-200 gap-2 md:gap-3">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-6 text-xs md:text-sm">
                            <div>
                              <span className="font-semibold text-gray-600">{job.postedDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5 md:gap-2">
                              <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-600 shrink-0" strokeWidth={2.5} />
                              <span className="font-bold text-blue-600">{job.daysLeft}</span>
                            </div>
                            <div className="flex items-center gap-1.5 md:gap-2">
                              <Users className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-600 shrink-0" strokeWidth={2.5} />
                              <span className="font-bold text-blue-600">{job.applied} Applied</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs md:text-sm font-black text-green-600">{job.salary}</span>
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
        </div>
      </div>
      
      {/* Bottom Spacing */}
      <div className="pb-8 md:pb-12"></div>
    </div>
  );
};

export default Jobs;