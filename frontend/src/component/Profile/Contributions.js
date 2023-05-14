import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, getContributions } from "../../actions/userAction";
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
const TruncHtml = require('trunc-html');

const Contributions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();


    const { isAuthenticated } = useSelector((state) => state.user);
    const { error, interviews } = useSelector((state) => state.info);

    useEffect(() => {
        if(isAuthenticated === false) {
            navigate("/login")
        }
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [isAuthenticated, dispatch, error, alert, navigate])

    useEffect(() => {
        dispatch(getContributions());
    }, [dispatch])
    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Your Contributions</h4>
                </div>
            </div>
            <div>
                <div className="row">
                    {interviews && interviews.map((experience) => {
                    return(<div className="col-lg-6">
                        <div className="card cc-widget">
                            <div className="card-body">
                                <div className="d-flex no-block flex-row">
                                    <div className="round align-self-center round-primary m-t-10 m-b-10"><i className="icon-rocket"></i></div>
                                    <div className="m-l-10 align-self-center">
                                        <h4 className="m-b-0"><Link to={`/experience/${ experience._id }`} style={{color: "black"}}>{ experience.title }</Link> {experience.status=='approved' && <i className="fa fa-check-circle text-success"></i>}{experience.status=='pending' && <i className="fa fa-exclamation-circle text-danger"></i>} </h4>
                                        <h5 className="text-muted m-b-0"><i className="fa fa-user"></i> { experience.author_name }</h5>
                                    </div>
                                </div>
                                <div className="d-flex no-block flex-row m-t-20 cc-details interview">
                                    <div dangerouslySetInnerHTML={{ __html: TruncHtml(experience.experience, 200).html }} />
                                </div>
                                <br />
                                <div>
                                    {experience.tags.map(tag => {return (<span className="label label-success" style={{marginRight: "10px"}}>{ tag }</span>)})}
                                </div>
                            </div>
                        </div>
                    </div>)})}
                </div>
            </div>

            {(interviews && interviews.length === 0) && <div className="row">
                <div className="col-md-12">
                    <div className="card text-white bg-success">
                        <div className="card-body">
                            <h3 className="card-title">Nothing right here!</h3>
                            <p className="card-text">Start contributing to help your mates out there.Share details about the interview process you have been through.. .</p>
                            <Link to="/compose" className="btn btn-dark">Contribute Now</Link>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Contributions