import React from 'react';
import axios from 'axios';

export default function Smurf({ smurf, dispatch }) {
  const removeSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        console.log(`successfully removed smurf ${id}. Got: `, res.data)
        dispatch({ type: 'REMOVE_SMURF', payload: res.data })
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: 'GET_SMURFS_FAILURE' })
      })
    // dispatch({ type: 'REMOVE_SMURF', payload: id })
  }
  return (
    <div className="smurf">
      <h3>{smurf.name}</h3>
      <p>Age: {smurf.age}</p>
      <p>Height: {smurf.height}</p>
      <button onClick={() => removeSmurf(smurf.id)}>Remove Smurf</button>
    </div>
  )
}