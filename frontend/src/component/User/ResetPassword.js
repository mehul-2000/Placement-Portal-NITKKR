import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from 'react-alert';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {token} = useParams();

    const { error, success, loading } = useSelector(state => state.resetPassword);
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    }
    
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    
        if(success) {
            alert.success("Password Updated Successfully");
            navigate("/login");
        }
    }, [dispatch, error, alert, navigate, success])
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
                            <h6 className="card-subtitle">Enter new password for your account of the placement session</h6>
                            <form className="form-material m-t-40" onSubmit={resetPasswordSubmit}>
                                <div className="form-group">
                                    <label>Password </label>
                                    <input
                                        type="password"
                                        className="form-control form-control-line"
                                        placeholder="Enter your new password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Confirm Password </label>
                                    <input
                                        type="password"
                                        className="form-control form-control-line"
                                        placeholder="Confirm password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                {/* <div className="alert alert-success alert-rounded" ng-show="reset.successMsg">
                                    <i className="icon-check"></i>
                                    <strong> Yay!</strong> {{ reset.successMsg }}
                                </div> */}

                                {/* <div className="alert alert-danger alert-rounded" ng-show="reset.errorMsg">
                                    <i className="icon-close"></i>
                                    <strong>Oops! </strong> {{ reset.errorMsg }}
                                </div> */}

                                <button disabled={loading} type="submit" className="btn btn-success btn-rounded">Reset Password</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword