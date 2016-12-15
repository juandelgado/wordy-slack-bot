# Wordy Developer Docs

## Status

[![Build Status](https://travis-ci.org/ustwo/wordy-slack-bot.svg?branch=master)](https://travis-ci.org/ustwo/wordy-slack-bot)

## Configuration

 * `SLACK_TOKEN`: Slack Bot token. You can create a bot and get a token in `https://YOURSLACK.slack.com/services/new/bot`. For more information you can read [Slack Bots documentation](https://api.slack.com/bot-users).
 * `SLACK_COMMAND_TOKEN` and `SLACK_TEAM_ID` to validate that commands are coming from your team.
 * `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_DB_URL` if you want to provide persitance through Firebase.
 * `WORDY_WEBSERVER_PORT` and `WORDY_WEBSERVER_HOST` for the webserver that handles the Slack commands.
 * `config.json`: Contains the terms and associated reactions.

## Development

Only if you want to modify / tinker with Wordy you'll need to install its dev dependencies:

 * Requisites: Node and NPM. Docker is optional.
 * `git clone git@github.com:ustwo/wordy-slack-bot.git`
 * `npm install`

## Running Wordy

Please make sure you have gone first through the [Configuration requirements](#configuration).

### The right way (for some)

 * Install Docker.
 * Build the image: `make`
 * Run the image: `make run`

### The easy way (for some)

Wordy is a Node app so if you don't want to go down the Docker route for whatever reason, go through the [Development requirements](#development) and then run:

```sh
node src/index.js
```

## Test

 * `npm test` to run unit tests.
 * `npm run lint` to check source code format.
