import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, changePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useAlert } from 'react-alert';

const Settings = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector(state => state.profile);

    const [ currentPassword, setCurrentPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const changePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", currentPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(changePassword(myForm));
    }
    
    useEffect(() => {
        if(isAuthenticated === false) {
            navigate("/login")
        }
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    
        if(isUpdated) {
            alert.success("Password Updated Successfully");
            setConfirmPassword("");
            setCurrentPassword("");
            setNewPassword("");
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, alert, navigate, isUpdated, isAuthenticated])
    return (
        <>
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Account Settings</h4>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-4 col-xlg-3 col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <center class="m-t-30">
                                <img src={`assets/images/profile/${user.gender}.png`} className="img-circle" width="150" alt="profile" />
                                <h4 class="card-title m-t-10">{ user.name }</h4>
                                <h6 class="card-subtitle">{ user.department }</h6>
                                <div class="row text-center">
                                    <div class="col-12"><Link><i class="ti-location-pin"></i> <font class="font-medium">NIT Kurukshetra</font></Link></div>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-xlg-9 col-md-7">
                    <div class="card">
                        <ul class="nav nav-tabs profile-tab" role="tablist">
                            <li class="nav-item"> <Link class="nav-link active" data-toggle="tab" href="#" role="tab">Change Password</Link> </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="card-body">

                                    <form class="form-horizontal form-material" onSubmit={changePasswordSubmit}>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label class="col-md-12">Your Current Password</label>
                                                    <div class="col-md-12">
                                                        <input type="password" placeholder="Enter your current password" class="form-control form-control-line" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label class="col-md-12">Your New Password</label>
                                                    <div class="col-md-12">
                                                        <input type="password" placeholder="Enter your new password" class="form-control form-control-line" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label class="col-md-12">Confirm Password</label>
                                                    <div class="col-md-12">
                                                        <input type="password" placeholder="Confirm your new password" class="form-control form-control-line" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {loading && <div class="alert alert-primary alert-rounded">
                                            <i class="ti-time"></i>
                                            <strong> &nbsp;Loading.....</strong> Updating password details, please wait!
                                        </div>}

                                        {/* <div class="alert alert-success alert-rounded" ng-show="settings.successMsg">
                                            <i class="ti-face-smile"></i>
                                            <strong> Yay!</strong> {{ settings.successMsg }}
                                        </div>

                                        <div class="alert alert-danger alert-rounded" ng-show="settings.errorMsg">
                                            <i class="ti-face-sad"></i>
                                            <strong>Oops! </strong> {{ settings.errorMsg }}
                                        </div> */}

                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <button type="submit" disabled={loading-90} class="btn btn-success">Update Password</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings