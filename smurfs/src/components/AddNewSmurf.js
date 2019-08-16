import React from 'react';
import axios from 'axios';
import { AppState } from '../contexts'

const SmurfForm = ({ dispatch }) => {
  const [name, setName] = React.useState('')
  const [age, setAge] = React.useState('')
  const [height, setHeight] = React.useState('')

  // Change handlers
  const nameChangeHandler = e => setName(e.target.value)
  const ageChangeHandler = e => setAge(e.target.value)
  const heightChangeHandler = e => setHeight(e.target.value)

  // Submit handler
  const submitHandler = e => {
    e.preventDefault()
    const newSmurf = {
      name: name,
      age: age,
      height: height
    }
    axios
      .post('http://localhost:3333/smurfs', newSmurf)
      .then(res => {
        console.log(res)
        dispatch({
          type: 'UPDATE_SMURFS',
          payload: res.data
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="add-new-smurf">
      <h2>Add New Smurf</h2>
      <form>
        <div className="field">
          <label htmlFor="name">Name </label>
          <input type="text"
            name="name"
            placeholder="Sally The Smurf"
            onChange={nameChangeHandler}
            value={name} />
        </div>
        <div className="field">
          <label htmlFor="age">Age </label>
          <input type="text"
            name="age"
            placeholder="33"
            onChange={ageChangeHandler}
            value={age} />
        </div>
        <div className="field">
          <label htmlFor="height">Height </label>
          <input type="text"
            name="height"
            placeholder="42cm"
            onChange={heightChangeHandler}
            value={height} />
        </div>
        <button type="submit" onClick={submitHandler}>Add Smurf!</button>
      </form>
    </div>
  )
}

export default function AddNewSmurf() {

  return (
    <AppState.Consumer>
      {appState => {
        return <SmurfForm dispatch={appState.dispatch} />
      }}
    </AppState.Consumer>
  )
}