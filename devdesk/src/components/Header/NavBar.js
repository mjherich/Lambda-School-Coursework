import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNavBar = styled.div`
    width: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .menu {
        padding-top: 0.5rem;
    }

    .hamburger {
        height: 1.2rem;
        width: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;


        div {
            min-height: 3px;
            width: 100%;
            background: white;
        }
    }
`;

export default function NavBar(props) {
    return (
        <StyledNavBar className="nav-bar">
            <div className="menu">
                <h5>MENU</h5>
            </div>
            <div className="hamburger">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </StyledNavBar>
    )
}