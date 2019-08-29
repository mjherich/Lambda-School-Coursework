import React, { useState } from 'react';
import {
    Sidebar,
    Responsive,
    Menu,
    Container,
    Checkbox,
    Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserSearch from './UserSearch';
import Footer from './Footer';

import { useStateValue } from '../state';

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
    const [{ theme }, dispatch] = useStateValue();

    return (
        <Menu inverted={theme==='dark' ? 'inverted' : null} fixed="top" size="large">
            <Menu.Item as={Link} to="/" className="site-title" name="home" content="Salty Hackers" />
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
            <Menu.Item>
                <Checkbox
                    toggle
                    defaultChecked={theme==="dark" ? true : false}
                    style={{ marginTop: 10 }}
                    onClick={e => {
                        dispatch({
                            type: 'toggleTheme'
                        })
                      }
                    }
                />
            </Menu.Item>
            <Menu.Menu position="right">
                <UserSearch />
            </Menu.Menu>
        </Menu>
    );
};

const NavBarChildren = ({ children }) => {
    const [{ theme }, dispatch] = useStateValue();

    return (
        <Container
            fluid
            id="theme-container"
            className={theme}
            style={{ paddingTop: 80, backgroundColor: theme==='dark' && '#041f42' }}
        >
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
                    <Footer />
                </NavBarMobile>
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <NavBarDesktop />
                <NavBarChildren>{children}</NavBarChildren>
                <Footer />
            </Responsive>
        </div>
    );
};

export default NavBar;
