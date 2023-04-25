import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();

    const {user, loading, isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
        if(isAuthenticated === false) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate])
    return (
        <>
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Student Profile</h4>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-4 col-xlg-3 col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <center class="m-t-30">
                                <div class="profile-pic">
                                    <img src={`assets/images/profile/${user.gender}.png`} class="img-circle" width="150" alt="profile" />
                                </div>
                                <h4 class="card-title m-t-10">{ user.name }</h4>
                                <h6 class="card-subtitle">{ user.department }</h6>
                                <div class="row text-center">
                                    <div class="col-12"><font class="font-medium">{ user.passout_batch } Batch</font></div>
                                </div>
                            </center>
                        </div>
                        <div>
                            <hr /> </div>
                        <div class="card-body">
                            <small class="text-muted">Email address </small>
                            <h6>{ user.college_email }</h6>
                            <small class="text-muted p-t-30 db">Contact No.</small>
                            <h6>+91 { user.contact_no }</h6>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-8 col-xlg-9 col-md-7">
                    {/* Resume Section */}
                    {console.log(user.role)}
                    {(user.permission==="student" || user.permission==="spc") && <div class="card">
                        <div class="card-body">
                            <div class="d-flex no-block align-items-center">
                                <div class="ml-auto">
                                    <button class="float-right btn btn-circle btn-primary" data-toggle="modal" data-target="#myResumeUploadModal">
                                        {user.resume_url && <i class="ti-pencil"></i>}
                                        {!user.resume_url && <i class="ti-upload"></i>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul class="product-review text-center">
                            {/* Resume Uploaded */}
                            {user.resume_url && <li>
                                <span class="text-muted display-5">
                                    <i class="mdi mdi-emoticon-cool text-success"></i>
                                </span>
                                <span>
                                    <h3 class="card-title">We've your resume! </h3>
                                    <h6 class="card-subtitle">Now, you are all set for Placement session.<a target="_blank" href="/assets/uploads/resumes/{{ profile.userProfile.resume_url }}">&nbsp;<i class="ti ti-cloud-down"></i> </a></h6>
                                </span>
                            </li>}

                            {/* Resume Not Uploaded */}
                            {!user.resume_url && <li ng-if="!profile.userProfile.resume_url">
                                <font class="text-muted display-5">
                                    <i class="mdi mdi-emoticon-sad text-danger"></i>
                                </font>
                                <span>
                                    <h3 class="card-title"> Resume is missing!</h3>
                                    <h6 class="card-subtitle">Upload your resume to get started.</h6>
                                </span>
                            </li>}
                        </ul>

                        {/* Resume Upload Modal */}
                        <div class="modal fade" id="myResumeUploadModal" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        {!user.resume_url && <h4 class="modal-title">Upload Resume</h4>}
                                        {user.resume_url && <h4 class="modal-title">Edit Resume</h4>}

                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                                    </div>

                                    {/* Resume Upload Success Message Modal Body */}
                                    <div class="modal-body" ng-show="profile.resumeUploadSuccessMsg">
                                        {/* Success Message */}
                                        <div class="alert alert-success alert-rounded">
                                            <i class="ti-face-smile"></i>
                                            {/* <strong> Yay!</strong> {{ profile.resumeUploadSuccessMsg }} */}
                                        </div>
                                        <span class="ml-3 text-primary">*Refresh page to upload new resume</span>
                                    </div>

                                    {/* Resume is not uploaded yet! */}
                                    <form ng-submit="profile.updateStudentResume();" ng-show="!profile.resumeUploadSuccessMsg">
                                        <div class="modal-body">
                                            <div class="form-group">
                                                <label>Select Resume</label>
                                                <input class="form-control" type="file" file-model="file.resume" accept="application/pdf" name="resume" ng-disabled="profile.resumeUploadLoading" required />
                                                <span class="ml-3 text-primary">*only pdf files</span>
                                            </div>

                                            {/* Loading Message */}
                                            <div class="alert alert-primary alert-rounded" ng-show="profile.resumeUploadLoading">
                                                <strong> Loading!</strong> Hold on. Uploading your resume...
                                            </div>

                                            {/* Error Message */}
                                            <div class="alert alert-danger alert-rounded" ng-show="profile.resumeUploadErrorMsg">
                                                <i class="ti-face-sad"></i>
                                                {/* <strong>Oops! </strong> {{ profile.resumeUploadErrorMsg }} */}
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" ng-disabled="profile.resumeUploadLoading" class="btn btn-success">Upload Now</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>}


                    <div class="card">
                        <ul class="nav nav-tabs profile-tab" role="tablist">
                            <li class="nav-item"> <Link class="nav-link active" data-toggle="tab" role="tab">Profile Details</Link> </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="profile" role="tabpanel">
                                <div class="card-body">
                                    <form class="form-horizontal form-material" ng-submit="profile.updateProfile(profileData)">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">Name*</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your name" class="form-control form-control-line" value={user.name} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">College ID*</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your college ID" class="form-control form-control-line" value={user.college_id} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">Degree*</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your degree" class="form-control form-control-line" value={user.degree} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">Branch*</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your branch" class="form-control form-control-line" value={user.department} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">Personal Email*</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your personal email" class="form-control form-control-line" value={user.alternate_email} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">Personal Contact No.*</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your personal contact no." class="form-control form-control-line" value={`+91 ${user.contact_no}`} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">CGPA*</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your CGPA" class="form-control form-control-line" value={user.cgpa} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">Active Backlogs*</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter Active Backlogs" class="form-control form-control-line" value="N/A" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">10th Percentage (CGPA)</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your 10th percentage (CGPA)" class="form-control form-control-line" ng-value="profile.userProfile.matric_marks" ng-model="profile.profileData.matric_marks" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">Board</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your 10th board" class="form-control form-control-line" ng-value="profile.userProfile.matric_board" ng-model="profile.profileData.matric_board" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">12th Percentage (CGPA)</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your 12th percentage (CGPA)" class="form-control form-control-line" ng-value="profile.userProfile.senior_marks" ng-model="profile.profileData.senior_marks" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">Board</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your 12th board" class="form-control form-control-line" ng-value="profile.userProfile.senior_board" ng-model="profile.profileData.senior_board" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">Contact No. for Communication</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your contact no." class="form-control form-control-line" ng-value="profile.userProfile.alternate_contact_no" ng-model="profile.profileData.alternate_contact_no" required />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label class="col-md-12">Address</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your address" class="form-control form-control-line" ng-value="profile.userProfile.address" ng-model="profile.profileData.address" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">City</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your city" class="form-control form-control-line" ng-value="profile.userProfile.city" ng-model="profile.profileData.city" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">Post Code</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your post code" class="form-control form-control-line" ng-value="profile.userProfile.post_code" ng-model="profile.profileData.post_code" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">State</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your state" class="form-control form-control-line" ng-value="profile.userProfile.state" ng-model="profile.profileData.state" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="col-md-12">Country</label>
                                                    <div class="col-md-12">
                                                        <input type="text" placeholder="Enter your country" class="form-control form-control-line" ng-value="profile.userProfile.country" ng-model="profile.profileData.country" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-md-12">LinkedIn Profile Link</label>
                                            <div class="col-md-12">
                                                <input type="text" placeholder="Enter your social profile link" class="form-control form-control-line" ng-value="profile.userProfile.linkedln_link" ng-model="profile.profileData.linkedln_link" required />
                                            </div>
                                        </div>

                                        {/* Loading Message */}
                                        <div class="alert alert-primary alert-rounded" ng-show="profile.profileUpdateLoadingMsg">
                                            <strong> Loading!</strong> Hold on. We are updating your data!
                                        </div>

                                        {/* Success Message */}
                                        <div class="alert alert-success alert-rounded" ng-show="profile.profileUpdateSuccessMsg">
                                            <i class="ti-face-smile"></i>
                                            {/* <strong> Yay!</strong> {{ profile.profileUpdateSuccessMsg }} */}
                                        </div>

                                        {/* Error Message */}
                                        <div class="alert alert-danger alert-rounded" ng-show="profile.profileUpdateErrorMsg">
                                            <i class="ti-face-sad"></i>
                                            {/* <strong>Oops! </strong> {{ profile.profileUpdateErrorMsg }} */}
                                        </div>

                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <button type="submit" class="btn btn-success" ng-disabled="profile.profileUpdateLoadingMsg">Update Profile</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <span class="text-danger">*Non-editable fields. Data directly coming from MNIT ERP.</span>
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