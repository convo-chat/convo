// Import component styles
import './message-form.css';

// Import components deps
import React, { Component } from 'react';

class MessageForm extends Component {
  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      const text = e.target.value.trim();
      const date = (new Date()).toLocaleTimeString();
      const id = Date.now();
      e.target.value = "";
      this.props.onSubmit({ id: id, text: text, date: date });
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className="message-form">
        <textarea
          onKeyPress={ this.onKeyPress }
          className="message-form__input"
        />
      </div>
    );
  }
}

export default MessageForm;
