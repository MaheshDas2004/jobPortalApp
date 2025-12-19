const express = require('express');
const Employer = require('../models/employer');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validateSignup = require('../middlewares/validateSignup');
const jwt = require('jsonwebtoken');
const validateSignin = require('../middlewares/validateSignin');
const routeProtector = require('../middlewares/routeProtector');

// Signup Route
router.post("/signup", validateSignup, async (req, res) => {
    try {
        const { fullName, email, mobile, password } = req.body;

        const existingEmployer = await Employer.findOne({ email });

        if (existingEmployer) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployer = new Employer({
            fullName,
            email,
            mobile: mobile || undefined, // Only include if provided
            password: hashedPassword
        });

        await newEmployer.save();

        res.status(201).json({
            message: "Signup successful",
            userId: newEmployer._id
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
        const user = await Employer.findOne({ email });

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
        const user = await Employer.findById(req.userId).select("-password");

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

// Update employer profile
router.put('/profile', routeProtector, async (req, res) => {
    try {
        const {
            fullName,
            mobile,
            companyName,
            companyDescription,
            industry,
            companyLocation,
            website
        } = req.body;

        const updateData = {};
        if (fullName) updateData.fullName = fullName;
        if (mobile !== undefined) updateData.mobile = mobile;
        if (companyName !== undefined) updateData.companyName = companyName;
        if (companyDescription !== undefined) updateData.companyDescription = companyDescription;
        if (industry !== undefined) updateData.industry = industry;
        if (companyLocation !== undefined) updateData.companyLocation = companyLocation;
        if (website !== undefined) updateData.website = website;

        const updatedEmployer = await Employer.findByIdAndUpdate(
            req.userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedEmployer) {
            return res.status(404).json({ message: "Employer not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedEmployer
        });

    } catch (error) {
        console.error("Profile update error:", error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Validation error", errors });
        }

        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
