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
            <div class="row page-titles">
            {/* Heading */}
            <div class="col-md-5 align-self-center">
                <h4 class="text-themecolor">Coordinators</h4>
            </div>
            {/* <!-- Add Coordinator Model Box --> */}
            {user.permission==="admin" && <div class="col-md-7 align-self-center text-right">
                <div class="d-flex justify-content-end align-items-center">
                    <button type="button" class="btn btn-primary d-none d-lg-block m-l-15" data-bs-toggle="modal" data-bs-target="#addNewCoordinator"><i class="ti-plus"></i> Add Coordinator</button>
                </div>
            </div>}

            {/* <!-- Coordinator add Modal box   --> */}
            <div class="modal fade" id="addNewCoordinator" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
                <div class="modal-dialog modal-xl" role="document">
                    {/* <!-- Modal Content --> */}
                    <div class="modal-content" ng-show="!coordinator.successMsg">
                        {/* <!-- Coordinator Add Form --> */}
                        <form onSubmit={addCoordinatorSubmit}>
                            <div class="modal-header">
                                <h4 class="modal-title" id="exampleModalLabel1">Add New Coordinator</h4>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">

                                {/* <!-- Name --> */}
                                <div class="form-group">
                                    <label class="control-label">Student ID</label>
                                    <input type="text" class="form-control" placeholder="Enter Student ID" value={college_id} onChange={(e) => setCollegeId(e.target.value)} required />
                                </div>

                                {addCoordinatorLoading && <div class="alert alert-primary alert-rounded">
                                    <strong>Please Wait! </strong>Adding new coordinator...
                                </div>}

                            </div>
                            {/* <!-- Footer --> */}
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                <button type="submit" disabled={addCoordinatorLoading} class="btn btn-success">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        {!loading && <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex">
                        <div>
                            <h5 class="card-title">Placement Cell Coordinators </h5>
                            <h6 class="card-subtitle">NIT Kurukshetra</h6>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light">
                    <div class="row">
                        <div class="col-6">
                            <h3 ng-show="selectedRole==='spc'">Student Placement Coordinators</h3>

                            <h5 class="font-light m-t-0">NIT Kurukshetra</h5></div>
                        <div class="col-6 align-self-center display-6 text-right">
                            <h2 class="text-success">{ numCoordinators } SPC's</h2>
                        </div>
                    </div>
                </div>
                <div class="table-responsive" ng-show="filteredCoordinators.length > 0">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">#</th>
                            <th>NAME</th>
                            <th>LOGIN ID</th>
                            <th>EMAIL</th>
                            <th>CONTACT NO</th>
                        </tr>
                        </thead>
                        <tbody>
                            {coordinators && coordinators.map((coordinator, idx) => {
                            return (<tr>
                                <td class="text-center">{ idx+1 }</td>
                                <td class="txt-oflo">{ coordinator.name.toUpperCase() }</td>
                                <td>{ coordinator.college_id }</td>
                                <td class="txt-oflo">{ coordinator.college_email }</td>
                                <td>{ coordinator.contact_no }</td>
                            </tr>)})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>}

        {/* <!-- Loading --> */}
        {loading && <div class="col-lg-12">
            <div class="card">
                <div class="card-body text-center" ng-show="!coordinator.fetchedAnnouncements">
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
                </div>
            </div>
        </div>}
        </>
    )
}

export default CoordinatorManagement