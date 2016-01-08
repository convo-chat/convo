defmodule Convo.MessageStore do

  def start_link(_opts \\ []) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def get(channel) do
    Agent.get(__MODULE__, &Map.get(&1, channel, []))
  end

  def put(channel, message) do
    messages = [message | get(channel)]
    Agent.update(__MODULE__, &Map.put(&1, channel, messages))
  end

end
