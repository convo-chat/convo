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
import Auth from './services/auth';
import App from './components/app';
import Login from './components/login';
import Channel from './components/channel';
import ChannelActions from './actions/ChannelActions';

ChannelActions.join();

const Routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ App } onEnter={ Auth.protect }>
      <Route path="channel">
        <Route path=":id" component={ Channel } />
      </Route>
    </Route>
    <Route path="login" component={ Login } />
    <Route path="logout" onEnter={ Auth.logout } />
    <Route path="*" component={ Login } />
  </Router>
);

ReactDOM.render(Routes, document.getElementById('app'));

const scrollBar = document.querySelector('.ps-scrollbar');
if (scrollBar) {
  PS.initialize(scrollBar);
}

