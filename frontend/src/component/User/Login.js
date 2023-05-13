import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, sendOTP, login, loadUser } from "../../actions/userAction";
import { useAlert } from 'react-alert';

const Login = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const {error, loading, error_code, message, isOTPSent, isAuthenticated} = useSelector(state => state.user)

    const [college_id, setCollegeId] = useState("");
    const [password, setPassword] = useState("");
    const [login_otp, setLoginOTP] = useState("");

    const sendOTPSubmit = (e) => {
        e.preventDefault();
        dispatch(sendOTP(college_id, password));
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(college_id, password, login_otp));
    };

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(message) {
            alert.success(message);
        }
        // To avoid access to login page afte login
        if(isAuthenticated) {
            alert.success("User authenticated");
            dispatch(loadUser());
            navigate("/profile");
        }
    }, [dispatch, error, alert, isAuthenticated, navigate, error_code, message])

    return (
        <>
            <div className="row page-titles">
            <div className="col-md-5 align-self-center">
                <h4 className="text-themecolor">Welcome to NIT Kurukshetra Placement Portal</h4>
            </div>
            </div>
            <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">NIT Kurukshetra Placement Portal Login</h4>
                        <h6 className="card-subtitle">Login for the placement session</h6>

                        {!isOTPSent && <form className="form-material m-t-40" onSubmit={sendOTPSubmit}>
                            <div className="form-group">
                                <label>College ID </label>
                                <input
                                    type="text"
                                    className="form-control form-control-line"
                                    placeholder="Enter your college id"
                                    required
                                    value={college_id}
                                    onChange={(e) => setCollegeId(e.target.value)}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Password </label>
                                <input
                                    type="password"
                                    className="form-control form-control-line"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            
                            {loading && <div className="alert alert-primary alert-rounded">
                                <strong> Loading!</strong> Hold on! Logging you in...
                            </div>}
                            {/* {error && <div className="alert alert-danger alert-rounded">
                                <i className="ti-face-sad"></i>
                                <strong> Oops!</strong> {error}
                            </div>} */}

                            {/* {message && <div className="alert alert-success alert-rounded">
                                <i className="ti-face-smile"></i>
                                <strong> Yay!</strong> {message}
                            </div>} */}
                            
                            {!message && !loading && <button disabled={message ? true : false} type="submit" value="Send OTP" className="btn btn-success btn-rounded">Send OTP</button>}
                            {!message && <Link to="/forgot-password" className="text-danger p-l-5">Forget Password ?</Link>}
                        </form>}

                        {isOTPSent && <form className="form-material m-t-40" onSubmit={loginSubmit}>
                            <div className="form-group">
                                <label>Verification Code</label>
                                <input
                                    type="text"
                                    className="form-control form-control-line"
                                    placeholder="Enter verification code"
                                    required
                                    value={login_otp}
                                    onChange={(e) => setLoginOTP(e.target.value)}
                                />
                            </div>
                            
                            {loading && <div className="alert alert-primary alert-rounded">
                                <strong> Loading!</strong> Hold on! Verifying OTP...
                            </div>}
                            {/* {error && <div className="alert alert-danger alert-rounded">
                                <i className="ti-face-sad"></i>
                                <strong> Oops!</strong> {error}
                            </div>} */}

                            {/* {isAuthenticated && <div className="alert alert-success alert-rounded">
                                <i className="ti-face-smile"></i>
                                <strong> Yay!</strong> User authenticated. Redirecting to home page...
                            </div>} */}
                            
                            {!loading && <button type="submit" value="Login" className="btn btn-success btn-rounded">Login</button>}
                        </form>}

                        {/* <form ng-if="main.isOTPsent" className="form-material m-t-40" ng-submit="main.doLogin(logData);">
                            <div className="form-group">
                                <label>Verification Code </label>
                                <input type="text" className="form-control form-control-line" placeholder="Enter verification code" ng-model="main.logData.login_otp" required />
                            </div>

                            <div className="alert alert-primary alert-rounded" ng-show="main.loading">
                                <strong> Loading!</strong> Hold on! Verifying OTP...
                            </div>

                            <div className="alert alert-danger alert-rounded" ng-show="main.errorMsg">
                                <i className="ti-face-sad"></i>
                                <strong> Oops!</strong> Error message
                            </div>

                            <div className="alert alert-success alert-rounded" ng-show="main.successMsg">
                                <i className="ti-face-smile"></i>
                                <strong> Yay!</strong> Success message
                            </div>

                            <div className="alert alert-success alert-rounded" ng-show="main.loginSuccessMsg">
                                <i className="ti-face-smile"></i>
                                <strong> Yay!</strong> Login Success message
                            </div>

                            <div ng-show="!main.loginSuccessMsg">
                                <button type="submit" ng-disabled="main.loading" className="btn btn-success btn-rounded">Verify OTP</button>
                            </div>
                        </form> */}
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Login