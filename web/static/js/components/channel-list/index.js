// Import component styles
import './channel-list.css';

// Import component deps
import React, { Component } from 'react';
import ChannelLink from 'js/components/channel-link';

class ChannelList extends Component {
  render() {
    const { channels, currentChannel } = this.props;
    return (
      <div className="list">
        <h5 className="list__heading">Channels</h5>
        <ul className="list__items">
          { channels.map(channel => {
            return <ChannelLink
              key={ channel.id }
              active={ currentChannel === channel.name }
              name={ channel.name }
            />
          }) }
        </ul>
      </div>
    );
  }
}

export default ChannelList;
