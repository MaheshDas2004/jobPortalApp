import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft, User, Mail, Phone, MapPin, Calendar, Briefcase,
    GraduationCap, FileText, CheckCircle, XCircle, Clock,
    Building2, AlertCircle, Download, ExternalLink, MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

const ApplicationDetails = () => {
    const { applicationId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [application, setApplication] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${API_BASE}/applications/${applicationId}`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    setApplication(response.data.data);
                } else {
                    setError('Application not found');
                }
            } catch (err) {
                console.error('Error fetching application:', err);
                setError(err.response?.data?.message || 'Failed to load application details');
            } finally {
                setIsLoading(false);
            }
        };

        if (applicationId) {
            fetchApplication();
        }
    }, [applicationId]);

    const handleStatusUpdate = async (newStatus) => {
        if (isUpdating) return;

        setIsUpdating(true);
        setUpdateSuccess(null);

        try {
            const response = await axios.put(
                `${API_BASE}/applications/${applicationId}/status`,
                { status: newStatus },
                { withCredentials: true }
            );

            if (response.data.success) {
                setApplication(prev => ({ ...prev, status: newStatus.toLowerCase() }));
                setUpdateSuccess(`Application ${newStatus.toLowerCase()} successfully!`);
            }
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update application status');
        } finally {
            setIsUpdating(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status) => {
        const styles = {
            applied: 'bg-blue-100 text-blue-800 border-blue-300',
            accepted: 'bg-green-100 text-green-800 border-green-300',
            rejected: 'bg-red-100 text-red-800 border-red-300'
        };
        const style = styles[status?.toLowerCase()] || styles.applied;
        const displayText = status === 'applied' ? 'Pending' : status;

        return (
            <span className={`px-3 py-1 text-sm font-bold border-2 ${style} uppercase`}>
                {displayText}
            </span>
        );
    };

    const handleViewResume = () => {
        if (application?.resume) {
            // Handle both full URLs and relative paths
            const resumeUrl = application.resume.startsWith('http')
                ? application.resume
                : `${API_BASE.replace('/api', '')}${application.resume}`;
            window.open(resumeUrl, '_blank');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black mx-auto mb-4"></div>
                    <p className="font-semibold text-gray-600">Loading application details...</p>
                </div>
            </div>
        );
    }

    if (error && !application) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8 bg-white border-2 border-black">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-black mb-2">Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/employer-dashboard')}
                        className="px-6 py-3 bg-black text-white font-bold uppercase hover:bg-gray-800"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const isDecided = application?.status === 'accepted' || application?.status === 'rejected';

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
                {/* Success/Error Messages */}
                {updateSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border-2 border-green-300 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-green-800 font-semibold">{updateSuccess}</p>
                    </div>
                )}

                {error && application && (
                    <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-red-800 font-semibold">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Back Button above card */}
                        <div className="mb-2">
                            <button
                                onClick={() => navigate('/employer-dashboard')}
                                className="flex items-center gap-2 text-black font-bold hover:text-gray-600 transition-colors"
                                title="Back to Dashboard"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="hidden sm:inline">Back to Dashboard</span>
                            </button>
                        </div>
                        {/* Candidate Profile Card */}
                        <div className="bg-white border-2 border-black p-6">
                            <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                                <div className="w-24 h-24 bg-gray-200 border-2 border-black flex items-center justify-center flex-shrink-0">
                                    <User className="w-12 h-12 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-black">{application?.fullName}</h2>
                                        {getStatusBadge(application?.status)}
                                    </div>
                                    <p className="text-gray-600 font-semibold">{application?.userType || 'Candidate'}</p>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-gray-200">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Email</p>
                                        <p className="font-semibold">{application?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Mobile</p>
                                        <p className="font-semibold">{application?.mobile}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Location</p>
                                        <p className="font-semibold">{application?.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Gender</p>
                                        <p className="font-semibold">{application?.gender}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                onClick={() => navigate('/employer-messages', {
                                    state: {
                                        candidateId: application?.candidateId?._id,
                                        fullName: application?.fullName,
                                        jobId: application?.jobId?._id,
                                        jobTitle: application?.jobId?.jobTitle
                                    }
                                })}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-black border-2 border-black font-bold hover:bg-black hover:text-white transition-colors"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Message Candidate
                            </button>
                        </div>

                        {/* Education Section */}
                        <div className="bg-white border-2 border-black p-6">
                            <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5" />
                                Education
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Institution</p>
                                    <p className="font-semibold">{application?.instituteName || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Domain</p>
                                    <p className="font-semibold">{application?.domain || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Course</p>
                                    <p className="font-semibold">{application?.course || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Specialization</p>
                                    <p className="font-semibold">{application?.courseSpecialization || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Graduating Year</p>
                                    <p className="font-semibold">{application?.graduatingYear || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Course Duration</p>
                                    <p className="font-semibold">{application?.courseDuration || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Cover Letter Section */}
                        {application?.coverLetter && (
                            <div className="bg-white border-2 border-black p-6">
                                <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Cover Letter
                                </h3>
                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {application.coverLetter}
                                </p>
                            </div>
                        )}

                        {/* Resume Section */}
                        <div className="bg-white border-2 border-black p-6">
                            <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Resume
                            </h3>
                            {application?.resume ? (
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={handleViewResume}
                                        className="flex items-center gap-2 px-4 py-2 bg-black text-white font-bold hover:bg-gray-800 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View Resume
                                    </button>
                                    <a
                                        href={application.resume.startsWith('http')
                                            ? application.resume
                                            : `${API_BASE.replace('/api', '')}${application.resume}`}
                                        download
                                        className="flex items-center gap-2 px-4 py-2 border-2 border-black font-bold hover:bg-gray-100 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </a>
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No resume uploaded</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Job Applied For */}
                        <div className="bg-white border-2 border-black p-6">
                            <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5" />
                                Applied For
                            </h3>
                            <div className="space-y-3">
                                <p className="font-black text-xl">{application?.jobId?.jobTitle}</p>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Building2 className="w-4 h-4" />
                                    <span className="font-semibold">{application?.jobId?.company}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="font-semibold">{application?.jobId?.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    <span className="font-semibold">Applied on {formatDate(application?.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Decision Panel */}
                        <div className="bg-white border-2 border-black p-6">
                            <h3 className="text-lg font-black uppercase mb-4">Decision</h3>

                            {isDecided ? (
                                <div className={`p-4 border-2 text-center ${application.status === 'accepted'
                                    ? 'bg-green-50 border-green-300'
                                    : 'bg-red-50 border-red-300'
                                    }`}>
                                    {application.status === 'accepted' ? (
                                        <>
                                            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                                            <p className="font-black text-xl text-green-800">Accepted</p>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-2" />
                                            <p className="font-black text-xl text-red-800">Rejected</p>
                                        </>
                                    )}
                                    <p className="text-sm text-gray-600 mt-2">Application has been decided</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-sm text-gray-600 mb-4">
                                        Make your decision on this application. The candidate will be notified.
                                    </p>
                                    <button
                                        onClick={() => handleStatusUpdate('accepted')}
                                        disabled={isUpdating}
                                        className="w-full py-3 bg-green-600 text-white font-black uppercase text-sm border-2 border-green-700 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                Accept Application
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate('rejected')}
                                        disabled={isUpdating}
                                        className="w-full py-3 bg-red-600 text-white font-black uppercase text-sm border-2 border-red-700 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-5 h-5" />
                                                Reject Application
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
    );
};

export default ApplicationDetails;
