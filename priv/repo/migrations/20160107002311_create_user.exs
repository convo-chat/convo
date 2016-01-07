defmodule Convo.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :password, :string
      add :email, :string
      add :auth_token, :string
      add :prefs, :text
      add :is_admin, :boolean, default: false
      add :is_bot, :boolean, default: false
      add :is_archived, :boolean, default: false
      add :is_restricted, :boolean, default: false
      add :failed_attempts, :integer
      add :last_login_at, :datetime
      add :deleted_at, :datetime

      timestamps
    end

  end
end
