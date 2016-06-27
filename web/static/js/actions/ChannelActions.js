import AppDispatcher from  'js/dispatcher';
import Socket from 'js/socket';
import MessageActions from 'js/actions/MessageActions';
import channelStore from 'js/stores/channelStore';
import config from 'js/config';
import Auth from 'js/services/auth';

const ChannelActions = {
  join: (topic = 'general') => {
    const channel = Socket.channel(`channel:${topic}`);
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
    const channel = Socket.channel(`private:${user.id}`);
    channel.push("handshake", {user_id: user.id})
      .receive("ok", resp => Socket.channel(`private:${resp.id}`));
  },

  leave: () => {
    console.log('user left');
  },

  messageNew: (topic, message) => {
    Socket.channel(`channel:${topic}`)
      .push('message_new', message);
  },

  addChannels: (channels) => {
    AppDispatcher.dispatch({
      type: 'CHANNELS_ADD',
      payload: {
        channels,
      },
    });
  },

  fetchChannels: () => {
    fetch('/api/channels', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      },
    })
    .then(resp => resp.json())
    .then(json => ChannelActions.addChannels(json.data))
    .catch(err => console.log(err));
  },
};

export default ChannelActions;

