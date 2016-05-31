import AppDispatcher from  'js/dispatcher';

const UserActions = {
    loginUser: (email, password) => {
        AppDispatcher.dispatch({
            type: 'USER_LOGIN',
            email: email,
            password: password
        });
    }
};

export default UserActions;