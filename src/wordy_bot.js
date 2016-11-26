'use strict';

const handler = require('./message_handler.js');
const checker = require('./language_checker.js');
const messages = require('./messages.js');
const reactions = require('./reactions.js');

class WordyBot {
  constructor(dataStore, analytics, slackBot, rules) {
    // TODO: extract the anonymous callbacks from each slackBot.on call
    // so they can be tested outside the event cycle
    slackBot.on('start', () => {
      console.log('Wordy Bot started');
    });

    slackBot.on('open', () => {
      console.log('Connection is open');
    });

    slackBot.on('close', () => {
      console.log('Connection is CLOSED');
    });

    slackBot.on('error', (error) => {
      console.error(`ERROR WHILE CONNECTING TO SLACK: ${error}`);
    });

    slackBot.on('message', (slackData) => {
      const userMessage = handler.MessageHandler.getUserMessage(slackData);

      if (userMessage instanceof messages.UserMessage) {
        const reaction = new checker.LanguageChecker(rules).check(userMessage);

        if (reaction instanceof reactions.ReactionDirectMessage) {
          console.log('Offending message');

          dataStore.isUserInterested(userMessage.userId, (isInterested) => {
            if (isInterested) {
              console.log('User is interested');
              analytics.trackTerm(reaction.expression, true);

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
            } else {
              console.info('User is ***NOT**** interested');
              analytics.trackTerm(reaction.expression, false);
            }
          }, (error) => {
            console.error(`DATA STORE ERROR: ${error}`);
          }); // is user interested callback
        } // reaction is direct message
      }
    });
  }
}

module.exports = {
  WordyBot,
};
