import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Briefcase, MapPin, Code, TrendingUp, DollarSign, Users, LayoutGrid, Zap, ShieldCheck,
  User, Aperture, ArrowRight, Layers, ChevronRight, 
  ChevronLeft, Heart, Eye, ExternalLink
} from 'lucide-react';
import Hero from '../components/Hero';
import { useAuth } from '../context/AuthContext';

const JobPortalHome = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const jobCarouselRef = useRef(null);
  const { user, userType, isLoggedIn, isEmployee, isCandidate, isLoading } = useAuth();

  // Handle redirects for logged in users - only redirect employees, not candidates
  useEffect(() => {
    if (!isLoading && isLoggedIn && isEmployee) {
      setIsRedirecting(true);
      // Add small delay for smooth transition
      const timer = setTimeout(() => {
        window.location.href = '/ehome';
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, isLoggedIn, isEmployee]);

  // Show loading state during redirect (only for employers)
  if (isRedirecting && isEmployee) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Redirecting to Employer Dashboard...</h2>
          <p className="text-gray-600 font-semibold">Please wait a moment</p>
        </div>
      </div>
    );
  }

  const valueProps = [
    { title: 'Easy Search', description: 'Simple and fast job discovery', icon: Search },
    { title: 'Modern Design', description: 'Clean and intuitive interface', icon: Zap },
    { title: 'Quick Apply', description: 'Apply to jobs with one click', icon: ArrowRight },
    { title: 'Responsive', description: 'Works on all devices', icon: ShieldCheck },
  ];

  // Job categories and featured jobs (moved from Hero component)
  const jobCategories = [
    { title: 'Software Development', jobs: 2500, icon: Code, img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop' },
    { title: 'Marketing & Sales', jobs: 1200, icon: TrendingUp, img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop' },
    { title: 'Finance & Accounting', jobs: 850, icon: DollarSign, img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop' },
    { title: 'Customer Support', jobs: 1500, icon: Users, img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop' },
    { title: 'Data Science', jobs: 700, icon: Layers, img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
    { title: 'Design & Creative', jobs: 600, icon: Aperture, img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop' },
    { title: 'Human Resources', jobs: 450, icon: User, img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop' },
    { title: 'Project Management', jobs: 900, icon: LayoutGrid, img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop' },
  ];

  const featuredJobs = [
    { 
      id: 1, 
      title: 'Senior Frontend Developer', 
      company: 'TechCorp', 
      logo: '🚀', 
      salary: '₹12-15 LPA', 
      location: 'Bangalore, IN', 
      type: 'In Office', 
      applied: 45, 
      views: 234, 
      color: 'from-blue-500 to-purple-600'
    },
    { 
      id: 2, 
      title: 'Product Manager', 
      company: 'StartupX', 
      logo: '💡', 
      salary: '₹18-22 LPA', 
      location: 'Mumbai, IN', 
      type: 'In Office', 
      applied: 67, 
      views: 189, 
      color: 'from-green-500 to-blue-500'
    },
    { 
      id: 3, 
      title: 'UX/UI Designer', 
      company: 'DesignHub', 
      logo: '🎨', 
      salary: '₹8-12 LPA', 
      location: 'Remote', 
      type: 'Remote', 
      applied: 23, 
      views: 156, 
      color: 'from-pink-500 to-orange-500'
    },
    { 
      id: 4, 
      title: 'Data Scientist', 
      company: 'DataTech', 
      logo: '📊', 
      salary: '₹15-20 LPA', 
      location: 'Delhi, IN', 
      type: 'Hybrid', 
      applied: 89, 
      views: 321, 
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 5, 
      title: 'DevOps Engineer', 
      company: 'CloudSys', 
      logo: '⚙️', 
      salary: '₹14-18 LPA', 
      location: 'Hyderabad, IN', 
      type: 'In Office', 
      applied: 56, 
      views: 278, 
      color: 'from-indigo-500 to-blue-600'
    }
  ];

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

  const LogoPlaceholder = ({ letter, size = 'h-12 w-12' }) => (
    <div className={`${size} bg-gray-900 border-2 border-black flex items-center justify-center text-white font-extrabold text-lg`}>
      {letter}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Hero jobCategories={jobCategories} />
      <main>
        {/* Candidate Welcome Section */}
        {isCandidate && (
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-8 border-b-2 border-black">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-15">
              <div className="flex items-center justify-between bg-white border-2 border-black p-6 shadow-lg">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                    Welcome back, {user?.fullName?.split(' ')[0]}! 👋
                  </h2>
                  <p className="text-sm sm:text-base font-semibold text-gray-600">
                    Ready to find your dream job? Browse our latest opportunities or check your applications.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <a href="/job-portal" className="bg-black text-white px-6 py-3 border-2 border-black hover:bg-white hover:text-black transition-colors font-bold uppercase text-sm">
                    Browse Jobs
                  </a>
                  <a href="/candidate-dashboard" className="bg-white text-black px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors font-bold uppercase text-sm">
                    My Dashboard
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Categories Section */}
        <section className="bg-white py-16">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-15">
            <div className="mb-12 text-center">
              <div className="inline-block mb-4 px-4 py-1 bg-black text-white text-xs font-bold tracking-wider">EXPLORE CATEGORIES</div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Browse by Industry</h2>
              <p className="text-sm sm:text-base font-semibold text-gray-600 max-w-2xl mx-auto">Discover thousands of opportunities across multiple sectors</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {jobCategories.map((cat, index) => (
                <div key={index} className="group relative overflow-hidden border-2 border-black cursor-pointer bg-white">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent"></div>
                    <div className="absolute top-3 right-3 p-2 sm:p-3 bg-white border-2 border-black">
                      <cat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-black" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                    <h3 className="text-base sm:text-lg font-extrabold mb-1 sm:mb-2 text-white leading-tight">{cat.title}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-bold text-gray-200">{cat.jobs.toLocaleString()} Jobs</p>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Role-based Content Section */}
        {(!isLoggedIn || isCandidate) && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-15">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black mb-2">
                    {isCandidate ? 'Recommended Jobs' : 'Featured Jobs'}
                  </h2>
                  <p className="text-sm font-semibold text-gray-600">
                    {isCandidate ? 'Jobs curated specially for you' : 'Discover the best job openings for your career'}
                  </p>
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
                {featuredJobs.map((job) => (
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

                      <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" strokeWidth={2.5} />
                          <span>{job.applied} Applied</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" strokeWidth={2.5} />
                          <span>{job.views} Views</span>
                        </div>
                      </div>

                      <button className="w-full py-3 bg-black text-white font-black text-sm hover:bg-gray-900 transition flex items-center justify-center gap-2">
                        VIEW DETAILS
                        <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
                      </button>
                    </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="px-8 py-3 bg-white text-black font-black border-2 border-black hover:bg-black hover:text-white transition inline-flex items-center gap-2">
                VIEW ALL JOBS
                <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </section>
        )}

        {/* Value Props - Enhanced */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-black mb-2">Why Choose Us</h2>
              <p className="text-sm font-semibold text-gray-600">Everything you need for a successful job search</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valueProps.map((prop, index) => (
                <div 
                  key={index} 
                  className="p-6 lg:p-8 border-2 border-black bg-white hover:bg-gray-50 transition text-center group"
                >
                  <prop.icon className="h-10 w-10 lg:h-12 lg:w-12 mb-4 stroke-2 text-gray-900 mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg lg:text-xl font-black mb-3 text-gray-900 group-hover:underline">{prop.title}</h3>
                  <p className="font-medium text-sm leading-relaxed text-gray-600">{prop.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 py-20 border-t-2 border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight text-white">
                Your Future Starts
                <span className="bg-white text-black px-4 py-1 inline-block transform -skew-x-6 ml-3">
                  Here
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 font-medium max-w-2xl mx-auto">
                Join thousands of professionals who have found their dream careers through our platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-10 py-4 bg-white text-black font-black hover:bg-gray-200 transition shadow-lg flex items-center justify-center gap-2">
                  <Search className="h-5 w-5" strokeWidth={2.5} />
                  FIND JOBS
                </button>
                <button className="w-full sm:w-auto px-10 py-4 bg-transparent text-white font-black border-2 border-white hover:bg-white hover:text-black transition flex items-center justify-center gap-2">
                  <Briefcase className="h-5 w-5" strokeWidth={2.5} />
                  FOR EMPLOYERS
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default JobPortalHome;