import { ReduceStore } from 'flux/utils';
import AppDispatcher from 'js/dispatcher';
import UserActions from 'js/actions/UserActions';
import Auth from 'js/services/auth';

class UserStore extends ReduceStore {
  getInitialState() {
    return { 
      users: [],
      user: null,
    };
  }

  getUsers() {
    return this.getState().users;
  }

  getLoggedIn() {
    return !!this.getState().loggedIn;
  }

  getCurrentUser() {
    return Auth.getUser();
  }

  reduce(state, action) {
    switch (action.type) {
      case 'USER_LOGIN':
        return state;
      case 'USER_ADD_TOKEN':
        return {
          ...state, 
          token: action.token, 
          loggedIn: action.loggedIn
        };
      case 'USER_ADD': 
        return {
          ...state,
          user: action.user,
        };
      default:
        return state;
    }
  }
}

const userStore = new UserStore(AppDispatcher);
export default userStore;

