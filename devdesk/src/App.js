import React from "react";
import { Route, Redirect } from "react-router-dom";
import './App.css';

import Header from "./components/Header/Header";
import Signup from "./components/UserOnboarding/Signup";
import Login from "./components/UserOnboarding/Login";
import StudentDashboard from "./components/Student/StudentDashboard";
import HelperDashboard from "./components/Helper/HelperDashboard";
import AddTicket from './components/Student/AddTicket';

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" render={() => 
          <>
            <Redirect to="/login/" />
          </>
        }
      />
      <Route path="/signup/" render={(props) => <Signup {...props} />} />
      <Route path="/login/" render={(props) => <Login {...props} />} />
      <Route path="/student-dashboard/" render={(props) => <StudentDashboard {...props} />} />
      <Route path="/helper-dashboard/" render={(props) => <HelperDashboard {...props} />} />
      <Route path="/add-ticket" render={(props) => <AddTicket {...props} />} />
    </div>
  );
}

export default App;
