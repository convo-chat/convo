// Import component styles
import "./styles.css"

// Import components deps
import React, {Component} from "react"

class MessageForm extends Component {

    constructor(props) {
        super(props);
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            let text = e.target.value.trim();
            let date = (new Date()).toLocaleTimeString();
            e.target.value = "";

            this.props.onSubmit({text: text, date: date});
            e.preventDefault();
        }
    }

    render() {
        return (
            <div className="message-form">
                <textarea onKeyPress={this.onKeyPress} className="form-control"></textarea>
            </div>
        );
    }

}


export default MessageForm
