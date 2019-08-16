import React from 'react';
import { AppState } from '../contexts'
import Smurf from './Smurf';

export default function DisplaySmurfs() {

  return (
    <div className="display-smurfs">
      <h2>Smurfs in DB:</h2>
      <AppState.Consumer>
        {appState => {
          console.log('appState in component', appState)
          if (appState.state.smurfs.length < 1) {
            return <p>Loading Smurfs...</p>
          } else {
            return appState.state.smurfs.map(smurf => {
              return <Smurf key={smurf.id} smurf={smurf} dispatch={appState.dispatch} />
            })
          }
        }}
      </AppState.Consumer>
    </div>
  )
}