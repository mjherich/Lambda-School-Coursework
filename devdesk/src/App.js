import React from "react";
import { Route, Redirect } from "react-router-dom";
import './App.css';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from "./components/Header/Header";
import Signup from "./components/UserOnboarding/Signup";
import Login from "./components/UserOnboarding/Login";
import StudentDashboard from "./components/Student/StudentDashboard";
import HelperDashboard from "./components/Helper/HelperDashboard";
import AddTicket from './components/Student/AddTicket';
import DynamicTicket from './components/Ticket/DynamicTicket';
import AnswerTicket from './components/Helper/AnswerTicket';

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
      <PrivateRoute path="/student-dashboard/" component={StudentDashboard} />
      <PrivateRoute path="/helper-dashboard/" component={HelperDashboard} />
      <PrivateRoute path="/add-ticket" component={AddTicket} />
      <PrivateRoute path='/ticket/:id' component={DynamicTicket} />
      <PrivateRoute path='/answer-ticket/:id' component={AnswerTicket} />
    </div>
  );
}

export default App;
