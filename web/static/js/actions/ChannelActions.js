import AppDispatcher from  'js/dispatcher';
import socket from 'js/socket';
import MessageActions from 'js/actions/MessageActions';
import channelStore from 'js/stores/channelStore';

const ChannelActions = {
  join: (topic = 'general') => {
    const channel = socket.channel(`channel:${topic}`);
    channel.off("message_new");
    channel.on("message_new", payload => {
      MessageActions.new(topic, payload);
    });

    AppDispatcher.dispatch({
      type: 'CHANNEL_JOIN',
      payload: {
        topic,
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

  messageNew: (topic, message) => {
    socket.channel(`channel:${topic}`)
      .push('message_new', message);
  },
};

export default ChannelActions;

