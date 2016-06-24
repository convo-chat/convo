import React, { Component } from 'react';

class UserLink extends Component {
  onClick = (ev) => {
    ev.preventDefault();
    const { user, onClick } = this.props;
    onClick(user);
  }

  render() {
    const { user } = this.props;
    return (
      <li className="list__item">
        <a href="#" onClick={ this.onClick }>{ user.name }</a>
      </li>
    );
  }
}

export default UserLink;
