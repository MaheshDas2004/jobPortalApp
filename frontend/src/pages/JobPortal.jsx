import React, { useState, useRef, useEffect } from 'react';
import {
  Search, MapPin, Briefcase, DollarSign, Clock, Building2,
  Heart, ExternalLink, Users, Award, ChevronRight, ChevronLeft,
  Code, Palette, Database, Megaphone, IndianRupee, PlusCircle, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const JobPortal = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [featuredInternships, setFeaturedInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const jobCarouselRef = useRef(null);
  const internshipCarouselRef = useRef(null);
  const { user, userType, isLoggedIn, isEmployer, isCandidate } = useAuth();
  
  // Redirect employers to post job page or show different content
  if (isEmployer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-white border-2 border-black shadow-lg">
          <Briefcase className="h-16 w-16 mx-auto mb-4 text-black" strokeWidth={2.5} />
          <h2 className="text-2xl font-black text-gray-900 mb-4">
            Looking to hire talent?
          </h2>
          <p className="text-gray-600 font-semibold mb-6">
            As an employer, you can post jobs and find the perfect candidates for your company.
          </p>
          <div className="space-y-3">
            <Link to="/post-job" className="block w-full bg-black text-white py-3 px-6 border-2 border-black hover:bg-white hover:text-black transition-colors font-bold uppercase text-sm">
              Post a Job
            </Link>
            <Link to="/employer-dashboard" className="block w-full bg-white text-black py-3 px-6 border-2 border-black hover:bg-black hover:text-white transition-colors font-bold uppercase text-sm">
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Job categories
  const categories = [
    { id: 'all', name: 'All Jobs', icon: Briefcase },
    { id: 'software', name: 'Software Development', icon: Code },
    { id: 'data', name: 'Data Science', icon: Database },
    { id: 'design', name: 'Graphic Design', icon: Palette },
    { id: 'marketing', name: 'Marketing', icon: Megaphone },
    { id: 'finance', name: 'Finance', icon: IndianRupee }
  ];

  // Fetch featured jobs and internships
  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/jobs/all');
        
        if (response.data.success) {
          const allJobs = response.data.data;
          
          // Filter featured jobs (excluding internships)
          const jobs = allJobs.filter(job => 
            job.featured && job.jobType !== 'Internship'
          );
          
          // Filter featured internships
          const internships = allJobs.filter(job => 
            job.featured && job.jobType === 'Internship'
          );
          
          // Add UI enhancements to jobs
          const enhancedJobs = jobs.map((job, index) => ({
            ...job,
            id: job._id,
            title: job.jobTitle,
            type: job.workType,
            applied: job.applicants?.length || 0,
            color: getRandomGradient(index),
            logo: getJobIcon(job.jobTitle)
          }));
          
          // Add UI enhancements to internships
          const enhancedInternships = internships.map((internship, index) => ({
            ...internship,
            id: internship._id,
            title: internship.jobTitle,
            type: internship.workType,
            stipend: internship.salary,
            duration: '3-6 months', // Default duration
            applied: internship.applicants?.length || 0,
            color: getRandomGradient(index),
            logo: getJobIcon(internship.jobTitle)
          }));
          
          setFeaturedJobs(enhancedJobs);
          setFeaturedInternships(enhancedInternships);
        }
      } catch (error) {
        console.error('Error fetching featured jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedJobs();
  }, []);
  
  // Helper function to get random gradient colors
  const getRandomGradient = (index) => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-pink-500 to-pink-600', 
      'from-purple-500 to-purple-600',
      'from-yellow-500 to-yellow-600',
      'from-indigo-500 to-indigo-600',
      'from-green-500 to-green-600',
      'from-red-500 to-red-600',
      'from-teal-500 to-teal-600'
    ];
    return gradients[index % gradients.length];
  };
  
  // Helper function to get job icon based on title
  const getJobIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('software') || lowerTitle.includes('developer')) return '💻';
    if (lowerTitle.includes('data') || lowerTitle.includes('analyst')) return '📊';
    if (lowerTitle.includes('design') || lowerTitle.includes('ui')) return '🎨';
    if (lowerTitle.includes('marketing')) return '📢';
    if (lowerTitle.includes('hr') || lowerTitle.includes('human')) return '👥';
    if (lowerTitle.includes('research')) return '🔬';
    if (lowerTitle.includes('manager') || lowerTitle.includes('executive')) return '💼';
    return '🏢';
  };



  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const scrollCarousel = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = 350;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };



  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src='/jb.jpeg'
            alt=""
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            {isCandidate ? (
              <>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                  Welcome back,
                  <span className="bg-white text-black px-4 py-1 inline-block transform -skew-x-6 ml-3">
                    {user?.fullName?.split(' ')[0]}
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-8 font-medium">
                  Discover jobs tailored for your skills and experience!
                </p>
              </>
            ) : (
              <>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                  Your Future Starts
                  <span className="bg-white text-black px-4 py-1 inline-block transform -skew-x-6 ml-3">
                    Here
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-8 font-medium">
                  77,000+ Jobs for freshers, students & graduates!
                </p>
              </>
            )}

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Link to="/jobs" className="px-10 py-4 bg-white text-black font-black hover:bg-gray-200 transition shadow-lg flex items-center gap-2">
                <Search className="h-5 w-5" strokeWidth={2.5} />
                {isCandidate ? 'BROWSE MORE JOBS' : 'FIND JOBS'}
              </Link>
              {!isCandidate && (
                <Link to="/cand-signup" className="px-10 py-4 bg-transparent text-white font-black border-2 border-white hover:bg-white hover:text-black transition flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" strokeWidth={2.5} />
                  JOIN NOW
                </Link>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black">{featuredJobs.length + featuredInternships.length}</p>
                <p className="text-sm font-semibold text-gray-400">Open Positions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black">25+</p>
                <p className="text-sm font-semibold text-gray-400">Companies</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black">200+</p>
                <p className="text-sm font-semibold text-gray-400">Registered Users</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Job Categories */}
      <div className="border-b-2 border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-15 py-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <h3 className="text-sm font-black uppercase whitespace-nowrap mr-2">Jobs Category</h3>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 font-bold text-sm whitespace-nowrap flex items-center gap-2 transition border-2 ${
                    activeCategory === cat.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-black'
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Jobs Carousel */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-2">Featured Jobs</h2>
              <p className="text-sm font-semibold text-gray-600">Find jobs that fit your career aspirations.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel('left', jobCarouselRef)}
                className="p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => scrollCarousel('right', jobCarouselRef)}
                className="p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div
            ref={jobCarouselRef}
            className="flex gap-6 overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              // Loading skeleton for jobs
              [...Array(3)].map((_, index) => (
                <div key={index} className="min-w-[320px] bg-white border-2 border-gray-200 shadow-lg animate-pulse">
                  <div className="h-32 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : featuredJobs.length === 0 ? (
              <div className="min-w-[320px] bg-white border-2 border-gray-200 shadow-lg p-8 text-center">
                <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 font-medium">No featured jobs available</p>
              </div>
            ) : (
              featuredJobs.map((job) => (
              <div
                key={job.id}
                className="min-w-[320px] bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <div className={`h-32 bg-linear-to-br ${job.color} relative flex items-center justify-center`}>
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 text-xs font-black">
                    {job.type}
                  </div>
                  <div className="text-6xl">{job.logo}</div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-black mb-2 group-hover:underline cursor-pointer">
                    {job.title}
                  </h3>
                  <p className="text-sm font-bold text-gray-600 mb-4">{job.company}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin className="h-4 w-4" strokeWidth={2.5} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <DollarSign className="h-4 w-4" strokeWidth={2.5} />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-xs font-bold text-gray-600 mb-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" strokeWidth={2.5} />
                      <span>{job.applied} Applied</span>
                    </div>
                  </div>

                  <Link 
                    to={`/jobs/${job.id}`}
                    className="w-full py-3 bg-black text-white font-black text-sm hover:bg-gray-900 transition flex items-center justify-center gap-2"
                  >
                    VIEW DETAILS
                    <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </div>

              </div>
            ))
            )}
          </div>

          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-white text-black font-black border-2 border-black hover:bg-black hover:text-white transition inline-flex items-center gap-2">
              VIEW ALL JOBS
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Internships Carousel Section */}
      <div className="bg-white py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-15">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-2">Top Internships</h2>
              <p className="text-sm font-semibold text-gray-600">Kickstart your career with top internship opportunities.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel('left', internshipCarouselRef)}
                className="p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => scrollCarousel('right', internshipCarouselRef)}
                className="p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div
            ref={internshipCarouselRef}
            className="flex gap-6 overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              // Loading skeleton for internships
              [...Array(3)].map((_, index) => (
                <div key={index} className="min-w-[320px] bg-white border-2 border-gray-200 shadow-lg animate-pulse">
                  <div className="h-32 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : featuredInternships.length === 0 ? (
              <div className="min-w-[320px] bg-white border-2 border-gray-200 shadow-lg p-8 text-center">
                <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 font-medium">No featured internships available</p>
              </div>
            ) : (
              featuredInternships.map((internship) => (
              <div
                key={internship.id}
                className="min-w-[320px] bg-white border-2 border-black shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <div className={`h-32 bg-linear-to-br ${internship.color} relative flex items-center justify-center`}>
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 text-xs font-black">
                    {internship.type}
                  </div>
                  <div className="text-6xl">{internship.logo}</div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-black mb-2 group-hover:underline cursor-pointer">
                    {internship.title}
                  </h3>
                  <p className="text-sm font-bold text-gray-600 mb-4">{internship.company}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin className="h-4 w-4" strokeWidth={2.5} />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <IndianRupee className="h-4 w-4" strokeWidth={2.5} />
                      <span>{internship.stipend}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Clock className="h-4 w-4" strokeWidth={2.5} />
                      <span>{internship.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-xs font-bold text-gray-600 mb-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" strokeWidth={2.5} />
                      <span>{internship.applied} Applied</span>
                    </div>
                  </div>

                  <Link 
                    to={`/jobs/${internship.id}`}
                    className="w-full py-3 bg-black text-white font-black text-sm hover:bg-gray-900 transition flex items-center justify-center gap-2"
                  >
                    VIEW DETAILS
                    <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            ))
            )}
          </div>

          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-white text-black font-black border-2 border-black hover:bg-black hover:text-white transition inline-flex items-center gap-2">
              VIEW ALL INTERNSHIPS
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPortal;