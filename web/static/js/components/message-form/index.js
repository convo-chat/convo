// Import component styles
import './message-form.css';

// Import components deps
import React, { Component } from 'react';

class MessageForm extends Component {
  onKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      const { message } = this.refs;
      this.props.onSubmit({ text: message.value.trim() });
      message.value = "";
      ev.preventDefault();
    }
  }

  render() {
    return (
      <div className="message-form">
        <textarea
          onKeyPress={ this.onKeyPress }
          ref="message"
          className="message-form__input"
        />
      </div>
    );
  }
}

export default MessageForm;
