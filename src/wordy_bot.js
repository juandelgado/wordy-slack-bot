const handler = require('./message_handler.js');
const checker = require('./language_checker.js');
const models = require('./models.js');
const reactions = require('./reactions.js');

class WordyBot {
  constructor(slackBot, rules) {
    slackBot.on('start', () => {
      console.log('Wordy Bot started');
    });

    slackBot.on('open', () => {
      console.log('Connection is open');
    });

    slackBot.on('close', () => {
      console.log('Connection is CLOSED');
    });

    slackBot.on('error', () => {
      console.error('ERROR WHILE CONNECTING TO SLACK :sad_face:');
    });

    slackBot.on('message', (slackData) => {
      const userMessage = handler.MessageHandler.getUserMessage(slackData);

      if (userMessage instanceof models.UserMessage) {
        const reaction = new checker.LanguageChecker(rules).check(userMessage);

        if (reaction instanceof reactions.ReactionDirectMessage) {
          console.log('Offending message');

          // TODO: this is ugly because apparently the only way to send a DM
          // is via the user name, which doesn't come from the slack_data object received.
          // Can't really belive that, so let's investigate.
          slackBot.getUsers().then((usersData) => {
            const users = usersData.members;
            let x = 0;
            let user = null;

            for (; x < users.length; x += 1) {
              user = users[x];

              if (user.id === userMessage.userId) {
                reaction.execute(user.name, slackBot);
                break;
              }
            }
          });
        }
      }
    });
  }
}

module.exports = {
  WordyBot,
};
