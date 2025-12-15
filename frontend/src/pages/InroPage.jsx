import React, { useState, useEffect } from 'react';
import {
  Search, Briefcase, Users, Target, BarChart3, Clock, CheckCircle2, Building2,
  UserPlus, ArrowRight, Sparkles, Filter, Zap, ShieldCheck, TrendingUp, DollarSign,
  FileText, Eye, MessageSquare, Calendar, PieChart, Award, Rocket, Star, Menu, X,
  ChevronRight, Settings, Bell, CreditCard, Headphones, BookOpen, Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const IntroPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userType, isLoggedIn, isEmployee, isCandidate } = useAuth();

  const recruiterFeatures = [
    { title: 'AI-Powered Matching', description: 'Smart algorithms match top candidates to your jobs automatically', icon: Sparkles },
    { title: 'Applicant Tracking', description: 'Full ATS system built-in. Track every candidate seamlessly', icon: Target },
    { title: 'Instant Analytics', description: 'Real-time insights on job performance and candidate quality', icon: BarChart3 },
    { title: 'Verified Profiles', description: 'All candidates are verified with skills assessments', icon: ShieldCheck },
  ];

  const howItWorks = [
    { step: '01', title: 'Create Account', description: 'Sign up in 30 seconds. No credit card required.', icon: UserPlus },
    { step: '02', title: 'Post Your Job', description: 'Use our templates or create custom listings.', icon: FileText },
    { step: '03', title: 'Review Matches', description: 'AI surfaces the best candidates instantly.', icon: Filter },
    { step: '04', title: 'Hire Fast', description: 'Schedule interviews and make offers in-platform.', icon: Rocket },
  ];

  const successMetrics = [
    { value: '72%', label: 'Faster Time-to-Hire', icon: Clock },
    { value: '3.5x', label: 'More Qualified Applicants', icon: Users },
    { value: '45%', label: 'Lower Cost-per-Hire', icon: DollarSign },
    { value: '94%', label: 'Recruiter Satisfaction', icon: Star },
  ];

  const testimonials = [
    { 
      name: 'Jennifer K.', 
      role: 'Head of Talent @ TechStart', 
      quote: "We filled 15 engineering positions in just 3 weeks. The AI matching is incredible!", 
      image: 'JK', 
      rating: 5 
    },
    { 
      name: 'David M.', 
      role: 'HR Director @ GlobalCorp', 
      quote: "Finally, a platform that understands recruiters. The ATS integration saved us 20+ hours weekly.", 
      image: 'DM', 
      rating: 5 
    },
    { 
      name: 'Amanda R.', 
      role: 'Recruiting Lead @ ScaleUp', 
      quote: "The candidate quality here is unmatched. 90% of our interviews lead to offers now.", 
      image: 'AR', 
      rating: 5 
    },
  ];

  const trustedBy = [
    { name: 'TechCorp', logo: 'TC' },
    { name: 'InnovateCo', logo: 'IC' },
    { name: 'FutureScale', logo: 'FS' },
    { name: 'GlobalTech', logo: 'GT' },
    { name: 'StartupHub', logo: 'SH' },
    { name: 'EnterpriseX', logo: 'EX' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <img
            src='/hr.jpeg'
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black"></div>
        </div>
        
        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-16 sm:py-24 md:py-32 lg:py-40">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              TRUSTED BY 2,500+ COMPANIES WORLDWIDE
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-none tracking-tighter">
              Hire Top Talent
              <br />
              <span className="text-gray-300">Faster Than Ever</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto font-medium">
              AI-powered recruiting platform that connects you with qualified candidates instantly. Zero guesswork, maximum results.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 max-w-lg mx-auto">
              {!isLoggedIn ? (
                <>
                  <Link to='/emp-signup' className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-black hover:bg-gray-200 transition-all text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl">
                    <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                    SIGN UP AS RECRUITER
                  </Link>
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-black border-2 border-white hover:bg-white hover:text-black transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    EXPLORE PLATFORM
                  </button>
                </>
              ) : isEmployee ? (
                <>
                  <Link to='/post-job' className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-black hover:bg-gray-200 transition-all text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl">
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                    POST A JOB
                  </Link>
                  <Link to='/employer-dashboard' className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-black border-2 border-white hover:bg-white hover:text-black transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                    MY DASHBOARD
                  </Link>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-white font-bold mb-4">This page is for employers and recruiters</p>
                  <Link to='/job-portal' className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-black hover:bg-gray-200 transition-all text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl">
                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    BROWSE JOBS
                  </Link>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {[
                { label: 'Time Saved', value: '72%' },
                { label: 'Cost Reduced', value: '45%' },
                { label: 'Quality Hires', value: '3.5x' },
                { label: 'Satisfaction', value: '94%' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 transition-all">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="w-full">
        
        {/* Trusted By Section */}
        <section className="py-12 sm:py-16 border-b-2 border-black px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <p className="text-center text-xs sm:text-sm font-black text-black mb-6 sm:mb-8 uppercase tracking-widest">TRUSTED BY LEADING COMPANIES</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
            {trustedBy.map((company, idx) => (
              <div key={idx} className="flex items-center gap-2 sm:gap-3 opacity-40 hover:opacity-100 transition-all">
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-black flex items-center justify-center font-black text-white text-xs sm:text-sm border-2 border-black">
                  {company.logo}
                </div>
                <span className="font-black text-black text-sm sm:text-base hidden sm:block">{company.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-3 sm:mb-4 tracking-tighter leading-none">
                POWERFUL TOOLS FOR<br />MODERN RECRUITERS
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto font-semibold mt-4">
                Everything you need to streamline your hiring process and find the perfect candidates
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recruiterFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="p-6 sm:p-8 bg-white border-2 border-black hover:bg-black hover:text-white transition-all group"
                >
                  <div className="h-12 w-12 sm:h-14 sm:w-14 bg-black group-hover:bg-white flex items-center justify-center mb-4 sm:mb-6 transition-all">
                    <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white group-hover:text-black" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-black group-hover:text-white mb-2 sm:mb-3 uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-gray-700 group-hover:text-gray-300 leading-relaxed text-sm sm:text-base font-medium">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-100 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-3 sm:mb-4 tracking-tighter leading-none">
                HOW IT WORKS
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto font-semibold mt-4">
                Get started in minutes and start receiving qualified candidates
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative bg-white p-6 sm:p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-black">
                  <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
                  <span className="text-5xl sm:text-6xl font-black text-gray-200 mb-3 sm:mb-4 block">{step.step}</span>
                  <div className="h-12 w-12 sm:h-14 sm:w-14 bg-black flex items-center justify-center mb-3 sm:mb-4">
                    <step.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-black mb-2 uppercase tracking-tight">{step.title}</h3>
                  <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-3 sm:mb-4 tracking-tighter leading-none">
                REAL RESULTS
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto font-semibold mt-4">
                See the impact our platform has on hiring efficiency
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {successMetrics.map((metric, index) => (
                <div 
                  key={index} 
                  className="p-6 sm:p-8 bg-black text-white hover:bg-white hover:text-black border-2 border-black text-center transition-all group"
                >
                  <metric.icon className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-3 sm:mb-4 text-white group-hover:text-black transition-all" />
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black mb-1 sm:mb-2">{metric.value}</p>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wide">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-black text-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 tracking-tighter leading-none">
                SUCCESS STORIES
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto font-semibold mt-4">
                Hear from recruiters who transformed their hiring process
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {testimonials.map((test, index) => (
                <div 
                  key={index} 
                  className="p-6 sm:p-8 bg-white text-black border-2 border-white hover:bg-black hover:text-white hover:border-white transition-all group"
                >
                  <div className="flex mb-3 sm:mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-black group-hover:fill-white text-black group-hover:text-white" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed font-semibold">"{test.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-black group-hover:bg-white flex items-center justify-center font-black text-white group-hover:text-black text-xs sm:text-sm mr-3 sm:mr-4 border-2 border-black group-hover:border-white">
                      {test.image}
                    </div>
                    <div>
                      <p className="font-black text-sm sm:text-base">{test.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-400 font-semibold">{test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-24 lg:py-32 text-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 bg-white border-t-2 border-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-4 sm:mb-6 tracking-tighter leading-none">
              READY TO HIRE<br />TOP TALENT?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 sm:mb-10 font-semibold">
              Join 2,500+ companies already hiring smarter with our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-black text-white font-black hover:bg-gray-800 transition-all text-base sm:text-lg flex items-center justify-center gap-2 shadow-2xl">
                <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                SIGN UP AS RECRUITER
              </button>
              <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-black font-black border-2 border-black hover:bg-gray-100 transition-all text-base sm:text-lg flex items-center justify-center gap-2">
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                EXPLORE PLATFORM
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IntroPage;