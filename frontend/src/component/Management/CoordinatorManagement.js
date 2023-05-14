import React, { useEffect, useState } from 'react';
import { getAllCoordinators, clearErrors, addNewCoordinator } from "../../actions/coordinatorAction"
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from 'react-alert';
import { CREATE_COORDINATOR_RESET } from "../../constants/coordinatorConstants"

const CoordinatorManagement = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, coordinators, numCoordinators, error } = useSelector((state) => state.coordinators);
    const { loading:addCoordinatorLoading, error:addCoordinatorError, successMsg } = useSelector((state) => state.coordinator);
    const { user } = useSelector((state) => state.user);


    const [college_id, setCollegeId] = useState("");

    const addCoordinatorSubmit = (e) => {
        e.preventDefault();
        dispatch(addNewCoordinator(college_id));
    };

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(addCoordinatorError) {
            alert.error(addCoordinatorError);
            dispatch(clearErrors());
        }
        if(successMsg) {
            alert.success(successMsg);
            dispatch({type:CREATE_COORDINATOR_RESET});
            setCollegeId("");
            dispatch(getAllCoordinators());
        }
    }, [dispatch, error, alert, addCoordinatorError, successMsg])

    useEffect(() => {
        dispatch(getAllCoordinators());
    }, [dispatch])

    return (
        <>
            <div className="row page-titles">
            {/* Heading */}
            <div className="col-md-5 align-self-center">
                <h4 className="text-themecolor">Coordinators</h4>
            </div>
            {/* <!-- Add Coordinator Model Box --> */}
            {user.permission==="admin" && <div className="col-md-7 align-self-center text-right">
                <div className="d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-primary d-none d-lg-block m-l-15" data-bs-toggle="modal" data-bs-target="#addNewCoordinator"><i className="ti-plus"></i> Add Coordinator</button>
                </div>
            </div>}

            {/* <!-- Coordinator add Modal box   --> */}
            <div className="modal fade" id="addNewCoordinator" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
                <div className="modal-dialog modal-xl" role="document">
                    {/* <!-- Modal Content --> */}
                    <div className="modal-content" ng-show="!coordinator.successMsg">
                        {/* <!-- Coordinator Add Form --> */}
                        <form onSubmit={addCoordinatorSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel1">Add New Coordinator</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div className="modal-body">

                                {/* <!-- Name --> */}
                                <div className="form-group">
                                    <label className="control-label">Student ID</label>
                                    <input type="text" className="form-control" placeholder="Enter Student ID" value={college_id} onChange={(e) => setCollegeId(e.target.value)} required />
                                </div>

                                {addCoordinatorLoading && <div className="alert alert-primary alert-rounded">
                                    <strong>Please Wait! </strong>Adding new coordinator...
                                </div>}

                            </div>
                            {/* <!-- Footer --> */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                                <button type="submit" disabled={addCoordinatorLoading} className="btn btn-success">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        {!loading && <div className="col-lg-12">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex">
                        <div>
                            <h5 className="card-title">Placement Cell Coordinators </h5>
                            <h6 className="card-subtitle">NIT Kurukshetra</h6>
                        </div>
                    </div>
                </div>
                <div className="card-body bg-light">
                    <div className="row">
                        <div className="col-6">
                            <h3 ng-show="selectedRole==='spc'">Student Placement Coordinators</h3>

                            <h5 className="font-light m-t-0">NIT Kurukshetra</h5></div>
                        <div className="col-6 align-self-center display-6 text-right">
                            <h2 className="text-success">{ numCoordinators } SPC's</h2>
                        </div>
                    </div>
                </div>
                <div className="table-responsive" ng-show="filteredCoordinators.length > 0">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th>NAME</th>
                            <th>LOGIN ID</th>
                            <th>EMAIL</th>
                            <th>CONTACT NO</th>
                        </tr>
                        </thead>
                        <tbody>
                            {coordinators && coordinators.map((coordinator, idx) => {
                            return (<tr>
                                <td className="text-center">{ idx+1 }</td>
                                <td className="txt-oflo">{ coordinator.name.toUpperCase() }</td>
                                <td>{ coordinator.college_id }</td>
                                <td className="txt-oflo">{ coordinator.college_email }</td>
                                <td>{ coordinator.contact_no }</td>
                            </tr>)})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>}

        {/* <!-- Loading --> */}
        {loading && <div className="col-lg-12">
            <div className="card">
                <div className="card-body text-center" ng-show="!coordinator.fetchedAnnouncements">
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
                </div>
            </div>
        </div>}
        </>
    )
}

export default CoordinatorManagement