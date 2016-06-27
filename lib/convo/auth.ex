defmodule Convo.Auth do
  import Plug.Conn
  import Phoenix.Controller
  alias Convo.Repo
  alias Convo.User

  def init(opts), do: opts

  def call(conn, _opts) do
    conn
    |> get_token
    |> attempt
    |> send_response
  end

  def get_token(conn) do
    case get_req_header(conn, "authorization") do
      [token] -> {conn, token}
      _ -> {:error, conn}
    end
  end

  def send_response({:ok, conn}), do: conn
  def send_response({:error, conn}) do
    conn
    |> put_status(:unauthorized)
    |> put_resp_header("Content-Type", "application/json")
    |> json(%{message: "Your not authorized"})
    |> halt
  end

  def attempt({:error, conn}), do: {:error, conn}
  def attempt({conn, "Bearer " <> token}) do
    case Phoenix.Token.verify(conn, "user", token, max_age: 1209600) do
      {:ok, user_id} ->
        conn = assign(conn, :user, Repo.get!(User, user_id))
        {:ok, conn}
      {:error, _} ->
        {:error, conn}
    end
  end
  def attempt({conn, token}), do: {:error, conn}
end
