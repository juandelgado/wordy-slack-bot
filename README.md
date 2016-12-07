# Wordy

Wordy is a Slack bot that helps you stay clear of common, but unnecessary gendered words and ableisms. Some examples are "guys", "mad", "crazy", etc.

We take inspiration from [We All JS language shorthands](http://wealljs.org/rfc-slackbot-language-shorthands):

> The enforcement process [...] is focused around being kind, and on accepting corrections and moving on peacefully.

You can see the full list of terms and reactions, which we have also mostly borrowed from We All JS, in our [config.json](./config.json).

## Community and Contributing

Everyone part of Wordy's community, codebase and issue tracker is expected to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

For developers, please check our [development documentation](./docs/development.md) and [contributing guidelines](./CONTRIBUTING.md).

## Documentation

### How does it work

Wordy monitors the channels where it is invited to for a given set of terms or expressions. If it comes across one of them, and the user has explicitly registered interest, it'll trigger a reaction, most likely in the form of a direct message that only the person can see (no public shaming).

**It is important to note that Wordy will only monitor the channels that it has been invited to and also the people that subscribe to it.**

The full list of terms are: "crazy", "mad", "guys", "stupid", "lame" and "spaz" as described in the [configuration JSON file](./config.json). 

If you want Wordy to help you out, then you need to:

 * Subscribe using the `/wordy-in` command.
 * Invite Wordy to a channel or channels using `@wordy` like you would do with any other Slack member. Please see below a note on security and confidentiality.

From that point onwards Wordy will keep an eye on your messages on those channels and gently remind you if you slip.

### Commands

 * `/wordy-in`: to subscribe.
 * `/wordy-out`: to unsubscribe.
 * `/wordy-ping`: to check if Wordy is up and running.

### Getting your own Wordy

Getting Wordy up and running for your Slack isn't currently the most straightforward process. You can get more info in the [development docs](./docs/development.md), but you will need:

 * To be an admin of a Slack organization, so you can create an app and a bot.
 * Some server to run Wordy. You can roll your own or maybe use something like [BeepBoop](https://beepboophq.com/).
 * A Firebase account since Wordy currently uses Firebase for permanent storage and analytics. The ground work to implement other providers is there, but only Firebase is in place right now.

### Confidentiality and privacy

Please note that _any_ Slack bot has the potential to send every single word said on your Slack to a 3rd party service. You should only use 3rd party services that you really trust or host Wordy yourself. If you are a client services company you might want to check you are not breaking NDAs, etc.

Also note that Wordy keeps some analytics, even if mostly anonymous. To be precise:

 * A list of Slack user IDs of the users that have opted-in or opted-out, so it only engages with the people that are interested.
 * An anonymous event for every time someone, subscribed or not, posts a message that matches one of the monitored terms. There is no information about which user did it, only that it happened.
 * An anonymous event for every time someone has used any of the [Wordy commands](#commands).

## Maintainers

* [Juan Delgado](mailto:juan@ustwo.com) (@juandelgado)

## Contact

[open.source@ustwo.com](mailto:open.source@ustwo.com)

## License

See [License](./LICENSE).
