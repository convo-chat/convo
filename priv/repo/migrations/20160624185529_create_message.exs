defmodule Convo.Repo.Migrations.CreateMessage do
  use Ecto.Migration

  def change do
  	create table(:messages) do
  		add :channel_id, :integer
  		add :user_id, :integer
  		add :text, :string

  		timestamps
  	end
  end
end
