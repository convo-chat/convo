import { ReduceStore } from 'flux/utils';
import AppDispatcher from 'js/dispatcher';

const channels = [
  { id: 1, name: 'general' },
  { id: 2, name: 'mix' },
  { id: 3, name: 'ecto' },
  { id: 4, name: 'phoenix' },
  { id: 5, name: 'plug' },
  { id: 6, name: 'elixir' },
  { id: 7, name: 'erlang' },
];

class ChannelStore extends ReduceStore {
  getInitialState() {
    return {
      channels: channels,
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
      case 'CHANNEL_JOIN':
        return {...state, current: payload.topic};
      default:
        return state;
    }
  }
}

const channelStore = new ChannelStore(AppDispatcher);
export default channelStore;

