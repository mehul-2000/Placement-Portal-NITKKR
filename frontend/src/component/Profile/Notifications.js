import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Moment from 'moment';
import { getAllNotifications, wipeAllNotifications, clearErrors } from "../../actions/notificationAction"
import { Link } from 'react-router-dom';

const Notifications = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    Moment.locale('en');

    const { error, notifications } = useSelector((state) => state.notifications);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert])

    useEffect(() => {
        dispatch(getAllNotifications());
    }, [dispatch])

    useEffect(() => {
        if(notifications && notifications.length > 0) {
            dispatch(wipeAllNotifications());
        }
    }, [dispatch, notifications])
    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Notifications</h4>
                </div>

            </div>

            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <div>
                            <h5 className="card-title">New Notifications</h5>
                            <h6 className="card-subtitle">check out new updates from placement cell</h6>
                        </div>

                        <div className="m-t-40">
                            {notifications && notifications.map((notif, idx) => {
                            return(<div className="message-box" key={idx}>
                                <div className="message-widget message-scroll">
                                    <Link>
                                        <div className="user-img">
                                            <img src="/assets/images/announcements/Other.png" alt="user" className="img-circle" />
                                            {!notif.read.seen && <span className="profile-status online float-right"></span>}
                                        </div>
                                        <div className="mail-contnet" style={{width: "90% !important"}}>
                                            <h5>{ notif.title }</h5>
                                            <span className="text-muted">
                                                { notif.description }
                                            </span>
                                            <span className="time">{Moment(notif.timestamp).format('DD MMM yyyy, hh:mm a')} by { notif.sender }</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>)})}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notifications