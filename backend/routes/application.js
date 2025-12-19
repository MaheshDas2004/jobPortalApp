const express = require('express');
const router = express.Router();
const routeProtector = require('../middlewares/routeProtector');
const Application = require('../models/application');
const Job = require('../models/job');
const { uploadResume, handleMulterError } = require('../middlewares/multerConfig');
const {
  validateApplicationData,
  validateJobExists,
  checkDuplicateApplication,
  validateStatusUpdate
} = require('../middlewares/validateApplication');

router.post('/apply/:id', routeProtector, (req, res, next) => {

  if (req.is('application/json')) {
    return next();
  }
  return uploadResume(req, res, next);
}, handleMulterError, validateApplicationData, validateJobExists, checkDuplicateApplication,
  async (req, res) => {
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
        resumePath
      } = req.body;

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
      resume: resumePath || null,
      coverLetter,
      status: 'applied'
    });

    const savedApplication = await newApplication.save();

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

router.get('/check/:jobId', routeProtector, async (req, res) => {
  try {
    const { jobId } = req.params;
    const candidateId = req.userId;

    const application = await Application.findOne({
      jobId,
      candidateId
    });

    res.status(200).json({
      success: true,
      hasApplied: !!application,
      applicationStatus: application ? application.status : null,
      applicationId: application ? application._id : null
    });

  } catch (error) {
    console.error('Error checking application status:', error);
    res.status(500).json({
      success: false,
      message: "Failed to check application status"
    });
  }
});

router.get('/job/:jobId', routeProtector, async (req, res) => {
  try {
    const { jobId } = req.params;
    const employerId = req.userId;

    // First verify that the job belongs to this employer
    const job = await Job.findOne({ _id: jobId, postedBy: employerId });
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
    const jobs = await Job.find({ postedBy: employerId }).select('_id jobTitle company');
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
router.put('/:applicationId/status', routeProtector, validateStatusUpdate, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, employerNote } = req.body;
    const employerId = req.userId;

    // Find the application and verify employer owns the job
    const application = await Application.findById(applicationId).populate('jobId');
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    if (application.jobId.postedBy.toString() !== employerId) {
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