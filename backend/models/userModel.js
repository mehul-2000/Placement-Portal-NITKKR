var mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
var titlize = require('mongoose-title-case');
// var validate = require('mongoose-validator');
// mongoose.set('useCreateIndex', true);


var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name can't exceed 30 characters"],
        minLength: [4, "name should have more than 4 characters"],
    },
    college_id : {
        type : String,
        unique : true,
        required: [true, "Please Enter your college Id"],
    },
    passout_batch : {
        type : String,
    },
    program : {
        type : String,
    },
    gender : {
        type : String,
        default : 'M',
    },
    status : {
        type : String,
    },
    contact_no : {
        type : String,
        required: true,
    },
    college_email : {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    alternate_email : {
        type : String,
    },
    degree : {
        type : String,
    },
    department : {
        type : String,
    },
    cgpa : {
        type : String,
    },
    matric_marks : {
        type : String,
    },
    matric_board : {
        type : String,
    },
    senior_marks : {
        type : String,
    },
    senior_board : {
        type : String,
    },
    alternate_contact_no : {
        type : String,
    },
    address : {
        type : String,
        required: true
    },
    city : {
        type : String,
        required: true
    },
    post_code : {
        type : String,
        required: true
    },
    state : {
        type : String,
        required: true
    },
    country : {
        type : String,
        required: true
    },
    linkedln_link : {
        type : String
    },
    resume_url : {
        type : String
    },
    password : {
        type : String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false // Password should not be shown on doing a eg. find() query
    },
    active : {
        type : Boolean,
        default : true
    },
    // ToDo : Add active Backlogs
    reset_password_token: String,
    reset_password_expire: Date,
    login_otp: String,
    permission : {
        type : String,
        required : true,
        default: 'student'
    }
});

// Do before event 'save'
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10); // 10 -> power (10 character password)
});

// JWT Token
userSchema.methods.getJWTToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

// Get OTP
userSchema.methods.getOTP = function() {
    let max = 99999;
    let min = 10000;
    login_otp = (Math.floor(Math.random() * (+max - +min)) + +min).toString();
    this.login_otp = login_otp;
    return login_otp;
}

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function() {
    // Geneating Token
    const reset_token = crypto.randomBytes(20).toString("hex");
    this.reset_password_token = crypto
        .createHash("sha256")
        .update(reset_token)
        .digest("hex");
    this.reset_password_expire = Date.now() + 15*60*1000 // Expire in 15 minutes
    return reset_token;
};

// Mongoose title case plugin
userSchema.plugin(titlize, {
    // addition here also
    paths: ['address','city','state','country' ], // Array of paths
});

// userSchema.pre('save', function (next) {

//     var user = this;

//     if(!user.isModified('password')) return next();

//     bcrypt.hash(user.password, null, null, function(err, hash) {
//         // Store hash in your password DB.
//         if(err) {
//             return next(err);
//             //res.send('Error in hashing password');
//         } else {
//             user.password = hash;
//             next();
//         }
//     });
// });

// Mongoose title case plugin
// userSchema.plugin(titlize, {
//     // addition here also
//     paths: ['address','city','state','country' ], // Array of paths
// });

// Password compare method
// userSchema.methods.comparePassword = function(password){
//     return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model('User',userSchema);

