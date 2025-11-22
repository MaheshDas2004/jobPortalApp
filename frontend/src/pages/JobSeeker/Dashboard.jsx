import React, { useState } from 'react';
import {
  Search, Briefcase, MapPin, Code, TrendingUp, DollarSign, Users, LayoutGrid, Zap, ShieldCheck,
  User, Aperture, MessageCircle, ArrowRight, Layers, TrendingDown, Menu, X, ChevronRight, Star,
  Bell, Bookmark, Clock, CheckCircle, AlertCircle, FileText, Calendar, Activity
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const userData = {
    name: 'Alex Johnson',
    role: 'Software Engineer',
    profileCompletion: 85,
    avatar: 'AJ'
  };

  // Recent applications
  const applications = [
    { id: 1, title: 'Senior React Developer', company: 'TechCorp', status: 'Under Review', date: '2 days ago', color: 'bg-yellow-400' },
    { id: 2, title: 'Full Stack Engineer', company: 'StartupHub', status: 'Interview Scheduled', date: '5 days ago', color: 'bg-green-400' },
    { id: 3, title: 'Frontend Lead', company: 'DesignCo', status: 'Application Sent', date: '1 week ago', color: 'bg-teal-400' },
    { id: 4, title: 'JavaScript Developer', company: 'CodeWorks', status: 'Rejected', date: '2 weeks ago', color: 'bg-red-400' },
  ];

  // Saved jobs
  const savedJobs = [
    { id: 1, title: 'Backend Engineer', company: 'DataFlow', salary: '$120k - $140k', location: 'Remote', logo: 'D' },
    { id: 2, title: 'DevOps Specialist', company: 'CloudNine', salary: '$110k - $130k', location: 'Hybrid', logo: 'C' },
    { id: 3, title: 'Product Manager', company: 'InnovateLab', salary: '$130k - $150k', location: 'NYC', logo: 'I' },
  ];

  // Recommended jobs
  const recommendedJobs = [
    { id: 1, title: 'Senior Frontend Dev', company: 'WebMasters', match: 95, salary: '$125k - $145k', logo: 'W', color: 'bg-teal-400' },
    { id: 2, title: 'React Native Dev', company: 'MobileFirst', match: 88, salary: '$115k - $135k', logo: 'M', color: 'bg-pink-400' },
    { id: 3, title: 'Tech Lead', company: 'FutureTech', match: 82, salary: '$140k - $160k', logo: 'F', color: 'bg-purple-400' },
  ];

  // Stats
  const stats = [
    { label: 'Applications', value: '12', change: '+3', icon: FileText, color: 'bg-teal-400' },
    { label: 'Interviews', value: '4', change: '+2', icon: Calendar, color: 'bg-yellow-400' },
    { label: 'Saved Jobs', value: '28', change: '+5', icon: Bookmark, color: 'bg-pink-400' },
    { label: 'Profile Views', value: '156', change: '+12', icon: Activity, color: 'bg-purple-400' },
  ];

  // Notifications
  const notifications = [
    { id: 1, text: 'Interview scheduled for Full Stack Engineer position', time: '1 hour ago', type: 'success' },
    { id: 2, text: 'Your application for Senior React Developer is under review', time: '3 hours ago', type: 'info' },
    { id: 3, text: '5 new jobs matching your profile', time: '1 day ago', type: 'info' },
  ];

  const LogoPlaceholder = ({ letter, size = 'h-12 w-12', color = 'bg-teal-400' }) => (
    <div className={`${size} ${color} border-4 border-black flex items-center justify-center text-black font-black text-lg`}>
      {letter}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header with background */}
      <div className="relative bg-gradient-to-br from-teal-400 via-yellow-400 to-pink-400 border-b-8 border-black overflow-hidden">
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, black 0px, black 3px, transparent 3px, transparent 40px),
              repeating-linear-gradient(90deg, black 0px, black 3px, transparent 3px, transparent 40px)
            `,
          }}
        ></div>
        
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 bg-white border-4 border-black flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {userData.avatar}
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-black uppercase mb-2">
                  WELCOME BACK, {userData.name.split(' ')[0]}!
                </h1>
                <p className="text-lg font-bold uppercase">{userData.role}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-black text-white font-black uppercase border-4 border-black hover:bg-white hover:text-black transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                UPDATE PROFILE
              </button>
              <button className="px-6 py-3 bg-white text-black font-black uppercase border-4 border-black hover:bg-yellow-400 transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none relative">
                <Bell className="h-5 w-5 inline mr-2" />
                NOTIFICATIONS
                <span className="absolute -top-2 -right-2 h-6 w-6 bg-red-400 border-2 border-black rounded-full flex items-center justify-center text-xs font-black">
                  3
                </span>
              </button>
            </div>
          </div>

          {/* Profile completion bar */}
          <div className="mt-6 bg-white border-4 border-black p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-black uppercase text-sm">PROFILE COMPLETION</span>
              <span className="font-black text-lg">{userData.profileCompletion}%</span>
            </div>
            <div className="h-4 bg-gray-200 border-2 border-black">
              <div 
                className="h-full bg-green-400 border-r-2 border-black transition-all"
                style={{ width: `${userData.profileCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className={`p-6 border-4 border-black ${stat.color} transform hover:-rotate-1 transition relative`}>
              <stat.icon className="h-8 w-8 mb-3 stroke-[3]" />
              <p className="text-4xl font-black mb-1">{stat.value}</p>
              <p className="text-sm font-black uppercase mb-2">{stat.label}</p>
              <span className="absolute top-2 right-2 px-2 py-1 bg-black text-white text-xs font-black border-2 border-black">
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Applications & Notifications */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Applications */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl lg:text-4xl font-black uppercase border-b-8 border-black inline-block pr-6">
                  MY APPLICATIONS
                </h2>
                <button className="px-4 py-2 border-4 border-black font-black uppercase text-sm hover:bg-gray-200 transition">
                  VIEW ALL
                </button>
              </div>
              
              <div className="space-y-4">
                {applications.map((app) => (
                  <div 
                    key={app.id}
                    className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-black uppercase mb-2">{app.title}</h3>
                        <p className="font-bold uppercase text-sm text-gray-600 mb-2">{app.company}</p>
                        <p className="text-xs font-bold uppercase text-gray-500">{app.date}</p>
                      </div>
                      <div className={`px-4 py-2 ${app.color} border-4 border-black font-black uppercase text-sm whitespace-nowrap`}>
                        {app.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended Jobs */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl lg:text-4xl font-black uppercase border-b-8 border-black inline-block pr-6">
                  RECOMMENDED FOR YOU
                </h2>
              </div>
              
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div 
                    key={job.id}
                    className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4 flex-1">
                        <LogoPlaceholder letter={job.logo} color={job.color} />
                        <div>
                          <h3 className="text-xl font-black uppercase mb-1">{job.title}</h3>
                          <p className="font-bold uppercase text-sm text-gray-600">{job.company}</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-green-400 border-4 border-black font-black text-sm">
                        {job.match}% MATCH
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="px-4 py-2 bg-yellow-400 border-4 border-black text-black text-sm font-black uppercase">
                        {job.salary}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-3 bg-teal-400 text-black font-black uppercase border-4 border-black hover:translate-x-1 hover:translate-y-1 transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                        APPLY NOW
                      </button>
                      <button className="px-4 py-3 border-4 border-black font-black uppercase hover:bg-gray-200 transition">
                        <Bookmark className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Notifications */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-black uppercase border-b-6 border-black inline-block pr-4">
                  ALERTS
                </h2>
              </div>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className={`p-4 border-4 border-black ${notif.type === 'success' ? 'bg-green-400' : 'bg-blue-400'}`}
                  >
                    <p className="font-bold uppercase text-sm mb-2">{notif.text}</p>
                    <p className="text-xs font-bold uppercase text-gray-700">{notif.time}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Saved Jobs */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl lg:text-3xl font-black uppercase border-b-6 border-black inline-block pr-4">
                  SAVED
                </h2>
                <button className="text-sm font-black uppercase hover:underline">
                  SEE ALL
                </button>
              </div>
              <div className="space-y-4">
                {savedJobs.map((job) => (
                  <div 
                    key={job.id}
                    className="bg-white border-4 border-black p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <LogoPlaceholder letter={job.logo} size="h-10 w-10" color="bg-pink-400" />
                      <div className="flex-1">
                        <h3 className="text-sm font-black uppercase mb-1 leading-tight">{job.title}</h3>
                        <p className="text-xs font-bold uppercase text-gray-600">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-yellow-400 border-2 border-black font-black uppercase">
                        {job.salary}
                      </span>
                      <span className="px-2 py-1 bg-teal-400 border-2 border-black font-black uppercase">
                        {job.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-purple-400 border-4 border-black p-6">
              <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-2">
                QUICK ACTIONS
              </h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-white border-4 border-black font-black uppercase text-sm hover:bg-yellow-400 transition text-left">
                  → BROWSE JOBS
                </button>
                <button className="w-full px-4 py-3 bg-white border-4 border-black font-black uppercase text-sm hover:bg-teal-400 transition text-left">
                  → UPDATE RESUME
                </button>
                <button className="w-full px-4 py-3 bg-white border-4 border-black font-black uppercase text-sm hover:bg-pink-400 transition text-left">
                  → JOB ALERTS
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;