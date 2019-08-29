import React from 'react';

//Import Styles
import 'semantic-ui-css/semantic.min.css';
import './App.scss';

//Import Components
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

//Custom Components
import NavBar from './components/NavBar';
import UserProfileContainer from './components/UserProfileContainer';
import UserList from './components/users/userList';
import CommentList from './components/comments/commentList';

import { StateProvider } from './state';

import About from "./components/about";
//Temp Components
const Home = () => {
 return (
   <>
    <div className="hero">
      <Link className="cta" to="/top-100-users">Let's Go!</Link>
    </div>
  </>
 )};
const Top100Comments = () => (
    <Header as="h1" content="Top 100 Saltiest Comments" />
);


const App = () => {
    const initialState = {
        theme: window.localStorage.getItem('theme') || 'dark',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'updateTheme':
                window.localStorage.setItem('theme', action.payload)
                return {
                    ...state,
                    theme: action.payload,
                };
            case 'toggleTheme':
                if (state.theme==="dark") {
                  window.localStorage.setItem('theme', 'light')
                  return {
                    ...state,
                    theme: 'light',
                  }
                } else {
                  window.localStorage.setItem('theme', 'dark')
                  return {
                    ...state,
                    theme: 'dark',
                  }                  
                }
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
