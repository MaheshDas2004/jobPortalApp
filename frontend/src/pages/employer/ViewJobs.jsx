import React, { useState, useEffect } from 'react';
import {
  Briefcase, Eye, Edit2, Pause, Play, Trash2, Plus, Search,
  MapPin, Calendar, Clock, DollarSign, Users, TrendingUp,
  Building2, Filter, MoreVertical, ExternalLink
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

  const toggleJobStatus = async (jobId, currentStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/jobs/${jobId}/toggle-status`,
        {},
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setJobs(prev =>
          prev.map(job =>
            job._id === jobId ? { ...job, isActive: !currentStatus } : job
          )
        );
      }
    } catch (error) {
      console.error('Error toggling job status:', error);
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
      <span className="px-2 py-1 text-xs font-bold border bg-gray-100 text-gray-800 border-gray-300 uppercase">Paused</span>;
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                My Posted Jobs
              </h1>
              <p className="text-sm text-gray-600 font-semibold">
                Manage and track all your job postings
              </p>
            </div>
            <Link
              to="/post-job"
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:bg-gray-800 transition-colors uppercase"
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-2 border-black p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black font-medium bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active Jobs</option>
              <option value="inactive">Paused Jobs</option>
            </select>

            {/* Sort By */}
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
                {filteredJobs.length} of {jobs.length} Jobs
              </span>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job._id} className="bg-white border-2 border-black">
                {/* Job Header */}
                <div className="p-4 border-b-2 border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-gray-900 mb-1 line-clamp-2">{job.jobTitle}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <Building2 className="w-4 h-4" />
                        <span className="truncate">{job.company}</span>
                      </div>
                    </div>
                    {getStatusBadge(job.isActive, job.deadline)}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 font-semibold mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{job.applicants?.length || 0} Applied</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(job.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium border">
                      {job.jobType}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium border">
                      {job.workType}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium border">
                      {job.experience}
                    </span>
                  </div>
                </div>

                {/* Job Actions */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="flex items-center justify-center gap-1 px-3 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors text-xs font-bold uppercase"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </Link>
                    <button
                      onClick={() => console.log('Edit job:', job._id)}
                      className="flex items-center justify-center gap-1 px-3 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors text-xs font-bold uppercase"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => toggleJobStatus(job._id, job.isActive)}
                      className="flex items-center justify-center gap-1 px-3 py-2 border-2 border-gray-300 hover:bg-gray-100 transition-colors text-xs font-bold uppercase"
                    >
                      {job.isActive ? (
                        <><Pause className="w-3 h-3" /> Pause</>
                      ) : (
                        <><Play className="w-3 h-3" /> Resume</>
                      )}
                    </button>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="flex items-center justify-center gap-1 px-3 py-2 border-2 border-red-300 text-red-700 hover:bg-red-100 transition-colors text-xs font-bold uppercase"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewJobs;