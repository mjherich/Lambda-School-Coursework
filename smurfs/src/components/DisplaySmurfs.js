import React from 'react';
import { AppState } from '../contexts'

export default function DisplaySmurfs() {

    return (
        <div className="display-smurfs">
            <h2>Display Smurfs from DB here</h2>
            <AppState.Consumer>
                {value => {
                    return <p>{value.smurfs[0]}</p>
                }}
            </AppState.Consumer>
        </div>
    )
}