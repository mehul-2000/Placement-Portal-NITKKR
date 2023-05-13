const nodeMailer = require("nodemailer");
const { getEmailOpts } = require("./TemplateService");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const sendEmail = async (data, mailType) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            service: process.env.SMPT_SERVICE,
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD
            }
        });
        const opts = getEmailOpts(data, mailType);
        await transporter.sendMail(opts);
    }
    catch {
        return next(new ErrorHandler("Email service not working", 400));
    }
}

module.exports = sendEmail;