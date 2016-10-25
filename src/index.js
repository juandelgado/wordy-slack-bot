const SlackBot = require('slackbots');
const bots = require('./wordy_bot.js');
const models = require('./models.js');
const reactions = require('./reactions.js');

// TODO: error out if no token found
const slackBot = new SlackBot({
  token: process.env.SLACK_TOKEN,
});

const rules = new models.Rules();

// TODO: this should obs come from some JSON config or similar
const expression = new RegExp(/guys/);
const reaction = new reactions.ReactionDirectMessage('Guys is not cool');
rules.add(new models.Rule(expression, reaction));

/* eslint-disable no-new */
// While I understand the rule, I really prefer to have a class
// and and instance here for consistency with the rest of the code.
new bots.WordyBot(slackBot, rules);
