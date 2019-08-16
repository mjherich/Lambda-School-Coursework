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
    case 'UPDATE_SMURFS':
      console.log('updating smurfs')
      return {
        ...state,
        smurfs: action.payload
      }
    case 'REMOVE_SMURF':
      console.log('removing smurf with id: ', action.payload)
      return {
        ...state,
        smurfs: action.payload
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
