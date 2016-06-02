// Import component dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from 'js/components/message';

class MessageList extends Component {
  componentDidMount() {
    this.scrollBottom();
  }

  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    const isBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    this.shouldScrollBottom = isBottom || node.scrollTop === 0;
  }

  componentDidUpdate() {
    this.scrollBottom();
  }

  scrollBottom() {
    if (this.shouldScrollBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="message-list ps-scrollbar">
        { messages.map(message => <Message key={ message.id } message={ message }/>) }
      </div>
    );
  }
}

export default MessageList;
