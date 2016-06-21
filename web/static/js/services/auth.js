const Auth = {
  login: (user, callback) => {
    localStorage.token = user.token;
    localStorage.user = user;
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
    return localStorage.user = user;
  },

  getUser: () => {
    return localStorage.user;
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

