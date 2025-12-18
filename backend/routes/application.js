const express = require('express');
const router = express.Router();
const routeProtector = require('../middlewares/routeProtector');
const Application = require('../models/application');
const Job = require('../models/job');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resumes/'); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only PDF, DOC, and DOCX files
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype) || 
                   file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                   file.mimetype === 'application/msword';

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter
});

router.post('/apply/:id', routeProtector, upload.single('resume'), async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const candidateId = req.userId;
    
    const {
      fullName,
      email,
      mobile,
      gender,
      location,
      instituteName,
      domain,
      course,
      courseSpecialization,
      graduatingYear,
      courseDuration,
      differentlyAbled,
      userType,
      coverLetter,
      experience,
      expectedSalary
    } = req.body;

    // Get resume file path
    const resumePath = req.file ? req.file.path : null;
    
    if (!resumePath) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required"
      });
    }

    // Basic validation
    if (!fullName || !email || !mobile || !gender || !location) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Check if candidate already applied for this job
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

    // Create new application
    const newApplication = new Application({
      jobId,
      candidateId,
      fullName,
      email,
      mobile,
      gender,
      location,
      instituteName,
      domain,
      course,
      courseSpecialization,
      graduatingYear,
      courseDuration,
      differentlyAbled,
      userType,
      resume: resumePath,
      coverLetter,
      experience,
      expectedSalary,
      status: 'applied'
    });

    const savedApplication = await newApplication.save();

    // Populate the application with job and candidate details for response
    const populatedApplication = await Application.findById(savedApplication._id)
      .populate('jobId', 'jobTitle company location')
      .populate('candidateId', 'name email');

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: populatedApplication
    });

  } catch (error) {
    console.error('Error applying for job:', error);
    
    // Handle duplicate key error (in case index constraint fails)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit application. Please try again.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get applications for a specific job (for employers)
router.get('/job/:jobId', routeProtector, async (req, res) => {
  try {
    const { jobId } = req.params;
    const employerId = req.userId;

    // First verify that the job belongs to this employer
    const job = await Job.findOne({ _id: jobId, employerId });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you don't have permission to view applications"
      });
    }

    // Get all applications for this job
    const applications = await Application.find({ jobId })
      .populate('candidateId', 'fullName email phone profilePhoto')
      .populate('jobId', 'jobTitle company location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Applications retrieved successfully",
      data: {
        job: {
          _id: job._id,
          jobTitle: job.jobTitle,
          company: job.company,
          location: job.location
        },
        applications: applications,
        totalApplications: applications.length
      }
    });

  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve applications",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all applications for all jobs by an employer
router.get('/employer/all', routeProtector, async (req, res) => {
  try {
    const employerId = req.userId;

    // Get all jobs by this employer
    const jobs = await Job.find({ employerId }).select('_id jobTitle company');
    const jobIds = jobs.map(job => job._id);

    // Get all applications for these jobs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('candidateId', 'fullName email phone profilePhoto')
      .populate('jobId', 'jobTitle company location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All applications retrieved successfully",
      data: {
        applications: applications,
        totalApplications: applications.length,
        jobsCount: jobs.length
      }
    });

  } catch (error) {
    console.error('Error fetching all applications:', error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve applications",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update application status (for employers)
router.put('/:applicationId/status', routeProtector, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, employerNote } = req.body;
    const employerId = req.userId;

    // Validate status
    const validStatuses = ["applied", "shortlisted", "interview", "rejected", "selected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status provided"
      });
    }

    // Find the application and verify employer owns the job
    const application = await Application.findById(applicationId).populate('jobId');
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    if (application.jobId.employerId.toString() !== employerId) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to update this application"
      });
    }

    // Update the application
    application.status = status;
    if (employerNote) {
      application.employerNote = employerNote;
    }

    await application.save();

    // Return updated application
    const updatedApplication = await Application.findById(applicationId)
      .populate('candidateId', 'fullName email phone')
      .populate('jobId', 'jobTitle company location');

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: updatedApplication
    });

  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({
      success: false,
      message: "Failed to update application status",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;