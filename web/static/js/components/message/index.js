// Import component styles
import './message.css';

// Import component deps
import React, { Component } from 'react';

class Message extends Component {
  render() {
    const { user, ts, text } = this.props.message;
    return (
      <div className="message">
        <span className="message__user">{ user.username }</span>
        <time className="message__ts">{ ts }</time>
        <p className="message__text">{ text }</p>
      </div>
    );
  }
}

export default Message;
