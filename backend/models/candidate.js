const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not']
  },
  currentLocation: {
    type: String,
    trim: true
  },
  profilePhoto: {
    type: String // URL or path to uploaded image
  },
  // Professional Information
  currentJobTitle: {
    type: String,
    trim: true
  },
  currentCompany: {
    type: String,
    trim: true
  },
  yearsOfExperience: {
    type: String
  },
  currentSalary: {
    type: String
  },
  expectedSalary: {
    type: String
  },
  noticePeriod: {
    type: String,
    enum: ['Immediate', '15 Days', '30 Days', '60 Days', '90 Days']
  },
  employmentType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelance']
  },
  // Education
  highestQualification: {
    type: String,
    trim: true
  },
  fieldOfStudy: {
    type: String,
    trim: true
  },
  university: {
    type: String,
    trim: true
  },
  graduationYear: {
    type: String
  },
  // Skills and Languages
  skills: [{
    type: String,
    trim: true
  }],
  languages: [{
    type: String,
    trim: true
  }],
  // Links and Resume
  resume: {
    type: String // URL or path to uploaded resume
  },
  portfolioUrl: {
    type: String,
    trim: true
  },
  linkedinUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  websiteUrl: {
    type: String,
    trim: true
  },
  // Bio and Preferences
  bio: {
    type: String,
    trim: true
  },
  preferredJobTypes: [{
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Remote', 'Hybrid', 'Contract', 'Internship']
  }],
  preferredLocations: [{
    type: String,
    trim: true
  }],
  willingToRelocate: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Candidate', candidateSchema);