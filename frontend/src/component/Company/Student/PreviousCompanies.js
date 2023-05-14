import React, { useEffect, useState } from 'react';
import { getAllPreviousCompanies, clearErrors, getAllPreviousCompaniesAdmin } from "../../../actions/companyAction"
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const PreviousCompanies = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const {loading, error, companies, numCompanies} = useSelector(state => state.companies);

    const [passout_batch, setPassoutBatch] = useState("2023");
    const [search_term, setSearchTerm] = useState("");
    const [filterCompanies, setFilterCompanies] = useState([]);

    const updateBatch = (e) => {
        setPassoutBatch(e.target.value);
    };

    const getPackage = (packageObj) => {
        if(typeof packageObj === 'string') {
            return packageObj;
        } else {
            if(packageObj) {
                let programs = Object.keys(packageObj);	
                if(packageObj[programs[0]] && packageObj[programs[0]].ctc) {
                    return packageObj[programs[0]].ctc.toUpperCase();
                } else {
                    return 'TO BE UPDATED.'
                }
            }else {
                return 'TO BE UPDATED.'
            }
            
        }
    }

    const getDateString = (rawDate) => {
        Moment.locale('en');
        return Moment(rawDate).format('d MMM')
    }

    useEffect(() => {
        if(companies) {
            if (search_term === "") { setFilterCompanies(companies); return; }
            setFilterCompanies(companies.filter((item) => {
                return item.company_name.toLowerCase().includes(search_term.toLowerCase());
            }));
        }
    }, [search_term, companies])

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert])

    useEffect(() => {
        if(user) {
            if(user.permission === "student")
                dispatch(getAllPreviousCompanies())
            else 
                dispatch(getAllPreviousCompaniesAdmin(passout_batch))
        }
    }, [dispatch, user, passout_batch])

    return (
        <>
            <div className="row page-titles" id="upcomingCompanies">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Previous Companies</h4>
                </div>
            </div>

            {/* Visible to ADMIN,SPC,FACULTY */}
            {(user.permission==="spc" || user.permission==='admin') && <div className="row">
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

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <form className="form-material">
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-line" placeholder="Type here to Search for Company" value={search_term} onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {!loading && <div>
                <div className="row">
                    {filterCompanies && filterCompanies.map(company => {
                    return (<div className="col-lg-4 col-md-6">
                        <div className="card cc-widget">
                            <div className="card-body">
                                <div className="d-flex no-block flex-row">
                                    <div className="round align-self-center round-success m-t-10 m-b-10"><i className="ti-briefcase"></i></div>
                                    <div className="m-l-10 align-self-center">
                                        <h4 className="m-b-0">{ company.company_name }</h4>
                                        <h5 className="text-muted m-b-0">{ company.job_profile }</h5>
                                    </div>
                                </div>
                                <div className="d-flex no-block flex-row m-t-20 cc-details text-center">
                                    <div className="col-lg-6 p-10 p-l-0 border-right">
                                        <h6 className="font-light">Package</h6><b className="growth">₹ { getPackage(company.package) }</b>
                                    </div>
                                    <div className="col-lg-6 p-10">
                                        <h6 className="font-light">Last Date</h6><b className="down">{ getDateString(company.deadline_date) }</b>
                                    </div>
                                </div>
                                <br />

                                <div className="text-center">
                                    <Link to={`/company/${company._id}`}><button type="button" className="btn btn-info btn-rounded">{(user.permission==="student" || user.permission==="spc") && <span>View More</span>}{user.permission==="admin" && <span>Edit Now</span>}</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>)})}
                    {numCompanies === 0 && <div className="col-md-12">
                        <div className="card text-white bg-danger">
                            <div className="card-body">
                                <h3 className="card-title">No previous companies!</h3>
                                <p className="card-text">No companies visited till now for campus recruitment this session.</p>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>}
            {loading && <div className="row" ng-show="!companyRegistration.fetchedUpcomingCompanies">
                <div className="col-md-12">
                    <div className="card-body text-center">
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
                    </div>
                </div>
            </div>}
        </>
    )
}

export default PreviousCompanies