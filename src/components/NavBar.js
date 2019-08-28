import React, { useState } from 'react';
import { Sidebar, Responsive, Menu, Container, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserSearch from './UserSearch';

import styled from 'styled-components';

const NavBarMobile = ({ children, onPusherClick, onToggle, visible }) => {
    return (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                visible={visible}
                animation="overlay"
                direction="top"
                stackable
                style={{ width: '100vw' }}
                size="large"
            >
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
                    content="🧂 Saltiest 100 Comments"
                />
                <Menu.Item
                    as={Link}
                    to="/about-us"
                    name="about-us"
                    content="About Us"
                />
            </Sidebar>
            <Sidebar.Pusher onClick={onPusherClick}>
                <Menu fixed="top">
                    <Menu.Item onClick={onToggle}>
                        <Icon name="sidebar" />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <UserSearch />
                    </Menu.Menu>
                </Menu>
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};

const NavBarDesktop = () => {
    return (
        <Menu fixed="top" size="large">
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
                content="🧂 Saltiest 100 Comments"
            />
            <Menu.Item
                as={Link}
                to="/about-us"
                name="about-us"
                content="About Us"
            />
            <Menu.Menu position="right">
                <UserSearch />
            </Menu.Menu>
        </Menu>
    );
};

const NavBarChildren = ({ children }) => {
    return (
        <Container fluid style={{ marginTop: 80 }}>
            {children}
        </Container>
    );
};

const NavBar = ({ children }) => {
    const [visible, setVisible] = useState(false);

    const handlePusher = () => {
        if (visible) setVisible(false);
    };

    const handleToggle = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <Responsive {...Responsive.onlyMobile}>
                <NavBarMobile
                    visible={visible}
                    onToggle={handleToggle}
                    onPusherClick={handlePusher}
                >
                    <NavBarChildren>{children}</NavBarChildren>
                </NavBarMobile>
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <NavBarDesktop />
                <NavBarChildren>{children}</NavBarChildren>
            </Responsive>
        </div>
    );
};

export default NavBar;
