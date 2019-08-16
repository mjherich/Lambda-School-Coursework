import { AppState } from '../contexts'

export const initialState = {
    isLoading: false,
    smurfs: []
}
  
export const appStateReducer = (state, action) => {
    switch (action.type) {
        case 'GET_SMURFS_START':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_SMURFS_SUCCESS':
            return {
                isLoading: false,
                smurfs: action.payload
            }
        case 'GET_SMURFS_FAILURE':
            return {
                ...state,
                isLoading: false
            }
        case 'ADD_SMURF':
            return {
                ...state
            }
        case 'REMOVE_SMURF':
            return {
                ...state
            }
        default:
        return state;
    }
};

// ADD onClick to "Update Title" button
// Dispatch a new action
// type: "UPDATE_TITLE"
// payload: new text for the tile

// Write a case for "UPDATE_TITLE"
// update the title property in state
