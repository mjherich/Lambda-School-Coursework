import React from 'react';

//Import Styles
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import './App.scss';

//Import Components
import { BrowserRouter, Route } from 'react-router-dom';
import { Header, Container } from 'semantic-ui-react';

//Custom Components
import NavBar from './components/NavBar';
import UserProfileContainer from './components/UserProfileContainer';
import UserList from './components/users/userList';

//Temp Components
const Home = () => <Header as="h1" content="Home" />;
const Top100Comments = () => (
    <Header as="h1" content="Top 100 Saltiest Comments" />
);
const About = () => <Header as="h1" content="About Us" />;

const App = () => {
    return (
        <BrowserRouter>
            <NavBar>
                <Route exact path="/" render={() => <Home />} />
                <Route
                    path="/top-100-users"
                    render={props => <UserList {...props} />}
                />
                <Route
                    path="/top-100-comments"
                    render={() => <Top100Comments />}
                />
                <Route path="/about-us" render={() => <About />} />
                <Route
                    path="/users/:username"
                    render={props => <UserProfileContainer {...props} />}
                />
            </NavBar>
        </BrowserRouter>
    );
};

export default App;
