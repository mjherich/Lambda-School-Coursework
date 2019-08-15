import React from 'react';
import UserInput from './components/UserInput.js';
import GeneratedCodes from './components/GeneratedCodes.js';
import { Container } from 'semantic-ui-react';

import './App.css';

function App() {
  return (
    <Container className="App">
      <UserInput />
      <GeneratedCodes />
    </Container>
  );
}

export default App;
