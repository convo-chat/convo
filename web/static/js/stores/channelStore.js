import { ReduceStore } from 'flux/utils';
import AppDispatcher from 'js/dispatcher';

class ChannelStore extends ReduceStore {
  getInitialState() {
    return {
      channels: [],
      current: null,
    };
  }

  getChannels() {
    return this.getState().channels;
  }

  currentChannel() {
    return this.getState().current;
  }

  reduce(state, action) {
    const { type, payload } = action;
    switch (type) {
      case 'CHANNELS_ADD':
        return {...state, channels: payload.channels};
      case 'CHANNEL_JOIN':
        return {...state, current: payload.topic};
      default:
        return state;
    }
  }
}

const channelStore = new ChannelStore(AppDispatcher);
export default channelStore;

