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
import CommentList from './components/comments/commentList';

import { StateProvider } from './state';

import About from "./components/about";
//Temp Components
const Home = () => <Header as="h1" content="Home" />;
const Top100Comments = () => (
    <Header as="h1" content="Top 100 Saltiest Comments" />
);


const App = () => {
    const initialState = {
        theme: true,
    };

    const reducer = (state, action) => {
        console.log(action);
        switch (action.type) {
            case 'updateTheme':
                console.log(action);
                return {
                    ...state,
                    theme: action.payload,
                };
            default:
                return state;
        }
    };

    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <BrowserRouter>
                <NavBar>
                    <Route exact path="/" render={() => <Home />} />
                    <Route
                        path="/top-100-users"
                        render={props => <UserList {...props} />}
                    />
                    <Route
                        path="/top-100-comments"
                        render={props => <CommentList {...props} />}
                    />
                    <Route path="/about-us" render={() => <About />} />
                    <Route
                        path="/users/:username"
                        render={props => <UserProfileContainer {...props} />}
                    />
                </NavBar>
            </BrowserRouter>
        </StateProvider>
    );
};

export default App;
