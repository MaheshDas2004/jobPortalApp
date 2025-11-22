import React, { useState } from 'react';
import {
  Search, Briefcase, MapPin, Code, TrendingUp, DollarSign, Users, LayoutGrid, Zap, ShieldCheck,
  User, Aperture, MessageCircle, ArrowRight, Layers, TrendingDown, Menu, X, ChevronRight, Star
} from 'lucide-react';
import Hero from '../components/Hero';

const BrutalistJobPortal = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock Data
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
    <div className="min-h-screen bg-white">
        <Hero /> 
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        
        {/* Top Companies */}
        <section className="py-12 lg:py-20 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y-8 border-black">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase border-b-8 border-black inline-block pr-8">
              TOP COMPANIES
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {topCompanies.map((company, index) => (
              <div 
                key={index} 
                className="p-6 bg-white border-4 border-black text-center cursor-pointer transform hover:rotate-3 transition hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex justify-center mb-4">
                  <LogoPlaceholder letter={company.logo} size="h-16 w-16" color="bg-yellow-400" />
                </div>
                <h4 className="font-black uppercase text-sm mb-2">{company.name}</h4>
                <p className="text-xs font-bold uppercase mb-2">{company.openings} OPENINGS</p>
                <span className={`text-xs font-black inline-block px-3 py-1 border-2 border-black ${company.tag.includes('Actively') ? 'bg-green-400' : 'bg-blue-400'}`}>
                  {company.tag.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Value Props */}
        <section className="py-12 lg:py-20">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase border-b-8 border-black inline-block pr-8">
              WHY US?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, index) => (
              <div 
                key={index} 
                className={`p-6 lg:p-8 border-4 border-black transform hover:-rotate-1 transition ${prop.color}`}
              >
                <prop.icon className="h-12 w-12 lg:h-14 lg:w-14 mb-4 stroke-[3]" />
                <h3 className="text-xl lg:text-2xl font-black uppercase mb-3 leading-tight">{prop.title}</h3>
                <p className="text-base font-bold uppercase text-sm leading-relaxed">{prop.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 lg:py-20">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase border-b-8 border-black inline-block pr-8">
              REAL TALK
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((test, index) => (
              <div 
                key={index} 
                className="p-6 lg:p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-black stroke-black" />
                  ))}
                </div>
                <p className="text-lg lg:text-xl font-bold uppercase mb-6 leading-relaxed">"{test.quote}"</p>
                <div className="flex items-center">
                  <div className="h-14 w-14 bg-teal-400 border-4 border-black flex items-center justify-center font-black text-lg mr-4">
                    {test.image}
                  </div>
                  <div>
                    <p className="font-black uppercase text-lg">{test.name}</p>
                    <p className="text-sm font-bold uppercase text-gray-600">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 text-center bg-teal-400 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y-8 border-black mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase mb-6 leading-none">
            READY TO<br />START NOW?
          </h2>
          <p className="text-xl sm:text-2xl font-bold uppercase mb-10 tracking-wide">
            DON'T WAIT. APPLY TODAY.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="w-full sm:w-auto px-12 py-5 bg-black text-white font-black uppercase border-4 border-black hover:bg-white hover:text-black transition text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none">
              BROWSE JOBS
            </button>
            <button className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black uppercase border-4 border-black hover:bg-yellow-400 transition text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none">
              POST A JOB
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 lg:py-16 border-t-8 border-black">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-12 w-12 bg-teal-400 border-4 border-white flex items-center justify-center">
                  <Briefcase className="h-7 w-7 text-black" />
                </div>
                <span className="text-2xl font-black uppercase">JobPortal</span>
              </div>
              <p className="font-bold uppercase text-sm text-gray-400">REAL JOBS. REAL PEOPLE. NO BS.</p>
            </div>
            <div>
              <h4 className="font-black uppercase mb-4 text-lg border-b-4 border-teal-400 inline-block pb-1">CANDIDATES</h4>
              <ul className="space-y-2 text-sm font-bold uppercase">
                <li><a href="#" className="hover:text-teal-400 transition">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">Companies</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">Career Advice</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Resume Builder</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase mb-4 text-lg border-b-4 border-yellow-400 inline-block pb-1">EMPLOYERS</h4>
              <ul className="space-y-2 text-sm font-bold uppercase">
                <li><a href="#" className="hover:text-teal-400 transition">Post a Job</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">Success Stories</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase mb-4 text-lg border-b-4 border-pink-400 inline-block pb-1">COMPANY</h4>
              <ul className="space-y-2 text-sm font-bold uppercase">
                <li><a href="#" className="hover:text-teal-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t-4 border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="font-bold uppercase text-sm mb-4 sm:mb-0">© 2024 JOBPORTAL. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-4">
              <a href="#" className="h-12 w-12 bg-white border-4 border-white flex items-center justify-center hover:bg-teal-400 transition">
                <svg className="h-6 w-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="h-12 w-12 bg-white border-4 border-white flex items-center justify-center hover:bg-yellow-400 transition">
                <svg className="h-6 w-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="h-12 w-12 bg-white border-4 border-white flex items-center justify-center hover:bg-pink-400 transition">
                <svg className="h-6 w-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" className="h-12 w-12 bg-white border-4 border-white flex items-center justify-center hover:bg-purple-400 transition">
                <svg className="h-6 w-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BrutalistJobPortal;