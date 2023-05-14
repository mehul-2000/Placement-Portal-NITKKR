import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Moment from 'moment';
import { addNewNotification, getCompanyNotifications, clearErrors } from "../../../actions/notificationAction"
import { CREATE_NOTIFICATION_RESET } from "../../../constants/notificationConstants"

const CompanyNotification = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const {company_id} = useParams();

    Moment.locale('en');

    const { loading:addLoading, error:addError, message } = useSelector((state) => state.notification);
    const { error, notifications } = useSelector((state) => state.notifications);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const postNotification = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("title", title);
        myForm.set("description", description);
        myForm.set("companyId", company_id);
        dispatch(addNewNotification(myForm));
    }

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(addError) {
            alert.error(addError);
            dispatch(clearErrors());
        }
        if(message) {
            alert.success(message);
            setTitle("");
            setDescription("");
            dispatch({type:CREATE_NOTIFICATION_RESET});
            dispatch(getCompanyNotifications(company_id));
        }
    }, [dispatch, error, alert, addError, message, company_id])

    useEffect(() => {
        dispatch(getCompanyNotifications(company_id));
    }, [dispatch, company_id])
    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">All Notifications</h4>
                </div>

            </div>

            <div className="row">
                <div className="col-12">
                    <button className="btn btn-block btn-primary btn-rounded" data-bs-toggle="modal" data-bs-target="#addCompanyNotificationModal"><i className="ti-bell"></i> &nbsp; Add New Notification</button>
                </div>
            </div>


            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">

                        <div>
                            <h5 className="card-title">Notifications History</h5>
                            <h6 className="card-subtitle">check out personalized notification history for this company</h6>
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

            <div className="modal fade" id="addCompanyNotificationModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content" ng-show="!companyNotification.successMsg">
                        <form onSubmit={postNotification}>
                            <div className="modal-header">
                                <h4 className="modal-title" id="addCompanyNotificationModalHeader">Add New Notification</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="control-label">Title</label>
                                    <input type="text" className="form-control" placeholder="Write title here..." name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Description</label>
                                    <textarea type="text" className="form-control" placeholder="Write description here..." rows="4" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
                                </div>

                                {addLoading && <div className="alert alert-primary alert-rounded">
                                    <strong> Loading!</strong> Hold on. posting notification...
                                </div>}

                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                                <button type="submit" disabled={addLoading} className="btn btn-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyNotification