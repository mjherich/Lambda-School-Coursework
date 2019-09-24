import React, { useState } from 'react';
import {Route, Link} from "react-router-dom";
import './App.css';

import Signup from "./components/UserOnboarding/Signup";
import Login from "./components/UserOnboarding/Login";
import StudentDashboard from "./components/Student/StudentDashboard";

function App() {
  const initialSignupValues = {
    username: "",
    password: "",
    userType: "",
  };

  const [signupValues, setSignupValues] = useState(initialSignupValues);

  return (
    <div className="App">
      <Route exact path="/" render={() => 
          <>
            <div>Homepage</div><br/>
            <Link to="/signup/">Signup</Link><br/>
            <Link to="/login/">Login</Link>
          </>
        }
      />
      <Route path="/signup/" render={(props) => <Signup {...props} signupValues={signupValues} />} />
      <Route path="/login/" render={(props) => <Login {...props} />} />
      <Route path="/student-dashboard" render={() => <StudentDashboard {...props}/>} />
    </div>
  );
}

export default App;
