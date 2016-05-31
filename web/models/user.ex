defmodule Convo.User do
  use Convo.Web, :model

  schema "users" do
    field :username, :string
    field :password, :string
    field :email, :string
    field :auth_token, :string
    field :prefs, :string
    field :is_admin, :boolean, default: false
    field :is_bot, :boolean, default: false
    field :is_archived, :boolean, default: false
    field :is_blocked, :boolean, default: false
    field :failed_attempts, :integer
    field :last_login_at, Ecto.DateTime
    field :deleted_at, Ecto.DateTime

    timestamps
  end

  @required_fields ~w(username password email auth_token prefs is_admin is_bot is_archived is_blocked failed_attempts last_login_at deleted_at)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
