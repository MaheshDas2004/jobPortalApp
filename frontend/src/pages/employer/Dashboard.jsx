import React from 'react';
import { 
  Briefcase, Users, Eye, TrendingUp, Plus, Search, Filter,
  MoreVertical, Calendar, MapPin, Clock, DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const EmployerDashboard = () => {
  const { user } = useAuth();

  // Mock data - replace with real API calls
  const dashboardStats = {
    activeJobs: 12,
    totalApplications: 148,
    interviewsScheduled: 23,
    offersMade: 5
  };

  const recentJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      location: 'Bangalore, IN',
      type: 'Full-time',
      salary: '₹12-15 LPA',
      applications: 45,
      views: 234,
      postedDate: '2 days ago',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'Mumbai, IN', 
      type: 'Full-time',
      salary: '₹18-22 LPA',
      applications: 67,
      views: 189,
      postedDate: '5 days ago',
      status: 'Active'
    },
    {
      id: 3,
      title: 'UX Designer',
      location: 'Remote',
      type: 'Contract',
      salary: '₹8-12 LPA',
      applications: 23,
      views: 156,
      postedDate: '1 week ago',
      status: 'Paused'
    }
  ];

  const recentApplications = [
    {
      id: 1,
      candidateName: 'Rahul Sharma',
      jobTitle: 'Senior Frontend Developer',
      appliedDate: '2 hours ago',
      status: 'New',
      experience: '5 years'
    },
    {
      id: 2,
      candidateName: 'Priya Singh',
      jobTitle: 'Product Manager',
      appliedDate: '4 hours ago',
      status: 'Reviewed',
      experience: '7 years'
    },
    {
      id: 3,
      candidateName: 'Amit Kumar',
      jobTitle: 'UX Designer',
      appliedDate: '6 hours ago',
      status: 'Shortlisted',
      experience: '3 years'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            Welcome back, {user?.fullName}! 👋
          </h1>
          <p className="text-gray-600 font-semibold">
            Here's what's happening with your job postings today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border-2 border-black p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 border-2 border-black">
                <Briefcase className="h-6 w-6 text-blue-600" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black">{dashboardStats.activeJobs}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-600 uppercase">Active Jobs</h3>
            <p className="text-xs text-green-600 font-semibold mt-1">+2 this week</p>
          </div>

          <div className="bg-white border-2 border-black p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 border-2 border-black">
                <Users className="h-6 w-6 text-green-600" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black">{dashboardStats.totalApplications}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-600 uppercase">Applications</h3>
            <p className="text-xs text-green-600 font-semibold mt-1">+15 today</p>
          </div>

          <div className="bg-white border-2 border-black p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 border-2 border-black">
                <Calendar className="h-6 w-6 text-purple-600" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black">{dashboardStats.interviewsScheduled}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-600 uppercase">Interviews</h3>
            <p className="text-xs text-blue-600 font-semibold mt-1">5 this week</p>
          </div>

          <div className="bg-white border-2 border-black p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 border-2 border-black">
                <TrendingUp className="h-6 w-6 text-orange-600" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black">{dashboardStats.offersMade}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-600 uppercase">Offers Made</h3>
            <p className="text-xs text-green-600 font-semibold mt-1">2 accepted</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Jobs */}
          <div className="bg-white border-2 border-black shadow-lg">
            <div className="p-6 border-b-2 border-black">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black text-gray-900">Your Recent Jobs</h2>
                <a href="/post-job" className="bg-black text-white px-4 py-2 border-2 border-black hover:bg-white hover:text-black transition-colors font-bold uppercase text-sm flex items-center gap-2">
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                  Post Job
                </a>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="border-2 border-gray-200 p-4 hover:border-black transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-black text-gray-900 mb-1">{job.title}</h3>
                        <div className="flex items-center gap-4 text-xs text-gray-600 font-semibold">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" strokeWidth={2.5} />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" strokeWidth={2.5} />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" strokeWidth={2.5} />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-bold border ${job.status === 'Active' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300'}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 text-xs text-gray-600 font-semibold">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" strokeWidth={2.5} />
                          {job.applications} Applied
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" strokeWidth={2.5} />
                          {job.views} Views
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-semibold">{job.postedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white border-2 border-black shadow-lg">
            <div className="p-6 border-b-2 border-black">
              <h2 className="text-xl font-black text-gray-900">Recent Applications</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="border-2 border-gray-200 p-4 hover:border-black transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-black text-gray-900 mb-1">{application.candidateName}</h3>
                        <p className="text-sm text-gray-600 font-semibold mb-1">{application.jobTitle}</p>
                        <p className="text-xs text-gray-500 font-semibold">{application.experience} experience</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-bold border ${
                        application.status === 'New' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                        application.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                        'bg-green-100 text-green-800 border-green-300'
                      }`}>
                        {application.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-semibold">{application.appliedDate}</span>
                      <button className="text-xs font-bold text-black hover:text-gray-600 transition-colors uppercase">
                        View Profile →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white border-2 border-black p-6 shadow-lg">
          <h2 className="text-xl font-black text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/post-job" className="bg-black text-white p-4 border-2 border-black hover:bg-white hover:text-black transition-colors text-center font-bold uppercase">
              <Plus className="h-8 w-8 mx-auto mb-2" strokeWidth={2.5} />
              Post New Job
            </a>
            <button className="bg-white text-black p-4 border-2 border-black hover:bg-black hover:text-white transition-colors font-bold uppercase">
              <Search className="h-8 w-8 mx-auto mb-2" strokeWidth={2.5} />
              Search Candidates
            </button>
            <button className="bg-white text-black p-4 border-2 border-black hover:bg-black hover:text-white transition-colors font-bold uppercase">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" strokeWidth={2.5} />
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;