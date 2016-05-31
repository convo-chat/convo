// Import component styles
import './channel-link.css';

// Import component deps
import React, { Component } from 'react';

class ChannelLink extends Component {
    onClick = (ev) => {
        ev.preventDefault();
        const { onClick, name } = this.props;
        onClick(name);
    }

    render() {
        const { name } = this.props;
        return (
            <li className="channel-link">
                <a className="channel-link__name" href="#" onClick={this.onClick}>{ name }</a>
            </li>
        );
    }
}

export default ChannelLink;