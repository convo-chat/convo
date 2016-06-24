import React, { Component } from 'react';
// Services
import Auth from 'js/services/auth';
// Components
import MessageList from 'js/components/message-list';
import MessageForm from 'js/components/message-form';
// Actions
import ChannelActions from 'js/actions/ChannelActions';
// Stores
import messageStore from 'js/stores/messageStore';
import channelStore from 'js/stores/channelStore';
import userStore from 'js/stores/userStore';

class Channel extends Component {
  constructor() {
    super();
    this.state = this.getStateFromStore();
  }

  componentDidMount() {
    channelStore.addListener(this.onChange);
    messageStore.addListener(this.onChange);
    userStore.addListener(this.onChange);
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.params;
    ChannelActions.join(id);
  }

  onChange = () => {
    this.setState(this.getStateFromStore());
  }

  onSubmit = (message) => {
    const { currentUser, currentChannel } = this.state;
    message.user = currentUser;
    ChannelActions.messageNew(currentChannel, message);
  }

  getStateFromStore() {
    const currentChannel = channelStore.currentChannel();

    return {
      currentChannel: currentChannel,
      messages: messageStore.getMessages(currentChannel),
      currentUser: userStore.getCurrentUser(),
    };
  }

  render() {
    const { messages } = this.state;
    return (
      <main className="content">
        <MessageList messages={ messages } />
        <MessageForm onSubmit={ this.onSubmit } />
      </main>
    );
  }
}

export default Channel;

