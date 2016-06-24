// import module styles
import './styles.css';

// Import Component deps
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socket from 'js/socket';
// Child components
import ChannelList from 'js/components/channel-list';
import UserList from 'js/components/user-list';
import MessageList from 'js/components/message-list';
import MessageForm from 'js/components/message-form';
// Actions
import UserActions from 'js/actions/UserActions';
import ChannelActions from 'js/actions/ChannelActions';
// Stores
import userStore from 'js/stores/userStore';
import channelStore from 'js/stores/channelStore';

class App extends Component {
  constructor() {
    super();
    this.state = this.getStateFromStore();
  }

  componentDidMount() {
    userStore.addListener(this.onChange);
    channelStore.addListener(this.onChange);
  }

  onChange = () => {
    this.setState(this.getStateFromStore());
  }

  onClickChannel = (channelName) => {
    const { currentUser } = this.state;
    ChannelActions.join(`channel:${channelName}`, channel => {
      channel.push({
        id: Date.now(),
        user: 'ConvoBot',
        text: `@${currentUser.username} joined!`, 
        date: (new Date()).toLocaleTimeString()
      });
    });
  }

  onClickUser = (user) => {
  }

  onSubmitMessage = (message) => {
    const { currentUser } = this.state;
    message.user = currentUser;
    ChannelActions.messageNew(message);
  }

  getStateFromStore() {
    return {
      currentChannel: channelStore.currentChannel(), 
      channels: channelStore.getChannels(), 
      currentUser: userStore.getCurrentUser(),
      users: userStore.getUsers(),
      loggedIn: userStore.getLoggedIn(),
    };
  }

  render() {
    const { users, channels } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <aside className="col-sm-3 col-md-2 sidebar">
            <h3 className="sidebar__h">Activity</h3>
            <ChannelList
              channels={ channels }
              onClick={ this.onClickChannel } />
            <UserList
              users={ users }
              onClick={ this.onClickUser } />
          </aside>
          <main className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            { this.props.children }
            <MessageForm
              onSubmit={ this.onSubmitMessage } />
          </main>
        </div>
      </div>
    );
  }
}

export default App;

