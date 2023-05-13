import React from 'react'

function LandingPage() {
    return (
        <div>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Welcome to NIT Kurukshetra Placement Portal</h4>
                    <br></br>
                </div>

                {/* <!-- UG Placement Stats --> */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <h3>UG Placement Statistics 2021-2022</h3>
                                        <h5 className="font-light m-t-0">Placement Cell, NIT Kurukshetra</h5>
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
                                            <th>ELIGIBLE</th>
                                            <th>PLACED</th>
                                            <th>PLACEMENT </th>
                                            <th>HIGHEST (LPA)</th>
                                            <th>MEDIAN (LPA)</th>
                                            <th>AVERAGE (LPA)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">1</td>
                                            <td className="txt-oflo">COMPUTER ENGINEERING</td>
                                            <td><span className="text-info">129</span></td>
                                            <td className="txt-oflo">92</td>
                                            <td className="txt-oflo">92</td>
                                            <td><span className="text-info">100%</span></td>
                                            <td><span className="text-success">47 </span></td>
                                            <td className="txt-oflo">16.65 </td>
                                            <td className="txt-oflo">19.81 </td>
                                        </tr>
                                        <tr>
                                        <td className="text-center">2</td>
                                            <td className="txt-oflo">INFORMATION TECHNOLOGY</td>
                                            <td><span className="text-info">118</span></td>
                                            <td className="txt-oflo">91</td>
                                            <td className="txt-oflo">85</td>
                                            <td><span className="text-info">93.41%</span></td>
                                            <td><span className="text-success">47 </span></td>
                                            <td className="txt-oflo">14.88 </td>
                                            <td className="txt-oflo">18.30 </td>
                                        </tr>
                                        <tr>
                                        <td className="text-center">3</td>
                                            <td className="txt-oflo">ELECTRONICS AND COMM. ENGINEERING</td>
                                            <td><span className="text-info">150</span></td>
                                            <td className="txt-oflo">124</td>
                                            <td className="txt-oflo">105</td>
                                            <td><span className="text-info">84.68%</span></td>
                                            <td><span className="text-success">50.59 </span></td>
                                            <td className="txt-oflo">14.50 </td>
                                            <td className="txt-oflo">17.12 </td>
                                        </tr>
                                        <tr>
                                        <td className="text-center">4</td>
                                            <td className="txt-oflo">MECHANICAL ENGINEERING</td>
                                            <td><span className="text-info">125</span></td>
                                            <td className="txt-oflo">135</td>
                                            <td className="txt-oflo">113</td>
                                            <td><span className="text-info">83.70%</span></td>
                                            <td><span className="text-success">35 </span></td>
                                            <td className="txt-oflo">7.10 </td>
                                            <td className="txt-oflo">8.72 </td>
                                        </tr>
                                        <tr>
                                        <td className="text-center">5</td>
                                            <td className="txt-oflo">PRODUCTION AND INDUSTRIAL ENGINEERING</td>
                                            <td><span className="text-info">82</span></td>
                                            <td className="txt-oflo">77</td>
                                            <td className="txt-oflo">69</td>
                                            <td><span className="text-info">89.61%</span></td>
                                            <td><span className="text-success">16.65 </span></td>
                                            <td className="txt-oflo">8.04 </td>
                                            <td className="txt-oflo">8.82 </td>
                                        </tr>
                                        <tr>
                                        <td className="text-center">6</td>
                                            <td className="txt-oflo">ELECTRICAL ENGINEERING</td>
                                            <td><span className="text-info">128</span></td>
                                            <td className="txt-oflo">123</td>
                                            <td className="txt-oflo">107</td>
                                            <td><span className="text-info">86.99%</span></td>
                                            <td><span className="text-success">125 </span></td>
                                            <td className="txt-oflo">7.90 </td>
                                            <td className="txt-oflo">12.37 </td>
                                        </tr>
                                        <tr>
                                        <td className="text-center">7</td>
                                            <td className="txt-oflo">CIVIL ENGINEERING</td>
                                            <td><span className="text-info">62</span></td>
                                            <td className="txt-oflo">122</td>
                                            <td className="txt-oflo">61</td>
                                            <td><span className="text-info">50%</span></td>
                                            <td><span className="text-success">17.80 </span></td>
                                            <td className="txt-oflo">7.18 </td>
                                            <td className="txt-oflo">7.94 </td>
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
                                        <h3>PG Placement Statistics 2021-22</h3>
                                        <h5 className="font-light m-t-0">Placement Cell, NIT Kuruskhetra</h5>
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
                                            <th>ELIGIBLE</th>
                                            <th>PLACED</th>
                                            <th>PLACEMENT </th>
                                            <th>HIGHEST (LPA)</th>
                                            <th>MEDIAN (LPA)</th>
                                            <th>AVERAGE (LPA)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="text-center">1</td>
                                            <td className="txt-oflo">M.Tech</td>
                                            <td><span className="text-info">120</span></td>
                                            <td className="txt-oflo">426</td>
                                            <td className="txt-oflo">114</td>
                                            <td><span className="text-info">26.76%</span></td>
                                            <td><span className="text-success">32.45 </span></td>
                                            <td className="txt-oflo">7.46 </td>
                                            <td className="txt-oflo">9.23 </td>
                                        </tr>
                                         <tr>
                                        <td className="text-center">2</td>
                                            <td className="txt-oflo">MBA</td>
                                            <td><span className="text-info">25</span></td>
                                            <td className="txt-oflo">47</td>
                                            <td className="txt-oflo">25</td>
                                            <td><span className="text-info">53.19%</span></td>
                                            <td><span className="text-success">12.56 </span></td>
                                            <td className="txt-oflo">5 </td>
                                            <td className="txt-oflo">6.19 </td>
                                        </tr>
                                        <tr>
                                        <td className="text-center">3</td>
                                            <td className="txt-oflo">MCA</td>
                                            <td><span className="text-info">75</span></td>
                                            <td className="txt-oflo">87</td>
                                            <td className="txt-oflo">72</td>
                                            <td><span className="text-info">82.75%</span></td>
                                            <td><span className="text-success">44 </span></td>
                                            <td className="txt-oflo">9.11 </td>
                                            <td className="txt-oflo">11.16 </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    );
}

export default LandingPage;