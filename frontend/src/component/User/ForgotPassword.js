import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from 'react-alert';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

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
            <div className="row page-titles">
            <div className="col-md-5 align-self-center">
                <h4 className="text-themecolor">Welcome to NIT Kurukshetra Placement Portal</h4>
            </div>
            </div>
            <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">NIT Kurukshetra Placement Portal Reset Password</h4>
                        <h6 className="card-subtitle">Reset password for the placement session</h6>
                        <form className="form-material m-t-40" onSubmit={forgotPasswordSubmit}>
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

                            {loading && <div className="alert alert-primary alert-rounded">
                                <strong> Loading!</strong> Hold on! Sending reset password email...
                            </div>}

                            <button  disabled={loading} type="submit" className="btn btn-success btn-rounded">Submit</button>
                            <Link to="/login" className="text-danger p-l-5">Login ?</Link>

                        </form>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ForgotPassword