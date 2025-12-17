const express = require('express');
const Candidate = require('../models/candidate');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validateSignup = require('../middlewares/validateSignup');
const jwt = require('jsonwebtoken');
const validateSignin = require('../middlewares/validateSignin');
const routeProtector = require('../middlewares/routeProtector');

// Signup Route
router.post("/signup", validateSignup, async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingCandidate = await Candidate.findOne({ email });

    if (existingCandidate) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCandidate = new Candidate({
      fullName,
      email,
      password: hashedPassword
    });

    await newCandidate.save();

    res.status(201).json({
      message: "Signup successful",
      userId: newCandidate._id
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Signin Route
router.post('/signin', validateSignin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Candidate.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const matchpassword = await bcrypt.compare(password, user.password);
    
    if (!matchpassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
      
    res.cookie("token", token, {
      httpOnly: true,          
      secure: false,          
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Check if user is logged in
router.get('/isloggedin', routeProtector, async (req, res) => {
  try {
    const user = await Candidate.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      isLoggedin: true,
      user
    });
  } catch (error) {
    console.error("isloggedin error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Profile Route
router.get('/profile', routeProtector, async (req, res) => {
  try {
    const user = await Candidate.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put('/profile', routeProtector, async (req, res) => {
  try {
    console.log('Profile update request received:', req.body);
    console.log('User ID from token:', req.userId);
    
    const updates = req.body;
    
    // Remove sensitive fields that shouldn't be updated here
    delete updates.email;
    delete updates.password;
    delete updates._id;

    console.log('Updates to apply:', updates);

    const user = await Candidate.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      console.log('User not found for ID:', req.userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log('Profile updated successfully for user:', user._id);

    res.json({
      success: true,
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    console.error("Update profile error:", error);
    if (error.name === 'ValidationError') {
      console.log('Validation errors:', Object.values(error.errors).map(err => err.message));
      return res.status(400).json({ 
        message: "Invalid data provided",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0
    });
    
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;