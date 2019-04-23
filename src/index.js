import React from 'react';
import ReactDOM from 'react-dom';
import firebase, { app } from 'firebase/app';
import '../src/all.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import './index.css';
// import App from './App';
import ReportsTable from './components/ReportsTable'
import * as serviceWorker from './serviceWorker';
import config from './config/configKey'
import App from './App';

// firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
