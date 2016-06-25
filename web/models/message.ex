defmodule Convo.Message do
	use Convo.Web, :model	

	schema "messages" do
		field :channel_id, :integer
		field :text, :string
		belongs_to :user, Convo.User

		timestamps
	end

	@required_fields ~w(user_id channel_id text)
	@optional_fields ~w()

	def changeset(model, params \\ %{}) do
		model
		|> cast(params, @required_fields, @optional_fields)
	end
end