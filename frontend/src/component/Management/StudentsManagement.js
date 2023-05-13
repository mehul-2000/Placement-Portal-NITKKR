import React, { useEffect, useState } from 'react';
import { getStudent, updateStudent, clearErrors } from "../../actions/studentAction"
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { UPDATE_STUDENT_RESET } from "../../constants/studentConstants"

const StudentsManagement = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { student, error, isFetched, isUpdated } = useSelector((state) => state.student);

    const [college_id, setCollegeId] = useState("");
    const searchStudentSubmit = (e) => {
        e.preventDefault();
        if(college_id.trim() === "") {
            alert.error("Field can't be empty");
        }
        else {
            dispatch(getStudent(college_id));
        }
    };

    const [newStudentData, setNewStudentData] = useState({
        college_id:"",
        name:"",
        degree:"",
        department:"",
        college_email:"",
        contact_no:"",
        cgpa:"",
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

    const handleStudentDataChange = (e) => {
        setNewStudentData({ ...newStudentData, [e.target.name]: e.target.value});
    }

    const updateStudentProfile = (e) => {
        e.preventDefault();
        dispatch(updateStudent(newStudentData));
    };

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated) {
            alert.success("Profile updated successfully.");
            dispatch({type:UPDATE_STUDENT_RESET});
        }
        if(student) {
            setNewStudentData(student);
        }
    }, [dispatch, error, alert, student, isUpdated]);

    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Students Database</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                        <form className="form-material" onSubmit={ searchStudentSubmit }>
                            <div className="row">
                                <div className="col-lg-8">
                                    
                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-line" placeholder="Enter Students' College ID" value={college_id} onChange={(e) => setCollegeId(e.target.value)} required/>
                                        </div>
                                </div>
                                <div className="col-lg-4 text-center">
                                    <button type="submit" className="btn btn-primary btn-rounded"><i className="ti-crown"></i> &nbsp; Search Student</button>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>

            {isFetched && <div ng-show="studentsManagement.searchingByID">
                <div className="row page-titles">
                    <div className="col-md-5 align-self-center">
                        <h4 className="text-themecolor">Students Profile</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-xlg-3 col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <center className="m-t-30">
                                    <img src={`assets/images/profile/${student.gender}.png`} className="img-circle" width="150" alt="profile"/>
                                    <h4 className="card-title m-t-10">{ student.name }</h4>
                                    <h6 className="card-subtitle">{ student.department } { student.permission }</h6>
                                    <div className="row text-center">
                                        <div className="col-12"><Link className="link"><i className="ti-location-pin"></i> <font className="font-medium">NIT Kurukshetra</font></Link></div>
                                    </div>
                                </center>
                            </div>
                            <div>
                                <hr /> </div>
                            <div className="card-body">
                                <small className="text-muted">Email address </small>
                                <h6>{ student.college_email }</h6>
                                <small className="text-muted p-t-30 db">Contact No.</small>
                                <h6>+91 { student.contact_no }</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-xlg-9 col-md-7">

                        {/* <!-- Resume Section --> */}
                        <div className="card">
                            <ul className="product-review text-center">
                                {/* <!-- Resume Uploaded --> */}
                                {student.resume_url && <li ng-if="studentsManagement.studentData.resume_url">
                                <span className="text-muted display-5">
                                    <i className="mdi mdi-emoticon-cool text-success"></i>
                                </span>
                                    <span>
                                    <h3 className="card-title">We've {student.gender==="M"?"his":"her"} resume! </h3>
                                    <h6 className="card-subtitle">Now, he is all set for Placement session.<a target="_blank" rel="noreferrer" href={`/assets/uploads/resumes/${student.resume_url}`}>&nbsp;<i className="ti ti-cloud-down"></i> </a></h6>
                                </span>
                                </li>}

                                {/* <!-- Resume Not Uploaded. --> */}
                                {!student.resume_url && <li ng-if="!studentsManagement.studentData.resume_url">
                                    <font className="text-muted display-5">
                                        <i className="mdi mdi-emoticon-sad text-danger"></i>
                                    </font>
                                    <span>
                                    <h3 className="card-title"> Resume is missing!</h3>
                                    <h6 className="card-subtitle">Upload your resume to get started.</h6>
                                </span>
                                </li>}
                            </ul>
                        </div>

                        <div className="card">
                            <ul className="nav nav-tabs profile-tab" role="tablist">
                                <li className="nav-item"> <Link className="nav-link active" data-toggle="tab" role="tab">Profile Details</Link> </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="profile" role="tabpanel">
                                    <div className="card-body">
                                        <form className="form-horizontal form-material" onSubmit={updateStudentProfile}>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">Name</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your name" className="form-control form-control-line" name="name" value={newStudentData.name} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">College ID</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your college ID" className="form-control form-control-line" value={student.college_id} disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">Degree</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your degree" className="form-control form-control-line" name="degree" value={newStudentData.degree} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">Branch</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your branch" className="form-control form-control-line" name="department" value={newStudentData.department} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">Personal Email</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your personal email" className="form-control form-control-line" name="college_email" value={newStudentData.college_email} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">Personal Contact No.</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your personal contact no." className="form-control form-control-line" name="contact_no" value={newStudentData.contact_no} onChange={handleStudentDataChange} required/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">CGPA</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your CGPA" className="form-control form-control-line" name="cgpa" value={newStudentData.cgpa} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">10th Percentage (CGPA)</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your 10th percentage (CGPA)" className="form-control form-control-line" name="matric_marks" value={newStudentData.matric_marks} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">Board</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your 10th board" className="form-control form-control-line" name="matric_board" value={newStudentData.matric_board} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">12th Percentage (CGPA)</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your 12th percentage (CGPA)" className="form-control form-control-line" name="senior_marks" value={newStudentData.senior_marks} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">Board</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your 12th board" className="form-control form-control-line" name="senior_board" value={newStudentData.senior_board} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">Contact No. for Communication</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your contact no." className="form-control form-control-line" name="alternate_contact_no" value={newStudentData.alternate_contact_no} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label className="col-md-12">Address</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your address" className="form-control form-control-line" name="address" value={newStudentData.address} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">City</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your city" className="form-control form-control-line" name="city" value={newStudentData.city} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">Post Code</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your post code" className="form-control form-control-line" name="post_code" value={newStudentData.post_code} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">State</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your state" className="form-control form-control-line" name="state" value={newStudentData.state} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-12">Country</label>
                                                        <div className="col-md-12">
                                                            <input type="text" placeholder="Enter your country" className="form-control form-control-line" name="country" value={newStudentData.country} onChange={handleStudentDataChange} required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-md-12">LinkedIn Profile Link</label>
                                                <div className="col-md-12">
                                                    <input type="text" placeholder="Enter your social profile link" className="form-control form-control-line" name="linkedln_link" value={newStudentData.linkedln_link} onChange={handleStudentDataChange} required />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-sm-12">
                                                    <button type="submit" className="btn btn-success">Update Profile</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default StudentsManagement