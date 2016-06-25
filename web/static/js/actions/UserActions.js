import { browserHistory } from 'react-router';
import AppDispatcher from  'js/dispatcher';
import Auth from 'js/services/auth';

const UserActions = {
  login: (email, password) => {
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email, password: password}),
    })
    .then(resp => resp.json())
    .then((json) => {
      UserActions.storeToken(json.token);
      UserActions.addUser(json.user);
      browserHistory.replace('/');
    })
    .catch(err => console.log(err));

    AppDispatcher.dispatch({
      type: 'USER_LOGIN',
      payload: {
        email,
        password,
      },
    });
  },

  addUser: (user) => {
    Auth.addUser(user);
    AppDispatcher.dispatch({
      type: 'USER_ADD',
      payload: {
        user,
      }
    });
  },

  addUsers: (users) => {
    AppDispatcher.dispatch({
      type: 'USERS_ADD',
      payload: {
        users,
      }
    });
  },

  storeToken: (token) => {
    Auth.login(token);
    AppDispatcher.dispatch({
      type: 'USER_ADD_TOKEN',
      payload: {
        loggedIn: true,
        token,
      },
    });
  },

  getUser: () => {
    fetch(`http://localhost:4000/api/users/${Auth.getUser().id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    })
    .then(resp => resp.json())
    .then(json => UserActions.addUser(json.user))
    .catch(err => console.log(err));
  },

  fetchUsers: () => {
    fetch("http://localhost:4000/api/users", {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    })
    .then(resp => resp.json())
    .then(json => UserActions.addUsers(json.data))
    .catch(err => console.log(err));
  },
};

export default UserActions;
