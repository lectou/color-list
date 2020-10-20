import React from 'react';
import ReactDOM from 'react-dom';
import './scss/app.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import {HashRouter, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <BrowserRouter basename={process.eny.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

