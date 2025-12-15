const express = require('express');
const router = express.Router();
const routeProtector = require('../middlewares/routeProtector');
const Job = require('../models/Job'); // Add your Job model import

// Create a new job posting
router.post('/all', routeProtector, async (req, res) => {
  try {
    const {
      jobTitle,
      company,
      location,
      workType,
      jobType,
      experience,
      salary,
      skills,
      description,
      responsibilities,
      qualifications,
      benefits,
      deadline,
      positions,
      isDraft
    } = req.body;

    // Validate required fields
    if (!jobTitle || !company || !location || !workType || !jobType || !experience || !salary || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate skills array
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one skill'
      });
    }

    // Validate enum values
    const validWorkTypes = ['In Office', 'Remote', 'Field Work', 'Hybrid'];
    const validJobTypes = ['Full Time', 'Part Time', 'Contract', 'Internship'];
    const validExperience = ['Fresher', '0-1 Years', '1-3 Years', '3-5 Years', '5+ Years'];

    if (!validWorkTypes.includes(workType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid work type'
      });
    }

    if (!validJobTypes.includes(jobType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job type'
      });
    }

    if (!validExperience.includes(experience)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid experience level'
      });
    }

    // Validate deadline if provided
    if (deadline && new Date(deadline) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Deadline cannot be in the past'
      });
    }

    // Validate positions
    if (positions && positions < 1) {
      return res.status(400).json({
        success: false,
        message: 'Number of positions must be at least 1'
      });
    }

    // Create new job
    const newJob = new Job({
      jobTitle,
      company,
      location,
      workType,
      jobType,
      experience,
      salary,
      skills,
      description,
      responsibilities,
      qualifications,
      benefits,
      deadline: deadline ? new Date(deadline) : undefined,
      positions: positions || 1,
      isDraft: isDraft || false,
      isActive: isDraft ? false : true, // If draft, set isActive to false
      postedBy: req.user._id // Assuming routeProtector adds user to req
    });

    // Save to database
    await newJob.save();

    // Populate postedBy field for response
    await newJob.populate('postedBy', 'name email');

    return res.status(201).json({
      success: true,
      message: isDraft ? 'Job saved as draft successfully' : 'Job posted successfully',
      data: newJob
    });

  } catch (error) {
    console.error('Error creating job:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate entry detected'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error while creating job posting',
      error: error.message
    });
  }
});

module.exports = router;