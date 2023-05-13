const Placements = require("../models/placementsModel");
const mongoose = require('mongoose');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

// Get All Placements
exports.getAll = catchAsyncErrors(async (req, res, next) => {
    const pipeline = [
        {
            $lookup: {
                from : "users",
                localField: "student_college_id",
                foreignField : "college_id",
                as : "student"
            }
        },
        {
            $project : {
                "passout_batch" : true,
                "company_name" : true,
                "job_profile" : true,
                "recruitment" : true,
                "recruitment_type" : true,
                "recruitment_date" : true,
                "intern_duration" : true,
                "intern_stipend" : true,
                "package" : true,
                "student.name" : true,
                "student.degree" : true,
                "student.department" : true,
                "comments" :true
            }
        }
    ];
    if(req.body.placement_id) {
        pipeline.push({
            $match : {
                _id : new mongoose.Types.ObjectId(req.body.placement_id)
            }
        })
    }

    const placements = await Placements
        .aggregate(pipeline)
        .sort({ recruitment_date : -1 })
        
    res.status(200).json({
        success: true,
        placements
    })
});

// Add Placements
exports.add = catchAsyncErrors(async (req, res, next) => {
    if(req.body.candidates.length === 0)  {
        return next(new ErrorHandler('Candidates list can not be empty!', 400));
    } else {
        const placements = await Placements.create(JSON.parse(req.body.candidates).map(user => {
            return {
                passout_batch : req.body.passout_batch,
                company_name : req.body.company_name,
                job_profile : req.body.job_profile,
                recruitment : req.body.recruitment,
                recruitment_type: req.body.recruitment_type,
                recruitment_date : req.body.recruitment_date,
                intern_duration : req.body.intern_duration,
                intern_stipend : req.body.intern_stipend,
                package : req.body.package,
                student_college_id : user.college_id,
                timestamp : new Date(),
                author : req.user.college_id,
                comments : req.body.comments
            }
        }));
        res.status(200).json({
            success: true,
            message : 'Placements data added successfully.'
        })
    }
});

// Update Placements
exports.update = catchAsyncErrors(async (req, res, next) => {
    await Placements.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json({
        success: true,
        message : 'Placements data updated successfully.'
    })
});