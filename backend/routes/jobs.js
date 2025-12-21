const express = require('express');
const router = express.Router();
const routeProtector = require('../middlewares/routeProtector');
const { validateJobCreation, validateJobUpdate } = require('../middlewares/validateJob');
const Job = require('../models/job');

router.post('/create', routeProtector, validateJobCreation, async (req, res) => {
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
      processedDeadline
    } = req.body;

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
      deadline: processedDeadline,
      isActive: true,
      postedBy: req.userId
    });

    await newJob.save();
    await newJob.populate('postedBy', 'fullName email');

    // AUTO-NOTIFY: Notify relevant candidates (demo: notifying the first 5 candidates)
    // In production, this would match skills/preferences.
    const Candidate = require('../models/candidate');
    const Notification = require('../models/notification');

    // Find up to 5 candidates (demo limit)
    const candidatesToNotify = await Candidate.find().limit(5).select('_id');

    const notifications = candidatesToNotify.map(c => ({
      userId: c._id,
      userType: 'Candidate',
      title: 'New Job Alert',
      message: `New job posted: ${newJob.jobTitle} at ${newJob.company}`,
      type: 'info'
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

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
      .populate('applicants.candidate', 'fullName email')
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
router.put('/:id', routeProtector, validateJobUpdate, async (req, res) => {
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

    // Use processedDeadline if it exists, otherwise use the original deadline
    const updateData = { ...req.body };
    if (req.body.processedDeadline) {
      updateData.deadline = req.body.processedDeadline;
      delete updateData.processedDeadline;
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('postedBy', 'fullName email');

    return res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob
    });
  } catch (error) {
    console.error('Error updating job:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

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