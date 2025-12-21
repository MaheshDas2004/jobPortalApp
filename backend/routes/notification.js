const express = require('express');
const router = express.Router();
const routeProtector = require('../middlewares/routeProtector');
const Notification = require('../models/notification');

// Get all notifications for the current user
router.get('/', routeProtector, async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.userId })
            .sort({ createdAt: -1 });

        res.json({ success: true, notifications });
    } catch (error) {
        console.error("Notifications fetch error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Mark all notifications as read for current user
router.patch('/mark-all-read', routeProtector, async (req, res) => {
    try {
        await Notification.updateMany(
            { userId: req.userId, read: false },
            { read: true }
        );
        res.json({ success: true });
    } catch (error) {
        console.error("Mark all notifications read error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Mark notification as read (optional, but good to have)
router.patch('/:id/read', routeProtector, async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
