import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, addNewCompany } from "../../../actions/companyAction";
import { useAlert } from 'react-alert';
import { CREATE_COMPANY_RESET } from '../../../constants/companyConstants';


const AddNewCompany = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const {error, loading, company, successMsg} = useSelector(state => state.company)

    const programs = ["UG", "MTech", "MCA", "MBA"];

    const [programsDiv, setProgramsDiv] = useState({
        ug: false,
        mtech: false, 
        mca: false,
        mba: false
    });
  
    const showBranchesDiv = program => {
        setProgramsDiv({ ...programsDiv, [program.toLowerCase()]: !programsDiv[program.toLowerCase()]});
    };

    const programsBranches = {
        ug: [
            "Computer Engineering",
            "Information Technology",
            "Electronics & Communication Engineering",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Production and Industrial Engineering",
        ],
        mtech: [
            "Computer Engineering",
            "Electronics & Communication",
            "School of VLSI Design & Embedded Systems",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Chemical Engineering",
            "Physics",
            "School of Energy and Efficiency",
        ],
        mca: ["Marketing", "Human Resource", "Finance", "Operations"],
        mba: ["Marketing", "Human Resource", "Finance", "Operations"],
    };

    const [newCompanyData, setNewCompanyData] = useState({
        company_name: "",
        company_website_url: "",
        organization_type: "",
        industry_sector: "",
        about_company: "",
        job_profile: "",
        passout_batch: "",
        recruitment: "",
        posting_location: "",
        joining_date: "",
        job_description: "",
        eligibility: {
            UG:{},
            MTech:{},
            MCA:{},
            MBA:{}
        },
        min_cgpa: "",
        min_10_percent: "",
        min_12_percent: "",
        medical_requirement: "",
        service_agreement: "",
        other_eligibility: "",
        package: {
            UG:{},
            MTech:{},
            MCA:{},
            MBA:{}
        },
        company_accommodation: "",
        other_facility: "",
        selection_process: {
            pre_placement_talk: {},
            aptitude_test: {},
            technical_test: {},
            group_discussion: {},
            personal_interview: {}
        },
        waitlist: "",
        final_offer: "",
        deadline_date: ""
    });

    const handleCompanyDataChange = (e) => {
        const splitVals = e.target.name.split(".");
        if(splitVals.length === 1) {
            setNewCompanyData({ ...newCompanyData, [e.target.name]: (e.target.type==='checkbox' ? e.target.checked : e.target.value)});
        } else if(splitVals.length === 2) {
            setNewCompanyData({ ...newCompanyData, [splitVals[0]]: {
                ...newCompanyData[splitVals[0]],
                [splitVals[1]]: (e.target.type==='checkbox' ? e.target.checked : e.target.value)
            }})
        } else if(splitVals.length === 3) {
            setNewCompanyData({ ...newCompanyData, [splitVals[0]]: {
                ...newCompanyData[splitVals[0]], [splitVals[1]]: {
                    ...newCompanyData[splitVals[0]][splitVals[1]],
                    [splitVals[2]]: (e.target.type==='checkbox' ? e.target.checked : e.target.value)
                }
            }})
        }
    }

    const postCompanyDetails = (e) => {
        e.preventDefault();
        dispatch(addNewCompany(newCompanyData));
    };

    useEffect(() => {
        if(successMsg) {
            alert.success(successMsg);
            navigate("/company-registration");
            dispatch({type:CREATE_COMPANY_RESET});
        }
    }, [dispatch, alert, successMsg, navigate])

    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Add New Company</h4>
                </div>
            </div>
            
            {/* Add New Company Form */}
            {!successMsg && <form onSubmit={postCompanyDetails}>
                <div className="row">
                    {/* Company Details Form */}
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Company Details</h4>
                                <h6 className="card-subtitle">Enter company details for placement session</h6>

                                <div className="row p-t-20">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Company Name</label>
                                            <input type="text" className="form-control" placeholder="Enter name" name="company_name" value={newCompanyData.company_name} onChange={handleCompanyDataChange}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Company Website Link</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter URL" name="company_website_url" value={newCompanyData.company_website_url} onChange={handleCompanyDataChange} />
                                            </div>
                                            <small className="form-control-feedback"> *Don't forget to add http:// or https://. </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Organization Type</label>
                                            <select className="form-control" name="organization_type" value={newCompanyData.organization_type} onChange={handleCompanyDataChange}>
                                                <option value="">-- Select Organization Type --</option>
                                                <option>Private sector</option>
                                                <option>Start-up</option>
                                                <option>Govt. owned</option>
                                                <option>Public sector</option>
                                                <option>MNC (Indian or Foreign)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Industry Sector</label>
                                            <select className="form-control" name="industry_sector" value={newCompanyData.industry_sector} onChange={handleCompanyDataChange}>
                                                <option value=""> -- Select Industry Sector --</option>
                                                <option>Analytics</option>
                                                <option>Consulting</option>
                                                <option>Core (Technical)</option>
                                                <option>Finance</option>
                                                <option>IT</option>
                                                <option>Business Development</option>
                                                <option>Sales & Marketing</option>
                                                <option>Management</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">About Company</label>
                                    <textarea type="text" className="form-control" rows="3" placeholder="Something about company..." name="about_company" value={newCompanyData.about_company} onChange={handleCompanyDataChange}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Profile Details Form */}
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Job Profile Details</h4>
                                <h6 className="card-subtitle">Enter job details for placement session</h6>

                                <div className="row p-t-20">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Job Profile</label>
                                            <input type="text" className="form-control" placeholder="Enter job profile" name="job_profile" value={newCompanyData.job_profile} onChange={handleCompanyDataChange} required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Passout Batch</label>
                                            <select className="form-control" name="passout_batch" value={newCompanyData.passout_batch} onChange={handleCompanyDataChange} required>
                                                <option value=""> -- Select Batch --</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Recruitment</label>
                                            <select className="form-control" name="recruitment" value={newCompanyData.recruitment} onChange={handleCompanyDataChange}>
                                                <option value=""> -- Select Recruitment --</option>
                                                <option value="Internship">Internship</option>
                                                <option value="Placement">Placement</option>
                                            </select>
                                        </div>
                                    </div>
                                    {newCompanyData.recruitment === 'Internship' && <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Duration</label>
                                            <input type="text" className="form-control" placeholder="Enter duration" name="duration" value={newCompanyData.duration} onChange={handleCompanyDataChange} />
                                        </div>
                                    </div>}
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Location of Posting</label>
                                            <input type="text" className="form-control" placeholder="Enter posting location" name="posting_location" value={newCompanyData.posting_location} onChange={handleCompanyDataChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Tentative Date of Joining</label>
                                            <input type="date" className="form-control" name="joining_date" value={newCompanyData.joining_date} onChange={handleCompanyDataChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="control-label">Job Description</label>
                                            <textarea type="text" className="form-control" rows="3" name="job_description" value={newCompanyData.job_description} onChange={handleCompanyDataChange} placeholder="Write Job Description here..."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Student Eligibility Details Form */}
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Student Eligibility Details</h4>
                                <h6 className="card-subtitle">Enter eligibility details for placement session</h6>

                                <div className="row p-t-20">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="control-label">Eligible Programs</label>
                                            <div className="row">
                                                {programs.map((program) => (
                                                    <div className="col-md-2">
                                                        <label className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" onChange={(e) => showBranchesDiv(program, e)} />
                                                            <span className="custom-control-label"><b>{ program }</b></span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {programsDiv && programs.map(program => {
                                        return ( programsDiv[program.toLowerCase()] && 
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="control-label"><b>Select { program } Program Branches</b></label>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            {programsBranches[program.toLowerCase()].map(branch => (    
                                                                <label className="custom-control custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" name={`eligibility.${program}.${branch}`} checked={newCompanyData.eligibility[program][branch] || false} onChange={handleCompanyDataChange} />
                                                                    <span className="custom-control-label">{ branch }</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Minimum CGPA</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter minimum CGPA" name="min_cgpa" value={newCompanyData.min_cgpa} onChange={handleCompanyDataChange} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">CGPA</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Min. Marks in 10th</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter percentage" name="min_10_percent" value={newCompanyData.min_10_percent} onChange={handleCompanyDataChange} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">% Marks in 10th</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Min. Marks in 12th</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter percentage" name="min_12_percent" value={newCompanyData.min_12_percent} onChange={handleCompanyDataChange} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">% Marks in 12th</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Medical Requirement</label>
                                            <select className="form-control" name="medical_requirement" value={newCompanyData.medical_requirement} onChange={handleCompanyDataChange}>
                                                <option value=""> -- Select Medical Requirement --</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Service Agreement</label>
                                            <select className="form-control" name="service_agreement" value={newCompanyData.service_agreement} onChange={handleCompanyDataChange}>
                                                <option value=""> -- Select Service Agreement -- </option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    {newCompanyData.service_agreement === 'Yes' && <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Service Agreement Duration</label>
                                            <input type="text" className="form-control" placeholder="Enter service agreement duration" name="service_agreement_duration" value={newCompanyData.service_agreement_duration} onChange={handleCompanyDataChange} />
                                            <small className="form-control-feedback"> *Duration in months. </small>
                                        </div>
                                    </div>}
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Other Eligibility</label>
                                    <input type="text" className="form-control" placeholder="Enter other eligibility" name="other_eligibility" value={newCompanyData.other_eligibility} onChange={handleCompanyDataChange} />
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Package & Other facilities details */}
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Package Details</h4>
                                <h6 className="card-subtitle">Enter package details for placement session</h6>

                                <div>
                                    {programs.map(program => {
                                        return ( programsDiv[program.toLowerCase()] && 
                                            <>
                                                <h4 className="text-center"><b> { program } Package</b></h4>
                                                <div className="row p-t-20">
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label className="control-label">Basic Pay</label>
                                                            <input type="text" className="form-control" placeholder=".... ₹" name={`package.${program}.basic_pay`} value={newCompanyData.package[program].basic_pay || ""} onChange={handleCompanyDataChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label className="control-label">HRA</label>
                                                            <input type="text" className="form-control" placeholder="...... ₹" name={`package.${program}.hra`} value={newCompanyData.package[program].hra || ""} onChange={handleCompanyDataChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label className="control-label">Perks & Bonus</label>
                                                            <input type="text" className="form-control" placeholder="...... ₹" name={`package.${program}.perks_bonus`} value={newCompanyData.package[program].perks_bonus || ""} onChange={handleCompanyDataChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label className="control-label">Gross</label>
                                                            <input type="text" className="form-control" placeholder="...... ₹" name={`package.${program}.gross`} value={newCompanyData.package[program].gross || ""} onChange={handleCompanyDataChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label className="control-label">Take Home</label>
                                                            <input type="text" className="form-control" placeholder="...... ₹" name={`package.${program}.take_home`} value={newCompanyData.package[program].take_home || ""} onChange={handleCompanyDataChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label className="control-label">CTC</label>
                                                            <input type="text" className="form-control" placeholder="...... ₹" name={`package.${program}.ctc`} value={newCompanyData.package[program].ctc || ""} onChange={handleCompanyDataChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Company Accommodation</label>
                                            <select className="form-control" name="company_accommodation" value={newCompanyData.company_accommodation} onChange={handleCompanyDataChange}>
                                                <option value=""> -- Select --</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Extra Facility</label>
                                            <input type="text" className="form-control" placeholder="Enter other facility" name="other_facility" value={newCompanyData.other_facility} onChange={handleCompanyDataChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selection Process Form */}
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Selection Process</h4>
                                <h6 className="card-subtitle">Enter selection process details for placement session</h6>

                                <div className="form-group row p-t-20">
                                    <label className="col-4 col-form-label">Pre Placement Talk</label>
                                    <div className="col-4">
                                        <select className="form-control" name="selection_process.pre_placement_talk.ppt" value={newCompanyData.selection_process.pre_placement_talk.ppt || false} onChange={handleCompanyDataChange}>
                                            <option value=""> -- Select --</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    {newCompanyData.selection_process.pre_placement_talk.ppt === 'Yes' && <div className="col-4">
                                        <input type="date" className="form-control" name="selection_process.pre_placement_talk.date" value={newCompanyData.selection_process.pre_placement_talk.date || ""} onChange={handleCompanyDataChange} />
                                    </div>}
                                </div>


                                <div className="form-group row">
                                    <label className="col-4 col-form-label">Aptitude Test</label>
                                    <div className="col-4">
                                        <select className="form-control" name="selection_process.aptitude_test.test" value={newCompanyData.selection_process.aptitude_test.test || false} onChange={handleCompanyDataChange}>
                                            <option value=""> -- Select --</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    {newCompanyData.selection_process.aptitude_test.test === 'Yes' && <div className="col-4">
                                        <input type="date" className="form-control" name="selection_process.aptitude_test.date" value={newCompanyData.selection_process.aptitude_test.date || ""} onChange={handleCompanyDataChange} />
                                    </div>}
                                </div>


                                <div className="form-group row">
                                    <label className="col-4 col-form-label">Technical Test</label>
                                    <div className="col-4">
                                        <select className="form-control" name="selection_process.technical_test.test" value={newCompanyData.selection_process.technical_test.test || false} onChange={handleCompanyDataChange}>
                                            <option value=""> -- Select --</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    {newCompanyData.selection_process.technical_test.test === 'Yes' && <div className="col-4">
                                        <input type="date" className="form-control" name="selection_process.technical_test.date" value={newCompanyData.selection_process.technical_test.date || ""} onChange={handleCompanyDataChange} />
                                    </div>}
                                </div>


                                <div className="form-group row">
                                    <label className="col-4 col-form-label">Group Discussion</label>
                                    <div className="col-4">
                                        <select className="form-control" name="selection_process.group_discussion.gd" value={newCompanyData.selection_process.group_discussion.gd || false} onChange={handleCompanyDataChange}>
                                            <option value=""> -- Select --</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    {newCompanyData.selection_process.group_discussion.gd === 'Yes' && <div className="col-4">
                                        <input type="date" className="form-control" name="selection_process.group_discussion.date" value={newCompanyData.selection_process.group_discussion.date || ""} onChange={handleCompanyDataChange} />
                                    </div>}
                                </div>

                                <div className="form-group row">
                                    <label className="col-4 col-form-label">Personal Interview</label>
                                    <div className="col-4">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="No. of rounds" name="selection_process.personal_interview.rounds" value={newCompanyData.selection_process.personal_interview.rounds || ""} onChange={handleCompanyDataChange} />
                                            <div className="input-group-append">
                                                <span className="input-group-text">Rounds</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <input type="date" className="form-control" name="selection_process.personal_interview.date" value={newCompanyData.selection_process.personal_interview.date || ""} onChange={handleCompanyDataChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Provision for Waitlist</label>
                                            <select className="form-control" name="waitlist" value={newCompanyData.waitlist} onChange={handleCompanyDataChange}>
                                                <option value=""> -- Select --</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Final Offer to be announced</label>
                                            <select className="form-control" name="final_offer" value={newCompanyData.final_offer} onChange={handleCompanyDataChange}>
                                                <option value=""> -- Select --</option>
                                                <option value="Same Day">Same Day</option>
                                                <option value="Later, but no further interviews">Later, but no further interviews</option>
                                                <option value="Later, after next stage of interviews">Later, after next stage of interviews</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Registration Details</h4>
                                <h6 className="card-subtitle">Enter registration details for placement session</h6>

                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="m-t-20">Last Date to Apply</label>
                                        <input type="datetime-local" className="form-control" placeholder="Enter date" name="deadline_date" value={newCompanyData.deadline_date} onChange={handleCompanyDataChange} required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {error && <p className="text-danger text-center"> { error }</p>}
                {/* Submit Buttom- */}
                <div style={{textAlign: "center"}}>
                    <button type="submit" className="btn btn-primary btn-rounded"><i className="ti-check-box"></i> &nbsp; Submit Details</button>
                </div>
            </form> }
        </>
    )
}

export default AddNewCompany