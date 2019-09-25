import React from "react";
import { Route } from "react-router-dom";
import './App.css';

import Header from "./components/Header/Header";
import Signup from "./components/UserOnboarding/Signup";
import Login from "./components/UserOnboarding/Login";
import StudentDashboard from "./components/Student/StudentDashboard";

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" render={() => 
          <>
            <div>Homepage</div>
          </>
        }
      />
      <Route path="/signup/" render={(props) => <Signup {...props} />} />
      <Route path="/login/" render={(props) => <Login {...props} />} />
      <Route path="/student-dashboard/" render={(props) => <StudentDashboard {...props}/>} />
    </div>
  );
}

export default App;
