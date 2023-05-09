import React, { Fragment, useEffect, useState } from 'react';
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
    const { loading, error, notifications } = useSelector((state) => state.notifications);

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
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">All Notifications</h4>
                </div>

            </div>

            <div class="row">
                <div class="col-12">
                    <button class="btn btn-block btn-primary btn-rounded" data-bs-toggle="modal" data-bs-target="#addCompanyNotificationModal"><i class="ti-bell"></i> &nbsp; Add New Notification</button>
                </div>
            </div>


            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">

                        <div>
                            <h5 class="card-title">Notifications History</h5>
                            <h6 class="card-subtitle">check out personalized notification history for this company</h6>
                        </div>

                        <div class="m-t-40">
                            {notifications && notifications.map((notif) => {
                            return(<div class="message-box">
                                <div class="message-widget message-scroll">
                                    <Link>
                                        <div class="user-img">
                                            <img src="/assets/images/announcements/Other.png" alt="user" class="img-circle" />
                                            {!notif.read.seen && <span class="profile-status online float-right"></span>}
                                        </div>
                                        <div class="mail-contnet" style={{width: "90% !important"}}>
                                            <h5>{ notif.title }</h5>
                                            <span class="text-muted">
                                                { notif.description }
                                            </span>
                                            <span class="time">{Moment(notif.timestamp).format('DD MMM yyyy, hh:mm a')} by { notif.sender }</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>)})}
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="addCompanyNotificationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content" ng-show="!companyNotification.successMsg">
                        <form onSubmit={postNotification}>
                            <div class="modal-header">
                                <h4 class="modal-title" id="addCompanyNotificationModalHeader">Add New Notification</h4>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>

                            <div class="modal-body">
                                <div class="form-group">
                                    <label class="control-label">Title</label>
                                    <input type="text" class="form-control" placeholder="Write title here..." name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>

                                <div class="form-group">
                                    <label class="control-label">Description</label>
                                    <textarea type="text" class="form-control" placeholder="Write description here..." rows="4" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
                                </div>

                                {addLoading && <div class="alert alert-primary alert-rounded">
                                    <strong> Loading!</strong> Hold on. posting notification...
                                </div>}

                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                <button type="submit" disabled={addLoading} class="btn btn-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyNotification