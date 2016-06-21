import { browserHistory } from 'react-router';
import AppDispatcher from  'js/dispatcher';
import Auth from 'js/services/auth';

const UserActions = {
  login: (user) => {
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...user})
    })
    .then((resp) => {
      return resp.json();
    })
    .then((json) => {
        UserActions.storeToken(json.token);
        UserActions.addUser(json.user);
        browserHistory.replace('/');
    })
    .catch((err, msg) => {
      console.log(err);
    });

    AppDispatcher.dispatch({
      type: 'USER_LOGIN',
      ...user
    });
  },

  addUser: (user) => {
    Auth.addUser(user);
    AppDispatcher.dispatch({
      type: 'USER_ADD',
      user,
    });
  },

  storeToken: (token) => {
    Auth.login(token);
    AppDispatcher.dispatch({
      type: 'USER_ADD_TOKEN',
      loggedIn: true,
      token,
    });
  },

  getUser: () => {
    fetch(`http://localhost:4000/api/users/${Auth.getUser().id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    })
    .then((resp) => {
      return resp.json();
    })
    .then((json) => {
        UserActions.addUser(json.user);
    })
    .catch((err, msg) => {
      console.log(err);
    });
  }
};

export default UserActions;

