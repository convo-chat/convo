import React, { Component } from 'react';
import UserActions from 'js/actions/UserActions';

class Login extends Component {
  onSubmit = (ev) => {
    ev.preventDefault();
    const { email, password } = this.refs;
    UserActions.login(email.value, password.value);
  }

  render() {
    return (
      <div style={ Style.userLogin } className="user-login center-block well">
        <form className="form" onSubmit={ this.onSubmit }>
          <h3 className="form__legend">Login</h3>
          <div className="form__group">
            <input ref="email" type="email" className="form-control"/>
          </div>
          <div className="form__group">
            <input ref="password" type="password" className="form-control"/>
          </div>
          <div className="form__group form__actions">
            <button type="submit" className="button button--primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

const Style = {
  userLogin: {
    margin: "30px auto",
    width: "400px"
  }
};

export default Login;

