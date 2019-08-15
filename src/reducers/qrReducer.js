const initialState = {
  str: 'iniital state',
  generatedCodes: []
}

export const qrReducer = ( state = initialState, action ) => {
  switch (action.type) {
    default:
      return { ...state }
  }
}