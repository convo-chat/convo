import React, {Component} from "react"

class UserLink extends Component {

    onClick = (e) => {
        this.props.onClick(this.props.user);
    }

    render() {
        return (
            <li className="user-link">
                <a href="#" onClick={this.onClick}>
                    {this.props.user.name}
                </a>
            </li>
        );
    }
}

export default UserLink
