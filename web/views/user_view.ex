defmodule Convo.UserView do
  use Convo.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, Convo.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, Convo.UserView, "user.json")}
  end

  def render("login.json", %{user: user, token: token}) do
    %{token: token, user: render_one(user, Convo.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      team_id: user.team_id,
      username: user.username,
      password: user.password,
      email: user.email,
      auth_token: user.auth_token,
      prefs: user.prefs,
      is_admin: user.is_admin,
      is_bot: user.is_bot,
      is_archived: user.is_archived,
      is_blocked: user.is_blocked,
      last_login_at: user.last_login_at,
      deleted_at: user.deleted_at}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end

end
