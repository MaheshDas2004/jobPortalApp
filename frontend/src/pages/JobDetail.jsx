import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MapPin, Briefcase, Clock, Building2, Heart, Calendar,
  Users, TrendingUp, Award, CheckCircle2, Share2, Flag,
  ArrowLeft, ExternalLink, Mail, Phone, Globe, Linkedin,
  Twitter, Facebook, Copy, Check, AlertCircle,
  DollarSign, Target, Zap, BookOpen, Shield, Sparkles
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const JobDetail = () => {

    const {jobId}= useParams()
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [applying, setApplying] = useState(false);

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
    // Add your apply logic here
    setTimeout(() => {
      setApplying(false);
      alert('Application submitted successfully!');
    }, 1500);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = job?.jobTitle || 'Job Opportunity';
    
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculateDaysAgo = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const daysAgo = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return 'Yesterday';
    return `${daysAgo} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto mb-4"></div>
          <p className="text-lg font-bold">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white border-4 border-red-500 p-8 max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" strokeWidth={2} />
          <h2 className="text-2xl font-black mb-2">Error Loading Job</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-black text-white font-bold hover:bg-gray-800 transition"
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
          <h2 className="text-2xl font-black mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-black text-white font-bold hover:bg-gray-800 transition"
          >
            Go Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition mb-6 font-bold"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
            Back to All Jobs
          </button>

          {/* Job Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white border-4 border-white flex items-center justify-center shrink-0">
                  <Building2 className="h-8 w-8 md:h-10 md:w-10 text-black" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 leading-tight">
                    {job.jobTitle}
                  </h1>
                  <p className="text-lg md:text-xl font-bold text-gray-300 mb-3">
                    {job.company}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" strokeWidth={2.5} />
                      <span className="font-semibold">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" strokeWidth={2.5} />
                      <span className="font-semibold">{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" strokeWidth={2.5} />
                      <span className="font-semibold">{job.jobType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" strokeWidth={2.5} />
                  <span className="font-bold">{job.applicants?.length || 0} Applicants</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" strokeWidth={2.5} />
                  <span className="font-bold">{job.viewCount || 0} Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" strokeWidth={2.5} />
                  <span className="font-bold">Posted {calculateDaysAgo(job.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 lg:shrink-0 lg:w-64">
              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full py-4 bg-white text-black font-black text-lg hover:bg-gray-100 transition border-4 border-white flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {applying ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    Applying...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" strokeWidth={2.5} />
                    Apply Now
                  </>
                )}
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="flex-1 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition font-bold flex items-center justify-center gap-2"
                >
                  <Heart 
                    className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} 
                    strokeWidth={2.5} 
                  />
                  {isSaved ? 'Saved' : 'Save'}
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="py-3 px-4 border-2 border-white text-white hover:bg-white hover:text-black transition font-bold"
                  >
                    <Share2 className="h-5 w-5" strokeWidth={2.5} />
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black shadow-lg z-50">
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 font-bold text-black flex items-center gap-3 border-b-2 border-gray-200"
                      >
                        <Linkedin className="h-4 w-4" strokeWidth={2.5} />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 font-bold text-black flex items-center gap-3 border-b-2 border-gray-200"
                      >
                        <Twitter className="h-4 w-4" strokeWidth={2.5} />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 font-bold text-black flex items-center gap-3 border-b-2 border-gray-200"
                      >
                        <Facebook className="h-4 w-4" strokeWidth={2.5} />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 font-bold text-black flex items-center gap-3"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4" strokeWidth={2.5} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" strokeWidth={2.5} />
                            Copy Link
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Overview */}
            <div className="bg-white border-4 border-black p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-black flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black">Job Overview</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="h-5 w-5" strokeWidth={2.5} />
                    <span className="font-bold text-sm">Salary</span>
                  </div>
                  <p className="text-lg font-black">{job.salary || 'Not Disclosed'}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="h-5 w-5" strokeWidth={2.5} />
                    <span className="font-bold text-sm">Work Type</span>
                  </div>
                  <p className="text-lg font-black">{job.workType}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" strokeWidth={2.5} />
                    <span className="font-bold text-sm">Job Type</span>
                  </div>
                  <p className="text-lg font-black">{job.jobType}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5" strokeWidth={2.5} />
                    <span className="font-bold text-sm">Application Deadline</span>
                  </div>
                  <p className="text-lg font-black">{formatDate(job.deadline)}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {job.description && (
              <div className="bg-white border-4 border-black p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-black flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black">Job Description</h2>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </p>
                </div>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && (
              <div className="bg-white border-4 border-black p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-black flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black">Responsibilities</h2>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
                    {job.responsibilities}
                  </p>
                </div>
              </div>
            )}

            {/* Qualifications */}
            {job.qualifications && (
              <div className="bg-white border-4 border-black p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-black flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black">Qualifications</h2>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
                    {job.qualifications}
                  </p>
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-white border-4 border-black p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-black flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black">Benefits</h2>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
                    {job.benefits}
                  </p>
                </div>
              </div>
            )}

            {/* Skills Required */}
            {job.skills && job.skills.length > 0 && (
              <div className="bg-white border-4 border-black p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-black flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black">Required Skills</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gray-100 border-2 border-black text-sm md:text-base font-bold hover:bg-black hover:text-white transition cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Apply Card */}
            <div className="bg-gradient-to-br from-black to-gray-800 text-white border-4 border-black p-6 sticky top-6">
              <h3 className="text-xl font-black mb-4">Ready to Apply?</h3>
              <p className="text-sm font-medium mb-6 text-gray-300">
                Join {job.applicants?.length || 0} other applicants who have already applied for this position.
              </p>
              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full py-3 bg-white text-black font-black hover:bg-gray-100 transition mb-3 disabled:opacity-50"
              >
                {applying ? 'Processing...' : 'Apply Now'}
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="w-full py-3 border-2 border-white hover:bg-white hover:text-black transition font-bold"
              >
                {isSaved ? 'Saved ✓' : 'Save for Later'}
              </button>
            </div>

            {/* Company Info */}
            <div className="bg-white border-4 border-black p-6">
              <h3 className="text-xl font-black mb-4">About Company</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-bold text-gray-600 mb-1">Company Name</p>
                  <p className="font-black text-lg">{job.company}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-600 mb-1">Location</p>
                  <p className="font-semibold">{job.location}</p>
                </div>
                {job.postedBy && (
                  <div>
                    <p className="text-sm font-bold text-gray-600 mb-1">Posted By</p>
                    <p className="font-semibold">{job.postedBy.fullName}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Job Stats */}
            <div className="bg-white border-4 border-black p-6">
              <h3 className="text-xl font-black mb-4">Job Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-600" strokeWidth={2.5} />
                    <span className="font-bold text-sm">Applicants</span>
                  </div>
                  <span className="font-black text-lg">{job.applicants?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-gray-600" strokeWidth={2.5} />
                    <span className="font-bold text-sm">Views</span>
                  </div>
                  <span className="font-black text-lg">{job.viewCount || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-600" strokeWidth={2.5} />
                    <span className="font-bold text-sm">Posted</span>
                  </div>
                  <span className="font-black text-sm">{calculateDaysAgo(job.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Report Job */}
            <button className="w-full py-3 border-2 border-gray-300 hover:border-red-500 hover:text-red-500 transition font-bold flex items-center justify-center gap-2">
              <Flag className="h-4 w-4" strokeWidth={2.5} />
              Report This Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;