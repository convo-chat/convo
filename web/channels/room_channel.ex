defmodule Convo.RoomChannel do
  use Phoenix.Channel


  def join("rooms:general", _payload, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  def join("rooms:" <> _room, _payload, _socket) do
    {:error, %{reason: "Unauthorized"}}
  end

  def handle_info(:after_join, socket) do
    broadcast! socket, "user_joined", %{text: "new user joined!", date: "just now"}
    push socket, "join", %{status: "connected"}
    {:noreply, socket}
  end

  def handle_in("message_new", payload, socket) do
    
    broadcast! socket, "message_new", payload
    {:noreply, socket}
  end

end
