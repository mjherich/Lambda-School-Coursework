import React from "react";
import { Route, Link } from "react-router-dom";

export default function Login(props) {
    const {id} = props;

    return (
        <>
            <Link to="/">Homepage</Link><br/>
            <Link to={`/student-dashboard/${id}`} >Student Dashboard</Link>
        </>
    )
}