const express = require('express');
const router = express.Router();
const routeProtector = require('../middlewares/routeProtector');
const Job = require('../models/job'); // Add your Job model import

router.post('/create', routeProtector, async (req, res) => {
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
    } = req.body;


    if (!jobTitle || !company || !location || !workType || !jobType || !experience || !salary || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one skill'
      });
    }

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
    if (deadline) {
      const deadlineDate = new Date(deadline);
      // Set time to end of day (23:59:59)
      deadlineDate.setHours(23, 59, 59, 999);
      
      if (deadlineDate < new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Deadline cannot be in the past'
        });
      }
    }

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
      deadline: deadline ? (() => {
        const deadlineDate = new Date(deadline);
        deadlineDate.setHours(23, 59, 59, 999);
        return deadlineDate;
      })() : undefined,
      isActive: true,
      postedBy: req.userId
    });

    // Save to database
    await newJob.save();

    // Populate postedBy field for response
    await newJob.populate('postedBy', 'fullName email');

    return res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: newJob
    });

  } catch (error) {
    console.error('Error creating job:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

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

router.get('/all', async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .populate('postedBy', 'fullName email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Jobs fetched successfully',
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching jobs',
      error: error.message
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'fullName email')
      .populate('applicants.candidate', 'fullName email');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Increment view count
    await job.incrementViewCount();

    return res.status(200).json({
      success: true,
      message: 'Job fetched successfully',
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching job',
      error: error.message
    });
  }
});

// Get jobs posted by logged-in employer
router.get('/employer/my-jobs', routeProtector, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.userId })
      .populate('postedBy', 'fullName email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Your jobs fetched successfully',
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching employer jobs:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching your jobs',
      error: error.message
    });
  }
});

// Update job
router.put('/:id', routeProtector, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if the logged-in user is the owner of the job
    if (job.postedBy.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this job'
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('postedBy', 'fullName email');

    return res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob
    });
  } catch (error) {
    console.error('Error updating job:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating job',
      error: error.message
    });
  }
});

// Delete job
router.delete('/:id', routeProtector, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if the logged-in user is the owner of the job
    if (job.postedBy.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this job'
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting job',
      error: error.message
    });
  }
});

module.exports = router;