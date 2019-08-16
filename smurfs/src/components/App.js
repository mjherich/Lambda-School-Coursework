import React, { Component } from "react";
import "./App.css";
import DisplaySmurfs from "./DisplaySmurfs";
import AddNewSmurf from "./AddNewSmurf";
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>SMURFS!</h1>
        <p style={{marginTop:'-20px'}}>Using Contexts and Custom Reducers</p>
        <AddNewSmurf />
        <DisplaySmurfs />
      </div>
    );
  }
}

export default App;
