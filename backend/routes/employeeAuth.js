const express = require('express');
const Employee = require('../models/employee');
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

        const existingEmployee = await Employee.findOne({ email });

        if (existingEmployee) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = new Employee({
            fullName,
            email,
            mobile,
            password: hashedPassword
        });

        await newEmployee.save();

        res.status(201).json({
            message: "Signup successful",
            userId: newEmployee._id
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
        const user = await Employee.findOne({ email });

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
        const user = await Employee.findById(req.userId).select("-password");

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

module.exports = router;
