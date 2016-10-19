const SlackBot = require('slackbots');
const models = require('./models.js');
const reactions = require('./reactions.js');

const bot = new SlackBot({
    token: process.env.SLACK_API_TOKEN
});

const rules = new models.Rules();

const expression = new RegExp(/guys/);
const reaction = new reactions.ReactionDirectMessage();
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

bot.on('message', function(data) {

  // BOTS come with with undefined user ID
  if (data.type == 'message' && data.user != undefined){

    const user_id = data.user;
    const user_message = new models.UserMessage('jd', user_id, data.text);
    const reaction = new models.LanguageChecker(rules).check(user_message);

    console.log(user_message);
    console.log(reaction);

    if (reaction.type != reactions.REACTION_NONE){

      console.log('Offending message');

      bot.getUsers().then(function(users_data){

        const users = users_data.members;

        for(var x = 0; x < users.length; x++){

          var user = users[x];

          if (user.id == user_id){

            const bot_message_params = {
              as_user: false,
              username: 'Wordy Bot'
            }

            const message_to_user = 'You said: \"' + user_message.text + '\". Uncool.';
            bot.postMessageToUser(user.name, message_to_user, bot_message_params);

            break;
          }
        }
      });
    }
  }
});
