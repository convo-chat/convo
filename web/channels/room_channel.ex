defmodule Convo.RoomChannel do
  use Phoenix.Channel


  def join("rooms:general", _params, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  def join("rooms:" <> _room, _params, _socket) do
    {:error, %{reason: "Unauthorized"}}
  end

  def handle_info(:after_join, socket) do
    broadcast! socket, "user_joined", %{text: "new user joined!"}
    push socket, "join", %{status: "connected"}
    {:noreply, socket}
  end

  def handle_in("message_new", %{"text" => text}, socket) do
    
    broadcast! socket, "message_new", %{text: text}
    {:noreply, socket}
  end

end
