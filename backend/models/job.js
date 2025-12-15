const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  workType: {
    type: String,
    required: true,
    enum: ['In Office', 'Remote', 'Field Work', 'Hybrid']
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time', 'Contract', 'Internship']
  },
  experience: {
    type: String,
    required: true,
    enum: ['Fresher', '0-1 Years', '1-3 Years', '3-5 Years', '5+ Years']
  },
  salary: {
    type: String,
    required: true,
    trim: true
  },
  skills: [{
    type: String,
    required: true,
    trim: true
  }],
  description: {
    type: String,  
    required: true,
    trim: true
  },
  responsibilities: {
    type: String,
    trim: true
  },
  qualifications: {
    type: String,
    trim: true
  },
  benefits: {
    type: String,
    trim: true
  },
  deadline: {
    type: Date
  },
  positions: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate', // Changed to Candidate as per your existing structure
    required: true
  },
  applicants: [{
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'],
      default: 'Applied'
    }
  }],
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});


jobSchema.index({ jobTitle: 'text', description: 'text', company: 'text' });
jobSchema.index({ location: 1 });
jobSchema.index({ workType: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ experience: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ isActive: 1 });
jobSchema.index({ isDraft: 1 });

// Virtual for application count
jobSchema.virtual('applicationCount').get(function() {
  return this.applicants.length;
});

// Method to check if application deadline has passed
jobSchema.methods.isApplicationOpen = function() {
  if (!this.deadline) return this.isActive;
  return this.isActive && new Date() <= this.deadline;
};

// Method to increment view count
jobSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

// Static method to find active jobs
jobSchema.statics.findActiveJobs = function() {
  return this.find({ 
    isActive: true,
    isDraft: false,
    $or: [
      { deadline: { $gte: new Date() } },
      { deadline: null }
    ]
  });
};

// Static method to find draft jobs
jobSchema.statics.findDraftJobs = function(userId) {
  return this.find({ 
    postedBy: userId,
    isDraft: true
  });
};

module.exports = mongoose.model('Job', jobSchema);