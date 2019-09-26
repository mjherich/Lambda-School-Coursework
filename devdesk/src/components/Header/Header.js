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

    .logo {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 10px;
        overflow: hidden;

        img {
            height: 100%;
            width: 100%;
        }
    }
`;

export default function Header(props) {
    return (
        <StyledHeader>
            <div className="logo">
                <img src={logo} alt="logo" />
                {/* From: https://iconmonstr.com/code-3-png/ */}
            </div>
            <NavBar />
        </StyledHeader>
    )
}