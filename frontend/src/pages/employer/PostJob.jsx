import React, { useState, useEffect, Fragment } from 'react';
import {
  Briefcase, Building2, MapPin, DollarSign, Clock,
  FileText, Tag, Calendar, Zap, ChevronDown, Plus, X,
  Send, AlertCircle, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PostJob = () => {
  const { user, isEmployee, isLoggedIn, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    workType: '',
    jobType: '',
    experience: '',
    salary: '',
    skills: [],
    description: '',
    responsibilities: '',
    qualifications: '',
    benefits: '',
    deadline: ''
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeSection, setActiveSection] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const workTypeOptions = ['In Office', 'Remote', 'Field Work', 'Hybrid'];
  const jobTypeOptions = ['Full Time', 'Part Time', 'Contract', 'Internship'];
  const experienceOptions = [
    'Fresher',
    '0-1 Years',
    '1-3 Years',
    '3-5 Years',
    '5+ Years'
  ];

  const steps = [
    { id: 1, label: 'Basic Info', icon: Briefcase, section: 'basic' },
    { id: 2, label: 'Skills', icon: Tag, section: 'skills' },
    { id: 3, label: 'Job Details', icon: FileText, section: 'details' }
  ];

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Tag },
    { id: 'details', label: 'Job Details', icon: FileText }
  ];


  useEffect(() => {
    if (user && user.companyName && !formData.company) {
      setFormData(prev => ({
        ...prev,
        company: user.companyName
      }));
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(`section-${s.id}`)
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Check authentication
      if (!isLoggedIn || !isEmployee) {
        throw new Error('Please login as an employer to post jobs.');
      }
      
      const requiredFields = ['jobTitle', 'company', 'location', 'workType', 'jobType', 'experience', 'salary'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0 || formData.skills.length === 0 || !formData.description.trim()) {
        throw new Error('Please fill all required fields before posting the job.');
      }

      // Prepare data for API (remove fields that don't exist in backend model)
      const jobData = {
        jobTitle: formData.jobTitle,
        company: formData.company,
        location: formData.location,
        workType: formData.workType,
        jobType: formData.jobType,
        experience: formData.experience,
        salary: formData.salary,
        skills: formData.skills,
        description: formData.description,
        responsibilities: formData.responsibilities || '',
        qualifications: formData.qualifications || '',
        benefits: formData.benefits || '',
        deadline: formData.deadline || null
      };

      console.log('Sending job data to backend:', jobData);

      const response = await fetch('http://localhost:3000/api/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Important for cookie-based auth
        body: JSON.stringify(jobData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }
      
      setSubmitStatus({
        type: 'success',
        message: 'Job posted successfully! Redirecting to dashboard...',
        jobId: result.data._id
      });

      // Redirect to employer dashboard after successful submission
      setTimeout(() => {
        window.location.href = '/employer/dashboard';
      }, 2000);

    } catch (error) {
      console.error('Error submitting job:', error);
      
      let errorMessage = 'Failed to submit job. Please try again.';
      
      // Handle specific error types
      if (error.message.includes('Please login')) {
        errorMessage = 'Authentication required. Please login again.';
      } else if (error.message.includes('required fields')) {
        errorMessage = 'Please fill all required fields before posting the job.';
      } else if (error.message.includes('Validation error')) {
        errorMessage = 'Please check your input data and try again.';
      } else if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.jobTitle && formData.company && formData.location && 
               formData.workType && formData.jobType && formData.experience && formData.salary;
      case 2:
        return formData.skills.length > 0;
      case 3:
        return formData.description.trim().length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
        setActiveSection(steps[currentStep].section);
      }
    } else {
      alert(`Please fill all required fields in Step ${currentStep} before proceeding.`);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setActiveSection(steps[currentStep - 2].section);
    }
  };

  const goToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
    setActiveSection(steps[stepNumber - 1].section);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border-4 border-black p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="font-semibold">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Authentication check
  if (!isLoggedIn || !isEmployee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border-4 border-black p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" strokeWidth={2} />
            <h2 className="text-2xl font-black mb-2">Access Denied</h2>
            <p className="text-gray-600 font-semibold mb-6">
              You need to be logged in as an employer to post jobs.
            </p>
            <button 
              onClick={() => window.location.href = '/employer/signin'}
              className="bg-black text-white px-6 py-3 font-bold border-2 border-black hover:bg-white hover:text-black transition-colors"
            >
              LOGIN AS EMPLOYER
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white border-b-4 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black mb-2">Post a Job</h1>
              <p className="text-gray-300 font-semibold">Find the perfect candidate for your company</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-400">Active Jobs</p>
                <p className="text-2xl font-black">24</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-400">Total Applications</p>
                <p className="text-2xl font-black">1.2K</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="flex-1">
            {/* Section Navigation */}
            <div className="bg-white border-2 border-black p-2 mb-6 sticky top-0 z-10 shadow-lg">
              <div className="flex gap-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => goToStep(sections.findIndex(s => s.id === section.id) + 1)}
                      className={`flex-1 py-3 px-4 font-black text-sm flex items-center justify-center gap-2 border-2 transition ${
                        activeSection === section.id
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-gray-300 hover:border-black'
                      }`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.5} />
                      <span className="hidden sm:inline">{section.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border-2 border-black p-6 sm:p-8">
              {/* Submit Status Message */}
              {submitStatus && (
                <div className={`mb-6 p-4 border-2 ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border-green-500 text-green-800' 
                    : 'bg-red-50 border-red-500 text-red-800'
                } font-semibold`}>
                  <div className="flex items-center gap-2">
                    {submitStatus.type === 'success' ? (
                      <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
                    ) : (
                      <AlertCircle className="h-5 w-5" strokeWidth={2.5} />
                    )}
                    {submitStatus.message}
                  </div>
                </div>
              )}

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div id="section-basic" className="mb-8 scroll-mt-24">
                  <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                    <Briefcase className="h-5 w-5" strokeWidth={2.5} />
                    BASIC INFORMATION
                  </h2>

                <div className="space-y-4">
                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-black mb-2">
                      JOB TITLE *
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Frontend Developer"
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-black mb-2">
                      COMPANY NAME *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2.5} />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your Company Name"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold"
                      />
                    </div>
                  </div>

                  {/* Location & Work Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black mb-2">
                        LOCATION *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2.5} />
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="City, State"
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2">
                        WORK TYPE *
                      </label>
                      <div className="relative">
                        <select
                          name="workType"
                          value={formData.workType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold appearance-none"
                        >
                          <option value="">Select Work Type</option>
                          {workTypeOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  {/* Job Type & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black mb-2">
                        JOB TYPE *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2.5} />
                        <select
                          name="jobType"
                          value={formData.jobType}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold appearance-none"
                        >
                          <option value="">Select Job Type</option>
                          {jobTypeOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" strokeWidth={2.5} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2">
                        EXPERIENCE *
                      </label>
                      <div className="relative">
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold appearance-none"
                        >
                          <option value="">Select Experience</option>
                          {experienceOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm font-black mb-2">
                      SALARY RANGE *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2.5} />
                      <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        placeholder="e.g. ₹5 LPA - ₹8 LPA"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold"
                      />
                    </div>
                  </div>

                  {/* Application Deadline */}
                  <div>
                    <label className="block text-sm font-black mb-2">
                      APPLICATION DEADLINE
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2.5} />
                      <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold"
                      />
                    </div>
                  </div>
                </div>
                </div>
              )}

              {/* Step 2: Skills Required */}
              {currentStep === 2 && (
                <div id="section-skills" className="mb-8 scroll-mt-24">
                  <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                    <Tag className="h-5 w-5" strokeWidth={2.5} />
                    REQUIRED SKILLS
                  </h2>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      placeholder="Add a skill (Press Enter)"
                      className="flex-1 px-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-6 py-3 bg-black text-white font-black border-2 border-black hover:bg-white hover:text-black transition flex items-center gap-2"
                    >
                      <Plus className="h-5 w-5" strokeWidth={2.5} />
                      ADD
                    </button>
                  </div>

                  {/* Skills Tags */}
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2 bg-black text-white font-bold text-sm flex items-center gap-2 border-2 border-black"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="hover:text-red-500 transition"
                          >
                            <X className="h-4 w-4" strokeWidth={2.5} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                </div>
              )}

              {/* Step 3: Job Description */}
              {currentStep === 3 && (
                <div id="section-details" className="mb-8 scroll-mt-24">
                  <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                    <FileText className="h-5 w-5" strokeWidth={2.5} />
                    JOB DETAILS
                  </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-black mb-2">
                      JOB DESCRIPTION *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the role and what the candidate will be doing..."
                      rows="5"
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-black mb-2">
                      KEY RESPONSIBILITIES
                    </label>
                    <textarea
                      name="responsibilities"
                      value={formData.responsibilities}
                      onChange={handleInputChange}
                      placeholder="List the main responsibilities (one per line)..."
                      rows="5"
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-black mb-2">
                      QUALIFICATIONS
                    </label>
                    <textarea
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleInputChange}
                      placeholder="Required qualifications and education..."
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-black mb-2">
                      BENEFITS & PERKS
                    </label>
                    <textarea
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleInputChange}
                      placeholder="Health insurance, flexible hours, etc..."
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold resize-none"
                    ></textarea>
                  </div>
                </div>
                </div>
              )}

              {/* Step Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200 mb-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-4 bg-white text-black font-black border-2 border-black hover:bg-gray-100 transition flex items-center justify-center gap-2"
                  >
                    <ChevronDown className="h-5 w-5 rotate-90" strokeWidth={2.5} />
                    PREVIOUS STEP
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`flex-1 py-4 font-black border-2 transition flex items-center justify-center gap-2 ${
                      validateStep(currentStep) 
                        ? 'bg-black text-white border-black hover:bg-gray-900' 
                        : 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                    }`}
                  >
                    NEXT STEP
                    <ChevronDown className="h-5 w-5 -rotate-90" strokeWidth={2.5} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-4 font-black border-2 transition flex items-center justify-center gap-2 ${
                      isSubmitting 
                        ? 'bg-gray-400 text-gray-700 border-gray-400 cursor-not-allowed' 
                        : 'bg-black text-white border-black hover:bg-gray-900'
                    }`}
                  >
                    <Send className="h-5 w-5" strokeWidth={2.5} />
                    {isSubmitting ? 'POSTING...' : 'POST JOB'}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Tips Sidebar */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-yellow-50 border-2 border-black p-6 sticky top-24">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5" strokeWidth={2.5} />
                POSTING TIPS
              </h3>

              <div className="space-y-4">
                {/* Step 1 Tips */}
                {currentStep === 1 && (
                  <>
                    <div className="bg-white border-2 border-black p-4">
                      <div className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                          <h4 className="font-black text-sm mb-1">Clear Job Title</h4>
                          <p className="text-xs font-semibold text-gray-600">
                            Use specific, searchable job titles that candidates will look for.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border-2 border-black p-4">
                      <div className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                          <h4 className="font-black text-sm mb-1">Company Information</h4>
                          <p className="text-xs font-semibold text-gray-600">
                            Provide accurate company name and location details.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-black p-4">
                      <div className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                          <h4 className="font-black text-sm mb-1">Competitive Salary</h4>
                          <p className="text-xs font-semibold text-gray-600">
                            Transparent salary ranges attract more qualified candidates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2 Tips */}
                {currentStep === 2 && (
                  <>
                    <div className="bg-white border-2 border-black p-4">
                      <div className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                          <h4 className="font-black text-sm mb-1">Technical Skills</h4>
                          <p className="text-xs font-semibold text-gray-600">
                            List programming languages, tools, and technologies required.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-black p-4">
                      <div className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                          <h4 className="font-black text-sm mb-1">Soft Skills</h4>
                          <p className="text-xs font-semibold text-gray-600">
                            Include communication, teamwork, and leadership abilities.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-black p-4">
                      <div className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                          <h4 className="font-black text-sm mb-1">Priority Skills</h4>
                          <p className="text-xs font-semibold text-gray-600">
                            List most important skills first for better matching.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3 Tips */}
                {currentStep === 3 && (
                  <>
                    <div className="bg-white border-2 border-black p-4">
                      <div className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                          <h4 className="font-black text-sm mb-1">Detailed Description</h4>
                          <p className="text-xs font-semibold text-gray-600">
                            Include day-to-day responsibilities and growth opportunities.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-black p-4">
                      <div className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                          <h4 className="font-black text-sm mb-1">Clear Responsibilities</h4>
                          <p className="text-xs font-semibold text-gray-600">
                            List specific tasks and expectations for the role.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-black p-4">
                      <div className="flex gap-3">
                        <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                          <h4 className="font-black text-sm mb-1">Review Before Posting</h4>
                          <p className="text-xs font-semibold text-gray-600">
                            Double-check all details for accuracy and completeness.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t-2 border-gray-300">
                <h4 className="font-black text-sm mb-3">AVERAGE STATISTICS</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-600">Applications per job</span>
                    <span className="text-black">~50-100</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-600">Time to hire</span>
                    <span className="text-black">~2-4 weeks</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-600">Response rate</span>
                    <span className="text-black">~70%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob