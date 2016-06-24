// Import component styles
import './channel-link.css';

// Import component deps
import React, { Component } from 'react';
import { Link } from 'react-router';

class ChannelLink extends Component {
  render() {
    const { name } = this.props;
    return (
      <li className="channel-link">
        <Link className="channel-link__name" to={`/channel/${name}`}>{ name }</Link>
      </li>
    );
  }
}

export default ChannelLink;