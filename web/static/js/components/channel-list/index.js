// Import component styles
import "./styles.css"


// Import component deps
import React, {Component} from "react"
import ChannelLink from "js/components/channel-link"

class ChannelList extends Component {
    render() {
        return (
            <ul className="nav channel-list">
                {this.props.channels.map((channel, i) => {
                    return <ChannelLink key={i} name={channel} onClick={this.props.onClick}/>
                })}
            </ul>
        );
    }
}


export default ChannelList;
