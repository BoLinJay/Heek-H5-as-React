import React from 'react';
import ReactDOM from 'react-dom/client';
import '@scss/index.scss'
import store from '@store/index'
import App from './App';
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
