import React, {Component} from "react"
import ReactDOM from "react-dom"

import Message from "js/components/message"

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
        return (
            <div className="message-list ps-scrollbar">
                {this.props.messages.map((message, i) => {
                    return <Message key={i} message={message}/>
                })}
            </div>
        );
    }
}

export default MessageList
