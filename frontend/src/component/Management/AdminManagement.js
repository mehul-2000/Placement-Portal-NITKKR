import React from 'react';
import { Link } from 'react-router-dom';

const AdminManagement = () => {
    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Admin Management</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="card text-white bg-info">
                        <div className="card-header">
                            <h4 className="m-b-0 text-white">Coordinator Management</h4></div>
                        <div className="card-body">
                            <h3 className="card-title">Manage Coordinators & Admin </h3>
                            <p className="card-text">Add, Delete existing or new SPC or Admin on placement portal</p>
                            <Link to="/coordinator-management" className="btn btn-dark">Manage Now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card text-white bg-primary">
                        <div className="card-header">
                            <h4 className="m-b-0 text-white">Students Management</h4></div>
                        <div className="card-body">
                            <h3 className="card-title">Manage Registered students</h3>
                            <p className="card-text">Manage student profile, edit profile and update CGPA etc.</p>
                            <Link to="/students-management" className="btn btn-dark">Manage Now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card text-white bg-danger">
                        <div className="card-header">
                            <h4 className="m-b-0 text-white">Interview Experiences Management</h4></div>
                        <div className="card-body">
                            <h3 className="card-title">Manage Interview Experiences</h3>
                            <p className="card-text">Change interview experience status to Approved or pending.. </p>
                            <Link to="/interviews-management" className="btn btn-dark">Manage Now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card text-white bg-success">
                        <div className="card-header">
                            <h4 className="m-b-0 text-white">Placement Stats </h4></div>
                        <div className="card-body">
                            <h3 className="card-title">Placed Students Database </h3>
                            <p className="card-text"> Get placed students database as per program, degree, branch</p>
                            <Link to="/placement-management" className="btn btn-dark">Get Stats Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminManagement