import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';






const Announcement = () => {
    const {user, loading, isAuthenticated } = useSelector((state) => state.user);
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
            <button type="button" class="btn btn-primary d-none d-lg-block m-l-15" data-toggle="modal" data-target="#addAnnouncementModal"><i class="ti-plus"></i> Add Announcement</button>
        </div>
    </div>}

    {/* <!-- Announcement add Modal box   --> */}
    <div class="modal fade" id="addAnnouncementModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
        <div class="modal-dialog modal-xl" role="document">

            <div class="modal-content" ng-show="!announcements.successMsg">
                {/* <!-- Announcement Form--> */}
                <form ng-submit="announcements.postAnnouncement(announcementData)">
                    <div class="modal-header">
                        <h4 class="modal-title" id="exampleModalLabel1">New Announcement</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">

                        {/* <!-- Category --> */}
                        <div class="form-group">
                            <label class="control-label">Select Category</label>
                            <select class="form-control" ng-model="announcementData.category" required>
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
                            <select class="form-control" ng-model="announcementData.passout_batch" required>
                                <option value=""> -- Select Batch -- </option>
                                <option value="2020">2020 Batch</option>
                                <option value="2021">2021 Batch</option>
                                <option value="2022">2022 Batch</option>
                                <option value="2023">2023 Batch</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="control-label">Announcement</label>
                            <textarea type="text" class="form-control" placeholder="Write announcement here..." rows="4" ng-model="announcementData.announcement" required></textarea>
                        </div>

                        {/* <!-- Loading Message --> */}
                        <div class="alert alert-primary alert-rounded" ng-show="announcements.postingAnnouncementsLoading">
                            <strong> Loading!</strong> Hold on. posting announcement...
                        </div>

                        {/* <!-- Error Message --> */}
                        <div class="alert alert-danger alert-rounded" ng-show="announcements.errorMsg">
                            {/* <strong>Oops! </strong> {{ announcements.errorMsg }} */}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success" ng-disabled="app.postingAnnouncementsLoading">Post Now</button>
                    </div>
                </form>
            </div>
            {/* <!-- Success Message --> */}
            <div class="modal-content" ng-show="announcements.successMsg">
                <div class="modal-header">
                    <h4 class="modal-title">New Announcement </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="modal-body">
                        <div class="text-md-center">
                            <i class="icon-check large-success-icon"></i>
                            {/* <h3 class="success-text">{{ announcements.successMsg }}</h3> */}
                        </div>
                    </div>
                </div>
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
                        <select class="form-control" ng-model="main.passout_batch" ng-change="updateBatch(main.passout_batch);">
                            <option value="2020">2020 Batch</option>
                            <option value="2021">2021 Batch</option>
                            <option value="2022">2022 Batch</option>
                            <option value="2023">2023 Batch</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* <!-- If No announcements in database --> */}
            <div ng-show="!announcements.notZeroAnnouncements">
                <h5 class="card-title">No Announcements!</h5>
            </div>

            {/* <!-- If More then 0 announcements in database --> */}
            <div ng-show="announcements.notZeroAnnouncements">
                <h5 class="card-title">New Announcements</h5>
                <h6 class="card-subtitle">check out new updates from placement cell</h6>
            </div>

            {/* <!-- All Announcements --> */}
            <div class="steamline m-t-40" ng-repeat="announcement in announcements.announcements | orderBy : '-timestamp' | limitTo : 10">
                <div class="sl-item">
                    <div class="sl-left"> <img class="img-circle" alt="user" src="../assets/images/announcements/{{announcement.category}}.png"/> </div>
                    <div class="sl-right">
                        <div class="font-medium">
                            {/* {{ announcement.category }} Announcement */}
                        </div>
                        {/* <div class="desc">{{ announcement.announcement }} </div> */}
                        {/* <h6 class="card-subtitle">Placement Cell <span ng-show="main.authorized"> ({{ announcement.author }})</span> posted on {{ announcement.timestamp | date : 'dd MMM yyyy, hh:mm a' }}</h6> */}
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body text-center" ng-show="!announcements.fetchedAnnouncements">
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
        </div>
    </div>
</div>


    </>
  )
}

export default Announcement
