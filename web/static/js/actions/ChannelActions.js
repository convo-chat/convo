import AppDispatcher from  'js/dispatcher';

const ChannelActions = {
  join: (name = null) => {
    console.log('channel joined');

    AppDispatcher.dispatch({
      type: 'CHANNEL_JOIN',
      name: name,
    });
  },
  leave: () => {
    console.log('channel left');
  },
  messageNew: (user, message) => {
    message.user = user;
    channel.push("message_new", message);
  },
};

export default ChannelActions;

