// Import component deps
import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class ChannelLink extends Component {
  render() {
    const { name, active } = this.props;
    const className = classNames({
      'list__item': true,
      'list__item--active': active,
    });
    return (
      <li className={ className }>
        <Link className="list__link" to={`/channel/${name}`}># { name }</Link>
      </li>
    );
  }
}

export default ChannelLink;

