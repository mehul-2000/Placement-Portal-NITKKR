import React, { useEffect, useState } from 'react';
import { getRegisteredStudents, clearErrors } from "../../../actions/companyAction"
import { withdrawRegistrationAdmin, clearErrors as clearApplyErrors } from "../../../actions/applyAction"
import { WITHDRAW_RESET } from "../../../constants/applyConstants";
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from 'react-alert';
import { Link, useParams } from 'react-router-dom';
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const RegisteredStudents = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const {company_id} = useParams();

    const {loading, error, students} = useSelector(state => state.registeredStudents);
    const { error:withdrawError, message} = useSelector(state => state.withdraw);

    const [search_name, setSearchName] = useState("");
    const [filterCandidates, setFilterCandidates] = useState([]);

    useEffect(() => {
        dispatch(getRegisteredStudents(company_id));
    }, [dispatch, company_id])

    useEffect(() => {
        if(students) {
            if (search_name === "") { setFilterCandidates(students.registered_candidates); return; }
            setFilterCandidates(students.registered_candidates.filter((item) => {
                return item.name.toLowerCase().includes(search_name.toLowerCase());
            }));
        }
    }, [search_name, students])

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(withdrawError) {
            alert.error(withdrawError);
            dispatch(clearApplyErrors());
        }
        if(message) {
            alert.success(message);
            dispatch({
                type: WITHDRAW_RESET
            })
            dispatch(getRegisteredStudents(company_id))
        }
    }, [dispatch, error, alert, withdrawError, message, company_id])
    
    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Registered Students</h4>
                </div>
            </div>

            {/* Loading Message */}
            {loading && <div className="alert alert-primary alert-rounded">
                <strong> Loading!</strong> Hold on. We are fetching registered students...
            </div>}

            {/* Registered Students Table */}
            {students && <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title text-center">
                                { students.company_name} Registered Students list
                            </h4>

                            {/* Form Input to search a particular Student */}
                            <form className="form-material">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-line"
                                        placeholder="Type here to Search for student name"
                                        value = {search_name}
                                        onChange = {(e) => setSearchName(e.target.value)}
                                    />
                                </div>
                            </form>

                            {/* Total Registered Students */}
                            <span className="text-purple">Total { filterCandidates.length } Registered Student(s).</span>

                            {/* Export Resumes & Excel Button */}
                            {filterCandidates.length > 0 && <div className="row mt-5">
                                <div className="col-12">
                                    {/* Export Excel Sheet Button */}
                                    {' '}<ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            className="btn btn-primary mb-1"
                                            table="demo-foo-addrow"
                                            filename={`${students.company_name}-student-data`}
                                            sheet="tablexls"
                                            buttonText="Export as Excel"
                                    />
                                </div>
                            </div>}

                            {filterCandidates.length > 0 && <div className="table-responsive">
                                <table
                                    id="demo-foo-addrow"
                                    className="table table-bordered m-t-30 table-hover contact-list"
                                    data-paging="true"
                                    data-paging-size="7"
                                >
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>College ID</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Program</th>
                                            <th>Degree</th>
                                            <th>Branch</th>
                                            <th>CGPA</th>
                                            <th>10th</th>
                                            <th>12th</th>
                                            <th>Resume url</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {filterCandidates && filterCandidates.map((student, idx) => {
                                        return (
                                            <tr ng-repeat="student in registeredStudents.company.registered_candidates | filter : studentName">
                                                <td>{ idx + 1 }.</td>
                                                <td>
                                                <Link className="text-primary"> { student.name }</Link>
                                                </td>
                                                <td><Link>{ student.college_id } </Link></td>
                                                <td>+91 { student.contact_no }</td>
                                                <td>{ student.college_email }</td>
                                                <td>{ student.program }</td>
                                                <td>{ student.degree }</td>
                                                <td>{ student.department }</td>
                                                <td>{ student.cgpa }</td>
                                                <td>{ student.matric_marks }</td>
                                                <td>{ student.senior_marks }</td>
                                                {/* ToDo : Do resume to cloud */}
                                                <td><a href={`/assets/uploads/resumes/${student.resume_url}`} target="blank">Link</a></td>
                                                <td>
                                                <button
                                                    className="btn btn-rounded btn-danger"
                                                    onClick={() => dispatch(withdrawRegistrationAdmin(student.college_id, company_id))}
                                                >
                                                    <i className="icon-trash"></i>
                                                </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default RegisteredStudents;