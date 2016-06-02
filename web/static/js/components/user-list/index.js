// Import component dependencies
import React, { Component } from 'react';
import UserLink from 'js/components/user-link';

class UserList extends Component {
  render() {
    const { users, onClick } = this.props;
    return (
      <div className="user-list">
        <h4 className="user-list__h">Direct Messages</h4>
        <ul className="nav">
          { users.map(user => {
            return <UserLink key={ user.id } user={ user } onClick={ onClick } />
          })}
        </ul>
      </div>
    );
  }
}

export default UserList;
