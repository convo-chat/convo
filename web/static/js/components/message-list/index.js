import React, {Component} from "react"

class Message extends Component {
    render() {
        return (
            <div>
                <p style={{width: "200px", display: "inline-block"}}>{this.props.message.text}</p>
                <time style={{width: "100px"}}>{this.props.message.date}</time>
            </div>
        );
    }
}


class MessageList extends Component {
    render() {
        return (
            <div>
                {this.props.messages.map((message, i) => {
                    return <Message key={i} message={message}/>
                })}
            </div>
        );
    }
}

export default MessageList
