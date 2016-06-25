defmodule Convo.PageController do
  use Convo.Web, :controller
  alias Convo.Repo
  alias Convo.Message

  def index(conn, _params) do
    messages = Repo.all(Message)
    render(conn, "index.html", messages: messages)
  end
end
