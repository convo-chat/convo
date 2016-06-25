import { ReduceStore } from 'flux/utils';
import AppDispatcher from 'js/dispatcher';
import channelStore from 'js/stores/channelStore';

class MessageStore extends ReduceStore {
  getInitialState() {
    return {};
  }

  getMessages(topic) {
    return this.getState()[topic] || [];
  }

  reduce(state, action) {
    const { type, payload } = action;
    switch (type) {
      case 'MESSAGE_NEW':
        const messages = state[payload.topic] || [];
        return {...state, [payload.topic]: [...messages, payload.message]};
      case 'MESSAGES_ADD':
      console.log(...payload.messages);
        return {...state, ...payload.messages};
      default:
        return state;
    }
  }
}

const messageStore = new MessageStore(AppDispatcher);
export default messageStore;

