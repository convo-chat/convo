import AppDispatcher from  'js/dispatcher';
import socket from 'js/socket';

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
};

export default MessageActions;

