const Interview = require("../models/interviewModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../services/EmailService");

// Get All Interview Experiences
exports.getAll = catchAsyncErrors(async (req, res, next) => {
    const interviews = await Interview.find({ status : 'approved' }).select('title experience author_name tags created_at').lean();
    res.status(200).json({
        success: true,
        interviews: interviews
    })
});

// Get All Interview Experiences (Admin) -- Also status field is added
exports.getAll_admin = catchAsyncErrors(async (req, res, next) => {
    const interviews = await Interview.find({ }).select('title experience author_name tags status created_at').lean();
    res.status(200).json({
        success: true,
        interviews: interviews
    })
});

// Get One Interview Experiences
exports.getOne = catchAsyncErrors(async (req, res, next) => {
    const interview = await Interview.findById(req.params.experience_id).lean();
    if(!interview) {
        return next(new ErrorHandler("No such interview experience exists", 400));
    }
    res.status(200).json({
        success: true,
        interview
    })
});

// Add interview experience
exports.add = catchAsyncErrors(async (req, res, next) => {
    const interview = await Interview.create({
        title : req.body.title,
        experience : req.body.experience,
        tags : req.body.tags.split(',').map(String),
        author_id : req.user.college_id,
        author_name : req.user.name,
        author_email: req.user.college_email,
        created_at : new Date()
    })
    res.status(200).json({
        success: true,
        interview: interview
    })
});

// Edit interview experience
exports.edit = catchAsyncErrors(async (req, res, next) => {
    const interview = await Interview.findByIdAndUpdate(req.body._id, req.body, {new: true});
    if(!interview) {
        return next(new ErrorHandler('Incorrect Interview Experience ID. Please try again.', 400));
    }
    res.status(200).json({
        success: true,
        interview: interview
    })
});

// Change status of interview experience
exports.changeStatus = catchAsyncErrors(async (req, res, next) => {
    const interview = await Interview.findById(req.body.experience_id).select('status author_id author_name author_email title experience');
    if(interview.status === 'pending') {
        interview.status = 'approved';
        await interview.save();
        interview.url = `${req.protocol}://${req.get("host")}/experience/${interview._id}`;
        try {
            await sendEmail(interview, 'approveInterviewExperience');
        } catch {
            return res.status(200).json({
                success: true,
                message : 'Interview experience has been updated but failed to notify the author.',
                interview
            })
        }
        res.status(200).json({
            success: true,
            message : 'Interview experience has been updated. Author will be notified.',
            interview
        })
    } else {
        interview.status = 'pending';
        await interview.save();
        res.status(200).json({
            success: true,
            message : 'Interview experience has been updated.',
            interview
        })
    }
});

