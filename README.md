# Wordy

Wordy is a Slack bot that helps you stay clear of common, but emotionally charged for some, words.

Some examples are "guys" or ableisms such as "mad", "crazy", etc.

For now you can have a read at [WeAllJS take on it](http://wealljs.org/rfc-slackbot-language-shorthands):

> The enforcement process [...] is focused around being kind, and on accepting corrections and moving on peacefully.

## Contributing

Check our [contributing guidelines](./CONTRIBUTING.md).

Everyone part of Wordy's community, codebase and issue tracker is expected to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Configuration

 * `SLACK_TOKEN`: Slack Bot token. You can create a bot and get a token in https://YOURSLACK.slack.com/services/new/bot. For more information you can read [Slack Bots documentation](https://api.slack.com/bot-users).
 * `FIREBASE_JSON_CONFIG`: path to the Firebase config JSON file.
 * `FIREBASE_DB_URL`: Firebase's database URL. 

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

## Documentation

TBD.

## Maintainers

* [Juan Delgado](mailto:juan@ustwo.com) (@juandelgado)

## Contact

[open.source@ustwo.com](mailto:open.source@ustwo.com)

## License

See [License](./LICENSE).
