import AppDispatcher from  'js/dispatcher';

const UserActions = {
  login: (user) => {
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...user})
    })
      .then((resp) => {
        // UserActions.attempt(resp);
        // Save the token in the localStorage
        // Create a user identity
        // Enable the chat
      })
      .fail((err, msg) => {
        // Show an error message
        console.log(err);
      });
    AppDispatcher.dispatch({
      type: 'USER_LOGIN',
      ...user
    });
  }
};

export default UserActions;
