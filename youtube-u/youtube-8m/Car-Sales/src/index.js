import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { carStateReducer } from './reducers';

import 'bulma/css/bulma.css';
import './styles.scss';

const middleware = applyMiddleware(thunk, logger)

export const store = createStore(carStateReducer, compose(
  middleware,
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  rootElement
);