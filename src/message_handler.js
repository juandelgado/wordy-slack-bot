"use strict"

const models = require('./models.js');

class MessageHandler {
  static getUserMessage(slackData) {
    let userMessage = new models.NoMessage();

    if (slackData.type === 'message' && slackData.user !== undefined) {
      userMessage = new models.UserMessage(slackData.user, slackData.text);
    }

    return userMessage;
  }
}

module.exports = {
  MessageHandler,
};
