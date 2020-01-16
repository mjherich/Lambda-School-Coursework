import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';

import AppContext from './state/AppContext'
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';

function App() {
  const [state, setState] = React.useState({ id: "" });
  return (
    <div className="App">
      <AppContext.Provider value={{state, setState}}>
        <Container className="main-container">
          {state.id === "" ?
            <Login />
            :
            <UserDashboard />
          }
        </Container>
      </AppContext.Provider>
    </div>
  );
}

export default App;