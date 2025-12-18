const Application = require('../models/application');
const Job = require('../models/job');

// Validate application form data
const validateApplicationData = (req, res, next) => {
  try {
    const {
      fullName,
      email,
      mobile,
      gender,
      location
    } = req.body;

    // Basic required fields validation
    const {
      instituteName,
      domain,
      course,
      courseSpecialization,
      graduatingYear,
      courseDuration
    } = req.body;

    if (!fullName || !email || !mobile || !gender || !location) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled (fullName, email, mobile, gender, location)"
      });
    }

    // Additional required fields validation
    if (!instituteName || !domain || !course || !courseSpecialization || !graduatingYear || !courseDuration) {
      return res.status(400).json({
        success: false,
        message: "All academic information is required (instituteName, domain, course, courseSpecialization, graduatingYear, courseDuration)"
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // Mobile validation (basic format check)
    const mobileRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid mobile number"
      });
    }

    // Gender validation
    const validGenders = ['male', 'female', 'other', 'prefer-not-to-say'];
    if (!validGenders.includes(gender.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid gender option"
      });
    }

    // Add resume path to req.body for easier access (if file exists)
    if (req.file) {
      req.body.resumePath = req.file.path;
    }

    next();
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      success: false,
      message: "Validation error occurred"
    });
  }
};

// Check if job exists and is active
const validateJobExists = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Check if job is still active (if you have a status field)
    if (job.status && job.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: "This job is no longer accepting applications"
      });
    }

    // Add job to request for later use
    req.job = job;
    next();
  } catch (error) {
    console.error('Job validation error:', error);
    res.status(500).json({
      success: false,
      message: "Error validating job"
    });
  }
};

// Check if candidate has already applied for this job
const checkDuplicateApplication = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const candidateId = req.userId;

    const existingApplication = await Application.findOne({
      jobId,
      candidateId
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job"
      });
    }

    next();
  } catch (error) {
    console.error('Duplicate check error:', error);
    res.status(500).json({
      success: false,
      message: "Error checking application status"
    });
  }
};

// Validate application status update
const validateStatusUpdate = (req, res, next) => {
  try {
    const { status, employerNote } = req.body;

    // Validate status
    const validStatuses = ["applied", "shortlisted", "interview", "rejected", "selected"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}`
      });
    }

    // Validate employer note length if provided
    if (employerNote && employerNote.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Employer note cannot exceed 500 characters"
      });
    }

    next();
  } catch (error) {
    console.error('Status validation error:', error);
    res.status(500).json({
      success: false,
      message: "Status validation error occurred"
    });
  }
};

module.exports = {
  validateApplicationData,
  validateJobExists,
  checkDuplicateApplication,
  validateStatusUpdate
};