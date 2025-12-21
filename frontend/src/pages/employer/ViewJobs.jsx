import React, { useState, useEffect } from 'react';
import {
  Briefcase,Trash2, Plus, Search,
  MapPin, Calendar, Clock,Users, TrendingUp,ChevronRight,ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [expandedJob, setExpandedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/jobs/employer/my-jobs', {
        withCredentials: true
      });
      if (response.data.success) {
        setJobs(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };



  const deleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/jobs/${jobId}`, {
          withCredentials: true
        });
        
        if (response.data.success) {
          setJobs(prev => prev.filter(job => job._id !== jobId));
        }
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const getFilteredAndSortedJobs = () => {
    let filtered = jobs.filter(job => {
      const matchesSearch = searchTerm === '' || 
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && job.isActive) ||
        (statusFilter === 'inactive' && !job.isActive);
      
      return matchesSearch && matchesStatus;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.jobTitle.localeCompare(b.jobTitle);
        case 'applications':
          return (b.applicants?.length || 0) - (a.applicants?.length || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (isActive, deadline) => {
    const isExpired = deadline && new Date(deadline) < new Date();
    if (isExpired) {
      return <span className="px-2 py-1 text-xs font-bold border bg-red-100 text-red-800 border-red-300 uppercase">Expired</span>;
    }
    return isActive ? 
      <span className="px-2 py-1 text-xs font-bold border bg-green-100 text-green-800 border-green-300 uppercase">Active</span> :
      <span className="px-2 py-1 text-xs font-bold border bg-gray-100 text-gray-800 border-gray-300 uppercase">Inactive</span>;
  };

  const filteredJobs = getFilteredAndSortedJobs();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            Manage Jobs
          </h1>
          <p className="text-sm text-gray-600 font-semibold">
            Review and manage your posted jobs
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border-2 border-black p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-black font-medium placeholder-gray-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black font-medium bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Job Title A-Z</option>
              <option value="applications">Most Applications</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-gray-100 border-2 border-black px-4 py-2">
              <span className="text-sm font-black text-gray-900">
                {filteredJobs.length} Jobs
              </span>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white border-2 border-black p-8 text-center">
            <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-semibold mb-2">
              {jobs.length === 0 ? 'No jobs posted yet' : 'No jobs match your filters'}
            </p>
            <p className="text-gray-400 text-sm mb-4">
              {jobs.length === 0 ? 'Start by posting your first job' : 'Try adjusting your search criteria'}
            </p>
            {jobs.length === 0 && (
              <Link
                to="/post-job"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:bg-gray-800 transition-colors uppercase"
              >
                <Plus className="w-4 h-4" />
                Post Your First Job
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job._id} className="bg-white border-2 border-black">
                {/* Job Header */}
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Job Info and Company */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center font-black text-sm">
                          {job.jobTitle.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-gray-900 truncate">
                            {job.jobTitle}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium truncate">
                            {job.company}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {getStatusBadge(job.isActive, job.deadline)}
                      <Link
                        to={`/jobs/${job._id}`}
                        className="px-3 py-1 border-2 border-black text-xs font-bold bg-white hover:bg-black hover:text-white transition-colors"
                      >
                        View Job
                      </Link>
                      <button
                        onClick={() => deleteJob(job._id)}
                        className="p-2 border-2 border-red-300 text-red-700 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setExpandedJob(expandedJob === job._id ? null : job._id)}
                        className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
                      >
                        {expandedJob === job._id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Dropdown Job Details */}
                {expandedJob === job._id && (
                  <div className="border-t-2 border-black bg-gray-50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                      {/* Job Info Section */}
                      <div className="flex flex-col h-full p-2 md:p-0">
                        <h4 className="font-black text-lg mb-3 flex items-center gap-2 border-b pb-2 border-gray-200">
                          <Briefcase className="w-5 h-5 text-gray-700" />
                          Job Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Posted: {formatDate(job.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Deadline: {job.deadline ? formatDate(job.deadline) : 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Experience: {job.experience}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Type: {job.jobType}, {job.workType}</span>
                          </div>
                        </div>
                      </div>
                      {/* Location Column */}
                      <div className="flex flex-col h-full p-2 md:p-0 items-start md:items-center">
                        <h4 className="font-black text-lg mb-3 flex items-center gap-2 border-b pb-2 border-gray-200 w-full md:justify-center">
                          <MapPin className="w-5 h-5 text-gray-700" />
                          Location
                        </h4>
                        <span className="font-medium text-gray-800 text-base mt-2 md:mt-0">{job.location}</span>
                      </div>
                      {/* Applications Section */}
                      <div className="flex flex-col h-full p-2 md:p-0 items-start md:items-end">
                        <h4 className="font-black text-lg mb-3 flex items-center gap-2 border-b pb-2 border-gray-200 w-full md:justify-end">
                          <Users className="w-5 h-5 text-gray-700" />
                          Applications
                        </h4>
                        <div className="space-y-2 text-sm mt-2 md:mt-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Total Applied:</span>
                            <span className="font-bold text-gray-900">{job.applicants?.length || 0}</span>
                          </div>
                          {/* You can add more application-related info here if needed */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewJobs