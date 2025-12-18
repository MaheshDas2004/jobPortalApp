import React, { useState, useRef } from 'react';
import {
  Search, MapPin, Briefcase, DollarSign, Clock, Building2,
  Heart, ExternalLink, Users, Award, ChevronRight, Eye, ChevronLeft,
  Code, Palette, Database, Megaphone, IndianRupee, PlusCircle, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const JobPortal = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
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

  // Featured jobs for carousel
  const featuredJobs = [
    {
      id: 1,
      title: 'Business Executive',
      company: 'NoBrokerHood',
      location: 'Delhi',
      type: 'In Office',
      salary: '3.5 LPA - 6 LPA',
      applied: 1,
      views: 234,
      color: 'from-blue-500 to-blue-600',
      logo: '🏢'
    },
    {
      id: 2,
      title: 'Actuarial Risk Consultant',
      company: 'Willis Towers Watson',
      location: 'Gurgaon',
      type: 'In Office',
      salary: '8 LPA - 12 LPA',
      applied: 415,
      views: 1243,
      color: 'from-pink-500 to-pink-600',
      logo: '📊'
    },
    {
      id: 3,
      title: 'HR Consulting Analyst',
      company: 'Willis Towers Watson',
      location: 'Gurgaon',
      type: 'In Office',
      salary: '6 LPA - 10 LPA',
      applied: 454,
      views: 892,
      color: 'from-purple-500 to-purple-600',
      logo: '👥'
    },
    {
      id: 4,
      title: 'Apprentice Research Analyst',
      company: 'Factset',
      location: 'Hyderabad',
      type: 'In Office',
      salary: '4 LPA - 7 LPA',
      applied: 591,
      views: 1523,
      color: 'from-yellow-500 to-yellow-600',
      logo: '🔬'
    },
    {
      id: 5,
      title: 'Senior Software Engineer',
      company: 'Infosys',
      location: 'Pune',
      type: 'Hybrid',
      salary: '10 LPA - 15 LPA',
      applied: 723,
      views: 2134,
      color: 'from-indigo-500 to-indigo-600',
      logo: '💼'
    }
  ];

  // Featured internships
  const featuredInternships = [
    {
      id: 1,
      title: 'Software Development Intern',
      company: 'Google',
      location: 'Bangalore',
      type: 'Remote',
      stipend: '₹50K - ₹80K/month',
      duration: '3-6 months',
      applied: 823,
      views: 3421,
      color: 'from-green-500 to-green-600',
      logo: '💻'
    },
    {
      id: 2,
      title: 'Data Analytics Intern',
      company: 'Microsoft',
      location: 'Hyderabad',
      type: 'Hybrid',
      stipend: '₹45K - ₹70K/month',
      duration: '6 months',
      applied: 654,
      views: 2134,
      color: 'from-blue-500 to-blue-600',
      logo: '📈'
    },
    {
      id: 3,
      title: 'UX Design Intern',
      company: 'Adobe',
      location: 'Noida',
      type: 'In Office',
      stipend: '₹35K - ₹55K/month',
      duration: '4-6 months',
      applied: 432,
      views: 1876,
      color: 'from-red-500 to-red-600',
      logo: '🎨'
    },
    {
      id: 4,
      title: 'Marketing Intern',
      company: 'Amazon',
      location: 'Mumbai',
      type: 'In Office',
      stipend: '₹30K - ₹50K/month',
      duration: '3 months',
      applied: 567,
      views: 2543,
      color: 'from-orange-500 to-orange-600',
      logo: '📱'
    },
    {
      id: 6,
      title: 'Backend Development Intern',
      company: 'Flipkart',
      location: 'Bangalore',
      type: 'Hybrid',
      stipend: '₹40K - ₹65K/month',
      duration: '6 months',
      applied: 891,
      views: 3102,
      color: 'from-teal-500 to-teal-600',
      logo: '⚙️'
    },
    {
      id: 7,
      title: 'AI/ML Research Intern',
      company: 'IBM',
      location: 'Delhi',
      type: 'Remote',
      stipend: '₹55K - ₹85K/month',
      duration: '6 months',
      applied: 912,
      views: 3567,
      color: 'from-cyan-500 to-cyan-600',
      logo: '🤖'
    }
  ];

  // All jobs data
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      location: 'San Francisco, CA',
      type: 'Full-Time',
      salary: '$120K - $160K',
      experience: '5+ Years',
      posted: '2 days ago',
      applicants: 45,
      description: 'We are looking for an experienced frontend developer to join our team and build amazing user interfaces with modern technologies.',
      skills: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
      remote: true,
      featured: true,
      category: 'software'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Creative Studios',
      location: 'New York, NY',
      type: 'Full-Time',
      salary: '$90K - $120K',
      experience: '3+ Years',
      posted: '1 day ago',
      applicants: 62,
      description: 'Join our creative team to design beautiful and intuitive user experiences for our products and help shape the future.',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
      remote: false,
      featured: false,
      category: 'design'
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'Data Solutions',
      location: 'Austin, TX',
      type: 'Full-Time',
      salary: '$130K - $170K',
      experience: '4+ Years',
      posted: '3 days ago',
      applicants: 38,
      description: 'Build scalable backend systems and APIs for our enterprise clients. Work with cutting-edge technologies.',
      skills: ['Node.js', 'Python', 'AWS', 'Docker'],
      remote: true,
      featured: true,
      category: 'software'
    },
    {
      id: 4,
      title: 'Product Manager',
      company: 'Startup Hub',
      location: 'Seattle, WA',
      type: 'Full-Time',
      salary: '$140K - $180K',
      experience: '6+ Years',
      posted: '5 days ago',
      applicants: 28,
      description: 'Lead product strategy and development for our flagship SaaS platform. Drive innovation and growth.',
      skills: ['Strategy', 'Agile', 'Analytics', 'Roadmap'],
      remote: true,
      featured: false,
      category: 'marketing'
    },
    {
      id: 8,
      title: 'Data Scientist',
      company: 'AI Innovations',
      location: 'Boston, MA',
      type: 'Contract',
      salary: '$110K - $150K',
      experience: '3+ Years',
      posted: '1 week ago',
      applicants: 51,
      description: 'Analyze complex datasets and build ML models to drive business insights. Work on cutting-edge AI projects.',
      skills: ['Python', 'ML', 'TensorFlow', 'SQL'],
      remote: true,
      featured: false,
      category: 'data'
    },
    {
      id: 9,
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      location: 'Denver, CO',
      type: 'Full-Time',
      salary: '$125K - $165K',
      experience: '4+ Years',
      posted: '4 days ago',
      applicants: 33,
      description: 'Manage and optimize our cloud infrastructure and CI/CD pipelines. Ensure reliability and scalability.',
      skills: ['Kubernetes', 'AWS', 'Terraform', 'Jenkins'],
      remote: false,
      featured: true,
      category: 'software'
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

  const filteredJobs = activeCategory === 'all' 
    ? jobs 
    : jobs.filter(job => job.category === activeCategory);

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
                <p className="text-3xl sm:text-4xl font-black">{jobs.length}</p>
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
            {featuredInternships.map((internship) => (
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

                  <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" strokeWidth={2.5} />
                      <span>{internship.applied} Applied</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" strokeWidth={2.5} />
                      <span>{internship.views} Views</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-black text-white font-black text-sm hover:bg-gray-900 transition flex items-center justify-center gap-2">
                    VIEW DETAILS
                    {/* <Zap className="h-4 w-4" strokeWidth={2.5} /> */}
                    <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
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