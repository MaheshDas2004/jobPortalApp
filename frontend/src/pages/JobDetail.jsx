import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MapPin, Briefcase, Clock, Building2, Heart, Calendar,
  Users, TrendingUp, Award, ArrowLeft,
  AlertCircle, DollarSign
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [applying, setApplying] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchJobDetail();
  }, [jobId]);

  const fetchJobDetail = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:3000/api/jobs/${jobId}`);
      setJob(response.data.data);
      console.log('Job fetched successfully:', response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          "Failed to fetch job details. Please try again.";
      setError(errorMessage);
      console.error('Error fetching job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      alert('Application submitted successfully!');
    }, 1500);
  };



  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateDaysLeft = (dateString) => {
    if (!dateString) return 'Not specified';
    const deadline = new Date(dateString);
    const now = new Date();
    const daysLeft = Math.floor((deadline - now) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Today';
    return daysLeft;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-800 mx-auto mb-4"></div>
          <p className="text-lg font-bold">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white border-2 border-red-500 rounded-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" strokeWidth={2} />
          <h2 className="text-2xl font-bold mb-2">Error Loading Job</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition"
          >
            Go Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <div className="bg-black text-white relative overflow-hidden min-h-[300px]">
        <img 
          src="/fog.jpeg" 
          alt="Job Portal Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition mb-6 font-semibold"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2} />
            Back to All Jobs
          </button>

          <div className="flex items-start gap-4">
            {/* Company Logo */}
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-lg">
              <Building2 className="h-8 w-8 text-gray-800" strokeWidth={2} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {job.jobTitle}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-200 mb-3">
                <div className="flex items-center gap-1 font-medium">
                  <Building2 className="h-4 w-4" strokeWidth={2} />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <MapPin className="h-4 w-4" strokeWidth={2} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <Briefcase className="h-4 w-4" strokeWidth={2} />
                  <span>{job.jobType} • {job.workType}</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <Calendar className="h-4 w-4" strokeWidth={2} />
                  <span>Updated On: {formatDate(job.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action Buttons Card */}
            <div className="bg-white border-2 border-black shadow-lg p-5">
              <div className="flex gap-3">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="p-2 bg-white border-2 border-black hover:bg-black hover:text-white transition font-bold"
                >
                  <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2.5} />
                </button>
                <button
                  onClick={handleApply}
                  disabled={applying || !job.isActive || (job.deadline && new Date(job.deadline) < new Date())}
                  className={`flex-1 py-2 font-black border-2 transition uppercase text-sm ${
                    !job.isActive || (job.deadline && new Date(job.deadline) < new Date())
                      ? 'bg-red-600 text-white border-red-600 cursor-not-allowed'
                      : 'bg-black text-white border-black hover:bg-white hover:text-black disabled:opacity-50'
                  }`}
                >
                  {!job.isActive || (job.deadline && new Date(job.deadline) < new Date())
                    ? 'Job Expired'
                    : applying
                    ? 'Processing...'
                    : 'Quick Apply'
                  }
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-2 border-black shadow-lg">
              <div className="p-2">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`px-6 py-3 font-black text-sm transition ${
                      activeTab === 'description'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-500 hover:text-black'
                    }`}
                  >
                    Job Description
                  </button>
                  <button
                    onClick={() => setActiveTab('qualifications')}
                    className={`px-6 py-3 font-black text-sm transition ${
                      activeTab === 'qualifications'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-500 hover:text-black'
                    }`}
                  >
                    Qualifications
                  </button>
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`px-6 py-3 font-black text-sm transition ${
                      activeTab === 'benefits'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-500 hover:text-black'
                    }`}
                  >
                    Benefits
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Details</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {job.description}
                      </p>
                    </div>

                    {job.responsibilities && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                          Responsibilities of the Candidate:
                        </h3>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {job.responsibilities}
                        </div>
                      </div>
                    )}

                    {/* Skills Section */}
                    {job.skills && job.skills.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Skills Required:</h3>
                        <div className="flex flex-wrap gap-3">
                          {job.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-white border-2 border-black text-sm font-black text-black"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        ⚠️ If an employer asks you to pay any fee, please stop immediately. We do not charge any fee from the applicants and we do not allow other companies also to do so.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'qualifications' && (
                  <div>
                    {job.qualifications ? (
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {job.qualifications}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No qualifications specified.</p>
                    )}
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div>
                    {job.benefits ? (
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {job.benefits}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No benefits information available.</p>
                    )}
                  </div>
                )}


              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white border-2 border-black shadow-lg p-6">
              <h3 className="text-xl font-black text-black mb-4 border-l-4 border-black pl-3">
                Additional Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Job Location */}
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">Job Location(s)</h4>
                      <p className="text-base font-bold text-gray-900">{job.location}</p>
                    </div>
                  </div>
                </div>

                {/* Salary */}
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">Salary</h4>
                      <p className="text-base font-bold text-gray-900">
                        {job.salary || 'Not Disclosed'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Work Type */}
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">Work Type</h4>
                      <p className="text-sm font-medium text-gray-700">
                        {job.workType}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience Required */}
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">Experience Required</h4>
                      <p className="text-sm font-medium text-gray-700">
                        {job.experience}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Job Timing */}
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">Job Type</h4>
                      <p className="text-sm font-medium text-gray-700">
                        {job.jobType}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Application Deadline */}
                {job.deadline && (
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-600 mb-1">Application Deadline</h4>
                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(job.deadline)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Days Left Card */}
            <div className="bg-white border-2 border-black shadow-lg p-6 text-center">
              <div className="text-6xl font-black text-black mb-2">
                {calculateDaysLeft(job.deadline)}
              </div>
              <p className="text-sm font-black text-black">Days Left</p>
            </div>

            {/* Job Statistics Card */}
            <div className="bg-white border-2 border-black shadow-lg p-6">
              <h3 className="text-base font-black text-black mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-black" strokeWidth={2.5} />
                Job Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-600" strokeWidth={2} />
                    <span className="text-sm font-medium text-gray-600">Total Applicants</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {job.applicants?.length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" strokeWidth={2} />
                    <span className="text-sm font-medium text-gray-600">Posted On</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {formatDate(job.createdAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-600" strokeWidth={2} />
                    <span className="text-sm font-medium text-gray-600">Job Status</span>
                  </div>
                  <span className={`text-sm font-bold ${
                    job.isActive && (!job.deadline || new Date(job.deadline) > new Date())
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {job.isActive && (!job.deadline || new Date(job.deadline) > new Date()) 
                      ? 'Active' 
                      : 'Expired'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Company Information Card */}
            <div className="bg-white border-2 border-black shadow-lg p-6">
              <h3 className="text-base font-black text-black mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-black" strokeWidth={2.5} />
                Company Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Company Name</h4>
                  <p className="text-sm font-medium text-gray-900">{job.company}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Job Title</h4>
                  <p className="text-sm font-medium text-gray-900">{job.jobTitle}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Experience Required</h4>
                  <p className="text-sm font-medium text-gray-900">{job.experience}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Work Arrangement</h4>
                  <p className="text-sm font-medium text-gray-900">{job.workType} • {job.jobType}</p>
                </div>
              </div>
            </div>




          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;