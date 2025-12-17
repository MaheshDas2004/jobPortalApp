const express = require('express');
const router = express.Router();
const routeProtector = require('../middlewares/routeProtector');
const Application = require('../models/application');
const Job = require('../models/job');

router.post('/apply/:id', routeProtector, async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const candidateId = req.user.id;
    
    const {
      resume,
      coverLetter,
      experience,
      expectedSalary
    } = req.body;
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
      resume,
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

module.exports = router;