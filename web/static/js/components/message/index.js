// Import component styles
import "./styles.css"

// Import component deps
import React, {Component} from "react"

class Message extends Component {
    render() {
        return (
            <div className="message">
                <p className="message__text">{this.props.message.text}</p>
                <time className="message__timestamp">{this.props.message.date}</time>
            </div>
        );
    }
}

export default Message
