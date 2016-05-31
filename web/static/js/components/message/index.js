// Import component styles
import "./styles.css";

// Import component deps
import React, { Component } from "react";

class Message extends Component {
    render() {
        const { user, date, text } = this.props.message;
        return (
            <div className="message">
                <span className="message__user">{ user }</span>
                <time className="message__ts">{ date }</time>
                <p className="message__text">{ text }</p>
            </div>
        );
    }
}

export default Message;