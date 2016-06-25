defmodule Convo.MessageController do
	use Convo.Web, :controller
	alias Convo.Repo
	alias Convo.Message
	alias Convo.Channel

	def index(conn, %{"topic" => topic}) do
		channel = Repo.get_by(Channel, name: topic)
		query = from(m in Message, where: m.channel_id == ^channel.id)
		messages = query
		|> Repo.all()
		|> Repo.preload([:user])

		render(conn, "index.json", messages: messages, topic: topic)
	end
end