import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { getAllAnnouncementsStudent, getAllAnnouncementsAdmin, clearErrors, addNewAnnouncement } from "../../actions/announcementAction"
import { CREATE_ANNOUNCEMENT_RESET } from "../../constants/announcementConstants"

const Announcement = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    Moment.locale('en');

    const { user } = useSelector((state) => state.user);
    const { loading:addLoading, error:addError, message } = useSelector((state) => state.announcement);
    const { loading, error, announcements } = useSelector((state) => state.announcements);

    const [passout_batch, setPassoutBatch] = useState("2023");

    const updateBatch = (e) => {
        setPassoutBatch(e.target.value);
    };

    const [newAnnouncementData, setNewAnnouncementData] = useState({
        "passout_batch": "",
        "category": "",
        "announcement": ""
    });

    const handleAnnouncementDataChange = (e) => {
        setNewAnnouncementData({ ...newAnnouncementData, [e.target.name]: e.target.value});
    }

    const postAnnouncement = (e) => {
        e.preventDefault();
        dispatch(addNewAnnouncement(newAnnouncementData));
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
            setNewAnnouncementData({
                "passout_batch": "",
                "category": "",
                "announcement": ""
            })
            dispatch({type:CREATE_ANNOUNCEMENT_RESET});
            if(user.permission === "student") {
                dispatch(getAllAnnouncementsStudent());
            }
            else {
                dispatch(getAllAnnouncementsAdmin(passout_batch));
            }
        }
    }, [dispatch, error, alert, addError, message])

    useEffect(() => {
        if(user.permission === "student") {
            dispatch(getAllAnnouncementsStudent());
        }
        else {
            dispatch(getAllAnnouncementsAdmin(passout_batch));
        }
    }, [dispatch, passout_batch])

    return (
        <>
            <div class="row page-titles">
                {/* <!-- Headling --> */}
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Announcements</h4>
                </div>

                {/* <!-- Add Announcement Button --> */}
                {(user.permission==='spc' || user.permission==='admin' ) && <div class="col-md-7 align-self-center text-right" ng-show="main.authorized">
                    <div class="d-flex justify-content-end align-items-center">
                        <button type="button" class="btn btn-primary d-none d-lg-block m-l-15" data-bs-toggle="modal" data-bs-target="#addAnnouncementModal"><i class="ti-plus"></i> Add Announcement</button>
                    </div>
                </div>}

                {/* <!-- Announcement add Modal box   --> */}
                <div class="modal fade" id="addAnnouncementModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
                    <div class="modal-dialog modal-xl" role="document">

                        <div class="modal-content">
                            {/* <!-- Announcement Form--> */}
                            <form onSubmit={postAnnouncement}>
                                <div class="modal-header">
                                    <h4 class="modal-title" id="exampleModalLabel1">New Announcement</h4>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body">

                                    {/* <!-- Category --> */}
                                    <div class="form-group">
                                        <label class="control-label">Select Category</label>
                                        <select class="form-control" name="category" value={newAnnouncementData.category} onChange={handleAnnouncementDataChange} required>
                                            <option value=""> -- Select Announcement Category -- </option>
                                            <option value="info"> Information Update</option>
                                            <option value="result"> Result Announcement</option>
                                            <option value="hiring"> New Company Info</option>
                                            <option value="other"> Other</option>
                                        </select>
                                    </div>

                                    {/* <!-- Passout Batch --> */}
                                    <div class="form-group">
                                        <label class="control-label">Select Passout Batch</label>
                                        <select class="form-control" name="passout_batch" value={newAnnouncementData.passout_batch} onChange={handleAnnouncementDataChange} required>
                                            <option value=""> -- Select Batch -- </option>
                                            <option value="2020">2020 Batch</option>
                                            <option value="2021">2021 Batch</option>
                                            <option value="2022">2022 Batch</option>
                                            <option value="2023">2023 Batch</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label">Announcement</label>
                                        <textarea type="text" class="form-control" placeholder="Write announcement here..." rows="4" name="announcement" value={newAnnouncementData.announcement} onChange={handleAnnouncementDataChange} required></textarea>
                                    </div>

                                    {/* <!-- Loading Message --> */}
                                    {addLoading && <div class="alert alert-primary alert-rounded" ng-show="announcements.postingAnnouncementsLoading">
                                        <strong> Loading!</strong> Hold on. posting announcement...
                                    </div>}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success" ng-disabled="app.postingAnnouncementsLoading">Post Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!--All Announcements --> */}
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body" ng-show="announcements.fetchedAnnouncements">

                        {/* <!-- Visible to ADMIN,SPC,FACULTY --> */}
                        <div class="row" ng-if="main.authorized">
                            <div class="col-12">
                                <div class="form-group">
                                    <select class="form-control" value={passout_batch} onChange={updateBatch}>
                                        <option value="2020">2020 Batch</option>
                                        <option value="2021">2021 Batch</option>
                                        <option value="2022">2022 Batch</option>
                                        <option value="2023">2023 Batch</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* <!-- If No announcements in database --> */}
                        {(announcements && announcements.length===0) && <div>
                            <h5 class="card-title">No Announcements!</h5>
                        </div>}

                        {/* <!-- If More then 0 announcements in database --> */}
                        {(announcements && announcements.length > 0) && <div>
                            <h5 class="card-title">New Announcements</h5>
                            <h6 class="card-subtitle">check out new updates from placement cell</h6>
                        </div>}

                        {/* <!-- All Announcements --> */}
                        {announcements && announcements.map(announcement => {
                        return (<div class="steamline m-t-40" ng-repeat="announcement in announcements.announcements | orderBy : '-timestamp' | limitTo : 10">
                            <div class="sl-item">
                                <div class="sl-left"> <img class="img-circle" alt="user" src={`../assets/images/announcements/${announcement.category}.png`}/> </div>
                                <div class="sl-right">
                                    <div class="font-medium">
                                        { announcement.category } Announcement
                                    </div>
                                    <div class="desc">{ announcement.announcement } </div>
                                    <h6 class="card-subtitle">Placement Cell <span> ({ announcement.author })</span> posted on {Moment(announcement.timestamp).format('dd MMM yyyy, hh:mm a')}</h6>
                                </div>
                            </div>
                        </div>)})}
                    </div>
                    {loading && <div class="card-body text-center">
                        {/* <!--<h4 class="card-title">Loading Announcements!</h4>--> */}
                        <div class="spinner-grow" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-success" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-warning" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-info" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-dark" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Announcement
