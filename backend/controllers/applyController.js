const User = require("../models/userModel");
const Company = require("../models/companyModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); 
const sendEmail = require("../services/EmailService");

// Get Application Status of a student 
exports.getStatus = catchAsyncErrors(async (req, res, next) => {
    const company = await Company.findById(req.params.company_id).select('candidates').lean();
    let isCandidateAlreadyRegistered = company.candidates.find(function (candidate) {
        return candidate.college_id === req.user.college_id
    });
    if(isCandidateAlreadyRegistered) {
        res.status(200).json({
            success : true,
            message : 'Applied',
            status : isCandidateAlreadyRegistered.candidate_status
    });
    } else {
        res.status(200).json({
            success : false,
            message : 'Not applied'
        })
    }
});

// Apply in a company
exports.apply = catchAsyncErrors(async (req, res, next) => {
    // ToDo = Check red flag here
    const company = await Company.findById(req.body.company_id).select('candidates');
    const isCandidateAlreadyRegistered = company.candidates.find(function (candidate) {
        return candidate.college_id === req.user.college_id;
    });

    if(!isCandidateAlreadyRegistered) {
        // ToDo = Validations
        company.candidates.push({ college_id : req.user.college_id, timestamp : new Date()});
        await company.save();
        res.status(200).json({
            success: true,
            message: 'Successfully applied.'
        })
    } else {
        res.status(200).json({
            success: true,
            message: 'Already applied.'
        })
    }
});

// Withdraw from a company
exports.withdraw = catchAsyncErrors(async (req, res, next) => {
    const company = await Company.findById(req.body.company_id).select('candidates');
    let college_id = req.user.college_id;
    if(req.body.college_id) { // Todo Make it ternary operator
        college_id = _b.college_id;
    }
    // This method is 50% faster as compared to loop then splice and filter method
    company.candidates.splice(company.candidates.map(function (candidate) {
        return candidate.college_id;
    }).indexOf(college_id), 1);

    const data = await company.save();
    res.status(200).json({
        success: true,
        message: 'Registration successfully withdraw.'
    });
});

// Withdraw from a company (By Admin)
exports.withdrawOne = catchAsyncErrors(async (req, res, next) => {
    const company = await Company.findById(req.body.company_id).select('candidates');
    let college_id = req.body.college_id;
    
    // This method is 50% faster as compared to loop then splice and filter method
    company.candidates.splice(company.candidates.map(function (candidate) {
        return candidate.college_id;
    }).indexOf(college_id), 1);

    const data = await company.save();
    res.status(200).json({
        success: true,
        message: 'Registration successfully withdraw.'
    });
});