
const Auth = {

  login: (token, callback) => {
    localStorage.token = token;
    if (callback) {
      callback();
    }
  },

  logout: (callback) => {
    delete localStorage.token;
    if (callback) {
      callback();
    }
  },

  loggedIn: () => {
    return !!localStorage.token && localStorage.token !== 'undefined';
  },

  protect: (nextState, replace) => {
    if (!Auth.loggedIn()) {
      replace('/login');
    }
  }

};

export default Auth;

