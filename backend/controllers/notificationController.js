const Notification = require("../models/notificationModel");
const Company = require("../models/companyModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Add Notification
exports.add = catchAsyncErrors(async (req, res, next) => {
    const company = await Company.findById(req.body.companyId);
    const users = await User.find({ $or : [
        { passout_batch : company.passout_batch},
        { permission : { $in : ['spc', 'admin']} }
    ]});
    Notification.create(users.map(user => {
        return {
            title : req.body.title,
            description : req.body.description,
            sender : req.user.college_id,
            receiver : user.college_id,
            reference_company_id : req.body.companyId,
            timestamp : new Date()
        }
    }))
    res.status(200).json({
        success: true,
        message : 'Notification successfully added.'
    })
});

// Wipe out notification
exports.wipe = catchAsyncErrors(async (req, res, next) => {
    const data = await Notification.updateMany({ receiver:req.user.college_id, read : { seen : false }}, { read : { seen : true, seen_at : new Date() }}, { new : true });
    res.status(200).json({
        success: true,
        data
    })
});

// Get all notifications
exports.getAll = catchAsyncErrors(async (req, res, next) => {
    let opts = {};
    if(req.body.companyId) {
        opts = { reference_company_id: req.body.companyId };
    }
    opts.receiver = req.user.college_id;
    const notifications = await Notification
        .find(opts)
        .sort({ timestamp : -1 })
        .lean()
        .limit(req.body.limit);
    res.status(200).json({
        success: true,
        notifications
    });
});