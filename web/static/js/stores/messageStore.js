import { ReduceStore } from 'flux/utils';
import AppDispatcher from 'js/dispatcher';

class MessageStore extends ReduceStore {
  getInitialState() {
    return {
      messages: [],
    };
  }

  getMessages() {
    return this.getState().messages;
  }

  reduce(state, action) {
    switch (action.type) {
      case 'MESSAGE_NEW':
        return {
          messages: [...state.messages, action.message]
        };
      default:
        return state;
    }
  }
}

const messageStore = new MessageStore(AppDispatcher);
export default messageStore;

