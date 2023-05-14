// Creating token and saving in cookie
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        // httpOnly:  process.env.NODE_ENV==='development',
       ...( process.env.NODE_ENV==='development' ?{}:  {
            secure: true, 
            httpOnly: false, 
            sameSite: 'None',
            domain: 'placement-portal-nitkkr.vercel.app'
        })
    };
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });
};

module.exports = sendToken;