import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  ADD_START,
  ADD_SUCCESS,
  ADD_FAIL,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAIL,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from '../actions';

const initialState = {
  isLoggingIn: false,
  error: null,
  fetching: false,
  deletingTab: false,
  updatingTab: false,
  tabs: [
    {
      description: 'This is a dummy description',
      title: 'This is a dummy Title',
      icon: 'TEST',
      url: 'www.google.com'
    },
    {
      description: 'This is a fake',
      title: 'This is ANOTHER dummy Title',
      icon: 'TESTING',
      url: 'www.googles.com'
    }
  ],
  addingTab: false
};

const rootReducer = (state = initialState, action) => {
  console.log('reducer', action);
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state,
        error: '',
        isLoggingIn: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: '',
        isLoggingIn: false
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoggingIn: false
      };
    case LOGIN_START:
      return {
        ...state,
        error: null,
        isLoggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        isLoggingIn: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoggingIn: false
      };
    case FETCH_START:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        tabs: action.payload
      };
    case FETCH_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    case ADD_START:
      return {
        ...state,
        addingTab: true,
        error: null
      };
    case ADD_SUCCESS:
      return {
        ...state,
        addingTab: false,
        error: null,
        tabs: action.payload
      };
    case ADD_FAIL:
      return {
        ...state,
        addingTab: false,
        error: action.payload
      };
    case DELETE_START:
      return {
        ...state,
        deletingTab: true,
        error: null
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        deletingTab: false,
        error: null,
        tabs: action.payload
      };
    case DELETE_FAIL:
      return {
        ...state,
        deletingTab: false,
        error: action.payload
      };
    case UPDATE_START:
      return {
        ...state,
        updatingTab: true,
        error: null
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        updatingTab: false,
        error: null,
        tabs: action.payload
      };
    case UPDATE_FAIL:
      return {
        ...state,
        updatingTab: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
