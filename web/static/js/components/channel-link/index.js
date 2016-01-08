// Import component styles
import "./styles.css"

// Import component deps
import React, {Component} from "react"

class ChannelLink extends Component {

    onClick = (e) => {
        this.props.onClick(this.props.name);
    }

    render() {
        return (
            <li className="channel-link">
                <a className="channel-link__name" href="#" onClick={this.onClick}>{this.props.name}</a>
            </li>
        );
    }

}

export default ChannelLink
