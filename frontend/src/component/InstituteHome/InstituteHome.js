import React from 'react';
import './InstituteHome.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MiniCard from '../MiniCard/minicard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
function InstituteHome() {
    return (<>
        {/* Header Starts */}
        <div>
            <header>
                <nav>

                    <ul>

                        <li><a href="#" className="logo">
                            <img src="data:image/png;base64,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" />
                        </a></li>

                    </ul>
                </nav>
            </header>


            {/* Header Ends */}

            <div className="d-flex flex-row mb-4">
                <div className="d-flex flex-fill flex-column" style={{ justifyContent: "center", alignItems: 'center' }}>
                    <h1>NIT Kurukshetra</h1>
                    <h4>(Institute of National Importance)</h4>
                </div>
                <div className="d-flex flex-fill flex-column" style={{ justifyContent: "center", alignItems: 'center' }}>
                    <h2>Campus Placement Portal</h2>
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="add"
                        sx={{ backgroundColor: "#C21717" }}
                    >
                        <NavigationIcon sx={{ mr: 1 }} />
                        NITKKR Placement Portal Link
                    </Fab>
                </div>
            </div>
        </div>

        {/* Carousel Starts */}
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src="https://nitkkr.ac.in/wp-content/uploads/2022/09/60-year-logo-140720223.jpg" alt="First slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="https://nitkkr.ac.in/wp-content/uploads/2022/12/IMG_0494-scaled.jpg" alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="https://nitkkr.ac.in/wp-content/uploads/2022/03/9-1.jpg" alt="Third slide" />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" ></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        {/* Carousel Ends */}
        {/* Institute Information */}

        <div className="grid-container">
            <div className="grid-item item1" style={{ margin: "0 auto" }}>
                <Card sx={{ maxWidth: 450 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Academic Facilities
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                NIT Kurukshetra provides the best learning facilities and the best possible learning environment. The programmes and courses on offer have the flexibility to evolve and change in response to new requirements. The programmes have a dual purpose of building a solid foundation of knowledge and, at the same time, enhancing confidence, creativity and innovation.


                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Show More
                        </Button>
                    </CardActions>
                </Card>
            </div>
            <div className="grid-item item2"><Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <div>
                    <h3>Programs Offered:</h3>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Computer Engineering" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Civil Engineering" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Information Technology" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Electronics & Communication Engineering" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Electrical Engineering" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Mechanical Engineering" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Production & Indistrial Engineering" />
                            </ListItemButton>
                        </ListItem>
                    </List>

                </div>
                <Button size="small" color="primary" style={{ alignItems: "right" }}>
                    Know More
                </Button>
            </Box>
            </div>
            <div className="grid-item item3">
                <h3>Placement Statistics:</h3>
                <div className="card" style={{ width: '24rem', marginTop: '2rem' }}>

                    <ul className="list-group list-group-flush" style={{ fontSize: '1.5rem' }}>
                        <li className="list-group-item" >Placement Report 2022-23</li>
                        <li className="list-group-item">Placement Report 2021-22</li>
                        <li className="list-group-item">Older Placement Reports</li>
                    </ul>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}>
                    <img alt="Logo-Institute" />
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="add"
                        sx={{ backgroundColor: "#C21717" }}
                    >
                        <NavigationIcon sx={{ mr: 1 }} />
                        NITKKR Placement Portal Link
                    </Fab>
                </div>
            </div>
            <div className="grid-item item4" style={{ margin: "0 auto" }}>
                <Card sx={{ maxWidth: 450 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Academic Facilities
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                NIT Kurukshetra provides the best learning facilities and the best possible learning environment. The programmes and courses on offer have the flexibility to evolve and change in response to new requirements. The programmes have a dual purpose of building a solid foundation of knowledge and, at the same time, enhancing confidence, creativity and innovation.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Show More
                        </Button>
                    </CardActions>
                </Card>
            </div>

        </div>


        {/* End of Institute Information */}
        {/* About */}
        <h2 style={{ textAlign: 'center', marginTop: "1rem" }}>About Us</h2>
        <div className="about" style={{ justifyContent: "center", alignItems: "center" }}>
            <div className="card d-flex flex-row" style={{ margin: "2rem auto", width: "60rem", boxShadow: "2px 2px black" }}>
                <img className="card-img-top" src="https://nitkkr.ac.in/wp-content/uploads/2022/03/9-1.jpg" style={{ width: "28rem" }} alt="Card image cap" />
                <div className="card-body" style={{ textAlign: "center", fontFamily: "Rubik" }}>
                    <h5 className="card-title">Training & Placement Cell</h5>
                    <p className="card-text">
                        The Training and Placement Cell is a nodal point of contact for companies seeking to establish a fruitful relationship with the institute. The cell is being headed by Prof. In-charge, and supported by Faculty In-charge, Placement Coordination Committee of Students (PCC) and the secretariat. The placement team works tirelessly to ensure that top notch opportunities are brought to the students & manages all interactions between the visiting companies and the institute. The cell provides all the possible assistance to the recruiters for Pre Placement Talks, Conducting Tests and Interviews to the company personnel. It also aims to fine tune the students that they require not just for placements but also as they embark on their corporate carrier.
                    </p>
                </div>

            </div>
        </div>
        {/* End of About */}
        <div className="flexContainer1">
            <h3>Our Values : "Ksharamonavrat Chesta Ch"</h3>
            <MiniCard
                icon="People"
                title="Alumni"
                description="Our Alumni have emerged successful and excelled in varied professions across the globe. This network is highly enriching for the growth of our community."
            />
            <MiniCard
                icon="Rankings"
                title="Rankings"
                description="Recognized as one of the India’s top Engineering College, we strive for excellence. Our rankings are reflective of our steep progress."
            />
            <MiniCard
                icon="Edu"
                title="Quality"
                description="Nurturing the bright future of Nation through Quality Educational and Teaching methodologies by highly experienced faculties."
            />
        </div>


        {/* From Director's Desk */}

        <div className="d-flex directorcorner" style={{ padding: "1.5rem" }}>
            <div className="d-flex flex-fill flex-column" style={{ alignItems: 'right', width: '30%' }}>
                <img alt="director-img" height="300" width="280" style={{ marginLeft: "10rem" }} src="data:image/jpeg;base64,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" />
            </div>
            <div className="d-flex flex-fill flex-column" style={{ width: '75%' }}>
                <h1 style={{ fontFamily: 'Dancing Script, cursive', marginLeft: '4rem', color: 'white' }}>From Director's Desk....</h1>
                <p style={{ textAlign: 'left', marginTop: '2rem', color: 'white', marginLeft: "4rem" }}>India, the land of seekers, is at the cusp of becoming Vishwa Guru all over again after 1100 years of subjugation, wars, annexures and humiliation. It is again a free country due to the sacrifices made by our leaders, freedom fighters and has learnt the art of standing tall in the midst of many a challenge of building the nation with its rich diversity, cultures, languages all over again since the last 75 years. Unity in Diversity is our mantra while making our nation stronger in every sphere.
                    <br />
                    <br />I heartily welcome everyone who visits the website of this institution.</p>
                <p style={{ textAlign: 'right', marginRight: "5rem" }}>
                    <h4> - Dr. Prof. BV Ramana Reddy</h4>
                    <h6>Director, NIT Kurukshetra</h6>
                </p>
            </div>
        </div>


        {/* End of Director's Desk */}
    </>);
}

export default InstituteHome;