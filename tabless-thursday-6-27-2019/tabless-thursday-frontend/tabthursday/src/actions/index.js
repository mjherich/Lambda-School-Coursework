import axiosWithAuth from '../utils/axiosWithAuth';

export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

export const ADD_START = 'ADD_START';
export const ADD_SUCCESS = 'ADD_SUCCESS';
export const ADD_FAIL = 'ADD_FAIL';

export const DELETE_START = 'DELETE_START';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAIL = 'DELETE_FAIL';

export const UPDATE_START = 'UPDATE_START';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAIL = 'UPDATE_FAIL';

export const SEARCH = 'SEARCH';

//SIGN UP
export const signUp = creds => dispatch => {
  dispatch({ type: SIGNUP_START });
  return axiosWithAuth()
    .post('/api/register', creds) //endpoint?
    .then(res => {
      dispatch({ type: SIGNUP_SUCCESS, payload: creds.email });
      return true;
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SIGNUP_FAIL });
    });
};

//LOGIN
export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axiosWithAuth()
    .post('/api/login', creds) //endpoint?
    .then(res => {
      localStorage.setItem('token', res.data.token);
      dispatch({ type: LOGIN_SUCCESS });
      return true;
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: LOGIN_FAIL, payload: err.response });
    });
};

//GET
export const getData = () => dispatch => {
  dispatch({ type: FETCH_START });
  axiosWithAuth()
    .get('/tabs') //get endpoint here
    .then(res => {
      dispatch({ type: FETCH_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCH_FAIL, payload: err.response });
    });
};

//POST
export const addTab = tab => dispatch => {
  console.log('from action', tab);
  dispatch({ type: ADD_START });
  return axiosWithAuth()
    .post('/tabs', tab) //Post Endpoint
    .then(res => {
      dispatch({ type: ADD_SUCCESS, payload: res.data });
      return true;
    })
    .catch(err => {
      console.log('addFail', err.response);
      dispatch({ type: ADD_FAIL, payload: err.response });
    });
};

//DELETE
export const deleteTab = id => dispatch => {
  dispatch({ type: DELETE_START });
  return axiosWithAuth()
    .delete(`/tabs/${id}`) //Delete endpoint
    .then(res => {
      dispatch({ type: DELETE_SUCCESS, payload: res.data });
      return true;
    })
    .catch(err => {
      console.log('delete error', err.response);
      dispatch({ type: DELETE_FAIL, payload: err.response });
    });
};

//PUT
export const updateTab = tab => dispatch => {
  dispatch({ type: UPDATE_START });
  return axiosWithAuth()
    .put(`/tabs/${tab.id}`, tab) //PUT ENDPOINT
    .then(res => {
      dispatch({ type: UPDATE_SUCCESS, payload: res.data });
      return true;
    })
    .catch(err => {
      console.log('update error', err.response);
      dispatch({ type: UPDATE_FAIL, payload: err.response });
    });
};

// SEARCH
export const searchTabs = filteredTabs => {
  return {
    type: SEARCH,
    payload: filteredTabs
  };
};
