import React, {Component} from "react"

import UserLink from "js/components/user-link"

class UserList extends Component {

    render() {
        return (
            <div className="user-list">
                <h4 className="user-list__h">Direct Messages</h4>
                <ul className="nav">
                    {this.props.users.map((user, i) => {
                        return <UserLink key={i} user={user} onClick={this.props.onClick}/>
                    })}
                </ul>
            </div>
        );
    }

}

export default UserList
