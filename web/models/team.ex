defmodule Convo.Team do
  use Convo.Web, :model

  schema "teams" do
    field :creator_id, :integer
    field :name, :string
    field :company_name, :string
    field :email, :string
    field :user_count, :integer
    field :channel_count, :integer
    field :prefs, :string
    field :deleted_at, Ecto.DateTime

    timestamps
  end

  @required_fields ~w(creator_id name company_name email user_count channel_count prefs deleted_at)
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
