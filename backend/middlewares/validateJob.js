const validateJobCreation = (req, res, next) => {
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
      deadline
    } = req.body;

    // Check required fields
    const requiredFields = {
      jobTitle,
      company,
      location,
      workType,
      jobType,
      experience,
      salary,
      description
    };

    const missingFields = [];
    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate skills array
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one skill'
      });
    }

    // Validate skills array content
    const invalidSkills = skills.filter(skill => 
      !skill || typeof skill !== 'string' || skill.trim() === ''
    );
    
    if (invalidSkills.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'All skills must be non-empty strings'
      });
    }

    // Validate enum values
    const validWorkTypes = ['In Office', 'Remote', 'Field Work', 'Hybrid'];
    const validJobTypes = ['Full Time', 'Part Time', 'Contract', 'Internship'];
    const validExperience = ['Fresher', '0-1 Years', '1-3 Years', '3-5 Years', '5+ Years'];

    if (!validWorkTypes.includes(workType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid work type. Valid options: ${validWorkTypes.join(', ')}`
      });
    }

    if (!validJobTypes.includes(jobType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid job type. Valid options: ${validJobTypes.join(', ')}`
      });
    }

    if (!validExperience.includes(experience)) {
      return res.status(400).json({
        success: false,
        message: `Invalid experience level. Valid options: ${validExperience.join(', ')}`
      });
    }

    // Validate text field lengths
    const textFieldLimits = {
      jobTitle: { max: 200, field: 'Job title' },
      company: { max: 100, field: 'Company name' },
      location: { max: 100, field: 'Location' },
      salary: { max: 50, field: 'Salary' },
      description: { max: 2000, field: 'Description' }
    };

    for (const [fieldName, config] of Object.entries(textFieldLimits)) {
      const value = req.body[fieldName];
      if (value && value.length > config.max) {
        return res.status(400).json({
          success: false,
          message: `${config.field} must not exceed ${config.max} characters`
        });
      }
    }

    // Validate optional text fields if provided
    const optionalTextFields = {
      responsibilities: { max: 2000, field: 'Responsibilities' },
      qualifications: { max: 2000, field: 'Qualifications' },
      benefits: { max: 1000, field: 'Benefits' }
    };

    for (const [fieldName, config] of Object.entries(optionalTextFields)) {
      const value = req.body[fieldName];
      if (value && typeof value === 'string' && value.length > config.max) {
        return res.status(400).json({
          success: false,
          message: `${config.field} must not exceed ${config.max} characters`
        });
      }
    }

    // Validate deadline if provided
    if (deadline) {
      const deadlineDate = new Date(deadline);
      
      // Check if valid date
      if (isNaN(deadlineDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid deadline date format'
        });
      }
      
      // Set time to end of day for comparison
      const deadlineEndOfDay = new Date(deadlineDate);
      deadlineEndOfDay.setHours(23, 59, 59, 999);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (deadlineEndOfDay < today) {
        return res.status(400).json({
          success: false,
          message: 'Deadline cannot be in the past'
        });
      }

      // Add processed deadline to request body
      req.body.processedDeadline = deadlineEndOfDay;
    }

    // Sanitize skills array (trim whitespace and remove duplicates)
    req.body.skills = [...new Set(skills.map(skill => skill.trim()))];

    // Validate skills count after deduplication
    if (req.body.skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one valid skill'
      });
    }

    // Limit skills count
    if (req.body.skills.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 20 skills allowed'
      });
    }

    next();
  } catch (error) {
    console.error('Job validation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during validation',
      error: error.message
    });
  }
};

const validateJobUpdate = (req, res, next) => {
  try {
    const updateFields = req.body;
    
    // If no fields provided
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No update fields provided'
      });
    }

    // Validate enum fields if they are being updated
    const enumValidations = {
      workType: {
        valid: ['In Office', 'Remote', 'Field Work', 'Hybrid'],
        message: 'Invalid work type'
      },
      jobType: {
        valid: ['Full Time', 'Part Time', 'Contract', 'Internship'],
        message: 'Invalid job type'
      },
      experience: {
        valid: ['Fresher', '0-1 Years', '1-3 Years', '3-5 Years', '5+ Years'],
        message: 'Invalid experience level'
      }
    };

    for (const [field, validation] of Object.entries(enumValidations)) {
      if (updateFields[field] && !validation.valid.includes(updateFields[field])) {
        return res.status(400).json({
          success: false,
          message: `${validation.message}. Valid options: ${validation.valid.join(', ')}`
        });
      }
    }

    // Validate skills if being updated
    if (updateFields.skills) {
      if (!Array.isArray(updateFields.skills) || updateFields.skills.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Skills must be a non-empty array'
        });
      }

      const invalidSkills = updateFields.skills.filter(skill => 
        !skill || typeof skill !== 'string' || skill.trim() === ''
      );
      
      if (invalidSkills.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'All skills must be non-empty strings'
        });
      }

      // Sanitize skills
      updateFields.skills = [...new Set(updateFields.skills.map(skill => skill.trim()))];
      
      if (updateFields.skills.length > 20) {
        return res.status(400).json({
          success: false,
          message: 'Maximum 20 skills allowed'
        });
      }
    }

    // Validate deadline if being updated
    if (updateFields.deadline) {
      const deadlineDate = new Date(updateFields.deadline);
      
      if (isNaN(deadlineDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid deadline date format'
        });
      }
      
      const deadlineEndOfDay = new Date(deadlineDate);
      deadlineEndOfDay.setHours(23, 59, 59, 999);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (deadlineEndOfDay < today) {
        return res.status(400).json({
          success: false,
          message: 'Deadline cannot be in the past'
        });
      }

      updateFields.processedDeadline = deadlineEndOfDay;
    }

    next();
  } catch (error) {
    console.error('Job update validation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during validation',
      error: error.message
    });
  }
};

module.exports = {
  validateJobCreation,
  validateJobUpdate
};