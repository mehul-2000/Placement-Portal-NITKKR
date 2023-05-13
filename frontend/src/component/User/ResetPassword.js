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
                            <h6 class="card-subtitle">Enter new password for your account of the placement session</h6>
                            <form class="form-material m-t-40" onSubmit={resetPasswordSubmit}>
                                <div class="form-group">
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

                                <div class="form-group">
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

                                {/* <div class="alert alert-success alert-rounded" ng-show="reset.successMsg">
                                    <i class="icon-check"></i>
                                    <strong> Yay!</strong> {{ reset.successMsg }}
                                </div> */}

                                {/* <div class="alert alert-danger alert-rounded" ng-show="reset.errorMsg">
                                    <i class="icon-close"></i>
                                    <strong>Oops! </strong> {{ reset.errorMsg }}
                                </div> */}

                                <button disabled={loading} type="submit" class="btn btn-success btn-rounded">Reset Password</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword