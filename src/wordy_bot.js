const SlackBot = require('slackbots');
const handler = require('./message_handler.js');
const checker = require('./language_checker.js');
const models = require('./models.js');
const reactions = require('./reactions.js');

function WordyBot(slackBot, rules){

  slackBot.on('start', function() {
    console.log('Wordy Bot started');
  });

  slackBot.on('open', function() {
    console.log('Connection is open');
  });

  slackBot.on('close', function() {
    console.log('Connection is CLOSED');
  });

  slackBot.on('error', function() {
    console.error('ERROR WHILE CONNECTING TO SLACK :sad_face:');
  });

  slackBot.on('message', function(slack_data) {

    const message_handler = new handler.MessageHandler();

    const user_message = message_handler.getUserMessage(slack_data);

    if (user_message instanceof models.UserMessage){

      const reaction = new checker.LanguageChecker(rules).check(user_message);

      if (reaction instanceof reactions.ReactionDirectMessage){

        console.log('Offending message');

        slackBot.getUsers().then(function(users_data){

          const users = users_data.members;

          for(var x = 0; x < users.length; x++){

            var user = users[x];

            if (user.id == user_message.user_id){

              reaction.execute(user.name, slackBot);
              break;
            }
          }
        });
      }
    }
  });
}

module.exports = {
  WordyBot
}
