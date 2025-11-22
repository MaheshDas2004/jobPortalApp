import React, { useState } from 'react';
import {
  Search, Briefcase, Users, Target, BarChart3, Clock, CheckCircle2, Building2,
  UserPlus, ArrowRight, Sparkles, Filter, Zap, ShieldCheck, TrendingUp, DollarSign,
  FileText, Eye, MessageSquare, Calendar, PieChart, Award, Rocket, Star, Menu, X,
  ChevronRight, Settings, Bell, CreditCard, Headphones, BookOpen, Play
} from 'lucide-react';

const IntroPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pricing Plans
  const pricingPlans = [
    { 
      name: 'Starter', 
      price: 'Free', 
      period: '', 
      color: 'bg-teal-400',
      features: ['1 Active Job Post', '25 Candidate Views/mo', 'Basic Analytics', 'Email Support'],
      cta: 'Start Free'
    },
    { 
      name: 'Professional', 
      price: '$99', 
      period: '/month',
      color: 'bg-yellow-400',
      popular: true,
      features: ['10 Active Job Posts', 'Unlimited Candidate Views', 'AI Candidate Matching', 'Priority Support', 'ATS Integration'],
      cta: 'Get Started'
    },
    { 
      name: 'Enterprise', 
      price: '$299', 
      period: '/month',
      color: 'bg-pink-400',
      features: ['Unlimited Job Posts', 'Dedicated Account Manager', 'Custom Branding', 'API Access', 'Team Collaboration', 'Advanced Analytics'],
      cta: 'Contact Sales'
    },
  ];

  // Features for Recruiters
  const recruiterFeatures = [
    { title: 'AI-POWERED MATCHING', description: 'Smart algorithms match top candidates to your jobs automatically', icon: Sparkles, color: 'bg-teal-400' },
    { title: 'APPLICANT TRACKING', description: 'Full ATS system built-in. Track every candidate seamlessly', icon: Target, color: 'bg-yellow-400' },
    { title: 'INSTANT ANALYTICS', description: 'Real-time insights on job performance and candidate quality', icon: BarChart3, color: 'bg-pink-400' },
    { title: 'VERIFIED PROFILES', description: 'All candidates are verified with skills assessments', icon: ShieldCheck, color: 'bg-purple-400' },
  ];

  // How It Works Steps
  const howItWorks = [
    { step: '01', title: 'Create Account', description: 'Sign up in 30 seconds. No credit card required.', icon: UserPlus },
    { step: '02', title: 'Post Your Job', description: 'Use our templates or create custom listings.', icon: FileText },
    { step: '03', title: 'Review Matches', description: 'AI surfaces the best candidates instantly.', icon: Filter },
    { step: '04', title: 'Hire Fast', description: 'Schedule interviews and make offers in-platform.', icon: Rocket },
  ];

  // Success Metrics
  const successMetrics = [
    { value: '72%', label: 'Faster Time-to-Hire', icon: Clock },
    { value: '3.5x', label: 'More Qualified Applicants', icon: Users },
    { value: '45%', label: 'Lower Cost-per-Hire', icon: DollarSign },
    { value: '94%', label: 'Recruiter Satisfaction', icon: Star },
  ];

  // Testimonials from Recruiters
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

  // Trusted Companies
  const trustedBy = [
    { name: 'TechCorp', logo: 'TC' },
    { name: 'InnovateCo', logo: 'IC' },
    { name: 'FutureScale', logo: 'FS' },
    { name: 'GlobalTech', logo: 'GT' },
    { name: 'StartupHub', logo: 'SH' },
    { name: 'EnterpriseX', logo: 'EX' },
  ];

  const LogoPlaceholder = ({ letter, size = 'h-12 w-12', color = 'bg-teal-400' }) => (
    <div className={`${size} ${color} border-4 border-black flex items-center justify-center text-black font-black text-lg`}>
      {letter}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="py-20 lg:py-28 text-center">
    <h1 className="text-5xl lg:text-7xl font-black uppercase">Hire Top Talent Faster</h1>
    <p className="mt-6 text-xl font-bold text-gray-600">AI-powered sourcing, ATS, and analytics for modern recruiters.</p>
  </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trusted By Section */}
        <section className="py-12 border-b-4 border-black">
          <p className="text-center font-black uppercase text-gray-500 mb-8">Trusted by 2,500+ companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {trustedBy.map((company, idx) => (
              <div key={idx} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition">
                <div className="h-12 w-12 bg-gray-200 border-2 border-black flex items-center justify-center font-black">
                  {company.logo}
                </div>
                <span className="font-black uppercase text-lg hidden sm:block">{company.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 lg:py-20">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase border-b-8 border-black inline-block pr-8">
              POWERFUL TOOLS
            </h2>
            <p className="mt-4 text-xl font-bold uppercase text-gray-600">Everything you need to hire smarter</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recruiterFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`p-6 lg:p-8 border-4 border-black transform hover:-rotate-1 transition ${feature.color}`}
              >
                <feature.icon className="h-12 w-12 lg:h-14 lg:w-14 mb-4 stroke-[3]" />
                <h3 className="text-xl lg:text-2xl font-black uppercase mb-3 leading-tight">{feature.title}</h3>
                <p className="font-bold text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 lg:py-20 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y-8 border-black">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase border-b-8 border-black inline-block pr-8">
              HOW IT WORKS
            </h2>
            <p className="mt-4 text-xl font-bold uppercase text-gray-600">Start hiring in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="p-6 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-6xl font-black text-gray-200">{step.step}</span>
                  <step.icon className="h-10 w-10 mb-4 stroke-[3] text-teal-500" />
                  <h3 className="text-xl font-black uppercase mb-2">{step.title}</h3>
                  <p className="font-bold text-sm text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <ChevronRight className="hidden lg:block absolute top-1/2 -right-5 h-10 w-10 text-black" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-12 lg:py-20">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase border-b-8 border-black inline-block pr-8">
              REAL RESULTS
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <div 
                key={index} 
                className={`p-8 border-4 border-black text-center ${
                  index === 0 ? 'bg-teal-400' : 
                  index === 1 ? 'bg-yellow-400' : 
                  index === 2 ? 'bg-pink-400' : 'bg-purple-400'
                }`}
              >
                <metric.icon className="h-10 w-10 mx-auto mb-4 stroke-[3]" />
                <p className="text-4xl lg:text-5xl font-black mb-2">{metric.value}</p>
                <p className="font-black uppercase text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-12 lg:py-20 bg-black -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y-8 border-teal-400">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white border-b-8 border-teal-400 inline-block pr-8">
              SUCCESS STORIES
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div 
                key={index} 
                className={`p-6 lg:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                  index === 0 ? 'bg-teal-400' : index === 1 ? 'bg-yellow-400' : 'bg-pink-400'
                }`}
              >
                <div className="flex mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-black stroke-black" />
                  ))}
                </div>
                <p className="text-lg lg:text-xl font-bold mb-6 leading-relaxed">"{test.quote}"</p>
                <div className="flex items-center">
                  <div className="h-14 w-14 bg-white border-4 border-black flex items-center justify-center font-black text-lg mr-4">
                    {test.image}
                  </div>
                  <div>
                    <p className="font-black uppercase text-lg">{test.name}</p>
                    <p className="text-sm font-bold">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-12 lg:py-20">
          <div className="mb-12 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase border-b-8 border-black inline-block px-8">
              SIMPLE PRICING
            </h2>
            <p className="mt-4 text-xl font-bold uppercase text-gray-600">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative p-8 border-4 border-black ${plan.color} ${plan.popular ? 'shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform scale-105' : 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 font-black uppercase text-sm border-2 border-black">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-black uppercase mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="font-bold">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 stroke-[3]" />
                      <span className="font-bold">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 bg-black text-white font-black uppercase border-4 border-black hover:bg-white hover:text-black transition">
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 text-center bg-gradient-to-r from-teal-400 via-yellow-400 to-pink-400 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y-8 border-black mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase mb-6 leading-none">
            READY TO HIRE<br />TOP TALENT?
          </h2>
          <p className="text-xl sm:text-2xl font-bold uppercase mb-10 tracking-wide">
            Join 2,500+ companies already hiring smarter
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="w-full sm:w-auto px-12 py-5 bg-black text-white font-black uppercase border-4 border-black hover:bg-white hover:text-black transition text-xl shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none flex items-center justify-center gap-3">
              <UserPlus className="h-6 w-6" />
              Sign Up as Recruiter
            </button>
            <button className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black uppercase border-4 border-black hover:bg-black hover:text-white transition text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none flex items-center justify-center gap-3">
              <Play className="h-6 w-6" />
              Watch Demo
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 lg:py-16 border-t-8 border-teal-400">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-12 w-12 bg-teal-400 border-4 border-white flex items-center justify-center">
                  <Briefcase className="h-7 w-7 text-black" />
                </div>
                <div>
                  <span className="text-2xl font-black uppercase">JobPortal</span>
                  <span className="block text-xs font-bold text-teal-400">FOR RECRUITERS</span>
                </div>
              </div>
              <p className="font-bold uppercase text-sm text-gray-400">HIRE SMARTER. HIRE FASTER.</p>
            </div>
            <div>
              <h4 className="font-black uppercase mb-4 text-lg border-b-4 border-teal-400 inline-block pb-1">PRODUCT</h4>
              <ul className="space-y-2 text-sm font-bold uppercase">
                <li><a href="#" className="hover:text-teal-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">Integrations</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase mb-4 text-lg border-b-4 border-yellow-400 inline-block pb-1">RESOURCES</h4>
              <ul className="space-y-2 text-sm font-bold uppercase">
                <li><a href="#" className="hover:text-teal-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">Hiring Guides</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">Webinars</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase mb-4 text-lg border-b-4 border-pink-400 inline-block pb-1">SUPPORT</h4>
              <ul className="space-y-2 text-sm font-bold uppercase">
                <li><a href="#" className="hover:text-teal-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition">Contact Sales</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">Status</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Security</a></li>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IntroPage;