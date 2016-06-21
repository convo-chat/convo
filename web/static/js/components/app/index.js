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
import messageStore from 'js/stores/messageStore';


class App extends Component {
  constructor() {
    super();
    this.state = this.getStateFromStore();
  }

  componentDidMount() {
    const { currentUser, currentChannel } = this.state;
    if (!currentChannel && currentUser) {
      ChannelActions.join('room:general', {
        id: Date.now(),
        user: "ConvoBot",
        text: `@${currentUser.name} joined!`, 
        date: (new Date()).toLocaleTimeString()
      });
      // registerCallbacks(this.state.channel);
    }
    userStore.addListener(this.onChange);
    channelStore.addListener(this.onChange);
  }

  onChange = () => {
    this.setState(this.getStateFromStore());
  }

  onClickChannel = (channelName) => {
    const { currentUser } = this.state;
    ChannelActions.join(`rooms:${channelName}`, {
      id: Date.now(),
      user: 'ConvoBot',
      text: `@${currentUser.username} joined!`, 
      date: (new Date()).toLocaleTimeString()
    });

    // this.state.channel.leave();
    // this.setState({ activeRoom: room, messages: [], channel: channel });
    // registerCallbacks(channel);
  }

  onClickUser = (user) => {
    // UserActions.directMessage();

    /*
    const channel = socket.channel("private:general");
    channel.join();
    channel.push("handshake", {user_id: user.id})
      .receive("ok", ({id}) => {
        console.log("handshake success!");
        let channel = socket.channel("private:" + id);
        this.setState({activeRoom: id, messages: [], channel: channel});
        this.configureChannel(channel);
      });
    */
  }

  onSubmitMessage = (message) => {
    const { currentUser } = this.state;
    ChannelActions.messageNew(currentUser, message);
  }

  getStateFromStore() {
    return {
      currentChannel: channelStore.getCurrentChannel(), 
      channels: channelStore.getChannels(), 
      currentUser: userStore.getCurrentUser(),
      users: userStore.getUsers(),
      loggedIn: userStore.getLoggedIn(),
      messages: messageStore.getMessages(),
    };
  }

  render() {
    const { users, messages, channels } = this.state;
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
            <MessageList
              messages={ messages } />
            <MessageForm
              onSubmit={ this.onSubmitMessage } />
          </main>
        </div>
      </div>
    );
  }
}

export default App;

