import React from "react";
import "./minicard.css";
import PeopleIcon from "@mui/icons-material/People";
import StarsIcon from "@mui/icons-material/Stars";
import SchoolIcon from "@mui/icons-material/School";
import Button from "@mui/material/Button";
function MiniCard(props) {
    return (
        <>
            <div className="mini-card">
                {props.icon === "People" ? (
                    <PeopleIcon />
                ) : props.icon == "Rankings" ? (
                    <StarsIcon />
                ) : (
                    <SchoolIcon />
                )}

                {/* <PeopleIcon /> */}
                <h3>{props.title}</h3>
                <div className="container">{props.description}</div>
                <Button variant="contained" color="error" style={{ marginTop: "1rem" }}>
                    Know More
                </Button>
            </div>
        </>
    );
}

export default MiniCard;
