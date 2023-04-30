import React from 'react'

function LandingPage() {
    return (
        <div>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Welcome to MNIT Placement Portal</h4>
                </div>

                {/* <!-- Placements --> */}
                <div className="col-md-7 align-self-center text-right">
                    <div className="d-flex justify-content-end align-items-center dropdown">
                        <a
                            className="btn btn-primary dropdown-toggle"
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="ti-user"></i> &nbsp;Placement Stats
                        </a>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><a className="dropdown-item" href="/home">Placements 2020-21</a></li>
                            <li>
                                <a className="dropdown-item" href="/stats19-20">Placements 2019-20</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                {/* <!-- Open Source --> */}
                <div className="col-lg-12" ng-show="!main.isLoggedIn">
                    <div className="alert alert-info">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="text-info"><i className="icon-social-github"></i> Open Source!</h3>
                        Placement Portal is open source. Be part of the community or help improve
                        the placement portal. If you want to contribute to the project and make it
                        better, your help is very welcome! <br /><br /><a
                            href="https://github.com/Pankajtanwarbanna/PlacementMNIT"
                            target="_blank"
                            className="btn btn-primary"
                        >Star on Github</a>
                    </div>
                </div>



                {/* <!-- Interview Experience --> */}
                {/* <!--<div className="col-lg-12" ng-show="main.isLoggedIn">
        <div className="alert alert-info">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
            <h3 className="text-info"><i className="icon-rocket"></i> Interview Experiences!</h3> Appeared for an interview? Share details about the interview process you have been through.. Now, you can add your placement/internship interview experience under Compose Interview Experience section to help others.
            <br><br><a href="/interview-experiences" className="btn btn-primary">Write Now</a>
        </div>
    </div>-->
  <!-- Happy New Year --> */}
                {/* <!--<div className="col-lg-12">
                    <div className="card news-slide social-profile" style="background:url(assets/images/MNIT/happy.jpg) center center / cover;">
                        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                            &lt;!&ndash; Carousel items &ndash;&gt;
                            <div className="carousel-inner">
                                <div className="active carousel-item">
                                    &lt;!&ndash;<div className="carousel-caption">
                                        <span className="label label-danger label-rounded">MNIT Jaipur</span>
                                        <h3 className="m-t-5 font-light">Don't limit your challenges, challenge your limits.</h3>
                                    </div>&ndash;&gt;
                                </div>
                                <div className="carousel-item">
                                    &lt;!&ndash;<div className="carousel-caption">
                                        <span className="label label-danger label-rounded">MNIT Jaipur</span>
                                        <h3 className="m-t-5 font-light">The best preparation for tomorrow is doing your best today.</h3>
                                    </div>&ndash;&gt;
                                </div>
                                <div className="carousel-item">
                                    &lt;!&ndash;<div className="carousel-caption">
                                        <span className="label label-danger label-rounded">MNIT Jaipur</span>
                                        <h3 className="m-t-5 font-light">Believe you can and you're halfway there.</h3>
                                    </div>&ndash;&gt;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>-->
            </div> */}

                {/* <!-- UG Placement Stats --> */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <h3>UG Placement Statistics 2020-2021</h3>
                                        <h5 className="font-light m-t-0">Placement Cell, MNIT Jaipur</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>BRANCH</th>
                                            <th>OFFERS</th>
                                            <th>PLACED</th>
                                            <th>PLACEMENT</th>
                                            <th>HIGHEST</th>
                                            <th>AVERAGE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">1</td>
                                            <td className="txt-oflo">B.ARCH.</td>
                                            <td><span className="text-info">16</span></td>
                                            <td className="txt-oflo">16</td>
                                            <td><span className="text-info">69.75%</span></td>
                                            <td><span className="text-success">6.75 LPA</span></td>
                                            <td className="txt-oflo">5.36 LPA</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">2</td>
                                            <td className="txt-oflo">CHEMICAL</td>
                                            <td><span className="text-info">49</span></td>
                                            <td className="txt-oflo">47</td>
                                            <td><span className="text-info">73.44%</span></td>
                                            <td><span className="text-success">13 LPA</span></td>
                                            <td className="txt-oflo">6.78 LPA</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">3</td>
                                            <td className="txt-oflo">CIVIL</td>
                                            <td><span className="text-info">13</span></td>
                                            <td className="txt-oflo">13</td>
                                            <td><span className="text-info">24.07%</span></td>
                                            <td><span className="text-success">12.93 LPA</span></td>
                                            <td className="txt-oflo">7.07 LPA</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">4</td>
                                            <td className="txt-oflo">COMPUTER SCIENCE</td>
                                            <td><span className="text-info">96</span></td>
                                            <td className="txt-oflo">80</td>
                                            <td><span className="text-info">93.02%</span></td>
                                            <td><span className="text-success">40 LPA</span></td>
                                            <td className="txt-oflo">15.38LPA</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">5</td>
                                            <td className="txt-oflo">ELECTRICAL</td>
                                            <td><span className="text-info">42</span></td>
                                            <td className="txt-oflo">42</td>
                                            <td><span className="text-info">70%</span></td>
                                            <td><span className="text-success">21.5 LPA</span></td>
                                            <td className="txt-oflo">7.74 LPA</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">6</td>
                                            <td className="txt-oflo">ELECTRONICS & COMM.</td>
                                            <td><span className="text-info">76</span></td>
                                            <td className="txt-oflo">70</td>
                                            <td><span className="text-info">88.75%</span></td>
                                            <td><span className="text-success">43 LPA</span></td>
                                            <td className="txt-oflo">13.61 LPA</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">7</td>
                                            <td className="txt-oflo">MECHANICAL</td>
                                            <td><span className="text-info">55</span></td>
                                            <td className="txt-oflo">55</td>
                                            <td><span className="text-info">64.71%</span></td>
                                            <td><span className="text-success">15.32 LPA</span></td>
                                            <td className="txt-oflo">8.31 LPA</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">8</td>
                                            <td className="txt-oflo">METALLURGY</td>
                                            <td><span className="text-info">38</span></td>
                                            <td className="txt-oflo">38</td>
                                            <td><span className="text-info">61.29%</span></td>
                                            <td><span className="text-success">13 LPA</span></td>
                                            <td className="txt-oflo">7.08 LPA</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center"></td>
                                            <td className="txt-oflo"><b>TOTAL</b></td>
                                            <td>
                                                <span className="text-info"><b>385</b></span>
                                            </td>
                                            <td className="txt-oflo"><b>361</b></td>
                                            <td><span className="text-info">70.43%</span></td>
                                            <td>
                                                <span className="text-success"><b>43 LPA</b></span>
                                            </td>
                                            <td className="txt-oflo"><b>10.34 LPA</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- PG Placement Stats --> */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <h3>PG Placement Statistics 2020-21</h3>
                                        <h5 className="font-light m-t-0">Placement Cell, MNIT Jaipur</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>BRANCH</th>
                                            <th>OFFERS</th>
                                            <th>PLACED</th>
                                            <th>HIGHEST</th>
                                            <th>AVERAGE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">1</td>
                                            <td className="txt-oflo">M.Tech.</td>
                                            <td><span className="text-info">101</span></td>
                                            <td className="txt-oflo">95</td>
                                            <td><span className="text-success">30 LPA</span></td>
                                            <td className="txt-oflo">8.3 LPA</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">2</td>
                                            <td className="txt-oflo">M.Sc.</td>
                                            <td><span className="text-info">6</span></td>
                                            <td className="txt-oflo">6</td>
                                            <td><span className="text-success">6.75 LPA</span></td>
                                            <td className="txt-oflo">5 LPA</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">3</td>
                                            <td className="txt-oflo">MBA</td>
                                            <td><span className="text-info">27</span></td>
                                            <td className="txt-oflo">27</td>
                                            <td><span className="text-success">6.6 LPA</span></td>
                                            <td className="txt-oflo">5.08 LPA</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center"></td>
                                            <td className="txt-oflo"><b>TOTAL</b></td>
                                            <td>
                                                <span className="text-info"><b>95</b></span>
                                            </td>
                                            <td className="txt-oflo"><b>95</b></td>
                                            <td>
                                                <span className="text-success"><b>20.67 LPA</b></span>
                                            </td>
                                            <td className="txt-oflo"><b>6.97 LPA</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-body">
                                <h3 className="text-center">UG + PG Package Details</h3>
                                <div className="row">
                                    <div className="col-6 text-center">
                                        <h5 className="font-light m-t-0"><b>Maximum</b> : 43 LPA</h5>
                                    </div>
                                    <div className="col-6 text-center">
                                        <h5 className="font-light m-t-0"><b>Average</b> : 9.6 LPA</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card oh">
                                    <div className="card-body bg-light">
                                        <div className="row text-center m-b-20">
                                            <div className="col-lg-4 col-md-4 m-t-20">
                                                <h2 className="m-b-0 font-light">49</h2>
                                                <span className="text-muted">Pre-Placement Offers</span>
                                            </div>
                                            <div className="col-lg-4 col-md-4 m-t-20">
                                                <h2 className="m-b-0 font-light">140+</h2>
                                                <span className="text-muted">No. of Companies Visited</span>
                                            </div>
                                            <div className="col-lg-4 col-md-4 m-t-20">
                                                <h2 className="m-b-0 font-light">181</h2>
                                                <span className="text-muted">On-Campus Internships (UG + PG)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;