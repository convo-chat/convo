import React, { Component } from 'react';
import messageStore from 'js/stores/messageStore';
import channelStore from 'js/stores/channelStore';
import MessageList from 'js/components/message-list';

class Channel extends Component {
  constructor() {
    super();
    this.state = this.getStateFromStore();
  }

  componentDidMount() {
    channelStore.addListener(this.onChange);
  }

  onChange = () => {
    this.setState(this.getStateFromStore());
  }

  getStateFromStore() {
    return {
      messages: messageStore.getMessages(),
    };
  }

  render() {
    const { messages } = this.state;
    return (
      <MessageList messages={ messages } />
    );
  }
}

export default Channel;

