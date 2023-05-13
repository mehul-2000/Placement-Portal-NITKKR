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
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Add New Placements</h4>
                </div>

                <div class="col-md-7 align-self-center text-right">
                    <div class="d-flex justify-content-end align-items-center">
                        <Link to="/placement-management" type="button" class="btn btn-primary d-none d-lg-block m-l-15"><i class="ti-calendar"></i> &nbsp;Placement Management</Link>
                    </div>
                </div>
            </div>

            {/* Add New Placement Form */}
            <form onSubmit={postPlacementDetails}>

                <div class="row">

                    {/* Company Details Form */}
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Placement Details</h4>
                                <h6 class="card-subtitle">Enter placement details for placement session</h6>

                                <div class="row p-t-20">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Company Name</label>
                                            <input type="text" class="form-control" placeholder="Enter name" name="company_name" value={newPlacementData.company_name} onChange={handlePlacementDataChange} required />
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Passout Batch</label>
                                            <select class="form-control" name="passout_batch" value={newPlacementData.passout_batch} onChange={handlePlacementDataChange} required>
                                                <option value="">-- Select Passout Batch --</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Job Profile</label>
                                            <input type="text" class="form-control" placeholder="Enter Job Profile" name="job_profile" value={newPlacementData.job_profile} onChange={handlePlacementDataChange} required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Recruitment Date(when company announced the result)</label>
                                            <input type="date" class="form-control" name="recruitment_date" value={newPlacementData.recruitment_date} onChange={handlePlacementDataChange} required />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Recruitment</label>
                                            <select class="form-control" name="recruitment" value={newPlacementData.recruitment} onChange={handlePlacementDataChange} required>
                                                <option value="">-- Select Recruitment --</option>
                                                <option value="Internship">Internship</option>
                                                <option value="Placement">Placement</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Recruitment Type</label>
                                            <select class="form-control" name="recruitment_type" value={newPlacementData.recruitment_type} onChange={handlePlacementDataChange} required>
                                                <option value="">-- Select Recruitment Type --</option>
                                                <option value="PPO">Pre Placement Offer</option>
                                                <option value="On-Campus">On-Campus</option>
                                                <option value="Off-Campus">Off-Campus</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {newPlacementData.recruitment === 'Internship' && <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Internship Duration</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control" placeholder="Enter internship duration" name="intern_duration" value={newPlacementData.intern_duration} onChange={handlePlacementDataChange} required />
                                                <div class="input-group-append">
                                                    <span class="input-group-text">Months</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Internship Stipend</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control" placeholder="Enter internship stipend" name="intern_stipend" value={newPlacementData.intern_stipend} onChange={handlePlacementDataChange} required />
                                                <div class="input-group-append">
                                                    <span class="input-group-text">Per Month</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}

                                {newPlacementData.recruitment === 'Placement' && <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Duration</label>
                                            <input type="text" class="form-control" value="Full Time Job - Placement" disabled />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Package</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control" placeholder="Enter package" name="package" value={newPlacementData.package} onChange={handlePlacementDataChange} step="any" required />
                                                <div class="input-group-append">
                                                    <span class="input-group-text">Lakhs Per Annum</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="table-responsive">
                                            <table class="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th class="text-center">#</th>
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
                                                    <td class="text-center">{ index+1 }.</td>
                                                    <td class="txt-oflo">{ candidate.name }</td>
                                                    <td><span class="text-info">{ candidate.college_id }</span></td>
                                                    <td class="txt-oflo">{ candidate.degree } - { candidate.department }</td>
                                                    <td><span class="text-success">{ candidate.alternate_contact_no }</span></td>
                                                    <td class="txt-oflo" style={{cursor: "pointer"}} onClick={() => removeCandidate(candidate.college_id)}><i class="fa fa-trash text-danger" style={{fontSize: "x-large"}}></i></td>
                                                </tr>)})}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label class="control-label">Add Candidate</label>
                                            <input type="text" class="form-control" placeholder="Enter College ID" value={college_id} onChange={(e) => setCollegeId(e.target.value)} />
                                            {/* <span class="form-control-feedback text-danger"> {{ addNewPlacement.candidateErrorMsg }} </span> */}
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group" style={{marginTop: "25px"}}>
                                            <button type="button" onClick={addCandidate} class="btn btn-success btn-circle"><i class="fa fa-plus"></i> </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="control-label">Any Comments</label>
                                    <textarea type="text" class="form-control" rows="3" name="comments" value={newPlacementData.comments} onChange={handlePlacementDataChange} placeholder="Any comments..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading */}
                {loading && <div class="alert alert-primary alert-rounded text-center" ng-show="addNewPlacement.loading">
                    <strong> Hold on!</strong> Please wait, while we add your data...
                </div>}


                <div style={{textAlign: "center"}}>
                    <button type="submit" class="btn btn-primary btn-rounded"><i class="ti-check-box"></i> &nbsp; Submit Details</button>
                </div>
            </form>
        </>
    )
}

export default AddPlacement