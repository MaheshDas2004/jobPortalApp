import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase, Users, Eye, TrendingUp, Plus, Search,
  MoreVertical, Calendar, MapPin, Clock, IndianRupee,
  Edit2, Play, ExternalLink, X, RefreshCw,
  Building2, ChevronRight, AlertCircle, CheckCircle2,
  FileText, User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

const EmployerDashboard = () => {
  const { user, checkAuthStatus } = useAuth();
  const navigate = useNavigate();

  // State for jobs and applications
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // State for modals
  const [editingJob, setEditingJob] = useState(null);
  const [viewingApplication, setViewingApplication] = useState(null);
  const [showProfilePanel, setShowProfilePanel] = useState(false);

  // Calculate dashboard metrics from real dat
  const dashboardStats = {
    activeJobs: jobs.filter(job => job.isActive).length,
    totalApplications: applications.length,
    shortlisted: applications.filter(app => app.status === 'shortlisted').length,
    jobsCreated: jobs.length
  };

  // Fetch employer's jobs
  const fetchJobs = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/jobs/employer/my-jobs`, {
        withCredentials: true
      });
      if (response.data.success) {
        setJobs(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      throw err;
    }
  }, []);

  // Fetch applications for employer's jobs
  const fetchApplications = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/applications/employer/all`, {
        withCredentials: true
      });
      if (response.data.success) {
        setApplications(response.data.data?.applications || []);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      throw err;
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([fetchJobs(), fetchApplications()]);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchJobs, fetchApplications]);

  // Refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([fetchJobs(), fetchApplications()]);
    } catch (err) {
      setError('Failed to refresh data.');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Pause/resume logic removed

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  // Get application count for a job
  const getApplicationCount = (jobId) => {
    return applications.filter(app => app.jobId?._id === jobId).length;
  };

  // Status badge component
  const StatusBadge = ({ status, type = 'job' }) => {
    const jobStyles = {
      active: 'bg-green-100 text-green-800 border-green-300',
      closed: 'bg-gray-100 text-gray-800 border-gray-300'
    };

    const appStyles = {
      applied: 'bg-blue-100 text-blue-800 border-blue-300',
      accepted: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    };

    const styles = type === 'job' ? jobStyles : appStyles;
    const normalizedStatus = status?.toLowerCase();
    const style = styles[normalizedStatus] || 'bg-gray-100 text-gray-800 border-gray-300';
    
    const displayText = normalizedStatus === 'applied' ? 'New' :
      normalizedStatus === 'accepted' ? 'Accepted' :
        normalizedStatus === 'rejected' ? 'Rejected' : status;

    return (
      <span className={`px-2 py-1 text-xs font-bold border ${style} uppercase`}>
        {displayText}
      </span>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-10 w-10 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-1 sm:mb-2">
                Welcome back, {user?.fullName?.split(' ')[0]}! 👋
              </h1>
              <p className="text-sm sm:text-base text-gray-600 font-semibold">
                Here's what's happening with your job postings.
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 sm:p-3 border-2 border-black bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 ${isRefreshing ? 'animate-spin' : ''}`} strokeWidth={2.5} />
              </button>
              <a
                href="/post-job"
                className="bg-black text-white px-3 sm:px-4 py-2 sm:py-3 border-2 border-black hover:bg-white hover:text-black transition-colors font-bold uppercase text-xs sm:text-sm flex items-center gap-2"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                <span className="hidden sm:inline">Post Job</span>
              </a>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800 font-semibold">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-100 border-2 border-black">
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" strokeWidth={2.5} />
              </div>
              <span className="text-xl sm:text-2xl font-black">{dashboardStats.activeJobs}</span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase">Active Jobs</h3>
          </div>

          <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-green-100 border-2 border-black">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" strokeWidth={2.5} />
              </div>
              <span className="text-xl sm:text-2xl font-black">{dashboardStats.totalApplications}</span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase">Applications</h3>
          </div>

          <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-purple-100 border-2 border-black">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" strokeWidth={2.5} />
              </div>
              <span className="text-xl sm:text-2xl font-black">{dashboardStats.shortlisted}</span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase">Shortlisted</h3>
          </div>

          <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-orange-100 border-2 border-black">
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" strokeWidth={2.5} />
              </div>
              <span className="text-xl sm:text-2xl font-black">{dashboardStats.jobsCreated}</span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase">Jobs Created</h3>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Your Jobs Section */}
          <div className="bg-white border-2 border-black shadow-lg">
            <div className="p-4 sm:p-6 border-b-2 border-black">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-black text-gray-900">Your Jobs</h2>
                <span className="text-xs sm:text-sm text-gray-500 font-semibold">{jobs.length} total</span>
              </div>
            </div>
            <div className="p-4 sm:p-6 max-h-[500px] overflow-y-auto">
              {jobs.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-semibold mb-4">No jobs posted yet</p>
                  <a
                    href="/post-job"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white font-bold text-sm"
                  >
                    <Plus className="h-4 w-4" /> Post Your First Job
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job._id} className="border-2 border-gray-200 p-3 sm:p-4 hover:border-black transition-colors">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-gray-900 mb-1 truncate">{job.jobTitle}</h3>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-600 font-semibold">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 flex-shrink-0" strokeWidth={2.5} />
                              <span className="truncate max-w-[100px] sm:max-w-none">{job.location}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" strokeWidth={2.5} />
                              {job.jobType}
                            </span>
                            <span className="hidden sm:flex items-center gap-1">
                              <IndianRupee className="h-3 w-3" strokeWidth={2.5} />
                              {typeof job.salary === 'string' ? job.salary.replace('$', 'INR') : job.salary}
                            </span>
                          </div>
                        </div>
                        <StatusBadge status={job.isActive ? 'active' : 'closed'} type="job" />
                      </div>

                      {/* Job Stats */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-600 font-semibold mb-3">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" strokeWidth={2.5} />
                          {getApplicationCount(job._id)} Applied
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" strokeWidth={2.5} />
                          {job.viewCount || 0} Views
                        </span>
                        <span className="text-gray-400">{formatDate(job.createdAt)}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setEditingJob(job)}
                          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                        >
                          <Edit2 className="h-3 w-3" /> Edit
                        </button>
                        {/* Pause/Resume button removed */}
                        <a
                          href={`/jobs/${job._id}`}
                          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" /> View
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Applications Section */}
          <div className="bg-white border-2 border-black shadow-lg">
            <div className="p-4 sm:p-6 border-b-2 border-black">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-black text-gray-900">Recent Applications</h2>
                <span className="text-xs sm:text-sm text-gray-500 font-semibold">{applications.length} total</span>
              </div>
            </div>
            <div className="p-4 sm:p-6 max-h-[500px] overflow-y-auto">
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-semibold">No applications yet</p>
                  <p className="text-xs text-gray-400 mt-1">Applications will appear here when candidates apply</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.slice(0, 10).map((application) => (
                    <div key={application._id} className="border-2 border-gray-200 p-3 sm:p-4 hover:border-black transition-colors">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-gray-900 mb-1 truncate">
                            {application.fullName || application.candidateId?.fullName || 'Unknown Candidate'}
                          </h3>
                          <p className="text-sm text-gray-600 font-semibold mb-1 truncate">
                            {application.jobId?.jobTitle || 'Unknown Job'}
                          </p>
                          <p className="text-xs text-gray-500 font-semibold">
                            {application.instituteName || 'N/A'} • {application.course || 'N/A'}
                          </p>
                        </div>
                        <StatusBadge status={application.status} type="application" />
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-400 font-semibold">{formatDate(application.createdAt)}</span>
                        <button
                          onClick={() => navigate(`/employer/application/${application._id}`)}
                          className="text-xs font-bold text-black hover:text-gray-600 transition-colors uppercase flex items-center gap-1"
                        >
                          View Application <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Job Modal */}
      {editingJob && (
        <EditJobModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={async (updatedJob) => {
            try {
              const response = await axios.put(
                `${API_BASE}/jobs/${editingJob._id}`,
                updatedJob,
                { withCredentials: true }
              );
              if (response.data.success) {
                setJobs(prev => prev.map(j =>
                  j._id === editingJob._id ? response.data.data : j
                ));
                setEditingJob(null);
              }
            } catch (err) {
              console.error('Error updating job:', err);
              alert('Failed to update job');
            }
          }}
        />
      )}

      {/* Application Detail Panel */}
      {viewingApplication && (
        <ApplicationDetailPanel
          application={viewingApplication}
          onClose={() => setViewingApplication(null)}
          onStatusUpdate={async (applicationId, newStatus) => {
            try {
              const response = await axios.put(
                `${API_BASE}/applications/${applicationId}/status`,
                { status: newStatus },
                { withCredentials: true }
              );
              if (response.data.success) {
                setApplications(prev => prev.map(app =>
                  app._id === applicationId ? { ...app, status: newStatus } : app
                ));
                setViewingApplication(prev => prev ? { ...prev, status: newStatus } : null);
              }
            } catch (err) {
              console.error('Error updating application status:', err);
              alert('Failed to update status');
            }
          }}
        />
      )}

      {/* Employer Profile Panel */}
      {showProfilePanel && (
        <EmployerProfilePanel
          user={user}
          onClose={() => setShowProfilePanel(false)}
          onSave={async (profileData) => {
            try {
              const response = await axios.put(
                `${API_BASE}/auth/employer/profile`,
                profileData,
                { withCredentials: true }
              );
              if (response.data.message === "Profile updated successfully") {
                await checkAuthStatus(true);
                setShowProfilePanel(false);
              }
            } catch (err) {
              console.error('Error updating profile:', err);
              alert('Failed to update profile');
            }
          }}
        />
      )}
    </div>
  );
};

// Edit Job Modal Component
const EditJobModal = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    jobTitle: job.jobTitle || '',
    company: job.company || '',
    location: job.location || '',
    workType: job.workType || 'In Office',
    jobType: job.jobType || 'Full Time',
    experience: job.experience || 'Fresher',
    salary: job.salary || '',
    description: job.description || '',
    skills: job.skills || []
  });
  const [isSaving, setIsSaving] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white border-2 border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b-2 border-black p-4 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase">Edit Job</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-black uppercase mb-1">Job Title</label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
              className="w-full p-2 border-2 border-black font-bold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black uppercase mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full p-2 border-2 border-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-black uppercase mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full p-2 border-2 border-black"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black uppercase mb-1">Work Type</label>
              <select
                value={formData.workType}
                onChange={(e) => setFormData(prev => ({ ...prev, workType: e.target.value }))}
                className="w-full p-2 border-2 border-black bg-white"
              >
                <option value="In Office">In Office</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Field Work">Field Work</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-black uppercase mb-1">Job Type</label>
              <select
                value={formData.jobType}
                onChange={(e) => setFormData(prev => ({ ...prev, jobType: e.target.value }))}
                className="w-full p-2 border-2 border-black bg-white"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black uppercase mb-1">Experience</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full p-2 border-2 border-black bg-white"
              >
                <option value="Fresher">Fresher</option>
                <option value="0-1 Years">0-1 Years</option>
                <option value="1-3 Years">1-3 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-black uppercase mb-1">Salary</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                className="w-full p-2 border-2 border-black"
                placeholder="e.g. ₹8-12 LPA"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-black uppercase mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border-2 border-black min-h-[100px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-black uppercase mb-1">Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 p-2 border-2 border-black"
                placeholder="Add a skill"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-black text-white font-bold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, i) => (
                <span key={i} className="flex items-center gap-2 px-3 py-1 border-2 border-black bg-gray-100 font-bold text-sm">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t-2 border-black">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-black font-black uppercase hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-black text-white border-2 border-black font-black uppercase hover:bg-gray-800 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Application Detail Panel Component
const ApplicationDetailPanel = ({ application, onClose, onStatusUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await onStatusUpdate(application._id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const isAlreadyDecided = application.status === 'accepted' || application.status === 'rejected';

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[70] shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 border-b-2 border-black p-4 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase">Application Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Candidate Info */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 border-2 border-black flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h3 className="text-xl font-black">{application.fullName}</h3>
                <p className="text-gray-600 font-semibold">{application.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-black uppercase text-xs text-gray-500">Mobile</span>
                <p className="font-semibold">{application.mobile}</p>
              </div>
              <div>
                <span className="font-black uppercase text-xs text-gray-500">Gender</span>
                <p className="font-semibold">{application.gender}</p>
              </div>
              <div>
                <span className="font-black uppercase text-xs text-gray-500">Location</span>
                <p className="font-semibold">{application.location}</p>
              </div>
              <div>
                <span className="font-black uppercase text-xs text-gray-500">User Type</span>
                <p className="font-semibold">{application.userType}</p>
              </div>
            </div>
          </div>

          {/* Job Applied For */}
          <div className="mb-6 p-4 bg-gray-50 border-2 border-black">
            <h4 className="font-black uppercase text-sm mb-2">Applied For</h4>
            <p className="font-bold">{application.jobId?.jobTitle}</p>
            <p className="text-sm text-gray-600">{application.jobId?.company} • {application.jobId?.location}</p>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h4 className="font-black uppercase text-sm mb-3">Education</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-bold">Institution:</span> {application.instituteName}</p>
              <p><span className="font-bold">Course:</span> {application.course}</p>
              <p><span className="font-bold">Specialization:</span> {application.courseSpecialization}</p>
              <p><span className="font-bold">Graduating Year:</span> {application.graduatingYear}</p>
              <p><span className="font-bold">Domain:</span> {application.domain}</p>
            </div>
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="mb-6">
              <h4 className="font-black uppercase text-sm mb-3">Cover Letter</h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
            </div>
          )}

          {/* Resume Link */}
          {application.resume && (
            <div className="mb-6">
              <h4 className="font-black uppercase text-sm mb-3">Resume</h4>
              <a
                href={application.resume?.startsWith('http') ? application.resume : `${API_BASE.replace('/api', '')}${application.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black font-bold text-sm hover:bg-black hover:text-white"
              >
                <FileText className="w-4 h-4" /> View Resume
              </a>
            </div>
          )}

          {/* Decision Buttons */}
          <div className="border-t-2 border-black pt-6">
            <h4 className="font-black uppercase text-sm mb-4">Decision</h4>

            {isAlreadyDecided ? (
              <div className={`p-4 border-2 text-center ${application.status === 'accepted'
                ? 'bg-green-50 border-green-300'
                : 'bg-red-50 border-red-300'
                }`}>
                <p className="font-bold text-lg">
                  {application.status === 'accepted' ? '✅ Accepted' : '❌ Rejected'}
                </p>
                <p className="text-sm text-gray-600 mt-1">This application has been decided</p>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => handleStatusChange('accepted')}
                  disabled={isUpdating}
                  className="flex-1 py-3 bg-green-600 text-white font-black uppercase text-sm border-2 border-green-700 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUpdating ? 'Processing...' : '✅ Accept'}
                </button>
                <button
                  onClick={() => handleStatusChange('rejected')}
                  disabled={isUpdating}
                  className="flex-1 py-3 bg-red-600 text-white font-black uppercase text-sm border-2 border-red-700 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUpdating ? 'Processing...' : '❌ Reject'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Employer Profile Panel Component
const EmployerProfilePanel = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    mobile: user?.mobile || '',
    companyName: user?.companyName || '',
    companyDescription: user?.companyDescription || '',
    industry: user?.industry || '',
    companyLocation: user?.companyLocation || '',
    website: user?.website || ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[70] shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 border-b-2 border-black p-4 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase">Company Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-black uppercase mb-1">Your Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              className="w-full p-2 border-2 border-black font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-black uppercase mb-1">Mobile</label>
            <input
              type="text"
              value={formData.mobile}
              onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
              className="w-full p-2 border-2 border-black"
              placeholder="10-digit mobile number"
            />
          </div>

          <hr className="border-gray-300" />

          <div>
            <label className="block text-sm font-black uppercase mb-1">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              className="w-full p-2 border-2 border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-black uppercase mb-1">Company Description</label>
            <textarea
              value={formData.companyDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, companyDescription: e.target.value }))}
              className="w-full p-2 border-2 border-black min-h-[100px]"
              placeholder="Brief description of your company..."
            />
          </div>

          <div>
            <label className="block text-sm font-black uppercase mb-1">Industry</label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
              className="w-full p-2 border-2 border-black"
              placeholder="e.g. Technology, Healthcare, Finance"
            />
          </div>

          <div>
            <label className="block text-sm font-black uppercase mb-1">Company Location</label>
            <input
              type="text"
              value={formData.companyLocation}
              onChange={(e) => setFormData(prev => ({ ...prev, companyLocation: e.target.value }))}
              className="w-full p-2 border-2 border-black"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-black uppercase mb-1">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              className="w-full p-2 border-2 border-black"
              placeholder="https://yourcompany.com"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t-2 border-black">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-black font-black uppercase hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-black text-white border-2 border-black font-black uppercase hover:bg-gray-800 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployerDashboard;