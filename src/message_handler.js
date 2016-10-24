const models = require('./models.js');

function MessageHandler() {
}

MessageHandler.prototype.getUserMessage = function (slackData) {
  let userMessage = new models.NoMessage();

  if (slackData.type === 'message' && slackData.user !== undefined) {
    userMessage = new models.UserMessage(slackData.user, slackData.text);
  }

  return userMessage;
};

module.exports = {
  MessageHandler,
};
