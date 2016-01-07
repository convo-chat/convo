defmodule Convo.TeamTest do
  use Convo.ModelCase

  alias Convo.Team

  @valid_attrs %{channel_count: 42, company_name: "some content", creator_id: 42, deleted_at: "2010-04-17 14:00:00", email: "some content", name: "some content", prefs: "some content", user_count: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Team.changeset(%Team{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Team.changeset(%Team{}, @invalid_attrs)
    refute changeset.valid?
  end
end
