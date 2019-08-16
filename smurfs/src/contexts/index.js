import React from "react";
import axios from 'axios';
import App from "../components/App";

// Store App state in universal context object
export const AppState = React.createContext();

export default function AppStateContainer() {
    const [smurfs, setSmurfs] = React.useState(['test']);
    React.useEffect(() => {
        axios
            .get('/smurfs')
            .then(res => {
                console.log('successfully fetched smurfs',res)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <AppState.Provider value={{ smurfs: smurfs, setSmurfs: setSmurfs }}>
            <App />
        </AppState.Provider>
    )
}