defmodule Convo.UserTest do
  use Convo.ModelCase

  alias Convo.User

  @valid_attrs %{auth_token: "some content", deleted_at: "2010-04-17 14:00:00", email: "some content", failed_attempts: 42, is_admin: true, is_archived: true, is_bot: true, is_restricted: true, last_login_at: "2010-04-17 14:00:00", password: "some content", prefs: "some content", username: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
