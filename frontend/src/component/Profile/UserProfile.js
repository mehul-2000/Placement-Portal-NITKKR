import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, updateProfile, loadUser, updateResume } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { UPDATE_RESUME_RESET } from "../../constants/userConstants";
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector(state => state.profile);
    const { error:resumeError, isUpdated:isResumeUpdated, loading:resumeLoading } = useSelector(state => state.resume);

    const [newProfileData, setNewProfileData] = useState({
        matric_marks:"",
        matric_board:"",
        senior_marks:"",
        senior_board:"",
        alternate_contact_no:"",
        address:"",
        city:"",
        post_code:"",
        state:"",
        country:"",
        linkedln_link:""
    });

    const [resume, setResume] = useState();

    const handleProfileDataChange = (e) => {
        setNewProfileData({ ...newProfileData, [e.target.name]: e.target.value});
    }

    const handleResumeDataChange = (e) => {
        // const reader = new FileReader();
        // reader.onload = () => {
        //     if(reader.readyState === 2) { //0->Initial 1->Processing 2->Done
        //         setResume(reader.result);
        //     }
        // }

        // // // Onload will only be called when file is addded
        // reader.readAsDataURL(e.target.files[0]);
        setResume(e.target.files[0]);
    };

    const updateUserProfile = (e) => {
        e.preventDefault();
        dispatch(updateProfile(newProfileData));
    };

    const updateUserResume = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("resume", resume);
        dispatch(updateResume(myForm));
    };

    useEffect(() => {
        if(isAuthenticated === false) {
            navigate("/login")
        }
        if(user) {
            setNewProfileData(user);
        }
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(resumeError) {
            alert.error(resumeError);
            dispatch(clearErrors());
        }
        if(isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            // navigate("/account");
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
        if(isResumeUpdated) {
            alert.success("Resume Updated Successfully");
            dispatch(loadUser());
            // navigate("/account");
            dispatch({
                type: UPDATE_RESUME_RESET
            })
        }
    }, [isAuthenticated, dispatch, error, resumeError, alert, navigate, user, isUpdated, isResumeUpdated])
    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Student Profile</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4 col-xlg-3 col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <center className="m-t-30">
                                <div className="profile-pic">
                                    <img src={`assets/images/profile/${user.gender}.png`} className="img-circle" width="150" alt="profile" />
                                </div>
                                <h4 className="card-title m-t-10">{ user.name }</h4>
                                <h6 className="card-subtitle">{ user.department }</h6>
                                <div className="row text-center">
                                    <div className="col-12"><font className="font-medium">{ user.passout_batch } Batch</font></div>
                                </div>
                            </center>
                        </div>
                        <div>
                            <hr /> </div>
                        <div className="card-body">
                            <small className="text-muted">Email address </small>
                            <h6>{ user.college_email }</h6>
                            <small className="text-muted p-t-30 db">Contact No.</small>
                            <h6>+91 { user.contact_no }</h6>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-8 col-xlg-9 col-md-7">
                    {/* Resume Section */}
                    {(user.permission==="student" || user.permission==="spc") && <div className="card">
                        <div className="card-body">
                            <div className="d-flex no-block align-items-center">
                                <div className="ml-auto">
                                    <button className="float-right btn btn-circle btn-primary" data-bs-toggle="modal" data-bs-target="#myResumeUploadModal">
                                        {user.resume_url && <i className="ti-pencil"></i>}
                                        {!user.resume_url && <i className="ti-upload"></i>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul className="product-review text-center">
                            {/* Resume Uploaded */}
                            {user.resume_url && <li>
                                <span className="text-muted display-5">
                                    <i className="mdi mdi-emoticon-cool text-success"></i>
                                </span>
                                <span>
                                    <h3 className="card-title">We've your resume! </h3>
                                    {/* ToDo : Use Cloud service for resumes */}
                                    <h6 className="card-subtitle">Now, you are all set for Placement session.<a target="_blank" rel="noreferrer" href={`/assets/uploads/resumes/${user.resume_url}`}>&nbsp;<i className="ti ti-cloud-down"></i> </a></h6>
                                </span>
                            </li>}

                            {/* Resume Not Uploaded */}
                            {!user.resume_url && <li ng-if="!profile.userProfile.resume_url">
                                <font className="text-muted display-5">
                                    <i className="mdi mdi-emoticon-sad text-danger"></i>
                                </font>
                                <span>
                                    <h3 className="card-title"> Resume is missing!</h3>
                                    <h6 className="card-subtitle">Upload your resume to get started.</h6>
                                </span>
                            </li>}
                        </ul>

                        {/* Resume Upload Modal */}
                        <div className="modal fade" id="myResumeUploadModal" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {!user.resume_url && <h4 className="modal-title">Upload Resume</h4>}
                                        {user.resume_url && <h4 className="modal-title">Edit Resume</h4>}

                                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                                    </div>

                                    {/* Resume Upload Success Message Modal Body */}
                                    <div className="modal-body" ng-show="profile.resumeUploadSuccessMsg">
                                        {/* Success Message */}
                                        {/* <div className="alert alert-success alert-rounded">
                                            <i className="ti-face-smile"></i>
                                            <strong> Yay!</strong> {{ profile.resumeUploadSuccessMsg }}
                                        </div> */}
                                        {/* <span className="ml-3 text-primary">*Refresh page to upload new resume</span> */}
                                    </div>

                                    {/* Resume is not uploaded yet! */}
                                    <form onSubmit={updateUserResume}>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label>Select Resume</label>
                                                <input className="form-control" type="file" accept="application/pdf" name="resume" disabled={resumeLoading} onChange={handleResumeDataChange} required />
                                                <span className="ml-3 text-primary">*only pdf files</span>
                                            </div>

                                            {/* Loading Message */}
                                            {resumeLoading && <div className="alert alert-primary alert-rounded">
                                                <strong> Loading!</strong> Hold on. Uploading your resume...
                                            </div>}

                                            {/* Error Message */}
                                            {/* <div className="alert alert-danger alert-rounded" ng-show="profile.resumeUploadErrorMsg">
                                                <i className="ti-face-sad"></i>
                                                <strong>Oops! </strong> {{ profile.resumeUploadErrorMsg }}
                                            </div> */}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" disabled={resumeLoading} className="btn btn-success">Upload Now</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>}


                    <div className="card">
                        <ul className="nav nav-tabs profile-tab" role="tablist">
                            <li className="nav-item"> <Link className="nav-link active" role="tab">Profile Details</Link> </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="profile" role="tabpanel">
                                <div className="card-body">
                                    <form className="form-horizontal form-material" onSubmit={updateUserProfile}>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">Name*</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your name" className="form-control form-control-line" value={user.name} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">College ID*</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your college ID" className="form-control form-control-line" value={user.college_id} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">Degree*</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your degree" className="form-control form-control-line" value={user.degree} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">Branch*</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your branch" className="form-control form-control-line" value={user.department} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">Personal Email*</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your personal email" className="form-control form-control-line" value={user.college_email} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">Personal Contact No.*</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your personal contact no." className="form-control form-control-line" value={`+91 ${user.contact_no}`} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">CGPA*</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your CGPA" className="form-control form-control-line" value={user.cgpa} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">Active Backlogs*</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter Active Backlogs" className="form-control form-control-line" value="N/A" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">10th Percentage (CGPA)</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your 10th percentage (CGPA)" className="form-control form-control-line" name="matric_marks" value={newProfileData.matric_marks} onChange={handleProfileDataChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">Board</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your 10th board" className="form-control form-control-line" name="matric_board" value={newProfileData.matric_board} onChange={handleProfileDataChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">12th Percentage (CGPA)</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your 12th percentage (CGPA)" className="form-control form-control-line" name="senior_marks" value={newProfileData.senior_marks} onChange={handleProfileDataChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">Board</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your 12th board" className="form-control form-control-line" name="senior_board" value={newProfileData.senior_board} onChange={handleProfileDataChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">Contact No. for Communication</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your contact no." className="form-control form-control-line" name="alternate_contact_no" value={newProfileData.alternate_contact_no} onChange={handleProfileDataChange} required />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="col-md-12">Address</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your address" className="form-control form-control-line" name="address" value={newProfileData.address} onChange={handleProfileDataChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">City</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your city" className="form-control form-control-line" name="city" value={newProfileData.city} onChange={handleProfileDataChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">Post Code</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your post code" className="form-control form-control-line" name="post_code" value={newProfileData.post_code} onChange={handleProfileDataChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">State</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your state" className="form-control form-control-line" name="state" value={newProfileData.state} onChange={handleProfileDataChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="col-md-12">Country</label>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Enter your country" className="form-control form-control-line" name="country" value={newProfileData.country} onChange={handleProfileDataChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-12">LinkedIn Profile Link</label>
                                            <div className="col-md-12">
                                                <input type="text" placeholder="Enter your social profile link" className="form-control form-control-line" name="linkedln_link" value={newProfileData.linkedln_link} onChange={handleProfileDataChange} required />
                                            </div>
                                        </div>

                                        {/* Loading Message */}
                                        {loading && <div className="alert alert-primary alert-rounded">
                                            <strong> Loading!</strong> Hold on. We are updating your data!
                                        </div>}

                                        {/* Success Message */}
                                        {/* <div className="alert alert-success alert-rounded" ng-show="profile.profileUpdateSuccessMsg">
                                            <i className="ti-face-smile"></i>
                                            <strong> Yay!</strong> {{ profile.profileUpdateSuccessMsg }}
                                        </div> */}

                                        {/* Error Message */}
                                        {/* <div className="alert alert-danger alert-rounded" ng-show="profile.profileUpdateErrorMsg">
                                            <i className="ti-face-sad"></i>
                                            <strong>Oops! </strong> {{ profile.profileUpdateErrorMsg }}
                                        </div> */}

                                        <div className="form-group">
                                            <div className="col-sm-12">
                                                <button type="submit" className="btn btn-success" ng-disabled="profile.profileUpdateLoadingMsg">Update Profile</button>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-12">
                                                <span className="text-danger">*Non-editable fields. Data directly coming from MNIT ERP.</span>
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

export default UserProfile