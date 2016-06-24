import {Socket} from "phoenix/web/static/js/phoenix"

let socket;

const SocketActions = {
  connect: () => {
    if (!socket) {
      socket = new Socket("/socket", {
          params: { token: window.userToken }
      });
      socket.connect();
    }
  },

  channel: (topic, ok, error) => {
    let channel = socket.channels.find(channel => channel.topic === topic);
    // if we did not find an existing channel
    // create new one and join
    if (!channel || channel.state === 'closed') {
      channel = socket.channel(topic, {});
      channel.join()
        .receive("ok", resp => { if (ok) ok(resp); })
        .receive("error", resp => { if (error) error(resp); });
    }
    return channel;
  },
};

SocketActions.connect();

export default SocketActions;
