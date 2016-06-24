const Auth = {
  login: (token, callback) => {
    localStorage.token = token;
    if (callback) {
      callback();
    }
  },

  logout: (nextState, replace) => {
    delete localStorage.token;
    delete localStorage.user;
    replace('/login');
  },

  loggedIn: () => {
    return !!localStorage.token && localStorage.token !== 'undefined';
  },

  addUser: (user) => {
    return localStorage.user = JSON.stringify(user);
  },

  getUser: () => {
    return JSON.parse(localStorage.user);
  },

  getToken: () => {
    return localStorage.token;
  },

  protect: (nextState, replace) => {
    if (!Auth.loggedIn()) {
      replace('/login');
    }
  }
};

export default Auth;

