import React from 'react';
import {
  Target, Users, Award, TrendingUp, Briefcase, Heart,
  Globe, Rocket, CheckCircle, ArrowRight, Star, Zap,
  Shield, Clock, DollarSign, Building2
} from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { number: '100+', label: 'Job Listings', icon: Briefcase },
    { number: '500+', label: 'Registered Users', icon: Users },
    { number: '50+', label: 'Companies', icon: Building2 },
    { number: '24/7', label: 'Support', icon: TrendingUp }
  ];

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We believe everyone deserves access to meaningful career opportunities that align with their skills and aspirations.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We verify every company and job posting to ensure authentic opportunities for all our users.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'Using modern web technologies to create an efficient and user-friendly job search experience.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Heart,
      title: 'People-Centric',
      description: 'Your career journey matters to us. We provide support, guidance, and resources every step of the way.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const milestones = [
    { year: '2024', event: 'Project Started', description: 'Began developing this job portal as a class project' },
    { year: '2024', event: 'Core Features', description: 'Implemented job search and user registration' },
    { year: '2024', event: 'UI Design', description: 'Created modern, responsive design interface' },
    { year: '2024', event: 'Launch Ready', description: 'Completed full-stack development with all features' }
  ];

  const features = [
    { icon: CheckCircle, text: 'Smart Job Search' },
    { icon: CheckCircle, text: 'Company Profiles' },
    { icon: CheckCircle, text: 'User-Friendly Interface' },
    { icon: CheckCircle, text: 'Responsive Design' },
    { icon: CheckCircle, text: 'Modern Technology' },
    { icon: CheckCircle, text: 'Easy Navigation' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="bg-white text-black px-6 py-2 text-sm font-black uppercase tracking-wider">
                About Us
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
              Building Careers,
              <br />
              <span className="bg-white text-black px-4 py-1 inline-block transform -skew-x-6">
                Transforming Lives
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 font-medium max-w-3xl mx-auto">
              We're on a mission to connect talented individuals with their dream careers and help companies find the perfect match.
            </p>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-4">
                    <Icon className="h-8 w-8" strokeWidth={2.5} />
                  </div>
                  <p className="text-4xl sm:text-5xl font-black mb-2">{stat.number}</p>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 font-medium">
                <p className="text-lg leading-relaxed">
                  This job portal was created as a comprehensive class project to demonstrate modern web development skills. Built using React, Node.js, and modern design principles.
                </p>
                <p className="text-lg leading-relaxed">
                  Our platform features user-friendly job search functionality, company profiles, and an intuitive interface that makes finding opportunities simple and effective.
                </p>
                <p className="text-lg leading-relaxed">
                  This project showcases full-stack development capabilities, responsive design, and best practices in modern web application development.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-black border-4 border-black p-8 transform rotate-2 hover:rotate-0 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                  alt="Team"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Our Core Values</h2>
            <p className="text-lg font-semibold text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white border-2 border-black p-6 hover:shadow-2xl transition-all group"
                >
                  <div className={`w-16 h-16 bg-linear-to-br ${value.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-black mb-3 group-hover:underline">{value.title}</h3>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Development Timeline</h2>
            <p className="text-lg font-semibold text-gray-600">Key phases of our project development</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="bg-black text-white p-6 border-2 border-black">
                  <div className="text-4xl font-black mb-4">{milestone.year}</div>
                  <h3 className="text-lg font-black mb-2">{milestone.event}</h3>
                  <p className="text-sm font-medium text-gray-300">{milestone.description}</p>
                </div>
                {index < milestones.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6" strokeWidth={3} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Why Choose Us</h2>
            <p className="text-lg font-semibold text-gray-600">Everything you need for a successful job search</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white border-2 border-black p-4 hover:bg-black hover:text-white transition-all group"
                >
                  <Icon className="h-6 w-6 shrink-0" strokeWidth={2.5} />
                  <span className="font-bold text-sm">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white border-4 border-black p-12 text-center">
            <Star className="h-16 w-16 mx-auto mb-6 text-white" strokeWidth={2.5} />
            <h3 className="text-3xl sm:text-4xl font-black mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg font-medium text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our student project that demonstrates modern web development techniques and user-friendly design.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="px-10 py-4 bg-white text-black font-black hover:bg-gray-200 transition shadow-lg flex items-center gap-2">
                <Rocket className="h-5 w-5" strokeWidth={2.5} />
                GET STARTED
              </button>
              <button className="px-10 py-4 bg-transparent text-white font-black border-2 border-white hover:bg-white hover:text-black transition flex items-center gap-2">
                <Users className="h-5 w-5" strokeWidth={2.5} />
                FOR EMPLOYERS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Final Stats Banner */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <p className="text-2xl sm:text-3xl font-black mb-2">
              A Student Project Showcasing Modern Web Development
            </p>
            <p className="text-lg font-medium opacity-90">
              Built with React, Node.js, and passion for great design
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;