

import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, Briefcase, GraduationCap,
  Calendar, Upload, Save, Award, Code, Languages, FileText,
  DollarSign, Target, Building2, Link as LinkIcon, Github,
  Linkedin, Globe, Plus, X, ChevronDown, Check, Edit2, Camera
} from 'lucide-react';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: 'user@example.com',
    phone: '',
    dateOfBirth: '',
    gender: '',
    currentLocation: '',
    profilePhoto: null,
    currentJobTitle: '',
    currentCompany: '',
    yearsOfExperience: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    employmentType: '',
    highestQualification: '',
    fieldOfStudy: '',
    university: '',
    graduationYear: '',
    skills: [],
    languages: [],
    resume: null,
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    websiteUrl: '',
    bio: '',
    preferredJobTypes: [],
    preferredLocations: [],
    willingToRelocate: false
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'professional', name: 'Professional', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'skills', name: 'Skills & Languages', icon: Code },
    { id: 'links', name: 'Links & Resume', icon: LinkIcon },
    { id: 'preferences', name: 'Preferences', icon: Target }
  ];

  const employmentTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelance'];
  const noticePeriods = ['Immediate', '15 Days', '30 Days', '60 Days', '90 Days'];
  const jobTypes = ['Full-Time', 'Part-Time', 'Remote', 'Hybrid', 'Contract', 'Internship'];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !profileData.skills.includes(currentSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addLanguage = () => {
    if (currentLanguage.trim() && !profileData.languages.includes(currentLanguage.trim())) {
      setProfileData(prev => ({
        ...prev,
        languages: [...prev.languages, currentLanguage.trim()]
      }));
      setCurrentLanguage('');
    }
  };

  const removeLanguage = (langToRemove) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== langToRemove)
    }));
  };

  const addPreferredLocation = () => {
    if (currentLocation.trim() && !profileData.preferredLocations.includes(currentLocation.trim())) {
      setProfileData(prev => ({
        ...prev,
        preferredLocations: [...prev.preferredLocations, currentLocation.trim()]
      }));
      setCurrentLocation('');
    }
  };

  const removePreferredLocation = (locToRemove) => {
    setProfileData(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter(loc => loc !== locToRemove)
    }));
  };

  const toggleJobType = (type) => {
    setProfileData(prev => ({
      ...prev,
      preferredJobTypes: prev.preferredJobTypes.includes(type)
        ? prev.preferredJobTypes.filter(t => t !== type)
        : [...prev.preferredJobTypes, type]
    }));
  };

  const handleFileUpload = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      handleInputChange(field, file);
    }
  };

  const calculateProfileCompletion = () => {
    const fields = [
      profileData.fullName,
      profileData.phone,
      profileData.dateOfBirth,
      profileData.currentLocation,
      profileData.currentJobTitle,
      profileData.yearsOfExperience,
      profileData.highestQualification,
      profileData.skills.length > 0,
      profileData.bio,
      profileData.resume
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  const completion = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-8 border-b-4 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-black mb-2">Complete Your Profile</h1>
          <p className="text-gray-300 font-semibold">Help employers find you by completing your profile</p>
        </div>
      </div>

      {/* Profile Completion Banner */}
      <div className="bg-white border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-black uppercase">Profile Completion</span>
            <span className="text-2xl font-black">{completion}%</span>
          </div>
          <div className="w-full bg-gray-200 h-3 border-2 border-black">
            <div
              className="bg-black h-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black p-4 sticky top-4">
              <h3 className="text-lg font-black mb-4 pb-3 border-b-2 border-gray-200">Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold transition ${
                        activeSection === section.id
                          ? 'bg-black text-white'
                          : 'bg-white text-black hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.5} />
                      {section.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white border-2 border-black p-6 sm:p-8">
              {/* Personal Information */}
              {activeSection === 'personal' && (
                <div>
                  <h2 className="text-2xl font-black mb-6 pb-4 border-b-2 border-gray-200">
                    Personal Information
                  </h2>
                  
                  {/* Profile Photo */}
                  <div className="mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative shrink-0">
                      <div className="w-32 h-32 bg-gray-200 border-4 border-black flex items-center justify-center overflow-hidden">
                        {profileData.profilePhoto ? (
                          <img src={URL.createObjectURL(profileData.profilePhoto)} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-16 w-16 text-gray-400" strokeWidth={2} />
                        )}
                      </div>
                      <label className="absolute -bottom-2 -right-2 bg-black text-white p-2 cursor-pointer hover:bg-gray-800 transition duration-200 rounded-full">
                        <Camera className="h-4 w-4" strokeWidth={2.5} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('profilePhoto', e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="font-black text-lg mb-1">Profile Photo</h3>
                      <p className="text-sm font-medium text-gray-600 mb-2">Upload a professional photo</p>
                      <p className="text-xs font-bold text-gray-500">Max size: 2MB, JPG or PNG</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Full Name *</label>
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Email *</label>
                      <input
                        type="email"
                        value={profileData.email}
                        disabled
                        className="w-full px-4 py-3 border-2 border-gray-300 font-semibold bg-gray-100 cursor-not-allowed text-gray-600"
                      />
                    </div>                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Phone Number *</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Date of Birth</label>
                      <input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Gender</label>
                      <select
                        value={profileData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Current Location *</label>
                      <input
                        type="text"
                        value={profileData.currentLocation}
                        onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Mumbai, India"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Professional Information */}
              {activeSection === 'professional' && (
                <div>
                  <h2 className="text-2xl font-black mb-6 pb-4 border-b-2 border-gray-200">
                    Professional Information
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Current Job Title *</label>
                      <input
                        type="text"
                        value={profileData.currentJobTitle}
                        onChange={(e) => handleInputChange('currentJobTitle', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="e.g., Software Engineer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Current Company</label>
                      <input
                        type="text"
                        value={profileData.currentCompany}
                        onChange={(e) => handleInputChange('currentCompany', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="e.g., Google"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Years of Experience *</label>
                      <select
                        value={profileData.yearsOfExperience}
                        onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                      >
                        <option value="">Select Experience</option>
                        <option value="fresher">Fresher</option>
                        <option value="0-1">0-1 Year</option>
                        <option value="1-3">1-3 Years</option>
                        <option value="3-5">3-5 Years</option>
                        <option value="5-10">5-10 Years</option>
                        <option value="10+">10+ Years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Employment Type</label>
                      <select
                        value={profileData.employmentType}
                        onChange={(e) => handleInputChange('employmentType', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                      >
                        <option value="">Select Type</option>
                        {employmentTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Current Salary (LPA)</label>
                      <input
                        type="text"
                        value={profileData.currentSalary}
                        onChange={(e) => handleInputChange('currentSalary', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="e.g., 8"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Expected Salary (LPA)</label>
                      <input
                        type="text"
                        value={profileData.expectedSalary}
                        onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="e.g., 12"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-black mb-2 uppercase">Notice Period</label>
                      <select
                        value={profileData.noticePeriod}
                        onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                      >
                        <option value="">Select Notice Period</option>
                        {noticePeriods.map(period => (
                          <option key={period} value={period}>{period}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Education */}
              {activeSection === 'education' && (
                <div>
                  <h2 className="text-2xl font-black mb-6 pb-4 border-b-2 border-gray-200">
                    Education Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Highest Qualification *</label>
                      <select
                        value={profileData.highestQualification}
                        onChange={(e) => handleInputChange('highestQualification', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                      >
                        <option value="">Select Qualification</option>
                        <option value="high-school">High School</option>
                        <option value="diploma">Diploma</option>
                        <option value="bachelor">Bachelor Degree</option>
                        <option value="master">Master Degree</option>
                        <option value="phd">PhD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Field of Study</label>
                      <input
                        type="text"
                        value={profileData.fieldOfStudy}
                        onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="e.g., Computer Science"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">University/College</label>
                      <input
                        type="text"
                        value={profileData.university}
                        onChange={(e) => handleInputChange('university', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="e.g., IIT Delhi"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black mb-2 uppercase">Graduation Year</label>
                      <input
                        type="number"
                        min="1950"
                        max="2030"
                        value={profileData.graduationYear}
                        onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="e.g., 2020"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Skills & Languages */}
              {activeSection === 'skills' && (
                <div>
                  <h2 className="text-2xl font-black mb-6 pb-4 border-b-2 border-gray-200">
                    Skills & Languages
                  </h2>

                  {/* Skills */}
                  <div className="mb-8">
                    <label className="block text-sm font-black mb-3 uppercase">Technical Skills *</label>
                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                      <input
                        type="text"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        className="flex-1 px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="e.g., React, Python, AWS"
                      />
                      <button
                        onClick={addSkill}
                        className="px-6 py-3 bg-black text-white font-black hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2 shrink-0"
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                        ADD
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white font-bold text-sm rounded-md"
                        >
                          {skill}
                          <button 
                            onClick={() => removeSkill(skill)}
                            className="hover:bg-gray-700 rounded-full p-1 transition-colors duration-200"
                          >
                            <X className="h-3 w-3" strokeWidth={2.5} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="block text-sm font-black mb-3 uppercase">Languages</label>
                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                      <input
                        type="text"
                        value={currentLanguage}
                        onChange={(e) => setCurrentLanguage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                        className="flex-1 px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="e.g., English, Hindi"
                      />
                      <button
                        onClick={addLanguage}
                        className="px-6 py-3 bg-black text-white font-black hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2 shrink-0"
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                        ADD
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profileData.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 border-2 border-black font-bold text-sm rounded-md"
                        >
                          {lang}
                          <button 
                            onClick={() => removeLanguage(lang)}
                            className="hover:bg-gray-300 rounded-full p-1 transition-colors duration-200"
                          >
                            <X className="h-3 w-3" strokeWidth={2.5} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mt-8">
                    <label className="block text-sm font-black mb-3 uppercase">Professional Bio *</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows="6"
                      maxLength="500"
                      className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
                      placeholder="Write a brief summary about yourself, your experience, and what you are looking for..."
                    ></textarea>
                    <p className="text-sm font-bold text-gray-500 mt-2">{profileData.bio.length} / 500 characters</p>
                  </div>
                </div>
              )}

              {/* Links & Resume */}
              {activeSection === 'links' && (
                <div>
                  <h2 className="text-2xl font-black mb-6 pb-4 border-b-2 border-gray-200">
                    Links & Resume
                  </h2>

                  {/* Resume Upload */}
                  <div className="mb-8 p-6 border-2 border-dashed border-black bg-gray-50">
                    <div className="text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4" strokeWidth={2} />
                      <h3 className="font-black text-lg mb-2">Upload Resume *</h3>
                      <p className="text-sm font-medium text-gray-600 mb-4">
                        {profileData.resume ? profileData.resume.name : 'PDF, DOC, or DOCX (Max 5MB)'}
                      </p>
                      <label className="inline-block px-6 py-3 bg-black text-white font-black cursor-pointer hover:bg-gray-800 transition">
                        {profileData.resume ? 'CHANGE RESUME' : 'CHOOSE FILE'}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload('resume', e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <div>
                      <label className="flex text-sm font-black mb-2 uppercase items-center gap-2">
                        <Linkedin className="h-4 w-4" strokeWidth={2.5} />
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={profileData.linkedinUrl}
                        onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div>
                      <label className="flex text-sm font-black mb-2 uppercase items-center gap-2">
                        <Github className="h-4 w-4" strokeWidth={2.5} />
                        GitHub Profile
                      </label>
                      <input
                        type="url"
                        value={profileData.githubUrl}
                        onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>

                    <div>
                      <label className="flex text-sm font-black mb-2 uppercase items-center gap-2">
                        <Globe className="h-4 w-4" strokeWidth={2.5} />
                        Portfolio/Website
                      </label>
                      <input
                        type="url"
                        value={profileData.portfolioUrl}
                        onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>

                    <div>
                      <label className="flex text-sm font-black mb-2 uppercase items-center gap-2">
                        <LinkIcon className="h-4 w-4" strokeWidth={2.5} />
                        Other Website
                      </label>
                      <input
                        type="url"
                        value={profileData.websiteUrl}
                        onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences */}
              {activeSection === 'preferences' && (
                <div>
                  <h2 className="text-2xl font-black mb-6 pb-4 border-b-2 border-gray-200">
                    Job Preferences
                  </h2>

                  {/* Preferred Job Types */}
                  <div className="mb-8">
                    <label className="block text-sm font-black mb-3 uppercase">Preferred Job Types</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {jobTypes.map(type => (
                        <button
                          key={type}
                          onClick={() => toggleJobType(type)}
                          className={`px-4 py-3 font-bold text-sm border-2 transition ${
                            profileData.preferredJobTypes.includes(type)
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-black border-gray-300 hover:border-black'
                          }`}
                        >
                          {profileData.preferredJobTypes.includes(type) && (
                            <Check className="h-4 w-4 inline mr-2" strokeWidth={2.5} />
                          )}
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Locations */}
                  <div className="mb-8">
                    <label className="block text-sm font-black mb-3 uppercase">Preferred Work Locations</label>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={currentLocation}
                        onChange={(e) => setCurrentLocation(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addPreferredLocation()}
                        className="flex-1 px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="e.g., Mumbai, Bangalore"
                      />
                      <button
                        onClick={addPreferredLocation}
                        className="px-6 py-3 bg-black text-white font-black hover:bg-gray-800 transition flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                        ADD
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profileData.preferredLocations.map((loc, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 border-2 border-black font-bold text-sm"
                        >
                          <MapPin className="h-4 w-4" strokeWidth={2.5} />
                          {loc}
                          <button onClick={() => removePreferredLocation(loc)}>
                            <X className="h-4 w-4" strokeWidth={2.5} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Willing to Relocate */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profileData.willingToRelocate}
                        onChange={(e) => handleInputChange('willingToRelocate', e.target.checked)}
                        className="w-6 h-6 border-2 border-black"
                      />
                      <span className="font-black text-sm uppercase">Willing to Relocate</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-8 border-t-2 border-gray-200 flex justify-end gap-4">
                <button className="px-8 py-4 bg-white text-black font-black border-2 border-black hover:bg-gray-100 transition">
                  CANCEL
                </button>
                <button className="px-8 py-4 bg-black text-white font-black hover:bg-gray-800 transition flex items-center gap-2">
                  <Save className="h-5 w-5" strokeWidth={2.5} />
                  SAVE PROFILE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;