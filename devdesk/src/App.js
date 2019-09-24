import React, { useState } from 'react';
import { Route } from "react-router-dom";
import './App.css';

import Signup from "./components/UserOnboarding/Signup";
import Login from "./components/UserOnboarding/Login";
import StudentDashboard from "./components/Student/StudentDashboard";

function App() {

  return (
    <div className="App">
      <Route exact path="/" render={() =>
        <>
          <div>Homepage</div>
        </>
      }
      />
      <Route path="/signup/" render={(props) => <Signup {...props} />} />
      <Route path="/login/" render={(props) => <Login {...props} />} />
      <Route path="/student-dashboard" render={() => <StudentDashboard />} />
    </div>
  );
}

export default App;
