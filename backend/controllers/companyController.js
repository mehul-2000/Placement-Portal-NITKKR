var mongoose = require('mongoose');
const User = require("../models/userModel");
const Company = require("../models/companyModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); 
const sendEmail = require("../services/EmailService");

// Get All Companies
exports.getAll = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const opts = { deadline_date : { $lt: new Date() } };
    if(req.body.active) {
        opts.deadline_date = { $gte: new Date() - 1 };
    }
    const companies = await Company.find({ passout_batch: user.passout_batch, ...opts }).select('company_name job_profile package deadline_date').lean();
    res.status(200) .json({
        success: true,
        companies,
        numCompanies: companies.length
    })
});

// Get One Company
exports.getOne = catchAsyncErrors(async (req, res, next) => {
    const company = await Company.findById(req.params.company_id).select('-candidates').lean();
    if(!company) {
        return next(new ErrorHandler('Incorrect Company ID. Please try again.', 400));
    }
    res.status(200) .json({
        success: true,
        company
    })
});

// Add new company
exports.add = async (req, res, next) => {
    try {
        const company = await Company.create(req.body);
    
        // Getting batch
        const batch = Number(req.body.passout_batch);
    
        // Getting courses eligible and adding emails
        let emails = [];
        for(let course in req.body.eligibility){
            if(course === "UG"){
                emails.push("nitkkr_"+(batch-4)+"_btech@googlegroups.com");
            } else if(course === "MTech"){
                emails.push("NITKKR_"+(batch-2)+"_MTECH@googlegroups.com");
            } else if(course === "MCA"){
                emails.push("NITKKR_"+(batch-2)+"_MCA@googlegroups.com");
            }
        }
    
        //package details
        if(!req.body.package){
            req.body.package = {
                UG: {ctc: 'NA'},
                MTech: {ctc: 'NA'},
                MCA: {ctc: 'NA'}
            };
        }
        if(!req.body.package.UG || !req.body.package.UG.ctc) req.body.package.UG = {ctc: 'NA'};
        if(!req.body.package.MTech || !req.body.package.MTech.ctc) req.body.package.MTech = {ctc: 'NA'};
        if(!req.body.package.MCA || !req.body.package.MCA.ctc) req.body.package.MCA = {ctc: 'NA'};
        
        company.package = req.body.package;
        company.emails = emails;
        company.apply_url = `${req.protocol}://${req.get("host")}/api/company/${company._id}`;
    
        try {
            // await sendEmail(company, 'companyAdded');
            res.status(200).json({
                success: true,
                company,
                message: "Company added and communicated via email"
            })
        } catch(error) {
            // Email service not working
            try {
                await company.remove();
            } catch {
                return next(new ErrorHandler("Company added but failed to communicate via email.", 500));
            }
            return next(new ErrorHandler("Failed to add new company (Internal Server Error).", 500));
        }
    } catch(err) {
        res.status(400).json({ success : false, message : 'Something went wrong! Did you miss Company Name, Passout Batch, Job Profile or Deadline date?'})
    }
};

// Update Company
exports.update = catchAsyncErrors(async (req, res, next) => {
    const company = await Company.findByIdAndUpdate(req.body._id, req.body, {new: true});
    if(!company) {
        return next(new ErrorHandler('Incorrect Company ID. Please try again.', 400));
    }
    res.status(200).json({
        success: true,
        company
    });
});

// Remove Company
exports.remove = catchAsyncErrors(async (req, res, next) => {
    await Company.findByIdAndRemove(req.body.company_id);
    if(!company) {
        return next(new ErrorHandler('Incorrect Company ID. Please try again.', 400));
    }
    res.status(200).json({
        success: true,
        message : 'Successfully deleted company.'
    });
});

// Get all applied students
exports.appliedStudents = catchAsyncErrors(async (req, res, next) => {
    const company = await Company.findById(req.params.company_id);
    if(!company) {
        return next(new ErrorHandler('Incorrect Company ID. Please try again.', 400));
    }
    const appliedList = await Company.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(req.params.company_id)
            }
        },
        {
            $lookup: {
                from : "users",
                localField: "candidates.college_id",
                foreignField : "college_id",
                as : "registered_candidates"
            }
        },
        {
            $project : {
                "company_name" : true,
                "registered_candidates.name" : true,
                "registered_candidates.college_id" : true,
                "registered_candidates.alternate_contact_no" : true,
                "registered_candidates.college_email" : true,
                "registered_candidates.program" : true,
                "registered_candidates.degree" : true,
                "registered_candidates.department" : true,
                "registered_candidates.cgpa" : true,
                "registered_candidates.matric_marks" : true,
                "registered_candidates.senior_marks" : true,
                "registered_candidates.resume_url" :true,
            }
        }
    ]);
    res.status(200).json({
        success: true,
        company: appliedList[0]
    });
});

// ToDo
// 1. Make dummy data
// 2. In get applied students, check if we need first findById or not
// 3. Before applying in a company, check if student is eligible or not and also tell the reason
// 4. Use HTTPS from passing password from frontend to backend
