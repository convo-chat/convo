defmodule Convo.MessageView do
  use Convo.Web, :view

  def render("index.json", %{messages: messages, topic: topic}) do
    items = render_many(messages, Convo.MessageView, "message.json")
    %{data: Map.put(%{}, topic, items)}
  end

  def render("index.json", %{channels: channels}) do
    items = Enum.map(channels, fn(channel) -> 
     {channel.name, render_many(channel.messages, Convo.MessageView, "message.json")}
    end)
    %{data: items |> Enum.into(%{})}
  end

  def render("message.json", %{message: message, user: user}) do
    %{id: message.id,
     channel_id: message.channel_id,
     user_id: message.user_id,
     text: message.text,
     ts: message.inserted_at,
     user: %{
       id: user.id,
       username: user.username}}
  end

  def render("message.json", %{message: message}) do
    %{id: message.id,
     channel_id: message.channel_id,
     user_id: message.user_id,
     text: message.text,
     ts: message.inserted_at,
     user: %{
       id: message.user.id,
       username: message.user.username}}
  end

  def render("message.json", %{message: message}) do
    render("message.json", message: message, user: message.user)
  end
end
