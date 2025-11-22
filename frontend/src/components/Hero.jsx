import React from 'react'
import {
  Search, Briefcase, MapPin, Code, TrendingUp, DollarSign, Users, LayoutGrid, Zap, ShieldCheck,
  User, Aperture, MessageCircle, ArrowRight, Layers, TrendingDown, Menu, X, ChevronRight, Star
} from 'lucide-react';

const Hero = () => {
  const jobCategories = [
    { title: 'Software Development', jobs: 2500, icon: Code, color: 'bg-teal-400' },
    { title: 'Marketing & Sales', jobs: 1200, icon: TrendingUp, color: 'bg-yellow-400' },
    { title: 'Finance & Accounting', jobs: 850, icon: DollarSign, color: 'bg-pink-400' },
    { title: 'Customer Support', jobs: 1500, icon: Users, color: 'bg-purple-400' },
    { title: 'Data Science', jobs: 700, icon: Layers, color: 'bg-orange-400' },
    { title: 'Design & Creative', jobs: 600, icon: Aperture, color: 'bg-blue-400' },
    { title: 'Human Resources', jobs: 450, icon: User, color: 'bg-red-400' },
    { title: 'Project Management', jobs: 900, icon: LayoutGrid, color: 'bg-green-400' },
  ];
  
  const featuredJobs = [
    { title: 'Senior Backend Engineer', company: 'Innovatech', logo: 'I', salary: '$130k - $150k', location: 'Remote', type: 'Full-time', featured: true },
    { title: 'Digital Marketing Manager', company: 'Global Brands Co.', logo: 'G', salary: '$80k - $100k', location: 'New York, NY', type: 'Hybrid', featured: true },
    { title: 'Financial Analyst II', company: 'FinPulse Group', logo: 'F', salary: '$75k - $95k', location: 'Chicago, IL', type: 'Full-time', featured: false },
    { title: 'Customer Success Rep', company: 'ServicePro', logo: 'S', salary: '$55k - $65k', location: 'Austin, TX', type: 'Remote', featured: false },
  ];

  const topCompanies = [
    { name: 'TechCorp', tag: 'Actively Hiring', logo: 'T', openings: 45 },
    { name: 'FutureDrive', tag: 'New Jobs', logo: 'F', openings: 28 },
    { name: 'GlobalSoft', tag: '30+ Openings', logo: 'G', openings: 32 },
    { name: 'HealthPlus', tag: 'Actively Hiring', logo: 'H', openings: 18 },
    { name: 'Digital Edge', tag: 'New Jobs', logo: 'D', openings: 22 },
    { name: 'Ecom Solutions', tag: '15+ Openings', logo: 'E', openings: 15 },
  ];

  const valueProps = [
    { title: '100% VERIFIED', description: 'Only legitimate registered businesses', icon: ShieldCheck, color: 'bg-teal-400' },
    { title: 'AI-POWERED', description: 'Personalized job matching system', icon: Zap, color: 'bg-yellow-400' },
    { title: 'DIRECT APPLY', description: 'No redirects to external sites', icon: ArrowRight, color: 'bg-pink-400' },
    { title: 'ZERO FAKES', description: 'Rigorously reviewed daily', icon: TrendingDown, color: 'bg-purple-400' },
  ];

  const testimonials = [
    { name: 'Sarah L.', role: 'Senior Developer', quote: "Found my dream remote job in just two weeks! The interface is so clean and easy to use.", image: 'SL', rating: 5 },
    { name: 'Mark R.', role: 'Hiring Manager', quote: "Excellent quality candidates! The posting feature is intuitive and targets the right talent pools.", image: 'MR', rating: 5 },
  ];

  const LogoPlaceholder = ({ letter, size = 'h-12 w-12', color = 'bg-teal-400' }) => (
    <div className={`${size} ${color} border-4 border-black flex items-center justify-center text-black font-black text-lg`}>
      {letter}
    </div>
  );

  return (
    <div>
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Background Image with Brutalist Treatment */}
        <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-screen min-h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/90 via-yellow-400/80 to-pink-400/90 mix-blend-multiply"></div>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 contrast-125 grayscale-[30%]"
          />
          {/* Brutalist Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, black 0px, black 4px, transparent 4px, transparent 60px),
                repeating-linear-gradient(90deg, black 0px, black 4px, transparent 4px, transparent 60px)
              `,
            }}
          ></div>
          {/* Large Typography Pattern */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <p className="text-[20rem] font-black uppercase leading-none">JOBS</p>
          </div>
        </div>
        
        <div className="text-center mb-12 relative z-10 px-4">
          <div className="inline-block px-6 py-2 bg-yellow-400 border-4 border-black text-black font-black uppercase text-sm mb-8 transform -rotate-2">
            50,000+ JOBS LIVE NOW
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black uppercase mb-6 leading-none drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            FIND YOUR
            <br />
            <span className="bg-teal-400 px-4 inline-block transform -skew-x-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">DREAM JOB</span>
          </h1>
          <p className="text-xl sm:text-2xl font-bold uppercase mb-12 tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            NO BS. JUST REAL OPPORTUNITIES.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-6 lg:p-8 border-8 border-black mx-auto max-w-5xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="JOB TITLE" 
                  className="w-full px-4 py-4 border-4 border-black font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:bg-teal-100 transition" 
                />
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="LOCATION" 
                  className="w-full px-4 py-4 border-4 border-black font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:bg-yellow-100 transition" 
                />
              </div>
              <div className="relative">
                <select className="w-full px-4 py-4 border-4 border-black font-bold uppercase appearance-none bg-white focus:outline-none focus:bg-pink-100 transition">
                  <option value="">CATEGORY</option>
                  {jobCategories.map(cat => <option key={cat.title} value={cat.title}>{cat.title.toUpperCase()}</option>)}
                </select>
              </div>
              <button className="px-6 py-4 bg-teal-400 text-black font-black uppercase border-4 border-black hover:translate-x-1 hover:translate-y-1 transition transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                SEARCH
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto relative z-10">
            {[
              { label: 'ACTIVE JOBS', value: '50K+', color: 'bg-teal-400' },
              { label: 'COMPANIES', value: '2.5K+', color: 'bg-yellow-400' },
              { label: 'CANDIDATES', value: '1M+', color: 'bg-pink-400' },
              { label: 'SUCCESS RATE', value: '95%', color: 'bg-purple-400' }
            ].map((stat, idx) => (
              <div key={idx} className={`text-center p-6 border-4 border-black ${stat.color} transform hover:-rotate-2 transition`}>
                <p className="text-4xl lg:text-5xl font-black mb-2">{stat.value}</p>
                <p className="text-sm font-black uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-12 lg:py-20 px-4">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase mb-4 border-b-8 border-black inline-block pr-8">
            CATEGORIES
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobCategories.map((cat, index) => (
            <div 
              key={index} 
              className={`group p-6 lg:p-8 border-4 border-black cursor-pointer transform hover:-translate-y-1 hover:translate-x-1 transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none ${cat.color}`}
            >
              <cat.icon className="h-12 w-12 lg:h-14 lg:w-14 mb-4 stroke-[3]" />
              <h3 className="text-lg lg:text-xl font-black uppercase mb-2 leading-tight">{cat.title}</h3>
              <p className="text-base lg:text-lg font-bold">{cat.jobs.toLocaleString()} JOBS</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-12 lg:py-20 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase border-b-8 border-black inline-block pr-8 mb-4 sm:mb-0">
            FEATURED
          </h2>
          <button className="px-6 py-3 text-black border-4 border-black font-black uppercase hover:bg-gray-200 transition">
            VIEW ALL
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredJobs.map((job, index) => (
            <div 
              key={index} 
              className="relative p-6 lg:p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition"
            >
              {job.featured && (
                <div className="absolute -top-3 -right-3 px-4 py-1 bg-yellow-400 border-4 border-black text-black text-xs font-black uppercase rotate-3">
                  ★ FEATURED
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl lg:text-3xl font-black uppercase mb-4 leading-tight">{job.title}</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <LogoPlaceholder letter={job.logo} size="h-12 w-12" color="bg-teal-400" />
                  <div>
                    <p className="text-lg font-black uppercase">{job.company}</p>
                    <p className="text-sm font-bold uppercase text-gray-600">{job.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-green-400 border-4 border-black text-black text-sm font-black uppercase">
                  {job.salary}
                </span>
                <span className="px-4 py-2 bg-pink-400 border-4 border-black text-black text-sm font-black uppercase">
                  {job.type}
                </span>
              </div>

              <button className="w-full px-6 py-4 bg-teal-400 text-black font-black uppercase border-4 border-black hover:translate-x-1 hover:translate-y-1 transition transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                APPLY NOW →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hero