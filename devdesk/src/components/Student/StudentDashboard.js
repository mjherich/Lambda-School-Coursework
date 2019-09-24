import React from "react";
import { Route, Link } from "react-router-dom";

export default function StudentDashboard(props) {
    const {id} = props;
    console.log("yo");

    return (
        <>
            <Link to="/">Homepage</Link>
            <p>Student id {id}</p>
        </>
    )
}