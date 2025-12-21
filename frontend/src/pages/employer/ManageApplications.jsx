import React, { useState, useEffect } from 'react';
import {
  Users, Search, Filter, Eye, CheckCircle, XCircle, Clock,
  User, Mail, Phone, MapPin, Calendar, FileText, Download,
  ChevronDown, ChevronRight, ExternalLink, MoreVertical
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const ManageApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedApplication, setExpandedApplication] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const statusOptions = [
    { value: 'applied', label: 'Applied', color: 'bg-blue-100 text-blue-800', icon: Clock },
    { value: 'shortlisted', label: 'Shortlisted', color: 'bg-yellow-100 text-yellow-800', icon: CheckCircle },
    { value: 'interview', label: 'Interview', color: 'bg-purple-100 text-purple-800', icon: Users },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
    { value: 'selected', label: 'Selected', color: 'bg-green-100 text-green-800', icon: CheckCircle }
  ];

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/applications/employer/all', {
        withCredentials: true
      });
      if (response.data.success) {
        setApplications(response.data.data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

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

  const updateApplicationStatus = async (applicationId, newStatus) => {
    setUpdatingStatus(applicationId);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/applications/${applicationId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setApplications(prev =>
          prev.map(app =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesJob = selectedJob === 'all' || app.jobId._id === selectedJob;
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobId.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesJob && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = statusOptions.find(option => option.value === status) || statusOptions[0];
    const Icon = statusConfig.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-bold border ${statusConfig.color} uppercase`}>
        <Icon className="w-3 h-3" />
        {statusConfig.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading applications...</p>
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
            Manage Applications
          </h1>
          <p className="text-sm text-gray-600 font-semibold">
            Review and manage job applications for your posted jobs
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border-2 border-black p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-black font-medium placeholder-gray-500"
              />
            </div>

            {/* Job Filter */}
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black font-medium bg-white"
            >
              <option value="all">All Jobs</option>
              {jobs.map(job => (
                <option key={job._id} value={job._id}>
                  {job.jobTitle}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black font-medium bg-white"
            >
              <option value="all">All Status</option>
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-gray-100 border-2 border-black px-4 py-2">
              <span className="text-sm font-black text-gray-900">
                {filteredApplications.length} Applications
              </span>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white border-2 border-black p-8 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-semibold">No applications found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div key={application._id} className="bg-white border-2 border-black">
                {/* Application Header */}
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center font-black text-sm">
                          {application.fullName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-gray-900 truncate">
                            {application.fullName}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium truncate">
                            Applied for: {application.jobId.jobTitle}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {getStatusBadge(application.status)}
                      <button
                        className="px-3 py-1 border-2 border-black text-xs font-bold bg-white hover:bg-black hover:text-white transition-colors"
                        onClick={() => window.open(`/employer/application/${application._id}`, '_blank')}
                      >
                        View Application
                      </button>
                      <button
                        onClick={() => setExpandedApplication(
                          expandedApplication === application._id ? null : application._id
                        )}
                        className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
                      >
                        {expandedApplication === application._id ? 
                          <ChevronDown className="w-4 h-4" /> : 
                          <ChevronRight className="w-4 h-4" />
                        }
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedApplication === application._id && (
                  <div className="border-t-2 border-black bg-gray-50 p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div>
                        <h4 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Personal Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{application.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{application.mobile}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{application.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Applied: {formatDate(application.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <h4 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Education
                        </h4>
                        <div className="space-y-3">
                          <div className="text-sm">
                            <p><span className="font-semibold">Course:</span> {application.course}</p>
                            <p><span className="font-semibold">Institution:</span> {application.instituteName}</p>
                            <p><span className="font-semibold">Year:</span> {application.graduatingYear}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    {application.coverLetter && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <h4 className="font-black text-gray-900 mb-2">Cover Letter</h4>
                        <p className="text-sm text-gray-600 bg-white p-3 border border-gray-200 rounded">
                          {application.coverLetter}
                        </p>
                      </div>
                    )}

                    {/* Status Update Actions */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="font-black text-gray-900 mb-3">Update Status</h4>
                      <div className="flex flex-wrap gap-2">
                        {statusOptions.map((status) => (
                          <button
                            key={status.value}
                            onClick={() => updateApplicationStatus(application._id, status.value)}
                            disabled={updatingStatus === application._id || application.status === status.value}
                            className={`px-3 py-2 text-xs font-bold border-2 border-black transition-colors ${
                              application.status === status.value
                                ? 'bg-black text-white cursor-not-allowed'
                                : 'bg-white hover:bg-black hover:text-white'
                            } ${updatingStatus === application._id ? 'opacity-50 cursor-wait' : ''}`}
                          >
                            {status.label}
                          </button>
                        ))}
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

export default ManageApplications;