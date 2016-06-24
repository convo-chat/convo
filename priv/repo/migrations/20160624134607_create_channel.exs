defmodule Convo.Repo.Migrations.CreateChannel do
  use Ecto.Migration

  def change do
    create table(:channels) do
      add :name, :string

      timestamps
    end
  end
end
