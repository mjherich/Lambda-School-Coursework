import React from "react";
import styled from "styled-components";

import NavBar from "./NavBar";

const StyledHeader = styled.header`
    background: slategrey;
    height: 4rem;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem 0 2rem;

    .logo {
        border: 1px solid green;
        width: 4rem;
    }
`;

export default function Header(props) {
    return (
        <StyledHeader>
            <div className="logo">
                [Logo]
            </div>
            <NavBar />
        </StyledHeader>
    )
}