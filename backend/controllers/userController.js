const User = require("../models/userModel");
const Company = require("../models/companyModel");
const Interview = require("../models/interviewModel");
const Placements = require("../models/placementsModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); 
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../services/EmailService");
const crypto = require("crypto");

// Register User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.create(req.body);
    sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {college_id, password, login_otp} = req.body;
    
    // checking if user has given password and email both
    if(!college_id || !password) {
        return next(new ErrorHandler("Please Enter College ID & Password", 400));
    }

    // ToDo :- Remove comments
    // if(!login_otp) {
    //     return next(new ErrorHandler("Please Enter OTP", 400));
    // }

    // We had to specify password differently because we had done select: false to password
    const user = await User.findOne({college_id}).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid College ID or password", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch) {
        // We can also write invalid password only but it will be risky because any unknown user will gwt to know if a particular email exists or not
        return next(new ErrorHandler("Invalid college ID or password", 401));
    } else {
        // ToDo :- Remove comments
        // if(login_otp === user.login_otp) {
            user.login_otp = undefined;
            await user.save();
            sendToken(user, 200, res);
        // } else {
        //     return next(new ErrorHandler("Incorrect OTP", 401));
        // }
    }
});

// Send OTP
exports.sendOTP = catchAsyncErrors(async(req, res, next) => {
    const {college_id, password} = req.body;
    
    // checking if user has given password and email both
    if(!college_id || !password) {
        return next(new ErrorHandler("Please Enter College ID & Password", 400));
    }
    
    // We had to specify password differently because we had done select: false to password
    const user = await User.findOne({college_id}).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid College ID or password", 401));
    }
    
    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch) {
        // We can also write invalid password only but it will be risky because any unknown user will gwt to know if a particular email exists or not
        return next(new ErrorHandler("Invalid college ID or password", 401));
    } else {
        const login_otp = user.getOTP();
        await user.save({ validateBeforeSave: false });
        const message = 'Hello <strong>'+ user.name + '</strong>,<br><br>A sign in attempt to Placement Portal requires further verification to prevent unauthorized access to your account. To complete the sign in, enter the verification code on the Placement Portal.<br><br>Verification Code: ' + login_otp;
        try {
            await sendEmail(user, 'sendOTP');
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.college_email} successfully`
            })
        } catch(error) {
            // user.login_otp = undefined;
            // await user.save({ validateBeforeSave: false });
            return next(new ErrorHandler("Some error occured. Please try again later.", 500));
        }
    }
});

// Logout User
exports.logout = catchAsyncErrors(async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findOne({college_id: req.body.college_id});
    if(!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get Reset Password Token
    const reset_token = user.getResetPasswordToken();

    // Because we changed the fields resetPasswordToken and resetPasswordExpire and we need that to presist in db 
    await user.save({ validateBeforeSave: false });

    // As of now, we are changing to frontend, but later, while deploying, we will change as then both frontend and backend will be working on same port
    user.reset_password_url = `${req.protocol}://${req.get("host")}/api/user/password/reset/${reset_token}`;
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${reset_token}`;

    try {
        await sendEmail(user, 'forgotPassword');
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.college_email} successfully`
        })
    } catch(error) {
        user.reset_password_token = undefined;
        user.reset_password_expire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async(req, res, next) => {
    // Creating token hash
    const reset_password_token = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    
    const user = await User.findOne({
        reset_password_token,
        reset_password_expire: { $gt: Date.now() }
    });

    if(!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 400));
    }

    user.password = req.body.password;
    user.reset_password_token = undefined;
    user.reset_password_expire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// Get User details
exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('college_id name gender department red_flags passout_batch permission').lean();
    // No need of if(!user) because it is accessible only if user is logged in
    res.status(200).json({
        success: true,
        user
    });
});

// Get User Profile
exports.getProfile = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('-active -status -program').lean();
    // No need of if(!user) because it is accessible only if user is logged in
    res.status(200).json({
        success: true,
        user
    });
});

// Update user Profile
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {
    const userDataFields = ["matric_marks","matric_board","senior_marks","senior_board","alternate_contact_no","address","city","post_code","state","country","linkedln_link"];
    const user = await User.findById(req.user.id).select('matric_marks matric_board senior_marks senior_board alternate_contact_no address city state post_code country linkedln_link');
    userDataFields.forEach(field => {
        if(req.body[field]) {
            user[field] = req.body[field];
        }
    });
    await user.save();

    sendToken(user, 200, res);
});

// Get User Permission
exports.getPermission = (req, res, next) => {
    res.status(200).json({
        success: true,
        permission: req.user.permission
    });
};

// Update user password
exports.updatePassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatch) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }
    if(req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
});

// ------ ADMIN Routes -----------
// Update Batch
exports.updateBatch = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id);
    user.passout_batch = req.body.batch;
    await user.save();

    res.status(200).json({
        success: true,
        message : 'Batch updated successfully.'
    });
});

// Get User's profile
exports.getOne = catchAsyncErrors(async(req, res, next) => {
    console.log("Heeelo");
    if(!req.params.college_id) {
        return next(new ErrorHandler("Field can't be empty.", 400));
    }
    const user = await User.findOne({ college_id : req.params.college_id.toUpperCase() });
    if(!user) {
        return next(new ErrorHandler('Incorrect College ID. Please try again.', 404));
    }
    res.status(200).json({
        success: true,
        user
    });
});

// Update User's Profile
exports.updateOne = catchAsyncErrors(async(req, res, next) => {
    // let user = await User.findOne({ college_id : req.body.college_id });
    const user = await User.findOneAndUpdate({ college_id : req.body.college_id }, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    if(!user) {
        return next(new ErrorHandler('Incorrect College ID. Please try again.', 404));
    }
    res.status(200).json({
        success: true,
        message : 'Profile updated successfully.',
        user
    });
});

// Timeline
exports.timeline = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('passout_batch').lean();
    const companies = await Company.find({ passout_batch : user.passout_batch }).select('company_name candidates').lean();

    let timeline = [];

    companies.forEach(function (company) {
        // Check if applied
        let candidateApplyObject = company.candidates.find(function (candidate) {
            return candidate.college_id === req.user.college_id;
        });
        if(candidateApplyObject) {
            timeline.push({
                company_name : company.company_name,
                status : candidateApplyObject.candidate_status,
                timestamp : candidateApplyObject.timestamp
            });
        }
    });

    res.status(200).json({
        success: true,
        timeline
    });
});

// Contributions
exports.contributions = catchAsyncErrors(async(req, res, next) => {
    const interviews = await Interview
        .find({ author_id : req.user.college_id })
        .lean()
        .sort({ created_at : -1 })

    res.status(200).json({
        success: true,
        interviews
    });
});

// Achievement
exports.achievements = catchAsyncErrors(async(req, res, next) => {
    const achievements = await Placements
        .find({ student_college_id : req.user.college_id })
        .lean()
        .sort({ recruitment_date : -1 })

    res.status(200).json({
        success: true,
        achievements
    });
});