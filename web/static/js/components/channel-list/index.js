// Import component styles
import './channel-list.css';

// Import component deps
import React, { Component } from 'react';
import ChannelLink from 'js/components/channel-link';

class ChannelList extends Component {
  render() {
    const { channels } = this.props;
    return (
      <div className="channel-list">
        <h4 className="channel-list__h">Channels</h4>
        <ul className="nav channel-list__items">
          { channels.map(channel => {
            return <ChannelLink key={ channel.id } name={ channel.name } />
          }) }
        </ul>
      </div>
    );
  }
}

export default ChannelList;
