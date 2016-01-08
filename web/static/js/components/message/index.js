// Import component styles
import "./styles.css"

// Import component deps
import React, {Component} from "react"

class Message extends Component {
    render() {
        return (
            <div className="message">
                <p className="message__user">{this.props.message.user}</p>
                <time className="message__ts">{this.props.message.date}</time>
                <p className="message__text">{this.props.message.text}</p>
            </div>
        );
    }
}

export default Message
