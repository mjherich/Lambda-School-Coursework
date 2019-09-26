import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNavBar = styled.div`

    nav {
        display: flex;
        
        .link-button {
            background: #333333;
            margin: 0.5rem;
            height: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 3px;
            padding: 0 1rem 0 1rem;
            
            a {
                text-decoration: none;
                color: #8DE969;
            }
            
        }
    }
`;

export default function NavBar(props) {
    return (
        <StyledNavBar>
            <nav>
                <div className="link-button">
                    <a href="https://joshuaxedgerton.netlify.com/home.html">Home</a>
                </div>
                <div className="link-button">
                    <Link to="/signup">Signup</Link>
                </div>
                <div className="link-button">
                    <Link to="/login">Login</Link>
                </div>
                <div className="link-button">
                    {/* Need to make this link dynamic! */}
                    <Link to="/student-dashboard/">Dashboard</Link>
                </div>
            </nav>
        </StyledNavBar>
    )
}