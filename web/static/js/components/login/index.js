import React, { Component } from 'react';
import UserActions from 'js/actions/UserActions';

class Login extends Component {
  handleSubmit = (ev) => {
    ev.preventDefault();
    const { email, password } = this.refs;
    UserActions.login({ email: email.value, password: password.value })
    email.value = null;
    password.value = null;
  }

  render() {
    return (
      <div style={ Style.userLogin } className="user-login center-block well">
        <form className="login-form" onSubmit={ this.handleSubmit }>
          <h3 className="login-form__legend">Login</h3>
          <div className="form-group">
            <input ref="email" type="email" className="form-control"/>
          </div>
          <div className="form-group">
            <input ref="password" type="password" className="form-control"/>
          </div>
          <div className="form-group buttons">
            <button type="submit" className="btn btn-primary">Login</button>
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

