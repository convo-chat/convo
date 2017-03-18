# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :convo,
  ecto_repos: [Convo.Repo]

# Configures the endpoint
config :convo, Convo.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "SUMHCJ5J4mJQykxjnOvn7Q/R1I9/2LUf7gvoc4eP7yuAoSkSqYxqqzu3+wocCDVb",
  render_errors: [view: Convo.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Convo.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
