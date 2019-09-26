import React from "react";
import styled from "styled-components";

import NavBar from "./NavBar";

import logo from "../images/logo.png";

const StyledHeader = styled.header`
    background: #6A6A6A;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem 0 2rem;

    .logo-and-title {
        display: flex;
        align-items: center;

        h1 {
            font-size: 2rem;
            color: #74BF56;
            font-weight: bold;
        }
    }

    .logo {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 10px;
        overflow: hidden;
        margin-right: 1rem;

        img {
            height: 100%;
            width: 100%;
        }
    }
`;

export default function Header(props) {
    return (
        <StyledHeader>
            <div className="logo-and-title">
                <div className="logo">
                    <img src={logo} alt="logo" />
                    {/* From: https://iconmonstr.com/code-3-png/ */}
                </div>
                <h1>DevDesk Queue</h1>
            </div>
            <NavBar />
        </StyledHeader>
    )
}