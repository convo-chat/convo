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
        }

        // e.preventDefault();
    }

    render() {
        return (
            <input type="text" onKeyPress={this.onKeyPress} className="form-control"/>
        );
    }

}


export default MessageForm
