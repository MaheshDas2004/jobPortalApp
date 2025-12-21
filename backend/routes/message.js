const express = require('express');
const router = express.Router();
const routeProtector = require('../middlewares/routeProtector');
const Message = require('../models/message');
const Candidate = require('../models/candidate');
const Employer = require('../models/employer');
const { sendToUser } = require('../config/socket');

// Get all messages for current user
router.get('/', routeProtector, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ receiverId: req.userId }, { senderId: req.userId }]
        })
            .populate('senderId', 'fullName email') // Populate sender info if possible (might need dynamic ref)
            .populate('receiverId', 'fullName email')
            .populate('jobId', 'jobTitle')
            .sort({ createdAt: -1 });

        // Note: populate might fail if refs are dynamic and not handled by mongoose automatically
        // But our schema has refPath, so mongoose handles it! 
        // Wait, schema has: refPath: 'senderModel' etc. Yes mongoose handles it if populated correctly.

        res.json({ success: true, messages });
    } catch (error) {
        console.error("Messages fetch error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Send a message
router.post('/', routeProtector, async (req, res) => {
    try {
        const { receiverId, content, jobId, applicationId } = req.body;
        const senderId = req.userId;

        // Determine sender model
        const isEmployer = await Employer.exists({ _id: senderId });
        const senderModel = isEmployer ? 'Employer' : 'Candidate';

        // Determine receiver model (inverse of sender usually, but let's be safe or assume passed in body?)
        // The previous code in auth.js assumed receiverModel was passed in body or hardcoded.
        // Let's rely on body.receiverModel if present, otherwise default to opposite.
        let receiverModel = req.body.receiverModel;
        if (!receiverModel) {
            receiverModel = senderModel === 'Employer' ? 'Candidate' : 'Employer';
        }

        const newMessage = new Message({
            senderId,
            senderModel,
            receiverId,
            receiverModel,
            content,
            jobId,
            applicationId
        });

        await newMessage.save();

        // Fetch sender info for socket event
        let senderInfo;
        if (senderModel === 'Employer') {
            senderInfo = await Employer.findById(senderId).select('fullName');
        } else {
            senderInfo = await Candidate.findById(senderId).select('fullName');
        }

        // Emit real-time event
        sendToUser(receiverId, 'message', {
            ...newMessage._doc,
            senderId: senderInfo // passing object with fullName
        });

        res.status(201).json({
            success: true,
            message: newMessage
        });
    } catch (error) {
        console.error("Message send error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Mark all messages as read for current user
router.patch('/mark-all-read', routeProtector, async (req, res) => {
    try {
        await Message.updateMany(
            { receiverId: req.userId, read: false },
            { read: true }
        );
        res.json({ success: true });
    } catch (error) {
        console.error("Mark all messages read error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
