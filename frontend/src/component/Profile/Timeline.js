import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, getTimeline } from "../../actions/userAction";
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const Timeline = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    Moment.locale('en');

    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { loading, error, timeline } = useSelector((state) => state.info);

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
        dispatch(getTimeline());
    }, [dispatch])
    return (
        <>
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Your Timeline</h4>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-4 col-xlg-3 col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <center class="m-t-30">
                                <img src={`assets/images/profile/${user.gender}.png`} className="img-circle" width="150" alt="profile" />
                                <h4 class="card-title m-t-10">{ user.name }</h4>
                                <h6 class="card-subtitle">{ user.department }</h6>
                                <div class="row text-center">
                                    <div class="col-12"><Link><i class="ti-location-pin"></i> <font class="font-medium">NIT Kurukshetra</font></Link></div>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-xlg-9 col-md-7">
                    <div class="card">
                        <ul class="nav nav-tabs profile-tab" role="tablist">
                            <li class="nav-item"> <Link class="nav-link active" data-toggle="tab" href="#" role="tab">Timeline</Link> </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="card-body">
                                    {timeline && timeline.map((registration) => {
                                        return (<div class="profiletimeline">
                                        <div class="sl-item">
                                            <div class="sl-left">
                                                <img src="https://res.cloudinary.com/placements-mnit/image/upload/v1593682008/timeline/timeline_j8jzub.png" alt="Timeline Icon" class="img-circle" />
                                            </div>
                                            <div class="sl-right">
                                                <div><Link class="link">{registration.company_name}</Link>
                                                    <div class="row">
                                                        <div class="col-lg-6"><p class="m-t-10"> <b>Applied :</b> {Moment(registration.timestamp).format('DD MMMM yyyy')}</p></div>
                                                        <div class="col-lg-6"><p class="m-t-10"> <b>Status :</b> {registration.status}</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)})}
                                    {loading && <div class="alert alert-primary alert-rounded">
                                        <strong> Loading!</strong> Hold on. We are fetching your timeline!
                                    </div>}
                                    {timeline && timeline.length === 0 && <div>
                                        <h5> Nothing right here! Start applying.</h5>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timeline