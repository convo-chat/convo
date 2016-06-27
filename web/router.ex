defmodule Convo.Router do
  use Convo.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth do
    plug Convo.Auth 
  end

  # Other scopes may use custom stacks.
  scope "/api", Convo do
    pipe_through [:api, :auth]
    resources "/users", UserController, except: [:new, :edit]
    get "/channels", ChannelController, :index
    get "/messages", MessageController, :index
  end

  scope "/api", Convo do
    pipe_through :api
    post "/login", UserController, :login
  end

  scope "/", Convo do
    pipe_through :browser # Use the default browser stack

    get "/*page", PageController, :index
  end

end
