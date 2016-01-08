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
            this.setState({ messages: this.state.messages.concat(payload) });
        });

        channel.on("user_joined", payload => {
            this.setState({ messages: this.state.messages.concat(payload) });
        });

    }

    onClickRoom = (room) => {
        this.state.channel.leave();
        let channel = socket.channel("rooms:" + room);
        this.setState({activeRoom: room, messages: [], channel: channel});
        this.configureChannel(channel);
    }

    onSubmitMessage = (message) => {
        this.state.channel.push("message_new", message);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <aside className="col-sm-3 col-md-2 sidebar">
                        <ChannelList channels={channels} onClick={this.onClickRoom}/>
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

