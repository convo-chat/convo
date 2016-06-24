defmodule Convo.ChannelView do
  use Convo.Web, :view

  def render("index.json", %{channels: channels}) do
    %{data: render_many(channels, Convo.ChannelView, "channel.json")}
  end

  def render("channel.json", %{channel: channel}) do
    %{id: channel.id,
      name: channel.name}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end

end
