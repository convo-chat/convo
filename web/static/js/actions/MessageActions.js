import AppDispatcher from  'js/dispatcher';
import Socket from 'js/socket';
import Auth from 'js/services/auth';

const MessageActions = {
  new: (topic, message) => {
    AppDispatcher.dispatch({
      type: 'MESSAGE_NEW',
      payload: {
        topic,
        message,
      }
    });
  },

  addMessages: (messages) => {
    AppDispatcher.dispatch({
      type: 'MESSAGES_ADD',
      payload: {
        messages,
      }
    });
  },

  fetchMessages: () => {
    fetch(`/api/messages`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      }
    })
    .then(resp => resp.json())
    .then(json => MessageActions.addMessages(json.data))
    .catch(err => console.log(err));
  },
};

export default MessageActions;
