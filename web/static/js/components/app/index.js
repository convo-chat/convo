// import module styles
import './styles.css';

// import module deps
import React from 'react';
import ReactDOM from 'react-dom';
import socket from 'js/socket';


// Import Components
import ChannelList from 'js/components/channel-list';
import UserList from 'js/components/user-list';
import MessageList from 'js/components/message-list';
import MessageForm from 'js/components/message-form';

import UserActions from 'js/actions/UserActions';
import userStore from 'js/stores/userStore';


const channels = [
    { id: 1, name: 'general' },
    { id: 2, name: 'mix' },
    { id: 3, name: 'ecto' },
    { id: 4, name: 'phoenix' },
    { id: 5, name: 'plug' },
    { id: 6, name: 'elixir' },
    { id: 7, name: 'erlang' }
];
const users = [
    { id: 1, name: 'foobar' },
    { id: 2, name: 'allyraza' },
    { id: 3, name: 'johndoe' },
    { id: 4, name: 'sherlock' },
    { id: 5, name: 'drwatson' }
];

class App extends React.Component {
    constructor() {
        super();
        const user = this.getUser();
        this.state = {
            activeRoom: "general", 
            messages: global.window.messages, 
            channel: socket.channel("rooms:general", {
                id: Date.now(),
                user: "ConvoBot",
                text: "@" + user + " joined!", 
                date: (new Date()).toLocaleTimeString()
            }),
            user: user
        };
    }

    channelParams() {
        return {
            id: Date.now(),
            user: "ConvoBot",
            text: "@" + this.state.user + " joined!", 
            date: (new Date()).toLocaleTimeString()
        };
    } 

    getUser() {
        const id = Math.floor(Math.random() * users.length);
        return users[id].name;
    }

    componentDidMount() {
        this.configureChannel(this.state.channel);
        userStore.addListener(this.onChange);
    }

    configureChannel(channel) {

        channel.join()
            .receive("ok", () => { console.log("Successfully joined the " + this.state.activeRoom + " chat room.")})
            .receive("error", () => { console.log("Unable to join the " + this.state.activeRoom + " chat room.")});

        channel.on("handshake", ({id, user_id}) => {
            const channel = socket.channel("private:" + id);
            this.setState({activeRoom: id, messages: [], channel: channel});
            this.configureChannel(channel);
        });

        channel.on("message_new", payload => {
            this.setState({ messages: this.state.messages.concat(payload) });
        });

        channel.on("user_joined", payload => {
            this.setState({ messages: this.state.messages.concat(payload) });
        });

    }

    onChange = () => {
        this.setState({});
    }

    onClickRoom = (room) => {
        this.state.channel.leave();
        let channel = socket.channel("rooms:" + room, this.channelParams());
        this.setState({ activeRoom: room, messages: [], channel: channel });
        this.configureChannel(channel);
    }

    onClickUser = (user) => {
        UserActions.loginUser('foo@bar.com', 'pwd123');
        /*
        let channel = socket.channel("private:general");
        channel.join();
        channel.push("handshake", {user_id: user.id})
            .receive("ok", ({id}) => {
                console.log("handshake success!");
                let channel = socket.channel("private:" + id);
                this.setState({activeRoom: id, messages: [], channel: channel});
                this.configureChannel(channel);
            });
        */
    }

    onSubmitMessage = (message) => {
        const { user, channel } = this.state;
        message.user = user;
        channel.push("message_new", message);
    }

    render() {
        const { messages } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <aside className="col-sm-3 col-md-2 sidebar">
                        <h3 className="sidebar__h">Activity</h3>
                        <ChannelList channels={ channels } onClick={this.onClickRoom}/>
                        <UserList users={ users } onClick={ this.onClickUser }/>
                    </aside>
                    <main className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        <MessageList messages={ messages }/>
                        <MessageForm onSubmit={ this.onSubmitMessage }/>
                    </main>
                </div>
            </div>
        );
    }

}

export default App;