import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { qrReducer } from './reducers';

import App from './App';

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

// Create store
export const store = createStore(qrReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
