import React, { useState, useEffect } from "react";
import { ArrowRight, Upload, MapPin, Info, FileText, Trash2, CheckCircle, XCircle, X } from "lucide-react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const ApplicationForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, userType } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
    instituteName: "",
    differentlyAbled: "No",
    userType: "College Students",
    domain: "",
    course: "",
    courseSpecialization: "",
    graduatingYear: "",
    courseDuration: "",
    termsAccepted: false,
    coverLetter: "",
  });

  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    company: ""
  });
  const [loading, setLoading] = useState(true);
  const [candidateProfile, setCandidateProfile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user || userType !== 'candidate') {
      navigate('/cand-signin');
    }
  }, [user, userType, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const jobResponse = await axios.get(`http://localhost:3000/api/jobs/${jobId}`);
        if (jobResponse.data.success) {
          setJobDetails({
            jobTitle: jobResponse.data.data.jobTitle,
            company: jobResponse.data.data.company
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [jobId, user, userType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileUpload = (e) => {
    if (resume) {
      setErrors(prev => ({ ...prev, resume: 'You have already uploaded a resume. Remove it before uploading another.' }));
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: 'Please upload a PDF, DOC, or DOCX file' }));
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      setResume(file);
      if (errors.resume) setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.instituteName.trim()) newErrors.instituteName = "Institute name is required";
    if (!formData.domain) newErrors.domain = "Domain is required";
    if (!formData.course) newErrors.course = "Course is required";
    if (!formData.courseSpecialization) newErrors.courseSpecialization = "Specialization is required";
    if (!formData.graduatingYear) newErrors.graduatingYear = "Graduating year is required";
    if (!formData.courseDuration) newErrors.courseDuration = "Course duration is required";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept terms and conditions";
    if (!resume) newErrors.resume = "Please upload your CV/Resume";
    return newErrors;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!resume) {
      setErrors(prev => ({ ...prev, resume: 'Please upload your CV/Resume' }));
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const applicationData = new FormData();

      Object.keys(formData).forEach(key => {
        let value = formData[key];
        if (!value && value !== false) {
          return;
        }
        if (key === 'gender') {
          value = value.toLowerCase().replace(/\s+/g, '-');
        }
        if (typeof value === 'boolean') {
          value = value.toString();
        }
        applicationData.append(key, value);
      });

      if (resume) {
        applicationData.append('resume', resume);
      } else {
        throw new Error('Resume is required');
      }

      console.log('Submitting application with data:');
      for (let [key, value] of applicationData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        `http://localhost:3000/api/applications/apply/${jobId}`,
        applicationData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        setNotification({
          show: true,
          type: 'success',
          message: 'Application submitted successfully! Redirecting...'
        });
        setTimeout(() => {
          navigate(`/jobs/${jobId}`);
        }, 2000);
        setIsSuccess(true);
      } else {
        throw new Error(response.data.message || "Failed to submit application");
      }

    } catch (error) {
      console.error("Error submitting application:", error);
      
      let errorMessage = "Failed to submit application. Please try again.";
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      setNotification({
        show: true,
        type: 'error',
        message: errorMessage
      });
      alert(errorMessage);
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className={`rounded-lg border shadow-lg p-4 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {notification.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification({ show: false, type: '', message: '' })}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white shadow-md p-8">
        {isSuccess ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-green-100 border-4 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-4">Application Submitted!</h1>
            <p className="text-lg text-gray-600 mb-2">
              ✅ You have successfully applied for
            </p>
            <p className="text-xl font-bold text-black mb-8">
              {jobDetails.jobTitle} at {jobDetails.company}
            </p>
            <p className="text-gray-500 mb-8">
              The employer will review your application and get in touch if you're shortlisted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/job-portal')}
                className="px-8 py-3 bg-black text-white font-bold uppercase border-2 border-black hover:bg-white hover:text-black transition-colors"
              >
                ← Browse More Jobs
              </button>
              <button
                onClick={() => navigate('/jobs/applied')}
                className="px-8 py-3 bg-white text-black font-bold uppercase border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                View My Applications
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-800"></div>
            <span className="ml-3 text-lg font-semibold">Loading application form...</span>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-bold">
                  {jobDetails.company ? jobDetails.company.charAt(0).toUpperCase() : 'JB'}
                </div>
                <div>
                  <h2 className="font-bold text-sm">
                    {jobDetails.jobTitle || 'Job Title'}
                  </h2>
                  <p className="text-xs text-gray-600">
                    {jobDetails.company || 'Company Name'}
                  </p>
                </div>
              </div>
              <h1 className="text-2xl font-bold">Registration Form</h1>
              {candidateProfile && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ Form auto-filled with your profile data. You can modify any field as needed.
                </p>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">
                  Upload CV / Resume<span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-3">Submit your resume in doc, docx, pdf</p>
                
                {!resume ? (
                  <div className="border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition">
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Click to upload
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="border-2 border-gray-200 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">View File</p>
                          <p className="text-xs text-gray-500">{resume.name}</p>
                          <p className="text-xs text-gray-400">
                            {(resume.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setResume(null);
                          document.getElementById('resume').value = '';
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 transition"
                        title="Remove file"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
                {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Cover Letter <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Write a brief cover letter explaining why you're interested in this position and what makes you a good fit.
                </p>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Dear Hiring Manager,

I am writing to express my interest in this position because..."
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 bg-white focus:border-black focus:outline-none resize-vertical"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This helps employers understand your motivation and interest in the role.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-sm mb-4">Basic Details</h3>
                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-2">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Mahesh Das"
                    className="w-full px-4 py-2 border-2 border-gray-300 bg-white focus:border-black focus:outline-none"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-2">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="mahesh.dass3309@gmail.com"
                    className="w-full px-4 py-2 border-2 border-gray-300 bg-white focus:border-black focus:outline-none"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2">
                    Mobile<span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-2">
                    <select className="px-2 py-2 border-2 border-gray-300 bg-white focus:border-black focus:outline-none">
                      <option>🇮🇳 +91</option>
                    </select>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="9358310568"
                      className="flex-1 px-4 py-2 border-2 border-gray-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-3">
                  Gender<span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {["Female", "Male", "Transgender", "Woman", "Intersex", "Man-Binary", "Prefer not to say"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`px-4 py-2 border-2 text-sm font-semibold transition ${formData.gender === g
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                        }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2">
                  Location<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Jalandhar, Punjab, India"
                    className="w-full px-4 py-2 border-2 border-gray-300 bg-white focus:border-black focus:outline-none pr-10"
                  />
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase mb-2 block">
                  Institute Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                  placeholder="lovely proffessional university"
                  className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-100 focus:border-black focus:outline-none"
                />
                {errors.instituteName && <p className="text-red-500 text-xs mt-1">{errors.instituteName}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase mb-4 flex items-center space-x-2">
                  <span>Differently Abled<span className="text-red-500">*</span></span>
                  <Info className="h-4 w-4 text-gray-400" />
                </label>
                <div className="flex space-x-3">
                  {["No", "Yes"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, differentlyAbled: option })}
                      className={`px-6 py-2 border-2 text-sm font-semibold transition ${formData.differentlyAbled === option
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-lg mb-6 uppercase">User Details</h3>

                <div className="mb-6">
                  <label className="text-xs font-bold uppercase mb-4 block">
                    Type<span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-3">
                    {["College Students", "Professional", "Fresher"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, userType: type })}
                        className={`px-4 py-2 border-2 text-sm font-semibold transition ${formData.userType === type
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300 hover:border-black"
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-xs font-bold uppercase mb-2 block">
                    Domain<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-100 focus:border-black focus:outline-none"
                  >
                    <option value="">Select Domain</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                  </select>
                  {errors.domain && <p className="text-red-500 text-xs mt-1">{errors.domain}</p>}
                </div>

                <div className="mb-6">
                  <label className="text-xs font-bold uppercase mb-2 block">
                    Course<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-100 focus:border-black focus:outline-none"
                  >
                    <option value="">Select Course</option>
                    <option value="B.Tech/BE (Bachelor of Technology / Bachelor of Engineering)">
                      B.Tech/BE (Bachelor of Technology / Bachelor of Engineering)
                    </option>
                    <option value="M.Tech/ME">M.Tech/ME</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                  </select>
                  {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
                </div>

                <div className="mb-6">
                  <label className="text-xs font-bold uppercase mb-2 block">
                    Course Specialization<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="courseSpecialization"
                    value={formData.courseSpecialization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-100 focus:border-black focus:outline-none"
                  >
                    <option value="">Select Specialization</option>
                    <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                  </select>
                  {errors.courseSpecialization && <p className="text-red-500 text-xs mt-1">{errors.courseSpecialization}</p>}
                </div>

                <div className="mb-6">
                  <label className="text-xs font-bold uppercase mb-4 block">
                    Graduating Year<span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-3">
                    {["2026", "2027", "2028", "2029"].map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => setFormData({ ...formData, graduatingYear: year })}
                        className={`px-6 py-2 border-2 text-sm font-semibold transition ${formData.graduatingYear === year
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300 hover:border-black"
                          }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                  {errors.graduatingYear && <p className="text-red-500 text-xs mt-1">{errors.graduatingYear}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold uppercase mb-4 block">
                    Course Duration<span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-3">
                    {["3 Years", "4 Years"].map((duration) => (
                      <button
                        key={duration}
                        type="button"
                        onClick={() => setFormData({ ...formData, courseDuration: duration })}
                        className={`px-6 py-2 border-2 text-sm font-semibold transition ${formData.courseDuration === duration
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300 hover:border-black"
                          }`}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                  {errors.courseDuration && <p className="text-red-500 text-xs mt-1">{errors.courseDuration}</p>}
                </div>
              </div>

              <div className="bg-gray-50 p-6 border-2 border-gray-200">
                <h3 className="font-extrabold text-lg mb-4 uppercase">Terms & Conditions</h3>
                <label className="flex items-start space-x-4 cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I hereby confirm my consent to receive this data mentioned in this form via any form
                    mentioned with this recruiter for the opportunity for further analysis, processing, and
                    outreach. Your data will ever be used by Unstatic for providing you regular and consistent
                    updates on this opportunity. You also agree to the privacy policy and terms of use of Unstatic.
                  </span>
                </label>
                {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}
              </div>

              <div className="flex justify-between pt-8 gap-4">
                <button
                  type="button"
                  className="flex-1 px-8 py-4 border-2 border-gray-400 bg-gray-100 text-black font-bold hover:border-black hover:bg-white transition uppercase"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-8 py-4 bg-black text-white font-bold transition flex items-center justify-center space-x-2 border-2 border-black uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                  {!isSubmitting && <ArrowRight className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;