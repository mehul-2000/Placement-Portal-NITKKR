let multer = require('multer');
const fs = require('fs')

// Resume Storage on Disk
let resumeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // ToDo : Set path accordingly to server.js
        // const path = __basedir + '/resumes/';
        // const path = __basedir + '/frontend/public/assets/uploads/resumes/';
        const path = __basedir + '/frontend/resumes/';
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: function (req, file, cb) {
        if(!file.originalname.match(/\.(pdf)$/)) {
            let err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
            cb(null, req.user.college_id + '_' + 'Resume.pdf')
        }
    }
});

// Upload
module.exports = multer({
    storage: resumeStorage,
    limits : { fileSize : 10485760 }
}).single('resume');
