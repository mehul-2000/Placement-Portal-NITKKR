import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getStudent, clearErrors as clearStudentErrors } from '../../../actions/studentAction';
import { GET_STUDENT_RESET } from "../../../constants/studentConstants"
import { CREATE_PLACEMENT_RESET } from "../../../constants/placementConstants"
import { addNewPlacement, clearErrors } from '../../../actions/placementAction';

const AddPlacement = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error, loading, message} = useSelector(state => state.placement);
    const { student, error:studentError} = useSelector((state) => state.student);

    const [newPlacementData, setNewPlacementData] = useState({
        company_name: "",
        passout_batch: "",
        job_profile: "",
        recruitment: "",
        recruitment_type: "",
        recruitment_date: "",
        intern_duration: "",
        intern_stipend: "",
        package: "",
        comments: ""
    });

    const [college_id, setCollegeId] = useState("");
    const [candidates, setCandidates] = useState([]);

    const handlePlacementDataChange = (e) => {
        setNewPlacementData({ ...newPlacementData, [e.target.name]: e.target.value});
    }

    const postPlacementDetails = (e) => {
        e.preventDefault();
        if(candidates.length === 0) {
            alert.error("Please enter candidates");
            return;
        }
        const myForm = new FormData();
        for (var key in newPlacementData){
            myForm.set(key, newPlacementData[key]);
        }
        myForm.set("candidates", JSON.stringify(candidates));
        dispatch(addNewPlacement(myForm));
    };

    const addCandidate = () => {
        if(college_id) {
            if(!candidates.find((student) => student.college_id === college_id.toUpperCase())) {
                dispatch(getStudent(college_id));
                setCollegeId("");
            } else {
                alert.error("Candidate already added.");
            }
        } else {
            alert.error("Please enter college id");
        }
    }

    const removeCandidate = (candidate) => {
        var temp = [...candidates];
        temp = temp.filter((student) => {
          return student.college_id !== candidate.toUpperCase();
        });
        setCandidates(temp)
    };

    useEffect(() => {
        if(student) {
            const temp = [...candidates];
            temp.push(student);
            dispatch({type:GET_STUDENT_RESET});
            setCandidates(temp);
        }
    }, [dispatch, student, candidates])

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(studentError) {
            alert.error(studentError);
            dispatch(clearStudentErrors());
        }
        if(message) {
            alert.success(message);
            navigate("/placement-management");
            dispatch({type:CREATE_PLACEMENT_RESET});
        }
    }, [dispatch, studentError, error, alert, message, navigate])

    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Add New Placements</h4>
                </div>

                <div className="col-md-7 align-self-center text-right">
                    <div className="d-flex justify-content-end align-items-center">
                        <Link to="/placement-management" type="button" className="btn btn-primary d-none d-lg-block m-l-15"><i className="ti-calendar"></i> &nbsp;Placement Management</Link>
                    </div>
                </div>
            </div>

            {/* Add New Placement Form */}
            <form onSubmit={postPlacementDetails}>

                <div className="row">

                    {/* Company Details Form */}
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Placement Details</h4>
                                <h6 className="card-subtitle">Enter placement details for placement session</h6>

                                <div className="row p-t-20">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Company Name</label>
                                            <input type="text" className="form-control" placeholder="Enter name" name="company_name" value={newPlacementData.company_name} onChange={handlePlacementDataChange} required />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Passout Batch</label>
                                            <select className="form-control" name="passout_batch" value={newPlacementData.passout_batch} onChange={handlePlacementDataChange} required>
                                                <option value="">-- Select Passout Batch --</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Job Profile</label>
                                            <input type="text" className="form-control" placeholder="Enter Job Profile" name="job_profile" value={newPlacementData.job_profile} onChange={handlePlacementDataChange} required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Recruitment Date(when company announced the result)</label>
                                            <input type="date" className="form-control" name="recruitment_date" value={newPlacementData.recruitment_date} onChange={handlePlacementDataChange} required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Recruitment</label>
                                            <select className="form-control" name="recruitment" value={newPlacementData.recruitment} onChange={handlePlacementDataChange} required>
                                                <option value="">-- Select Recruitment --</option>
                                                <option value="Internship">Internship</option>
                                                <option value="Placement">Placement</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Recruitment Type</label>
                                            <select className="form-control" name="recruitment_type" value={newPlacementData.recruitment_type} onChange={handlePlacementDataChange} required>
                                                <option value="">-- Select Recruitment Type --</option>
                                                <option value="PPO">Pre Placement Offer</option>
                                                <option value="On-Campus">On-Campus</option>
                                                <option value="Off-Campus">Off-Campus</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {newPlacementData.recruitment === 'Internship' && <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Internship Duration</label>
                                            <div className="input-group">
                                                <input type="number" className="form-control" placeholder="Enter internship duration" name="intern_duration" value={newPlacementData.intern_duration} onChange={handlePlacementDataChange} required />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Months</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Internship Stipend</label>
                                            <div className="input-group">
                                                <input type="number" className="form-control" placeholder="Enter internship stipend" name="intern_stipend" value={newPlacementData.intern_stipend} onChange={handlePlacementDataChange} required />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Per Month</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}

                                {newPlacementData.recruitment === 'Placement' && <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Duration</label>
                                            <input type="text" className="form-control" value="Full Time Job - Placement" disabled />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Package</label>
                                            <div className="input-group">
                                                <input type="number" className="form-control" placeholder="Enter package" name="package" value={newPlacementData.package} onChange={handlePlacementDataChange} step="any" required />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Lakhs Per Annum</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th className="text-center">#</th>
                                                    <th>NAME</th>
                                                    <th>COLLEGE ID</th>
                                                    <th>COURSE</th>
                                                    <th>CONTACT NO</th>
                                                    <th>ACTION</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {candidates && candidates.map((candidate, index) => {
                                                return (<tr key={index}>
                                                    <td className="text-center">{ index+1 }.</td>
                                                    <td className="txt-oflo">{ candidate.name }</td>
                                                    <td><span className="text-info">{ candidate.college_id }</span></td>
                                                    <td className="txt-oflo">{ candidate.degree } - { candidate.department }</td>
                                                    <td><span className="text-success">{ candidate.alternate_contact_no }</span></td>
                                                    <td className="txt-oflo" style={{cursor: "pointer"}} onClick={() => removeCandidate(candidate.college_id)}><i className="fa fa-trash text-danger" style={{fontSize: "x-large"}}></i></td>
                                                </tr>)})}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label className="control-label">Add Candidate</label>
                                            <input type="text" className="form-control" placeholder="Enter College ID" value={college_id} onChange={(e) => setCollegeId(e.target.value)} />
                                            {/* <span className="form-control-feedback text-danger"> {{ addNewPlacement.candidateErrorMsg }} </span> */}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group" style={{marginTop: "25px"}}>
                                            <button type="button" onClick={addCandidate} className="btn btn-success btn-circle"><i className="fa fa-plus"></i> </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Any Comments</label>
                                    <textarea type="text" className="form-control" rows="3" name="comments" value={newPlacementData.comments} onChange={handlePlacementDataChange} placeholder="Any comments..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading */}
                {loading && <div className="alert alert-primary alert-rounded text-center" ng-show="addNewPlacement.loading">
                    <strong> Hold on!</strong> Please wait, while we add your data...
                </div>}


                <div style={{textAlign: "center"}}>
                    <button type="submit" className="btn btn-primary btn-rounded"><i className="ti-check-box"></i> &nbsp; Submit Details</button>
                </div>
            </form>
        </>
    )
}

export default AddPlacement