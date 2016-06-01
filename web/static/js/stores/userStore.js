import { ReduceStore } from 'flux/utils';
import AppDispatcher from 'js/dispatcher';
import UserActions from 'js/actions/UserActions';

class UserStore extends ReduceStore {
    getInitialState() {
        return {};
    }

    reduce(state, action) {
        switch (action.type) {
            case 'USER_LOGIN':
                console.log(action);
                return {...state, loggedIn: true};
            default:
                return state;
        }
        console.log('aasasadf')
    }
}

const userStore = new UserStore(AppDispatcher);
export default userStore;