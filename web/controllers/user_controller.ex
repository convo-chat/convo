defmodule Convo.UserController do
  use Convo.Web, :controller

  alias Convo.User

  plug :scrub_params, "user" when action in [:create, :update]

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", user_path(conn, :show, user))
        |> render("show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Convo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Repo.get!(User, id)
    changeset = User.changeset(user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        render(conn, "show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Convo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Repo.get!(User, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user)

    send_resp(conn, :no_content, "")
  end

  defp attempt(email, password) do
    with user <- Repo.get_by(User, email: email),
         true <- verify_password(user, password),
    do:  {:ok, user}
  end

  defp verify_password(user, password) do
    case user do
      nil -> false
      _   -> user.password == password
    end
  end

  defp generate_token(user_id) do
    :crypto.hash(:md5, "#{user_id}")
    |> Base.encode16(case: :lower)
  end

  def login(conn, %{"email" => email, "password" => password}) do
    case attempt(email, password) do
      {:ok, user} ->
        token = Phoenix.Token.sign(conn, "user", user.id)
        render(conn, user: user, token: token)
      _ ->
        render(conn, :error, message: "Invalid username or password!")
    end
  end

  def login(conn, _) do
    conn |> render(:error, message: "Invalid username or password!")
  end
end
