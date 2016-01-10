// import module styles
import "./styles.css"

// import module deps
import React from "react"
import ReactDOM from "react-dom"
import socket from "js/socket"


// Import Components
import ChannelList from "js/components/channel-list"
import UserList from "js/components/user-list"
import MessageList from "js/components/message-list"
import MessageForm from "js/components/message-form"


const channels = ["general", "mix", "ecto", "phoenix", "plug", "elixir", "erlang"];
const users = [{id: 1, name: "foobar"}, {id: 2, name: "allyraza"}, {id: 3, name: "johndoe"}, {id: 4, name: "sherlock"}, {id: 5, name: "drwatson"}];

class App extends React.Component {

    constructor() {
        super();

        const user = this.getUser();
        this.state = {
            activeRoom: "general", 
            messages: global.window.messages, 
            channel: socket.channel("rooms:general", {
                user: "ConvoBot",
                text: "@" + user + " joined!", 
                date: (new Date()).toLocaleTimeString()
            }),
            user: user
        };
    }

    channelParams() {
        return {
            user: "ConvoBot",
            text: "@" + this.state.user + " joined!", 
            date: (new Date()).toLocaleTimeString()
        };
    } 

    getUser() {
        return users[Math.floor(Math.random() * users.length)].name;
    }

    componentDidMount() {
        this.configureChannel(this.state.channel);
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

    onClickRoom = (room) => {
        this.state.channel.leave();
        let channel = socket.channel("rooms:" + room, this.channelParams());
        this.setState({activeRoom: room, messages: [], channel: channel});
        this.configureChannel(channel);
    }

    onClickUser = (user) => {
        let channel = socket.channel("private:general");
        channel.join();

        channel.push("handshake", {user_id: user.id})
            .receive("ok", ({id}) => {
                console.log("handshake success!");
                let channel = socket.channel("private:" + id);
                this.setState({activeRoom: id, messages: [], channel: channel});
                this.configureChannel(channel);
            });
    }

    onSubmitMessage = (message) => {
        message.user = this.state.user;
        this.state.channel.push("message_new", message);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <aside className="col-sm-3 col-md-2 sidebar">
                        <h3 className="sidebar__h">Activity</h3>
                        <ChannelList channels={channels} onClick={this.onClickRoom}/>
                        <UserList users={users} onClick={this.onClickUser}/>
                    </aside>
                    <main className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        <MessageList messages={this.state.messages}/>
                        <MessageForm onSubmit={this.onSubmitMessage}/>
                    </main>
                </div>
            </div>
        );
    }

}

export default App;

