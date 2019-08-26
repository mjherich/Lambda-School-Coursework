import React from 'react';

//Import Styles
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';

//Import Components
import { BrowserRouter, Route } from 'react-router-dom';
import { Header, Container } from 'semantic-ui-react';

//Custom Components
import NavBar from './components/NavBar';

const StyledContainer = styled(Container)`
    padding-top: 48px;
`;

//Temp Components
const Home = () => <Header as="h1" content="Home" />;
const Top100Users = () => <Header as="h1" content="Top 100 Saltiest Users" />;
const Top100Comments = () => (
    <Header as="h1" content="Top 100 Saltiest Comments" />
);
const About = () => <Header as="h1" content="About Us" />;

const App = () => {
    return (
        <BrowserRouter>
            <StyledContainer fluid>
                <NavBar />
                <Route exact path="/" render={() => <Home />} />
                <Route path="/top-100-users" render={() => <Top100Users />} />
                <Route
                    path="/top-100-comments"
                    render={() => <Top100Comments />}
                />
                <Route path="/about-us" render={() => <About />} />
            </StyledContainer>
        </BrowserRouter>
    );
};

export default App;
