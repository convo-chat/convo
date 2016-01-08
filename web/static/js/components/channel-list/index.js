// Import component styles
import "./styles.css"


// Import component deps
import React, {Component} from "react"
import ChannelLink from "js/components/channel-link"

class ChannelList extends Component {
    render() {
        return (
            <div className="channel-list">
                <h4 className="channel-list__h">Channels</h4>
                <ul className="nav channel-list__items">
                    {this.props.channels.map((channel, i) => {
                        return <ChannelLink key={i} name={channel} onClick={this.props.onClick}/>
                    })}
                </ul>
            </div>
        );
    }
}


export default ChannelList;
