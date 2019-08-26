import React from 'react';
import { Menu, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserSearch from './UserSearch'

const NavBar = () => {
    return (
        <Menu fixed="top" stackable>
            <Menu.Item as={Link} to="/" name="home" content="Home" />
            <Menu.Item
                as={Link}
                to="/top-100-users"
                name="top100users"
                content="🧂 Saltiest 100 Users"
            />
            <Menu.Item
                as={Link}
                to="/top-100-comments"
                name="top100comments"
                content="Saltiest 100 Comments"
            />
            <Menu.Item
                as={Link}
                to="/about-us"
                name="about-us"
                content="About Us"
            />
            <Menu.Menu position="right">
                <Menu.Item>
                    <UserSearch />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default NavBar;
