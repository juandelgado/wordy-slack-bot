const SlackBot = require('slackbots');
const bots = require('./wordy_bot.js');
const models = require('./models.js');
const reactions = require('./reactions.js');

// TODO: error out if no token found
const slackBot = new SlackBot({
  token: process.env.SLACK_API_TOKEN,
});

const rules = new models.Rules();

// TODO: this should obs come from some JSON config or similar
const expression = new RegExp(/guys/);
const reaction = new reactions.ReactionDirectMessage('Guys is not cool');
rules.add(new models.Rule(expression, reaction));

new bots.WordyBot(slackBot, rules);
