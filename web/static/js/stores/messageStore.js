import { ReduceStore } from 'flux/utils';
import AppDispatcher from 'js/dispatcher';
import channelStore from 'js/stores/channelStore';

class MessageStore extends ReduceStore {
  getInitialState() {
    return {
      messages: {'channel:general': []},
    };
  }

  getMessages() {
    const channel = channelStore.currentChannel();
    return this.getState().messages[channel];
  }

  reduce(state, action) {
    const { type, payload } = action;
    switch (type) {
      case 'MESSAGE_NEW':
        return {
          messages: {[payload.channel]: [...state.messages, action.message]},
        };
      default:
        return state;
    }
  }
}

const messageStore = new MessageStore(AppDispatcher);
export default messageStore;

