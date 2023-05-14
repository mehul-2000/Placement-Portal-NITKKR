import React, { useEffect, useState } from 'react';
import { getAllAdminInterviews, clearErrors } from "../../actions/interviewAction"
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
const TruncHtml = require('trunc-html');

const InterviewsManagaement = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, interviews } = useSelector((state) => state.interviews);

    const [status, setStatus] = useState("");
    const [filterInterviews, setFilterInterviews] = useState([]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    useEffect(() => {
        if (status === "") { setFilterInterviews(interviews); return; }
        setFilterInterviews(interviews.filter((item) => {
            return (item.status === status);
        }));
    }, [status, interviews])

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert])

    useEffect(() => {
        dispatch(getAllAdminInterviews());
    }, [dispatch])
    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">All Interview Experiences</h4>
                </div>
            </div>

            <div className="row" ng-show="main.authorized">
                <div className="col-12">
                    <div className="form-group">
                        <select className="form-control" value={status} onChange={handleStatusChange}>
                            <option value="">-- Filter Interview Experience --</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <div className="row">
                    {filterInterviews && filterInterviews.map(filterInterview => {
                    return (<div className="col-lg-6" key={filterInterview._id}>
                        <div className="card cc-widget">
                            <div className="card-body">
                                <div className="d-flex no-block flex-row">
                                    <div className="round align-self-center round-primary m-t-10 m-b-10"><i className="icon-rocket"></i></div>
                                    <div className="m-l-10 align-self-center">
                                        <h4 className="m-b-0"><Link to={`/experience/${filterInterview._id}`} style={{color: "black"}}>{ filterInterview.title }</Link>
                                            {filterInterview.status === "approved" && <i className="fa fa-check-circle text-success"></i>}
                                            {filterInterview.status === "pending" && <i className="fa fa-exclamation-circle text-danger"></i>}
                                        </h4>
                                        <h5 className="text-muted m-b-0"><i className="fa fa-user"></i> { filterInterview.author_name }</h5>
                                    </div>
                                </div>
                                <div className="d-flex no-block flex-row m-t-20 cc-details interview">
                                    <div dangerouslySetInnerHTML={{ __html: TruncHtml(filterInterview.experience, 200).html }} />
                                </div>
                                <br />
                                <div>
                                    {filterInterview.tags.map(tag => {return (<span className="label label-success" style={{marginRight: "10px"}}>{ tag }</span>)})}
                                </div>
                            </div>
                        </div>
                    </div>)})}
                </div>
            </div>
        </>
    )
}

export default InterviewsManagaement