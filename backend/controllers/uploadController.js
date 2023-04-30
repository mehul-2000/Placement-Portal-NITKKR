const User = require("../models/userModel");
const Multer = require('../services/MulterService');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); 

exports.resume = catchAsyncErrors(async (req, res, next) => {
    Multer(req, res, async function (err) {
        if (err) {
            if(err.code === 'LIMIT_FILE_SIZE') {
                return next(new ErrorHandler('File is too large to upload. File size should not exceed 10MB', 400));
            } else if(err.code === 'filetype') {
                return next(new ErrorHandler('File type invalid. Only PDF files accepted.', 400));
            } else {
                return next(new ErrorHandler('File was not able to be uploaded. Try again later.', 400));
            }
        } else {
            if (!req.file) {
                return next(new ErrorHandler('File is missing.', 400));
            }
            else {
                await User.findByIdAndUpdate(req.user.id, {resume_url: req.file.filename});
                res.status(200).json({
                    success: true,
                    message: 'Resume successfully uploaded.'
                });
            }
        }
    })
})

