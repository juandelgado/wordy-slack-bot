const models = require('./models.js');

function MessageHandler(){
}

MessageHandler.prototype.getUserMessage = function (slack_data) {

  var user_message = new models.NoMessage();

  if (slack_data.type == 'message' && slack_data.user != undefined){
    user_message = new models.UserMessage(slack_data.user, slack_data.text);
  }

  return user_message;
};

module.exports = {
  MessageHandler
}
