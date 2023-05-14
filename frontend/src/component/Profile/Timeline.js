import React, {useEffect } from 'react';
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
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Your Timeline</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4 col-xlg-3 col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <center className="m-t-30">
                                <img src={`assets/images/profile/${user.gender}.png`} className="img-circle" width="150" alt="profile" />
                                <h4 className="card-title m-t-10">{ user.name }</h4>
                                <h6 className="card-subtitle">{ user.department }</h6>
                                <div className="row text-center">
                                    <div className="col-12"><Link><i className="ti-location-pin"></i> <font className="font-medium">NIT Kurukshetra</font></Link></div>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-xlg-9 col-md-7">
                    <div className="card">
                        <ul className="nav nav-tabs profile-tab" role="tablist">
                            <li className="nav-item"> <Link className="nav-link active" data-toggle="tab" href="#" role="tab">Timeline</Link> </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="home" role="tabpanel">
                                <div className="card-body">
                                    {timeline && timeline.map((registration, idx) => {
                                        return (<div className="profiletimeline">
                                        <div className="sl-item">
                                            <div className="sl-left">
                                                <img src="assets/images/timeline.png" alt="Timeline Icon" className="img-circle" />
                                            </div>
                                            <div className="sl-right">
                                                <div><Link className="link">{registration.company_name}</Link>
                                                    <div className="row">
                                                        <div className="col-lg-6"><p className="m-t-10"> <b>Applied :</b> {Moment(registration.timestamp).format('DD MMMM yyyy')}</p></div>
                                                        <div className="col-lg-6"><p className="m-t-10"> <b>Status :</b> {registration.status}</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)})}
                                    {loading && <div className="alert alert-primary alert-rounded">
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