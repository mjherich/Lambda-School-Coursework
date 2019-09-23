import React, { useState } from 'react';
import './App.css';
import Signup from "./components/UserOnboarding/Signup";

function App() {
  const initialSignupValues = {
    username: "",
    password: "",
    userType: "",
  };

  const [signupValues, setSignupValues] = useState(initialSignupValues);

  return (
    <div className="App">
      <Signup signupValues={signupValues}/>
    </div>
  );
}

export default App;
