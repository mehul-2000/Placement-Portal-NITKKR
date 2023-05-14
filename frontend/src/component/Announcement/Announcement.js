import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Moment from 'moment';
import { getAllAnnouncementsStudent, getAllAnnouncementsAdmin, clearErrors, addNewAnnouncement } from "../../actions/announcementAction"
import { CREATE_ANNOUNCEMENT_RESET } from "../../constants/announcementConstants"

const Announcement = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

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
            <div className="row page-titles">
                {/* <!-- Headling --> */}
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Announcements</h4>
                </div>

                {/* <!-- Add Announcement Button --> */}
                {(user.permission==='spc' || user.permission==='admin' ) && <div className="col-md-7 align-self-center text-right" ng-show="main.authorized">
                    <div className="d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-primary d-none d-lg-block m-l-15" data-bs-toggle="modal" data-bs-target="#addAnnouncementModal"><i className="ti-plus"></i> Add Announcement</button>
                    </div>
                </div>}

                {/* <!-- Announcement add Modal box   --> */}
                <div className="modal fade" id="addAnnouncementModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
                    <div className="modal-dialog modal-xl" role="document">

                        <div className="modal-content">
                            {/* <!-- Announcement Form--> */}
                            <form onSubmit={postAnnouncement}>
                                <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalLabel1">New Announcement</h4>
                                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div className="modal-body">

                                    {/* <!-- Category --> */}
                                    <div className="form-group">
                                        <label className="control-label">Select Category</label>
                                        <select className="form-control" name="category" value={newAnnouncementData.category} onChange={handleAnnouncementDataChange} required>
                                            <option value=""> -- Select Announcement Category -- </option>
                                            <option value="info"> Information Update</option>
                                            <option value="result"> Result Announcement</option>
                                            <option value="hiring"> New Company Info</option>
                                            <option value="other"> Other</option>
                                        </select>
                                    </div>

                                    {/* <!-- Passout Batch --> */}
                                    <div className="form-group">
                                        <label className="control-label">Select Passout Batch</label>
                                        <select className="form-control" name="passout_batch" value={newAnnouncementData.passout_batch} onChange={handleAnnouncementDataChange} required>
                                            <option value=""> -- Select Batch -- </option>
                                            <option value="2020">2020 Batch</option>
                                            <option value="2021">2021 Batch</option>
                                            <option value="2022">2022 Batch</option>
                                            <option value="2023">2023 Batch</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Announcement</label>
                                        <textarea type="text" className="form-control" placeholder="Write announcement here..." rows="4" name="announcement" value={newAnnouncementData.announcement} onChange={handleAnnouncementDataChange} required></textarea>
                                    </div>

                                    {/* <!-- Loading Message --> */}
                                    {addLoading && <div className="alert alert-primary alert-rounded" ng-show="announcements.postingAnnouncementsLoading">
                                        <strong> Loading!</strong> Hold on. posting announcement...
                                    </div>}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" ng-disabled="app.postingAnnouncementsLoading">Post Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!--All Announcements --> */}
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body" ng-show="announcements.fetchedAnnouncements">

                        {/* <!-- Visible to ADMIN,SPC --> */}
                        {user.permission!=="student" && <div className="row" ng-if="main.authorized">
                            <div className="col-12">
                                <div className="form-group">
                                    <select className="form-control" value={passout_batch} onChange={updateBatch}>
                                        <option value="2020">2020 Batch</option>
                                        <option value="2021">2021 Batch</option>
                                        <option value="2022">2022 Batch</option>
                                        <option value="2023">2023 Batch</option>
                                    </select>
                                </div>
                            </div>
                        </div>}

                        {/* <!-- If No announcements in database --> */}
                        {(announcements && announcements.length===0) && <div>
                            <h5 className="card-title">No Announcements!</h5>
                        </div>}

                        {/* <!-- If More then 0 announcements in database --> */}
                        {(announcements && announcements.length > 0) && <div>
                            <h5 className="card-title">New Announcements</h5>
                            <h6 className="card-subtitle">check out new updates from placement cell</h6>
                        </div>}

                        {/* <!-- All Announcements --> */}
                        {announcements && announcements.map(announcement => {
                        return (<div className="steamline m-t-40" ng-repeat="announcement in announcements.announcements | orderBy : '-timestamp' | limitTo : 10">
                            <div className="sl-item">
                                <div className="sl-left"> <img className="img-circle" alt="user" src={`../assets/images/announcements/${announcement.category}.png`}/> </div>
                                <div className="sl-right">
                                    <div className="font-medium">
                                        { announcement.category } Announcement
                                    </div>
                                    <div className="desc">{ announcement.announcement } </div>
                                    <h6 className="card-subtitle">Placement Cell <span> ({ announcement.author })</span> posted on {Moment(announcement.timestamp).format('DD MMM yyyy, hh:mm a')}</h6>
                                </div>
                            </div>
                        </div>)})}
                    </div>
                    {loading && <div className="card-body text-center">
                        {/* <!--<h4 className="card-title">Loading Announcements!</h4>--> */}
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

export default Announcement
