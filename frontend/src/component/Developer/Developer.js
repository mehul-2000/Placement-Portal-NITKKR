import React from 'react'
import { Link } from 'react-router-dom';

function Developer() {
    return (
        <div style={{marginBottom:"3.5rem"}}>
            {/* <!-- Row - If User is not logged In.--> */}
            <div style={{ display: 'flex', flexDirection: 'row' }} ng-show="!main.isLoggedIn">
                {/* <!-- Column --> */}
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <center className="m-t-30">
                                <img src={require('./mehul.jpeg')}  width="150" alt="dp"/>
                                <h4 className="card-title m-t-10">Mehul Kumar</h4>
                                {/* <h6 className="card-subtitle">Node.Js Developer, Full time Freelancer.</h6> */}
                                <div className="row text-center">
                                    <div className="col-12"><Link className="link"><i className="ti-crown"></i> CSE'23 MNIT Kurukshetra</Link></div>
                                </div>
                            </center>
                        </div>
                        <div>
                            <hr />
                        </div>
                        <div className="card-body text-center">
                            <small className="text-muted">Email address </small>
                            <h6>gulatimehul2000@gmail.com</h6>
                            <small className="text-muted p-t-30 db">Contact No.</small>
                            <h6>+91 7903984389</h6>
                            <small className="text-muted p-t-30 db">Social Profile</small>
                            <br />
                            <a href="https://github.com/mehul-2000" target="_blank" rel="noreferrer"><button className="btn btn-circle btn-secondary"><i className="icon-social-github"></i></button></a>
                            <a href="https://www.instagram.com/kumarrmehul/" target="_blank" rel="noreferrer"><button className="btn btn-circle btn-secondary"><i className="icon-social-instagram"></i></button></a>
                            <a href="https://www.linkedin.com/in/mehul-kumar-2000/" target="_blank" rel="noreferrer"><button className="btn btn-circle btn-secondary"><i className="icon-social-linkedin"></i></button></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <center className="m-t-30">
                                <img src={require('./ishant.jpeg')}  width="150" alt="dp"/>
                                <h4 className="card-title m-t-10">Ishant Goyal</h4>
                                {/* <h6 className="card-subtitle">Node.Js Developer, Full time Freelancer.</h6> */}
                                <div className="row text-center">
                                    <div className="col-12"><Link href="#" className="link"><i className="ti-crown"></i> CSE'23 NIT Kurukshetra</Link></div>
                                </div>
                            </center>
                        </div>
                        <div>
                            <hr />
                        </div>
                        <div className="card-body text-center">
                            <small className="text-muted">Email address </small>
                            <h6>goyalishant001@gmail.com</h6>
                            <small className="text-muted p-t-30 db">Contact No.</small>
                            <h6>+91 6239327272</h6>
                            <small className="text-muted p-t-30 db">Social Profile</small>
                            <br />
                            <a href="https://github.com/coder-saab001" target="_blank" rel="noreferrer"><button className="btn btn-circle btn-secondary"><i className="icon-social-github"></i></button></a>
                            <a href="https://www.instagram.com/goyalishant001/" target="_blank" rel="noreferrer"><button className="btn btn-circle btn-secondary"><i className="icon-social-instagram"></i></button></a>
                            <a href="https://www.linkedin.com/in/coder-saab001/" target="_blank" rel="noreferrer"><button className="btn btn-circle btn-secondary"><i className="icon-social-linkedin"></i></button></a>
                        </div>
                    </div>
                </div>
                {/* <!-- Column --> */}
                {/* <!-- Column --> */}
                
                {/* <!-- Column --> */}
                {/* <!-- Column --> */}
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <center className="m-t-30">
                                <img src={require('./satyam.jpeg')}  width="150" alt="dp"/>
                                <h4 className="card-title m-t-10">Satyam Pareek</h4>
                                {/* <h6 className="card-subtitle">Node.Js Developer, Full time Freelancer.</h6> */}
                                <div className="row text-center">
                                    <div className="col-12"><Link href="#" className="link"><i className="ti-crown"></i> CSE'23 NIT Kurukshetra</Link></div>
                                </div>
                            </center>
                        </div>
                        <div>
                            <hr />
                        </div>
                        <div className="card-body text-center">
                            <small className="text-muted">Email address </small>
                            <h6>pareeksatyam01@gmail.com</h6>
                            <small className="text-muted p-t-30 db">Contact No.</small>
                            <h6>+91 9358528585</h6>
                            <small className="text-muted p-t-30 db">Social Profile</small>
                            <br />
                            <a href="https://github.com/SatyamPareek" target="_blank" rel="noreferrer"><button className="btn btn-circle btn-secondary"><i className="icon-social-github"></i></button></a>
                            <a href="https://www.instagram.com/pareek_satyam_/" target="_blank" rel="noreferrer"><button className="btn btn-circle btn-secondary"><i className="icon-social-instagram"></i></button></a>
                            <a href="https://www.linkedin.com/in/satyam-pareek-064a851b4/" target="_blank" rel="noreferrer"><button className="btn btn-circle btn-secondary"><i className="icon-social-linkedin"></i></button></a>
                        </div>
                    </div>
                </div>
                {/* <!-- Column --> */}
            </div>












        </div>);
}

export default Developer;