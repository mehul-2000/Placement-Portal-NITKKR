import React, { Fragment, useEffect, useState } from 'react';
import { getAllPlacements, clearErrors } from "../../../actions/placementAction"
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const PlacementManagement = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    Moment.locale('en');

    const { loading, error, placements } = useSelector((state) => state.placements);

    const [batch, setBatch] = useState("");
    const [recruitment, setRecruitment] = useState("");
    const [recruitment_type, setRecruitmentType] = useState("");
    const [filterPlacements, setFilterPlacements] = useState([]);

    useEffect(() => {
        setFilterPlacements(placements.filter((placement) => {
            return ((batch==="" || placement.passout_batch === batch) && (recruitment==="" || placement.recruitment === recruitment) && (recruitment_type==="" || placement.recruitment_type === recruitment_type));
        }));
    }, [batch, placements, recruitment, recruitment_type])

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert])

    useEffect(() => {
        dispatch(getAllPlacements());
    }, [dispatch])

    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Placements Management</h4>
                </div>

                {/* Add Placement Button */}
                <div className="col-md-7 align-self-center text-right">
                    <div className="d-flex justify-content-end align-items-center">
                        <Link to="/add-placement" type="button" className="btn btn-primary d-none d-lg-block m-l-15"><i className="ti-plus"></i> Add Placement</Link>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <select className="form-control" value={batch} onChange={(e) => setBatch(e.target.value)}>
                                            <option value="">-- Select Batch -- </option>
                                            <option value="2021">Batch of 2021</option>
                                            <option value="2022">Batch of 2022</option>
                                            <option value="2023">Batch of 2023</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <select className="form-control" value={recruitment} onChange={(e) => setRecruitment(e.target.value)}>
                                            <option value="">-- Select Recruitment --</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Placement">Placement</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <select className="form-control" value={recruitment_type} onChange={(e) => setRecruitmentType(e.target.value)}>
                                            <option value="">-- Select Recruitment Type --</option>
                                            <option value="PPO">Pre Placement Offer</option>
                                            <option value="On-Campus">On-Campus</option>
                                            <option value="Off-Campus">Off-Campus</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Todo - Degree & Branch Filter */}
                                {filterPlacements && <span className="ml-2 text-primary">Showing { filterPlacements.length } {batch && <span>Batch of { batch }</span>} { recruitment } { recruitment_type } Candidates.</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                {filterPlacements && filterPlacements.map(filterPlacement => {
                return(<div key={filterPlacement._id} className="col-lg-3 col-xlg-3 col-md-5">
                    <div className="card"> <img className="card-img" src="../assets/images/celebration.jpg" height="230" alt="Card" />
                        <div className="card-img-overlay card-inverse text-white social-profile d-flex justify-content-center" style={{borderRadius: "15px"}}>
                            <div className="align-self-center">
                                <h4 className="card-title">{ filterPlacement.student[0].name }</h4>
                                <h6 className="card-subtitle">{ filterPlacement.job_profile } @ { filterPlacement.company_name }</h6>
                                <h6 className="text-white">
                                    { filterPlacement.recruitment_type } : { filterPlacement.recruitment }
                                    <br />
                                    {filterPlacement.recruitment==='Internship' && <span>( { filterPlacement.intern_duration } Months - { filterPlacement.intern_stipend } Per Month)</span>}
                                    {filterPlacement.recruitment==='Placement' && <span>( Full Time - { filterPlacement.package } LPA)</span>}
                                </h6>
                                <p className="text-white">Batch of { filterPlacement.passout_batch }</p>
                                <p className="text-muted"> **{ Moment(filterPlacement.recruitment_date).format('DD MMM yyyy') }**</p>
                                <Link to={`/edit-placement/${ filterPlacement._id }`} className="text-primary">Edit </Link>
                            </div>
                        </div>
                    </div>
                </div>)})}
            </div>

            <div className="col-lg-12">
                <div className="card">
                    {loading && <div className="card-body text-center">
                        <div className="spinner-grow" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-success" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-info" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-dark" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default PlacementManagement