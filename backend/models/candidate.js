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
    url: String,
    filename: String,
    uploadedAt: Date
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
  // Arrays for richer data
  educationDetails: [{
    level: { type: String }, // e.g. "B.Tech", "High School"
    institution: { type: String },
    fieldOfStudy: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    grade: { type: String },
    description: { type: String }
  }],
  experienceDetails: [{
    title: { type: String },
    company: { type: String },
    location: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String }
  }],
  socialLinks: [{
    platform: { type: String }, // e.g. "LinkedIn", "GitHub", "Portfolio"
    url: { type: String }
  }],
  profileCompletion: {
    type: Number,
    default: 0
  },
  preferredJobTypes: [{
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Remote', 'Hybrid', 'Contract', 'Internship']
  }],
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
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