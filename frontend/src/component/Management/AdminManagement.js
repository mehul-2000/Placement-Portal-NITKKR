import React from 'react';
import { Link } from 'react-router-dom';

const AdminManagement = () => {
    return (
        <>
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h4 class="text-themecolor">Admin Management</h4>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="card text-white bg-info">
                        <div class="card-header">
                            <h4 class="m-b-0 text-white">Coordinator Management</h4></div>
                        <div class="card-body">
                            <h3 class="card-title">Manage Coordinators & Admin </h3>
                            <p class="card-text">Add, Delete existing or new SPC or Admin on placement portal</p>
                            <Link to="/coordinator-management" class="btn btn-dark">Manage Now</Link>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card text-white bg-primary">
                        <div class="card-header">
                            <h4 class="m-b-0 text-white">Students Management</h4></div>
                        <div class="card-body">
                            <h3 class="card-title">Manage Registered students</h3>
                            <p class="card-text">Manage student profile, edit profile and update CGPA etc.</p>
                            <Link to="/students-management" class="btn btn-dark">Manage Now</Link>
                        </div>
                    </div>
                </div>
                {/* <div class="col-md-6">
                    <div class="card text-white bg-info">
                        <div class="card-header">
                            <h4 class="m-b-0 text-white">Red Flag Management</h4></div>
                        <div class="card-body">
                            <h3 class="card-title">Manage Students' Red Flags</h3>
                            <p class="card-text">Add or remove red flag in student's profile at a single click!</p>
                            <a href="/red-flag-management" class="btn btn-dark">Manage Now</a>
                        </div>
                    </div>
                </div> */}
                <div class="col-md-6">
                    <div class="card text-white bg-danger">
                        <div class="card-header">
                            <h4 class="m-b-0 text-white">Interview Experiences Management</h4></div>
                        <div class="card-body">
                            <h3 class="card-title">Manage Interview Experiences</h3>
                            <p class="card-text">Change interview experience status to Approved or pending.. </p>
                            <Link to="/interviews-management" class="btn btn-dark">Manage Now</Link>
                        </div>
                    </div>
                </div>
                {/* <div class="col-md-6">
                    <div class="card text-white bg-warning">
                        <div class="card-header">
                            <h4 class="m-b-0 text-white">Email Groups Management</h4></div>
                        <div class="card-body">
                            <h3 class="card-title">Manage MNIT Email Groups </h3>
                            <p class="card-text">Edit, delete, update the list of MNIT Email groups </p>
                            <a href="/email-groups-management" class="btn btn-dark">Manage Now</a>
                        </div>
                    </div>
                </div> */}
                <div class="col-md-6">
                    <div class="card text-white bg-success">
                        <div class="card-header">
                            <h4 class="m-b-0 text-white">Placement Stats </h4></div>
                        <div class="card-body">
                            <h3 class="card-title">Placed Students Database </h3>
                            <p class="card-text"> Get placed students database as per program, degree, branch</p>
                            <Link to="/placement-management" class="btn btn-dark">Get Stats Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminManagement