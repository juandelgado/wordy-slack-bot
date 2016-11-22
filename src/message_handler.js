'use strict';

const messages = require('./messages.js');

class MessageHandler {
  static getUserMessage(slackData) {
    let userMessage = new messages.NoMessage();

    if (slackData.type === 'message' && slackData.user !== undefined) {
      userMessage = new messages.UserMessage(slackData.user, slackData.text);
    }

    return userMessage;
  }
}

module.exports = {
  MessageHandler,
};
