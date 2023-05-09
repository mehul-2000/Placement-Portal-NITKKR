import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, getContributions } from "../../actions/userAction";
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
const TruncHtml = require('trunc-html');

const Contributions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();


    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { loading, error, interviews } = useSelector((state) => state.info);

    useEffect(() => {
        if(isAuthenticated === false) {
            navigate("/login")
        }
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [isAuthenticated, dispatch, error, alert, navigate])

    useEffect(() => {
        dispatch(getContributions());
    }, [dispatch])
    return (
        <>
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Your Contributions</h4>
                </div>
            </div>
            <div>
                <div class="row">
                    {interviews && interviews.map((experience) => {
                    return(<div class="col-lg-6">
                        <div class="card cc-widget">
                            <div class="card-body">
                                <div class="d-flex no-block flex-row">
                                    <div class="round align-self-center round-primary m-t-10 m-b-10"><i class="icon-rocket"></i></div>
                                    <div class="m-l-10 align-self-center">
                                        <h4 class="m-b-0"><Link to={`/experience/${ experience._id }`} style={{color: "black"}}>{ experience.title }</Link> {experience.status=='approved' && <i class="fa fa-check-circle text-success"></i>}{experience.status=='pending' && <i class="fa fa-exclamation-circle text-danger"></i>} </h4>
                                        <h5 class="text-muted m-b-0"><i class="fa fa-user"></i> { experience.author_name }</h5>
                                    </div>
                                </div>
                                <div class="d-flex no-block flex-row m-t-20 cc-details interview">
                                    <div dangerouslySetInnerHTML={{ __html: TruncHtml(experience.experience, 200).html }} />
                                </div>
                                <br />
                                <div>
                                    {experience.tags.map(tag => {return (<span class="label label-success" style={{marginRight: "10px"}}>{ tag }</span>)})}
                                </div>
                            </div>
                        </div>
                    </div>)})}
                </div>
            </div>

            {(interviews && interviews.length === 0) && <div class="row">
                <div class="col-md-12">
                    <div class="card text-white bg-success">
                        <div class="card-body">
                            <h3 class="card-title">Nothing right here!</h3>
                            <p class="card-text">Start contributing to help your mates out there.Share details about the interview process you have been through.. .</p>
                            <Link to="/compose" class="btn btn-dark">Contribute Now</Link>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Contributions