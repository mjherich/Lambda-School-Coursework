import React from "react";
import axios from 'axios';
import App from "../components/App";

import { appStateReducer, initialState } from '../reducers'

// Store App state in universal context object
export const AppState = React.createContext();

export default function AppStateContainer() {
    const [state, dispatch] = React.useReducer(appStateReducer, initialState);
    React.useEffect(() => {
        dispatch({ type: 'GET_SMURFS_START' })
        axios
            .get('http://localhost:3333/smurfs')
            .then(res => {
                console.log('successfully fetched smurfs',res)
                dispatch({ type: 'GET_SMURFS_SUCCESS', payload: res.data })
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: 'GET_SMURFS_FAILURE' })
            })
    }, [])

    return (
        <AppState.Provider value={{ state: state, dispatch: dispatch }}>
            <App />
        </AppState.Provider>
    )
}