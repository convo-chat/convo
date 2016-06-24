// Import component dependencies
import React, { Component } from 'react';
import UserLink from 'js/components/user-link';

class UserList extends Component {
  render() {
    const { users, onClick } = this.props;
    return (
      <div className="list">
        <h5 className="list__heading">Direct Messages</h5>
        <ul className="list__items">
          { users.map(user => {
            return <UserLink key={ user.id } user={ user } onClick={ onClick } />
          })}
        </ul>
      </div>
    );
  }
}

export default UserList;
