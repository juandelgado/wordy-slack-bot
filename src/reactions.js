function ReactionNone(){
}

function ReactionDirectMessage(message){
  this.message = message;
}

// YES, this needs the user_name, sadly not the ID as per:
// https://github.com/mishk0/slack-bot-api
ReactionDirectMessage.prototype.execute = function(user_name, bot){

  const bot_message_params = {
    as_user: false,
    username: 'Wordy Bot'
  }

  bot.postMessageToUser(user_name, this.message, bot_message_params);
}

module.exports = {
  ReactionNone,
  ReactionDirectMessage,
};
