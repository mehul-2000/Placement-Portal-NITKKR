const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../services/EmailService");

// To add a new spc
exports.add = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({college_id: req.body.college_id});
    if(!user) {
        return next(new ErrorHandler("College ID not exists", 400));
    }
    if(user.permission === 'admin') {
        return next(new ErrorHandler("Cannot add admin as coordinator", 400));
    }
    if(user.permission === 'spc') {
        return next(new ErrorHandler("Selected user is already a coordinator.", 400));
    }
    user.permission = 'spc';
    await user.save();
    try {
        await sendEmail(user, 'addCoordinator');
    } catch {
        return res.status(200).json({
            success: true,
            message : 'Coordinator added successfully but failed to communicate via email.'
        })
    }

    res.status(200).json({
        success: true,
        message : 'Coordinator added successfully.'
    })
});

// Get all coordinators
exports.getAll = catchAsyncErrors(async (req, res, next) => {
    const coordinators = await User
        .find({ permission : "spc" })
        .select('name college_id college_email contact_no permission')
        .lean();
    
    res.status(200).json({
        success : true,
        coordinators : coordinators,
        numCoordinators: coordinators.length
    })
});

// Remove a coordinators
exports.remove = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({college_id: req.body.college_id});
    if(!user) {
        return next(new ErrorHandler("College ID not exists", 400));
    }
    if(user.permission === 'admin') {
        return next(new ErrorHandler("Can't proceed. User is admin.", 400));
    }
    if(user.permission === 'student') {
        return next(new ErrorHandler("Can't proceed. User is student.", 400));
    }
    user.permission = 'student';
    await user.save();
    res.status(200).json({
        success: true,
        message : 'Coordinator removed successfully.'
    })
});