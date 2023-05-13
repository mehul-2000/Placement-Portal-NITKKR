// @ts-nocheck
import React from 'react'
import { Link } from 'react-router-dom'

const Team = () => {
    return (
        <div>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Faculty In-Charge</h4>
                </div>

            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-3">
                                    <center className="m-t-30"> <img src={require('./sm gupta.PNG')} className="img-circle" width="150" alt="dp"/>
                                        <h4 className="card-title m-t-10">Prof. S.M. Gupta</h4>
                                        <h6 className="card-subtitle">Dean | Industry & International Relations</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">+91-01744-233301 | 302</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> <img src={require('./shelly.PNG')} className="img-circle" width="150" alt="dp"/>
                                        <h4 className="card-title m-t-10">Shelly Vadhera</h4>
                                        <h6 className="card-subtitle">Associate Dean | Industry & International Relations</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">+91-01744-233304</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> <img src={require('./panduranga.PNG')} className="img-circle" width="150" alt="dp"/>
                                        <h4 className="card-title m-t-10">Dr. M.P.R. Prasad</h4>
                                        <h6 className="card-subtitle">Faculty In-charge| Training & Placement</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">+91-01744-233303</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> <img src={require('./rajesh.PNG')} className="img-circle" width="150" alt="dp"/>
                                        <h4 className="card-title m-t-10">Sh. Rakesh Sharma</h4>
                                        <h6 className="card-subtitle">Office Incharge | Training & Placement</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">+91-01744-233302</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                               
                            </div>


                        </div>
                    </div>
                </div>
            </div>


            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Student Placement Co-ordinators (B.Tech.)</h4>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Harsh Brar</h4>
                                        <h6 className="card-subtitle">Civil Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9306255059</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Potluri Bhavana </h4>
                                        <h6 className="card-subtitle">Civil Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9848226323</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Raj Vaibhav Siddhant </h4>
                                        <h6 className="card-subtitle">Mechanical Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">7011578047</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Sourabh Mittal </h4>
                                        <h6 className="card-subtitle">Mechanical Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8570918619</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Yaman Kumar</h4>
                                        <h6 className="card-subtitle">Production & Industrial Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9306394990</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30">
                                        <h4 className="card-title m-t-10">Akshat Bindal</h4>
                                        <h6 className="card-subtitle">Production & Industrial Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8385816865</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Saransh Gautam</h4>
                                        <h6 className="card-subtitle">Information Technology </h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">7073412759</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Ishita Tandon</h4>
                                        <h6 className="card-subtitle">Electrical Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8090929947</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Rajat</h4>
                                        <h6 className="card-subtitle">Electrical Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9991160468</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Kunal Sharma</h4>
                                        <h6 className="card-subtitle">Electronics & Communication Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9992796799</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Anoushka Dangi</h4>
                                        <h6 className="card-subtitle">Electrical Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8447000477</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Ayush Ranjan</h4>
                                        <h6 className="card-subtitle">Computer Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9560993912</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Bharat Lulla</h4>
                                        <h6 className="card-subtitle">Computer Engineering</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9660677523</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Student Placement Co-ordinators (PG)</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Ayushman Shukla</h4>
                                        <h6 className="card-subtitle">MBA</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8318297324</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Aindri Sharma</h4>
                                        <h6 className="card-subtitle">MBA</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8957901228</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Vishal Kumar Shaw</h4>
                                        <h6 className="card-subtitle">MCA</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">7358291024</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Anushika Srivastava</h4>
                                        <h6 className="card-subtitle">MCA</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9506733894</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Yogesh Kapri</h4>
                                        <h6 className="card-subtitle">Civil Engineering (Geotechnical)</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8953727816</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Rajesh</h4>
                                        <h6 className="card-subtitle">Civil Engineering (Environmental)</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8222899908</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Akilesh Kumar</h4>
                                        <h6 className="card-subtitle">Civil Engineering (Structural)</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">6374236953</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Medhavi Gupta</h4>
                                        <h6 className="card-subtitle">Civil Engineering (Transportation)</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9506882355</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Shubhendra Kumar</h4>
                                        <h6 className="card-subtitle">Mechanical Engineering (PIE)</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9903118311</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Umang Rai</h4>
                                        <h6 className="card-subtitle">Mechanical Engineering (MD)</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8871233416</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Chandrakant Tyagi</h4>
                                        <h6 className="card-subtitle">Mechanical Engineering (Thermal)</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">7895037172</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Mukund Kumar Choudhary</h4>
                                        <h6 className="card-subtitle">Electrical Engineering (PED)</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8800858835</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Talib </h4>
                                        <h6 className="card-subtitle">Electrical Engineering (Power System)</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8218459842</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Roopshi Gupta </h4>
                                        <h6 className="card-subtitle">Electrical Engineering (Control System)</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9650554852</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Abhishek Gautam </h4>
                                        <h6 className="card-subtitle">Computer Engineering </h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">7237864986</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Utkarsh Upadhyay </h4>
                                        <h6 className="card-subtitle">Computer Engineering (Cyber Security)</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8225919593</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Harshika Kumari </h4>
                                        <h6 className="card-subtitle">Physics</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9776303596</font></Link></div>
                                        </div>
                                    </center>
                                </div>

                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Ashish </h4>
                                        <h6 className="card-subtitle">VLSI</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">9570677876</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Vikas Yadav </h4>
                                        <h6 className="card-subtitle">ESD</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">7982673855</font></Link></div>
                                        </div>
                                    </center>
                                </div>
                                <div className="col-lg-3">
                                    <center className="m-t-30"> 
                                        <h4 className="card-title m-t-10">Satyavrat Pratap Singh </h4>
                                        <h6 className="card-subtitle">SREE</h6>
                                        <div className="row text-center justify-content-md-center" ng-show="main.isLoggedIn">
                                            <div className="col-12"><Link className="link"><i className="icon-call-in"></i> <font className="font-medium">8766805648</font></Link></div>
                                        </div>
                                    </center>
                                </div>



                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team