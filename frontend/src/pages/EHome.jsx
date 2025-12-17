import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Briefcase, MapPin, Code, TrendingUp, DollarSign, Users, LayoutGrid, Zap, ShieldCheck,
  User, Aperture, ArrowRight, Layers, ChevronRight, 
  ChevronLeft, Heart, Eye, ExternalLink, Building2, Target, BarChart3, Clock, CheckCircle2,
  UserPlus, FileText, Calendar, Award, Star, PieChart, Rocket
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const EHome = () => {
  const { user, userType, isLoggedIn, isEmployee } = useAuth();

  // Employer-specific stats
  const employerStats = [
    { label: 'Active Job Posts', value: '12', change: '+3', icon: Briefcase, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Applications', value: '248', change: '+45', icon: FileText, color: 'from-green-500 to-green-600' },
    { label: 'Interviews Scheduled', value: '23', change: '+8', icon: Calendar, color: 'from-purple-500 to-purple-600' },
    { label: 'Successful Hires', value: '5', change: '+2', icon: CheckCircle2, color: 'from-teal-500 to-teal-600' },
  ];

  // Recent job posts
  const recentJobPosts = [
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      applications: 45,
      views: 234,
      posted: '2 days ago',
      status: 'Active',
      urgency: 'High'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore',
      type: 'Full-time',
      applications: 67,
      views: 189,
      posted: '1 week ago',
      status: 'Active',
      urgency: 'Medium'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'Mumbai',
      type: 'Contract',
      applications: 23,
      views: 156,
      posted: '3 days ago',
      status: 'Draft',
      urgency: 'Low'
    }
  ];

  // Top candidates
  const topCandidates = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Full Stack Developer',
      experience: '5 years',
      skills: ['React', 'Node.js', 'Python'],
      match: '95%',
      location: 'Bangalore',
      avatar: 'PS'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      role: 'DevOps Engineer',
      experience: '3 years',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      match: '88%',
      location: 'Delhi',
      avatar: 'RK'
    },
    {
      id: 3,
      name: 'Anita Patel',
      role: 'Product Designer',
      experience: '4 years',
      skills: ['Figma', 'UI/UX', 'Research'],
      match: '92%',
      location: 'Mumbai',
      avatar: 'AP'
    }
  ];

  // Quick actions for employers
  const quickActions = [
    { title: 'Post New Job', description: 'Create and publish job listings', icon: Briefcase, link: '/post-job', color: 'bg-blue-500' },
    { title: 'Review Applications', description: 'Check new candidate applications', icon: FileText, link: '/employer-dashboard', color: 'bg-green-500' },
    { title: 'Schedule Interviews', description: 'Set up meetings with candidates', icon: Calendar, link: '/employer-dashboard', color: 'bg-purple-500' },
    { title: 'Talent Search', description: 'Find and connect with candidates', icon: Search, link: '/talent-search', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Employer Welcome */}
      <section className="bg-linear-to-r from-gray-900 via-black to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Welcome back,
              <span className="bg-white text-black px-4 py-1 inline-block transform -skew-x-6 ml-3">
                {user?.fullName?.split(' ')[0] || 'Recruiter'}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-medium">
              Your hiring dashboard is ready. Manage jobs, review candidates, and build your dream team.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white text-black p-6 border-2 border-white hover:bg-black hover:text-white hover:border-white transition-all group"
              >
                <div className={`${action.color} text-white p-3 w-12 h-12 flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-black mb-2">{action.title}</h3>
                <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-300">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Your Hiring Overview</h2>
            <p className="text-gray-600 font-semibold">Track your recruitment performance and key metrics</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {employerStats.map((stat, index) => (
              <div key={index} className="bg-white border-2 border-black p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-linear-to-r ${stat.color} text-white p-3 rounded-full`}>
                    <stat.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <span className="text-green-600 font-bold text-sm">{stat.change}</span>
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-gray-600 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Job Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Recent Job Posts</h2>
              <p className="text-gray-600 font-semibold">Manage and track your active job listings</p>
            </div>
            <Link to="/post-job" className="bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              POST NEW JOB
            </Link>
          </div>

          <div className="space-y-4">
            {recentJobPosts.map((job) => (
              <div key={job.id} className="bg-gray-50 border-2 border-gray-200 p-6 hover:border-black transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-black text-gray-900">{job.title}</h3>
                      <span className={`px-3 py-1 text-xs font-bold uppercase ${
                        job.urgency === 'High' ? 'bg-red-500 text-white' :
                        job.urgency === 'Medium' ? 'bg-yellow-500 text-black' :
                        'bg-green-500 text-white'
                      }`}>
                        {job.urgency} Priority
                      </span>
                      <span className={`px-3 py-1 text-xs font-bold uppercase ${
                        job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-600">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </span>
                      <span className="text-gray-500">{job.posted}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm font-bold text-gray-600">
                    <div className="text-center">
                      <div className="text-2xl font-black text-gray-900">{job.applications}</div>
                      <div className="uppercase">Applications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-gray-900">{job.views}</div>
                      <div className="uppercase">Views</div>
                    </div>
                    <button className="bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors">
                      MANAGE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Candidates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Top Candidates</h2>
            <p className="text-gray-600 font-semibold">AI-matched candidates perfect for your open positions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white border-2 border-black p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-black text-white flex items-center justify-center font-black">
                      {candidate.avatar}
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900">{candidate.name}</h3>
                      <p className="text-sm font-semibold text-gray-600">{candidate.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-green-600">{candidate.match}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase">Match</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                    <Award className="h-4 w-4" />
                    {candidate.experience} experience
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {candidate.location}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 text-xs font-bold uppercase">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-black text-white py-2 px-4 font-bold hover:bg-gray-800 transition-colors text-sm">
                    VIEW PROFILE
                  </button>
                  <button className="flex-1 bg-white text-black border-2 border-black py-2 px-4 font-bold hover:bg-black hover:text-white transition-colors text-sm">
                    CONTACT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">
            Ready to hire your next star employee?
          </h2>
          <p className="text-xl text-gray-300 mb-8 font-medium">
            Post a job in minutes and start receiving qualified applications today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/post-job" className="bg-white text-black px-8 py-4 font-black hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Briefcase className="h-5 w-5" />
              POST YOUR FIRST JOB
            </Link>
            <Link to="/talent-search" className="bg-transparent text-white border-2 border-white px-8 py-4 font-black hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
              <Search className="h-5 w-5" />
              SEARCH TALENT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EHome;