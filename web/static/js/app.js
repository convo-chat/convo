// Import Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css';
import 'css/app.css';

// Import Dependencies
import 'phoenix_html/web/static/js/phoenix_html';
import PS from 'perfect-scrollbar';
import socket from './socket';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app';
import Login from './components/login';

ReactDOM.render(<Router history={ browserHistory }>
	<Route path="channel" component={ App } />
	<Route path="/login" component={ Login } />
	<Route path="*" component={ Login } />
</Router>, document.getElementById('app'));

const scrollBar = document.querySelector('.ps-scrollbar');
if (scrollBar) {
	PS.initialize(scrollBar);
}