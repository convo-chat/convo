defmodule Convo.ChannelController do
  use Convo.Web, :controller
  alias Convo.Channel

  def index(conn, _params) do
    channels = Repo.all(Channel)
    render(conn, "index.json", channels: channels)
  end

  def create(conn, _params) do
    conn
  end

  def update(conn, _params) do
    conn
  end

  def show(conn, _params) do
    conn
  end

  def delete(conn, _params) do
    conn
  end
end
