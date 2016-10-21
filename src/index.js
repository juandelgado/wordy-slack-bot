const SlackBot = require('slackbots');
const models = require('./models.js');
const reactions = require('./reactions.js');
const handler = require('./message_handler.js');
const checker = require('./language_checker.js');

const bot = new SlackBot({
    token: process.env.SLACK_API_TOKEN
});

const rules = new models.Rules();

const expression = new RegExp(/guys/);
const reaction = new reactions.ReactionDirectMessage('Guys is not cool');
rules.add(new models.Rule(expression, reaction));

bot.on('start', function() {
  console.log('Wordy Bot started');
});

bot.on('open', function() {
  console.log('Connection is open');
});

bot.on('close', function() {
  console.log('Connection is CLOSED');
});

bot.on('error', function() {
  console.error('ERROR WHILE CONNECTING TO SLACK :sad_face:');
});

bot.on('message', function(slack_data) {

  const message_handler = new handler.MessageHandler();

  const user_message = message_handler.getUserMessage(slack_data);

  if (user_message instanceof models.UserMessage){

    const reaction = new checker.LanguageChecker(rules).check(user_message);

    if (reaction.type != reactions.REACTION_NONE){

      console.log('Offending message');

      bot.getUsers().then(function(users_data){

        const users = users_data.members;

        for(var x = 0; x < users.length; x++){

          var user = users[x];

          if (user.id == user_message.user_id){

            reaction.execute(user.name, bot);
            break;
          }
        }
      });
    }
  }
});
