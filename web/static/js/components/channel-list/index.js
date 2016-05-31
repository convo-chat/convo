// Import component styles
import "./styles.css"

// Import component deps
import React, { Component } from "react";
import ChannelLink from "js/components/channel-link";

class ChannelList extends Component {
    render() {
        const { channels, onClick } = this.props;
        return (
            <div className="channel-list">
                <h4 className="channel-list__h">Channels</h4>
                <ul className="nav channel-list__items">
                    { channels.map((channel, i) => {
                        return <ChannelLink key={ i } name={ channel } onClick={ onClick }/>
                    }) }
                </ul>
            </div>
        );
    }
}

export default ChannelList;