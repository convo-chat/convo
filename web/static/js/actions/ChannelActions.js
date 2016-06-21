import AppDispatcher from  'js/dispatcher';
import socket from 'js/socket';

const ChannelActions = {
  join: (name = 'rooms:general', params = {}) => {
    console.log('user joined');
    const channel = socket.channel(name);
    // this.channelParams()
    AppDispatcher.dispatch({
      type: 'CHANNEL_JOIN',
      name: name,
    });
  },

  leave: () => {
    console.log('user left');
  },

  messageNew: (user, message) => {
    message.user = user;
    channel.push('message_new', message);
  },
};

export default ChannelActions;

