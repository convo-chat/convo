# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Convo.Repo.insert!(%Convo.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Convo.Repo
alias Convo.User
alias Convo.Channel

%User {
  team_id: 1,
  username: "drwatson",
  password: "imback",
  email: "drwatson@example.com",
  auth_token: "123",
  is_admin: true,
  is_bot: false,
  last_login_at: Ecto.DateTime.utc
} |> Repo.insert!

%User {
  team_id: 1,
  username: "sherlock",
  password: "sherlocked",
  email: "sherlock@example.com",
  auth_token: "123",
  is_admin: true,
  is_bot: false,
  last_login_at: Ecto.DateTime.utc
} |> Repo.insert!

%Channel {
  name: "general"
} |> Repo.insert!

%Channel {
  name: "random"
} |> Repo.insert!
