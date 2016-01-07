## Teams
id
creator_id
name
company_name
email
prefs
user_count
channel_count
deleted_at
timestamps

## Invites
id
user_id
team_id
creator_id
allowed_channels
email
token
is_accepted
timestamps


## Users
  id
  team_id
  username
  password
  email
  auth_token
  prefs
  is_admin
  is_bot
  is_archived
  is_restricted
  last_login_at
  deleted_at
  timestamps

  ## User Profile
    user_id
    first_name
    last_name
    avatar
    image
    timezone


## user_channel
  user_id
  channel_id
  last_pinged_at
  timestamps

## Channels
  id
  team_id
  creator_id
  name
  topic
  purpose
  type
  message_count
  user_count
  is_archived
  is_public
  last_message_at
  timestamps


## Messages
  id
  team_id
  channel_id
  user_id
  text
  type
  event
  mentions
  is_archived
  is_hidden
  expires_at
  timestamps

## Files
  id
  user_id
  channel_id
  team_id
  name
  title
  height
  width
  url
  url_public
  filetype
  filesize
  mimetype
  is_public
  timestamps





