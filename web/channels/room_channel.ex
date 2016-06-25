defmodule Convo.RoomChannel do
  use Phoenix.Channel
  alias Convo.Repo
  alias Convo.Message

  def join("channel:general", payload, socket) do
    send(self, {:after_join, payload})
    {:ok, socket}
  end

  def join("channel:" <> _room, payload, socket) do
    send(self, {:after_join, payload})
    {:ok, socket}
  end

  def join("private:" <> _id, _payload, socket) do
    {:ok, socket}
  end

  def leave("channel:"<> _room, _payload, socket) do
    {:ok, socket}
  end

  def handle_info({:after_join, payload}, socket) do
    broadcast! socket, "user_joined", payload
    push socket, "join", %{status: "connected"}

    {:noreply, socket}
  end

  def handle_in("message_new", params, socket) do
    user = socket.assigns.user
    channel = find_channel(socket.topic)
    changeset = Message.changeset(%Message {}, build_message(params, user, channel))

    case Repo.insert(changeset) do
      {:ok, message} ->
        broadcast! socket, "message_new", build_response(message, user)
        {:reply, :ok, socket}
      {:error, _changeset} ->
        {:reply, :ok, socket}
    end
  end

  defp find_channel("channel:"<> name) do
    Convo.Channel |> Repo.get_by(name: name)
  end

  defp build_message(message, user, channel) do
    Map.merge(message, %{"user_id" => user.id, "channel_id" => channel.id})
  end

  defp build_response(message, user) do
    messages = Convo.MessageView.render("message.json", message: message, user: user)
  end
end
