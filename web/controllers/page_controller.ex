defmodule Convo.PageController do
  use Convo.Web, :controller

  def index(conn, _params) do
    messages = Convo.MessageStore.get("rooms:general")
    render conn, "index.html", messages: messages
  end
end
