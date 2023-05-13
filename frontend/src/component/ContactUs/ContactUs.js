import React from 'react'

function ContactUs() {
    return (
        <div style={{marginBottom:"2rem"}}>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Contact Details</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card"> <img className="card-img" src="https://res.cloudinary.com/djik7nh4k/image/upload/v1682875261/24131961_285405678647849_426967072086000359_o_jqga6l.jpg" height="456" alt="Card image" />
                        <div className="card-img-overlay card-inverse text-white social-profile d-flex justify-content-center" style={{ borderRadius: "15px" }}>
                            <div className="align-self-center"> <img src="https://res.cloudinary.com/djik7nh4k/image/upload/v1682875404/National_Institute_of_Technology_2C_Kurukshetra_Logo_lrwo06.png" className="img-circle" width="100" style={{ backgroundColor: "white" }} />
                                <br />
                                <br />
                                <h4 className="card-title">Placement & Training Cell</h4>
                                <h6 className="card-subtitle">National Institute of Technology Kurukshetra
                                    <br />Thanesar, Kurukshetra- 136119
                                    <br />Haryana, India</h6>

                                <p className="text-white"> Welcome to Placement and Training cell of NIT Kurukshetra.  </p>
                                <small className="text-muted p-t-30 db">Phone</small>
                                <h6>+91-141-2529065</h6>
                                <small className="text-muted p-t-30 db">Placements Relate Queries</small>
                                <h6>tnp@nitkkr.ac.in</h6>
                                <small className="text-muted p-t-30 db">Placements Portal Relate Queries</small>
                                <h6>placementportal@nitkkr.ac.in</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ContactUs;