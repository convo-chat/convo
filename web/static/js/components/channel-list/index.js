import React, {Component} from "react"

let ChannelLink = React.createClass({
    handleClick: function() {
        this.props.onClick(this.props.name);
    },
    render: function() {
        return (
            <div className="channel">
                <a className="channel__room" onClick={this.handleClick}>{this.props.name}</a>
            </div>
        );
    }
});

class ChannelList extends Component {
    render() {
        return (
            <div className="channel-list">
                {this.props.channels.map((channel, i) => {
                    return <ChannelLink key={i} name={channel} onClick={this.props.onClick}/>
                })}
            </div>
        );
    }
}


export default ChannelList;
