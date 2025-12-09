import React, { useState } from 'react';
import {
  Briefcase, Building2, MapPin, DollarSign, Clock, Users,
  FileText, Tag, Calendar, Zap, ChevronDown, Plus, X,
  Upload, Eye, Save, Send, AlertCircle, CheckCircle2
} from 'lucide-react';

const PostJob = () => {
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
    deadline: '',
    positions: '1'
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const workTypeOptions = ['In Office', 'Remote', 'Field Work', 'Hybrid'];
  const jobTypeOptions = ['Full Time', 'Part Time', 'Contract', 'Internship'];
  const experienceOptions = [
    'Fresher',
    '0-1 Years',
    '1-3 Years',
    '3-5 Years',
    '5+ Years'
  ];

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

  const handleSubmit = (isDraft) => {
    console.log('Form submitted:', { ...formData, isDraft });
    alert(isDraft ? 'Job saved as draft!' : 'Job posted successfully!');
  };

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
            <div className="bg-white border-2 border-black p-6 sm:p-8">
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-black">FORM COMPLETION</span>
                  <span className="text-sm font-black">60%</span>
                </div>
                <div className="h-2 bg-gray-200 border-2 border-black">
                  <div className="h-full bg-black w-3/5"></div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="mb-8">
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

                  {/* Salary & Positions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div>
                      <label className="block text-sm font-black mb-2">
                        NO. OF POSITIONS
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2.5} />
                        <input
                          type="number"
                          name="positions"
                          value={formData.positions}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:border-black outline-none font-semibold"
                        />
                      </div>
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

              {/* Skills Required */}
              <div className="mb-8">
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

              {/* Job Description */}
              <div className="mb-8">
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex-1 py-4 bg-white text-black font-black border-2 border-black hover:bg-gray-100 transition flex items-center justify-center gap-2"
                >
                  <Eye className="h-5 w-5" strokeWidth={2.5} />
                  PREVIEW
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(true)}
                  className="flex-1 py-4 bg-white text-black font-black border-2 border-black hover:bg-gray-100 transition flex items-center justify-center gap-2"
                >
                  <Save className="h-5 w-5" strokeWidth={2.5} />
                  SAVE DRAFT
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(false)}
                  className="flex-1 py-4 bg-black text-white font-black border-2 border-black hover:bg-gray-900 transition flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" strokeWidth={2.5} />
                  POST JOB
                </button>
              </div>
            </div>
          </div>

          {/* Tips Sidebar */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-yellow-50 border-2 border-black p-6 sticky top-6">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5" strokeWidth={2.5} />
                POSTING TIPS
              </h3>

              <div className="space-y-4">
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
                      <h4 className="font-black text-sm mb-1">Competitive Salary</h4>
                      <p className="text-xs font-semibold text-gray-600">
                        Transparent salary ranges attract more qualified candidates.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-black p-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <div>
                      <h4 className="font-black text-sm mb-1">List Key Skills</h4>
                      <p className="text-xs font-semibold text-gray-600">
                        Be specific about technical and soft skills required.
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

export default PostJob;