import AppDispatcher from  'js/dispatcher';

const UserActions = {
    login: (user) => {
        AppDispatcher.dispatch({
            type: 'USER_LOGIN',
            email: user.email,
            password: user.password
        });
    }
};

export default UserActions;