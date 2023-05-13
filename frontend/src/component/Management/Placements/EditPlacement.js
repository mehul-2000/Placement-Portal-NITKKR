import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { EDIT_PLACEMENT_RESET } from "../../../constants/placementConstants"
import { editPlacement, clearErrors, getOnePlacements } from '../../../actions/placementAction';


const EditPlacement = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {placement_id} = useParams();

    const { error, placements } = useSelector((state) => state.placements);
    const { error:editError, loading:editLoading, message} = useSelector(state => state.placement);

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

    const handlePlacementDataChange = (e) => {
        setNewPlacementData({ ...newPlacementData, [e.target.name]: e.target.value});
    }

    const postPlacementDetails = (e) => {
        e.preventDefault();
        dispatch(editPlacement(newPlacementData));
    };

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(editError) {
            alert.error(editError);
            dispatch(clearErrors());
        }
        if(message) {
            alert.success(message);
            navigate("/placement-management");
            dispatch({type:EDIT_PLACEMENT_RESET});
        }
    }, [dispatch, error, alert, message, navigate, editError])

    useEffect(() => {
        if(placements[0]) {
            setNewPlacementData(placements[0]);
        }
    }, [placements])

    useEffect(() => {
        dispatch(getOnePlacements(placement_id));
    }, [dispatch, placement_id])

    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Edit Placements</h4>
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
                    {placements.length && <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Edit { placements[0].student[0].name.split(" ")[0] }'s Placement Details</h4>
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
                                            {newPlacementData.recruitment_date && <input type="date" className="form-control" name="recruitment_date" value={new Date(newPlacementData.recruitment_date).toISOString().substring(0, 10)} onChange={handlePlacementDataChange} required />}
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

                                <div className="form-group">
                                    <label className="control-label">Any Comments</label>
                                    <textarea type="text" className="form-control" rows="3" name="comments" value={newPlacementData.comments} onChange={handlePlacementDataChange} placeholder="Any comments..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
                
                {/* Loading */}
                {editLoading && <div className="alert alert-primary alert-rounded text-center" ng-show="addNewPlacement.loading">
                    <strong> Hold on!</strong> Please wait, while we update data...
                </div>}


                <div style={{textAlign: "center"}}>
                    <button type="submit" className="btn btn-primary btn-rounded"><i className="ti-check-box"></i> &nbsp; Submit Details</button>
                </div>
            </form>
        </>
    )
}

export default EditPlacement