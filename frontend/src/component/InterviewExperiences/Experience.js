import React, { Fragment, useEffect, useState } from 'react';
import { getInterviewDetails, clearErrors, changeStatus } from "../../actions/interviewAction"
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from 'react-alert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UPDATE_STATUS_RESET } from "../../constants/interviewConstants"

const Experience = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {experience_id} = useParams();

    const { loading, error, interview, updateLoading, message } = useSelector((state) => state.interviewDetails);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(message) {
            alert.success(message);
            dispatch({type:UPDATE_STATUS_RESET});
        }
    }, [dispatch, error, alert, message])

    useEffect(() => {
        dispatch(getInterviewDetails(experience_id));
    }, [dispatch, experience_id])

    return (
        <>
            {loading && <div className="row">
                <div className="col-md-12">
                    <div className="card-body text-center">
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
                    </div>
                </div>
            </div>}

            {/* Interview Experience */}
            {interview && <div className="row page-titles">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h3>{ interview.title }</h3>
                                    <h6 className="font-light m-t-0">Created by { interview.author_name }.</h6>
                                    <hr />
                                </div>
                                <div className="col-12">
                                    <div dangerouslySetInnerHTML={{ __html: interview.experience }} />
                                    {/* <div ng-bind-html="experience.experience.experience"></div> */}
                                    <br />
                                    <div>
                                        {/* {interview.tags.map(tag => {return (<span className="label label-success" style={{marginRight: "10px"}}>{ tag }</span>)})} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            {/* Approve or pending change status */}
            {interview && (user.permission==='spc' || user.permission==='admin') && <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <Link to={`/editExperience/${experience_id}`} className="btn btn-block btn-primary">Edit Experience</Link>
                                </div>
                                <br />
                                <br />
                                <div className="col-12 text-center">
                                    {updateLoading && <p className="text-primary">Updating status... Please wait!</p>}
                                    {/* <p className="text-danger" ng-show="experience.errorMsg">{{ experience.errorMsg }}</p>
                                    <p className="text-primary" ng-show="experience.successMsg">{{ experience.successMsg }}</p> */}
                                    {interview.status==='pending' && <button className="btn btn-block btn-success" onClick={() => {dispatch(changeStatus(experience_id))}}> &nbsp; Approve Interview Experience</button>}
                                    {interview.status==='approved' && <button className="btn btn-block btn-danger" onClick={() => {dispatch(changeStatus(experience_id))}}> &nbsp; Disapprove Interview Experience</button>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Experience