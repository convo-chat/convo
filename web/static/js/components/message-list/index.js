import React, {Component} from "react"

import Message from "js/components/message"

class MessageList extends Component {
    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, i) => {
                    return <Message key={i} message={message}/>
                })}
            </div>
        );
    }
}

export default MessageList
