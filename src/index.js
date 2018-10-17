import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './util/init';
import { HistoryBrowserRouter } from './util/com';
import { Provider } from 'react-redux';
import {store} from './util/core';

//import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider store={store}><HistoryBrowserRouter><App /></HistoryBrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
