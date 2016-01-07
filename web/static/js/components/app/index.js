// import module styles
import "./styles.css"

// import module deps
import React from "react"
import ReactDOM from "react-dom"
import socket from "js/socket"


// Import Components
import ChannelList from "js/components/channel-list"
import MessageList from "js/components/message-list"
import MessageForm from "js/components/message-form"


const channels = ["general", "mix", "ecto", "phoenix", "plug", "elixir", "erlang"];

class App extends React.Component {

    constructor() {
        super();
        this.state = {activeRoom: "general", messages: [], channel: socket.channel("rooms:general")};
    }

    componentDidMount() {
        this.configureChannel(this.state.channel);
    }

    configureChannel(channel) {

        channel.join()
            .receive("ok", () => { console.log("Successfully joined the " + this.state.activeRoom + " chat room.")})
            .receive("error", () => { console.log("Unable to join the " + this.state.activeRoom + " chat room.")});

        channel.on("message_new", payload => {
            this.setState({ messages: this.state.messages.concat(payload.text) });
        });

        channel.on("user_joined", payload => {
            this.setState({ messages: this.state.messages.concat(payload.text) });
        });

    }

    onClickRoom = (room) => {
        this.state.channel.leave();
        let channel = socket.channel("rooms:" + room);
        this.setState({activeRoom: room, messages: [], channel: channel});
        this.configureChannel(channel);
    }

    onSubmitMessage = (message) => {
        this.state.channel.push("message_new", {text: message});
    }

    render() {
        return (
            <div>
                <ChannelList channels={channels} onClick={this.onClickRoom}/>
                <MessageList messages={this.state.messages}/>
                <MessageForm onSubmit={this.onSubmitMessage}/>
            </div>
        );
    }

}

export default App;

