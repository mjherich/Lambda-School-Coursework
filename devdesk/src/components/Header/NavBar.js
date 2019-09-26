import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNavBar = styled.div`
    width: 6rem;
    display: flex;
    flex-direction: column;

    .menu-and-hamburger {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;

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

            cursor: pointer;
        }
    }

    .dropdown {
        background: #333333;
        position: absolute;
        top: 4rem;
        right: 0;

        &[dropdown="false"] {
            width: 0;
        }
        &[dropdown="true"] {
            width: 10rem;
        }
        transition: width 0.5s;

        overflow: hidden;

        .link-button {
            background: #6A6A6A;
            margin: 0.5rem;
            height: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 3px;

            a {
                text-decoration: none;
                color: #8DE969;
            }

        }
    }
`;

export default function NavBar(props) {
    const [dropDown, setDropDown] = useState("false");

    const toggleDropDown = () => {
        dropDown === "true" ?
        setDropDown("false") :
        setDropDown("true");
    };

    return (
        <StyledNavBar className="nav-bar">
            <div className="menu-and-hamburger">
                <div className="menu">
                </div>
                <div className="hamburger" onClick={toggleDropDown}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="dropdown" dropdown={dropDown}>
                <div className="link-button" onClick={toggleDropDown}>
                    <Link to="/">Home</Link>
                </div>
                <div className="link-button" onClick={toggleDropDown}>
                    <Link to="/signup">Signup</Link>
                </div>
                <div className="link-button" onClick={toggleDropDown}>
                    <Link to="/login">Login</Link>
                </div>
                <div className="link-button" onClick={toggleDropDown}>
                    <Link to="/student-dashboard/">Student Dashboard</Link>
                </div>
                <div className="link-button" onClick={toggleDropDown}>
                    <Link to="/helper-dashboard/">Helper Dashboard</Link>
                </div>
            </div>
        </StyledNavBar>
    )
}