import React, { useEffect, useState } from 'react';
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
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Account Settings</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4 col-xlg-3 col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <center className="m-t-30">
                                <img src={`assets/images/profile/${user.gender}.png`} className="img-circle" width="150" alt="profile" />
                                <h4 className="card-title m-t-10">{ user.name }</h4>
                                <h6 className="card-subtitle">{ user.department }</h6>
                                <div className="row text-center">
                                    <div className="col-12"><Link><i className="ti-location-pin"></i> <font className="font-medium">NIT Kurukshetra</font></Link></div>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-xlg-9 col-md-7">
                    <div className="card">
                        <ul className="nav nav-tabs profile-tab" role="tablist">
                            <li className="nav-item"> <Link className="nav-link active" data-toggle="tab" href="#" role="tab">Change Password</Link> </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="home" role="tabpanel">
                                <div className="card-body">

                                    <form className="form-horizontal form-material" onSubmit={changePasswordSubmit}>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="col-md-12">Your Current Password</label>
                                                    <div className="col-md-12">
                                                        <input type="password" placeholder="Enter your current password" className="form-control form-control-line" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="col-md-12">Your New Password</label>
                                                    <div className="col-md-12">
                                                        <input type="password" placeholder="Enter your new password" className="form-control form-control-line" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="col-md-12">Confirm Password</label>
                                                    <div className="col-md-12">
                                                        <input type="password" placeholder="Confirm your new password" className="form-control form-control-line" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {loading && <div className="alert alert-primary alert-rounded">
                                            <i className="ti-time"></i>
                                            <strong> &nbsp;Loading.....</strong> Updating password details, please wait!
                                        </div>}

                                        <div className="form-group">
                                            <div className="col-sm-12">
                                                <button type="submit" disabled={loading-90} className="btn btn-success">Update Password</button>
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