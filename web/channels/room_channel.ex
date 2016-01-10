defmodule Convo.RoomChannel do
  use Phoenix.Channel

  def join("rooms:general", payload, socket) do
    send(self, {:after_join, payload})
    {:ok, socket}
  end

  def join("rooms:" <> _room, payload, socket) do
    send(self, {:after_join, payload})
    {:ok, socket}
  end

  def leave("rooms:"<> _room, _payload, socket) do
    {:ok, socket}
  end

  def join("private:" <> _id, _payload, socket) do
    IO.puts "private channel!"
    {:ok, socket}
  end

  def handle_info({:after_join, payload}, socket) do
    broadcast! socket, "user_joined", payload
    push socket, "join", %{status: "connected"}

    {:noreply, socket}
  end

  def handle_in("message_new", payload, socket) do
    broadcast! socket, "message_new", payload
    Convo.MessageStore.put(socket.topic, payload)

    {:noreply, socket}
  end

end
