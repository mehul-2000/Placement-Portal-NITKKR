import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, getAchievements } from "../../actions/userAction";
import { useAlert } from 'react-alert';

const Achievement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { loading, error, achievements } = useSelector((state) => state.info);

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
        dispatch(getAchievements());
    }, [dispatch])
    return (
        <>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">My Achievements</h4>
                </div>
            </div>

            {achievements && <div className="col-lg-12">
                <div className="card">
                    <div className="card-body text-center">
                        {achievements.length === 0 && <h5 className="card-title">No Achievements yet!</h5>}
                        {achievements.length > 0 && <h5 className="card-title">Congratulations { user.name && user.name.split(" ")[0] } 🎉 </h5>}
                    </div>
                </div>
            </div>}

            {achievements && achievements.map((achievement) => {
            return (<div className="col-lg-12" ng-show="!achievements.loading">
                <div className="card"> <img className="card-img" src="../assets/images/celebration.jpg" height="230" alt="Card" />
                    <div className="card-img-overlay card-inverse text-white social-profile d-flex justify-content-center" style={{borderRadius: "15px"}}>
                        <div className="align-self-center">
                            <h4 className="card-title">{ user.name }</h4>
                            <h6 className="card-subtitle">{ achievement.job_profile } @ { achievement.company_name }</h6>
                            <h6 className="text-white">
                                { achievement.recruitment_type } : { achievement.recruitment }
                            </h6>
                            <h6 className="text-white">
                                {achievement.recruitment==='Internship' && <span>( { achievement.intern_stipend } Per Month )</span>}
                                {achievement.recruitment==='Placement' && <span>( { achievement.package } LPA )</span>}
                            </h6>
                            <p className="text-white">Batch of { achievement.passout_batch } </p>
                        </div>
                    </div>
                </div>
            </div>)})}

            <div className="col-lg-12">
                <div className="card">
                    {loading && <div className="card-body text-center">
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
                </div>
            </div>
        </>
    )
}

export default Achievement