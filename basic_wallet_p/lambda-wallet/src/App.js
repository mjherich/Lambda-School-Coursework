import React, { createContext, useContext } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';

import AppContext from './state/AppContext'
import Login from './components/Login';

function App() {
  const [state, setState] = React.useState({ id: "" });
  return (
    <div className="App">
      <AppContext.Provider value={{state, setState}}>
        <Container className="main-container">
          {state.id === "" ? <Login /> : <p>Logged in as {state.id}</p>}
        </Container>
      </AppContext.Provider>
    </div>
  );
}

export default App;