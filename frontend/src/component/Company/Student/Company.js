import React, { useEffect } from 'react';
import { getCompanyDetails, deleteCompany, clearErrors } from "../../../actions/companyAction"
import { getApplicationStatus, apply, withdrawRegistrationStudent, clearErrors as applyClearErrors } from "../../../actions/applyAction"
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from 'react-alert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Moment from 'moment';
import { APPLY_RESET, WITHDRAW_RESET } from '../../../constants/applyConstants';
import { DELETE_COMPANY_RESET } from '../../../constants/companyConstants';

const Company = () => {
    //ToDo : What if company doesn't exist
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    Moment.locale('en');

    const {company_id} = useParams();

    const { user } = useSelector((state) => state.user);
    const {loading, company} = useSelector(state => state.companyDetails);
    const { message:status } = useSelector(state => state.applicationStatus);
    const { loading:applyLoading, error:applyError, message } = useSelector(state => state.apply);
    const { error:deleteError, successMsg } = useSelector(state => state.company);
    const { error:withdrawError, message:withdrawMessage} = useSelector(state => state.withdraw);

    const oneClickApply = () => {
        dispatch(apply(company_id));
    }

    useEffect(() => {
        dispatch(getCompanyDetails(company_id));
        dispatch(getApplicationStatus(company_id));
    }, [dispatch, company_id])

    useEffect(() => {
        if(applyError) {
            alert.error(applyError);
            dispatch(applyClearErrors());
        }
        if(deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(withdrawError) {
            alert.error(withdrawError);
            dispatch(applyClearErrors());
        }
        if(message) {
            alert.success(message);
            dispatch({
                type: APPLY_RESET
            })
            dispatch(getApplicationStatus(company_id));
        }
        if(successMsg) {
            alert.success(successMsg);
            dispatch({
                type: DELETE_COMPANY_RESET
            })
            navigate('/company-registration');
        }
        if(withdrawMessage) {
            alert.success(withdrawMessage);
            dispatch({
                type: WITHDRAW_RESET
            })
            navigate('/company-registration');
        }
    }, [dispatch, applyError, alert, message, company_id, deleteError, successMsg, withdrawError, withdrawMessage, navigate])

    function checkDateDifference(deadline) {
        let deadline_date = new Date(deadline);
        let today = new Date();

        if(deadline_date.getTime() <= today.getTime()) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            {company && <div>
                <div>
                    <div className="row page-titles">
                        <div className="col-md-5 align-self-center">
                            <h4 className="text-themecolor">{ company.company_name}'s Company Details</h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">

                                    <h4 className="card-title text-center"> { company.company_name}</h4>
                                    <h6 className="card-subtitle text-center">{ company.job_profile }</h6>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Company Name</label>
                                                <h5><i className="ti-briefcase text-primary"></i> &nbsp; { company.company_name }</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Company Website Link</label>
                                                <h5><i className="ti-world text-primary"></i> <a href={ company.company_website_url } target="_blank"> &nbsp; { company.company_website_url }</a> </h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Organization Type</label>
                                                <h5><i className="icon-tag text-primary"></i> &nbsp; { company.organization_type || 'N/A' }</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Industry Sector</label>
                                                <h5><i className="icon-tag text-primary"></i>  &nbsp; { company.industry_sector || 'N/A' }</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label text-muted">About Company</label>
                                                <h5 className="editor-box"><i className="ti-blackboard text-primary"></i>  &nbsp; {company.about_company } </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">

                                    <h4 className="card-title text-center"> Job Profile</h4>
                                    <h6 className="card-subtitle text-center">Below are the job profile details</h6>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Job Profile</label>
                                                <h5><i className="ti-briefcase text-primary"></i> &nbsp; { company.job_profile }</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Passout Batch</label>
                                                <h5><i className="icon-graduation text-primary"></i> &nbsp; { company.passout_batch || '2023' } Batch</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Recruitment</label>
                                                <h5><i className="icon-badge text-primary"></i> &nbsp; { company.recruitment }</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted"> Duration</label>
                                                <h5><i className="ti-time text-primary"></i>  &nbsp; { company.duration || 'Full Time' }</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Location of Posting</label>
                                                <h5><i className="ti-location-pin text-primary"></i> &nbsp; { company.posting_location }</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Tentative Date of Joining</label>
                                                <h5><i className="ti-calendar text-primary"></i>  &nbsp; { company.joining_date ? Moment(company.joining_date).format('DD MMM yyyy') : 'Not Disclosed yet!' }</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Job Description</label>
                                                <h5 className="editor-box"><i className="ti-blackboard text-primary"></i>  &nbsp; {company.job_description } </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">

                                    <h4 className="card-title text-center"> Eligibility Details</h4>
                                    <h6 className="card-subtitle text-center">Below are the student eligibility details</h6>
                                    <hr />
                                    <div className="p-3 border shadow-sm rounded">
                                        <h4 className="card-title">Eligible Branches</h4>
                                        <hr />
                                        <div className="row">
                                            {company.eligibility && Object.keys(company.eligibility).map((key, index) => {
                                            return (Object.keys(company.eligibility[key]).length > 0 && <div className="col-md-12" key={index}>
                                                <ul className="list-style-none" key={index}>
                                                    <li className="my-2">
                                                        <span className="font-weight-medium text-dark"><i className="ti-blackboard mr-2 text-primary"></i> <b>{ key }</b></span>
                                                    </li>
                                                    <div className="row">
                                                        {company.eligibility[key] && Object.keys(company.eligibility[key]).map((branch, value) => {
                                                        return(<div className="col-lg-4" key={branch}>
                                                            {company.eligibility[key][branch] == true && <li className="my-1">
                                                                <span><i className="icon-check mr-2 text-success"></i> { branch }</span>
                                                            </li>}
                                                        </div>)})}
                                                    </div>
                                                </ul>
                                            </div>)})}
                                        </div>
                                    </div>
                                    <div className="row p-t-20">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Minimum CGPA</label>
                                                <h5><i className="ti-medall text-primary"></i> &nbsp; { company.min_cgpa } CGPA</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Min. Marks in 10th</label>
                                                <h5><i className="icon-trophy text-primary"></i> &nbsp; { company.min_10_percent || 'N/A'} %</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Min. Marks in 12th</label>
                                                <h5><i className="icon-trophy text-primary"></i> &nbsp; { company.min_12_percent || 'N/A' } %</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Medical Requirements</label>
                                                <h5><i className="ti-support text-primary"></i>  &nbsp; { company.medical_requirement || 'N/A' }</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Service Agreement</label>
                                                <h5><i className="ti-link text-primary"></i> &nbsp; { company.service_agreement || 'N/A' } {company.service_agreement === 'Yes' && <span> ( { company.service_agreement_duration } )</span>}</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Other Eligibility</label>
                                                <h5><i className="ti-tag text-primary"></i>  &nbsp; { company.other_eligibility }</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">

                                    <h4 className="card-title text-center"> Package Details</h4>
                                    <h6 className="card-subtitle text-center">Below are the Package details</h6>
                                    <hr />
                                    <div className="p-3 border shadow-sm rounded">
                                        <div className="row">
                                            {company.package && Object.keys(company.package).map((key, index) => {
                                            return (Object.keys(company.eligibility[key]).length > 0 && <div className="col-md-12" key={index}>
                                                <ul className="list-style-none" key={index}>
                                                    <li className="my-2">
                                                        <span className="font-weight-medium text-dark"><i className="ti-blackboard mr-2 text-primary"></i> <b>{ key } PACKAGE </b></span>
                                                    </li>
                                                    <div className="row">
                                                        <div className="col-lg-2">
                                                            <li className="my-1">
                                                                <label className="control-label text-muted">Basic Pay</label>
                                                                <h5><i className="ti-wallet text-primary"></i> &nbsp; { company.package[key].basic_pay || 'N/A'} </h5>
                                                            </li>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <li className="my-1">
                                                                <label className="control-label text-muted">HRA</label>
                                                                <h5><i className="ti-wallet text-primary"></i> &nbsp; { company.package[key].hra || 'N/A'} </h5>
                                                            </li>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <li className="my-1">
                                                                <label className="control-label text-muted">Perks & Bonus</label>
                                                                <h5><i className="ti-wallet text-primary"></i> &nbsp; { company.package[key].perks_bonus || 'N/A' } </h5>
                                                            </li>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <li className="my-1">
                                                                <label className="control-label text-muted">Gross</label>
                                                                <h5><i className="ti-wallet text-primary"></i> &nbsp; { company.package[key].gross || 'N/A' } </h5>
                                                            </li>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <li className="my-1">
                                                                <label className="control-label text-muted">Take Home</label>
                                                                <h5><i className="ti-wallet text-primary"></i> &nbsp; { company.package[key].take_home || 'N/A' } </h5>
                                                            </li>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <li className="my-1">
                                                                <label className="control-label text-muted">CTC</label>
                                                                <h5><i className="ti-wallet text-primary"></i> &nbsp; { company.package[key].ctc | company.package } </h5>
                                                            </li>
                                                        </div>
                                                    </div>
                                                </ul>
                                            </div>)})}
                                        </div>
                                    </div>
                                    <div className="row p-t-20">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Company Accommodation</label>
                                                <h5><i className="ti-home text-primary"></i> &nbsp; { company.company_accommodation || 'N/A' }</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Other Facility</label>
                                                <h5><i className="ti-gift text-primary"></i> &nbsp; { company.other_facility || 'N/A'} </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {company.selection_process && <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">

                                    <h4 className="card-title text-center"> Selection Process</h4>
                                    <h6 className="card-subtitle text-center">Below are the selection process details details</h6>
                                    <hr />
                                    <div className="p-3 border shadow-sm rounded">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h4 className="card-title">Selection Process</h4>
                                                <hr />
                                                <ul className="list-style-none">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <li className="my-1">
                                                                <label className="control-label text-muted">Pre Placement Talk</label>
                                                                <h5><i className="ti-blackboard text-primary"></i> &nbsp; { company.selection_process.pre_placement_talk.ppt || 'N/A' } {company.selection_process.pre_placement_talk.ppt === 'Yes' && <span>: { Moment(company.selection_process.pre_placement_talk.date).format('DD MMM yyyy') } </span>}</h5>
                                                            </li>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <li className="my-1">
                                                                <label className="control-label text-muted">Aptitude Test</label>
                                                                <h5><i className="ti-clipboard text-primary"></i> &nbsp; { company.selection_process.aptitude_test.test || 'N/A' }  {company.selection_process.aptitude_test.test === 'Yes' && <span>: { Moment(company.selection_process.aptitude_test.date).format('DD MMM yyyy')} </span>}</h5>
                                                            </li>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <li className="my-1">
                                                                <label className="control-label text-muted">Technical Test</label>
                                                                <h5><i className="ti-pencil-alt text-primary"></i> &nbsp; { company.selection_process.technical_test.test || 'N/A' }  {company.selection_process.technical_test.test === 'Yes' && <span>: { Moment(company.selection_process.technical_test.date).format('DD MMM yyyy') }</span>} </h5>
                                                            </li>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <li className="my-1">
                                                                <label className="control-label text-muted">Group Discussion</label>
                                                                <h5><i className="icon-people text-primary"></i> &nbsp; { company.selection_process.group_discussion.gd || 'N/A' }  {company.selection_process.group_discussion.gd === 'Yes' && <span>: { Moment(company.selection_process.group_discussion.date).format('DD MMM yyyy') } </span>}</h5>
                                                            </li>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row text-center">
                                                        <div className="col-lg-12">
                                                            <li className="my-1">
                                                                <label className="control-label text-muted">Personal Interview</label>
                                                                <h5><i className="icon-star text-primary"></i> &nbsp; { company.selection_process.personal_interview.rounds || 'N/A' } Rounds : { Moment(company.selection_process.personal_interview.date).format('DD MMM yyyy') }  </h5>
                                                            </li>
                                                        </div>
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row p-t-20">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Provision for Waitlist</label>
                                                <h5><i className="icon-ghost text-primary"></i> &nbsp; { company.waitlist || 'N/A' }</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label text-muted">Final Offer to be Announcement</label>
                                                <h5><i className="icon-badge text-primary"></i> &nbsp; { company.final_offer || 'N/A' } </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        <div className="col-lg-12">
                            <div className="card text-center">
                                <div className="card-header">
                                    <h4 className="m-b-0">Deadline </h4></div>
                                <div className="card-body">
                                    <h3 className="card-title">{ Moment(company.deadline_date).format('DD MMMM yyyy h:mm a')} </h3>
                                    <p className="card-text"> Last Date to Apply</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        {(user.permission==="admin" || user.permission==="spc") && <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="text-center">
                                                <div>
                                                    <Link to={`/editCompany/${company._id }`}><button className="btn btn-primary btn-rounded"><i className="ti-pencil"></i> &nbsp; Edit</button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="text-center">
                                                <button className="btn btn-danger btn-rounded" data-bs-toggle="modal" data-bs-target="#deleteCompanyModal"><i className="ti-trash"></i> &nbsp; Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="text-center">
                                                <Link to={`/registeredStudents/${ company._id }`}>
                                                    <button className="btn btn-success btn-rounded"><i className="ti-user"></i> &nbsp; View Registered Students</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="text-center">
                                                <Link to={`/company-notification/${company._id}`}>
                                                    <button className="btn btn-primary btn-rounded"><i className="ti-bell"></i> &nbsp; View Notification History</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>


                    <div className="modal fade" id="applyNowCompanyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalLabel1">Are you sure to apply?</h4>
                                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="buttom" className="btn btn-success" onClick={() => oneClickApply()} data-bs-dismiss="modal">Apply Now</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Delete Company */}
                <div className="modal fade" id="deleteCompanyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="withdrawApplicationModal1">Are you sure to delete company?</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                                <button type="buttom" className="btn btn-success" onClick={() => dispatch(deleteCompany(company_id))} data-bs-dismiss="modal">Delete Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Withdraw application Modal box */}
                <div className="modal fade" id="withdrawApplicationModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="withdrawApplicationModal1">Are you sure to withdraw your application?</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                                <button type="buttom" className="btn btn-success" onClick={() => dispatch(withdrawRegistrationStudent(company_id))} data-bs-dismiss="modal">Withdraw Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                {(!checkDateDifference(company.deadline_date) && (user.permission==='student' || user.permission==='spc')) && <div style={{textAlign: "center", marginBottom: "20px"}}>
                    <button disabled={status==="Applied" || applyLoading} type="button" id="oneClickApplyButton" className="btn btn-success btn-rounded" data-bs-toggle="modal" data-bs-target="#applyNowCompanyModal"> {applyLoading ? "Applying.....Please wait!!" : "One Click Apply"}</button>
                </div>}

                {(!checkDateDifference(company.deadline_date) && (user.permission==='student' || user.permission==='spc') && status==="Applied") && <div style={{textAlign: "center", marginBottom: "20px"}}>
                    <button type="button" className="btn btn-success btn-rounded" data-bs-toggle="modal" data-bs-target="#withdrawApplicationModal"><i className="icon-cross"></i> &nbsp; Withdraw Application</button>
                </div>}

                {(checkDateDifference(company.deadline_date) && (user.permission==='student' || user.permission==='spc')) && <div style={{textAlign: "center", marginBottom: "20px"}} ng-show="!company.applyStatus">
                    <button disabled type="button" className="btn btn-danger btn-rounded" data-bs-toggle="modal"><i className="ti-close"></i> &nbsp; Oops! You missed it.</button>
                </div>}
            </div>}

            {loading && <div className="card-body text-center" ng-show="!company.fetchedCompanyDetails">
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
        </>
    )
}

export default Company