import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from 'react-alert';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const { error, message, loading } = useSelector(state => state.forgotPassword);

    const [college_id, setCollegeId] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(college_id));
    };

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    
        if(message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message])


    return (
        <>
            <div class="row page-titles">
            <div class="col-md-5 align-self-center">
                <h4 class="text-themecolor">Welcome to NIT Kurukshetra Placement Portal</h4>
            </div>
            </div>
            <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">NIT Kurukshetra Placement Portal Reset Password</h4>
                        <h6 class="card-subtitle">Reset password for the placement session</h6>
                        <form class="form-material m-t-40" onSubmit={forgotPasswordSubmit}>
                            <div class="form-group">
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

                            {/* {message && <div class="alert alert-success alert-rounded">
                                <i class="icon-check"></i>
                                <strong> Yay!</strong> { message }
                            </div>} */}

                            {loading && <div className="alert alert-primary alert-rounded">
                                <strong> Loading!</strong> Hold on! Sending reset password email...
                            </div>}

                            {/* {error && <div class="alert alert-danger alert-rounded">
                                <i class="icon-close"></i>
                                <strong>Oops! </strong> { error }
                            </div>} */}

                            <button  disabled={loading} type="submit" class="btn btn-success btn-rounded">Submit</button>
                            <Link to="/login" class="text-danger p-l-5">Login ?</Link>

                        </form>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ForgotPassword