defmodule Convo.Web.PageController do
  use Convo.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
