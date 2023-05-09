const Announcement = require("../models/announcementModel");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

// Get All Announcements
exports.getAll = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('passout_batch');
    var announcements;
    if(req.body.passout_batch) {
        announcements = await Announcement.find({
            passout_batch : req.body.passout_batch
        });
    }
    else {
        announcements = await Announcement.find({
            passout_batch : user.passout_batch
        }).sort({ timestamp : -1 });
    }
    res.status(200).json({
        success: true,
        announcements
    })
});

// Add Announcement
exports.add = catchAsyncErrors(async (req, res, next) => {
    const announcement = await Announcement.create({
        category : req.body.category,
        passout_batch : req.body.passout_batch,
        author : req.user.name,
        announcement : req.body.announcement,
        timestamp : new Date()
    })
    res.status(200).json({
        success: true,
        message : 'Announcement added successfully.'
    })
});