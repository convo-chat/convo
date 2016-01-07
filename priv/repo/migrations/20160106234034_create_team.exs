defmodule Convo.Repo.Migrations.CreateTeam do
  use Ecto.Migration

  def change do
    create table(:teams) do
      add :creator_id, :integer
      add :name, :string
      add :company_name, :string
      add :email, :string
      add :user_count, :integer
      add :channel_count, :integer
      add :prefs, :text
      add :deleted_at, :datetime

      timestamps
    end

  end
end
