// Import Styles
import 'normalize.css/normalize.css';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css';
import 'css/app.css';

// Import Dependencies
import 'phoenix_html/web/static/js/phoenix_html';
import PS from 'perfect-scrollbar';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// Services
import Auth from './services/auth';
import Socket from './socket';
// Components
import Login from 'js/components/login';
import Channel from 'js/components/channel';
import ChannelList from 'js/components/channel-list';
import UserList from 'js/components/user-list';
// Actions
import UserActions from 'js/actions/UserActions';
import ChannelActions from 'js/actions/ChannelActions';
import MessageActions from 'js/actions/MessageActions';
// Stores
import userStore from 'js/stores/userStore';
import channelStore from 'js/stores/channelStore';

class App extends Component {
  constructor() {
    super();
    this.state = this.getStateFromStore();
  }

  componentWillMount() {
    Socket.connect(Auth.getToken());
    ChannelActions.fetchChannels();
    ChannelActions.join();
    UserActions.fetchUsers();
    MessageActions.fetchMessages();
  }

  componentDidMount() {
    userStore.addListener(this.onChange);
    channelStore.addListener(this.onChange);
  }

  componentWillUnmount() {
    userStore.removeListener(this.onChange); 
    channelStore.removeListener(this.onChange); 
  }

  onChange = () => {
    this.setState(this.getStateFromStore());
    this.forceUpdate();
  }

  onClickUser = (user) => {}

  getStateFromStore() {
    return {
      channels: channelStore.getChannels(), 
      currentChannel: channelStore.getCurrentChannel(), 
      users: userStore.getUsers(),
      currentUser: userStore.getCurrentUser(),
      loggedIn: userStore.getLoggedIn(),
    };
  }

  render() {
    const { users, channels, currentChannel, currentUser } = this.state;

    return (
      <div className="grid">
          <aside className="sidebar">
            <header className="user">
              Hello, { currentUser.username }!
            </header>
            <h3 className="sidebar__h">Activity</h3>
            <ChannelList channels={ channels } currentChannel={ currentChannel } />
            <UserList users={ users } />
          </aside>
          { this.props.children }
      </div>
    );
  }
}

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

