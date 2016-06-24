import AppDispatcher from  'js/dispatcher';
import socket from 'js/socket';
import MessageActions from 'js/actions/MessageActions';
import channelStore from 'js/stores/channelStore';

const ChannelActions = {
  join: (name = 'channel:general', callback) => {
    const channel = socket.channel(name);
    channel.on("message_new", payload => {
      console.log(payload);
    });

    if (callback) callback(channel);

    AppDispatcher.dispatch({
      type: 'CHANNEL_JOIN',
      payload: {
        name,
      },
    });
  },

  private: (user) => {
    const channel = socket.channel(`private:${user.id}`);
    channel.push("handshake", {user_id: user.id})
      .receive("ok", resp => socket.channel(`private:${resp.id}`));
  },

  leave: () => {
    console.log('user left');
  },

  messageNew: (message) => {
    const channel = channelStore.currentChannel();
    socket.channel(channel).push('message_new', message);
    // MessageActions.addMessage({ message, channel });
  },
};

export default ChannelActions;
