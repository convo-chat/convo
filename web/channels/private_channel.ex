defmodule Convo.PrivateChannel do
  use Phoenix.Channel

  def join("private:general", _payload, socket) do
    {:ok, socket}
  end

  def join("private:" <> id, _payload, socket) do
    current_user_id = socket.assigns[:user_id]
    case Enum.map(String.split(id, "_"), &String.to_integer/1) do
      [^current_user_id, target_user_id] -> {:ok, socket}
      [initiating_user, ^current_user_id] -> {:ok, socket}
      _ -> {:error, "Unauthorized"}
    end
  end

  def leave("private:" <> _id, _payload, socket) do
    {:ok, socket}
  end

  def handle_in("handshake", %{"user_id" => user_id}, socket) do
    id = "#{user_id}_#{socket.assigns[:user_id]}"
    Convo.Endpoint.broadcast! "users:#{user_id}", "handshake", %{id: id}
    {:reply, {:ok, %{id: id}}, socket}
  end

  def handle_in("message_new", payload, socket) do
    broadcast! socket, "message_new", payload
    # Convo.MessageStore.put(socket.topic, payload)
    {:noreply, socket}
  end

end
