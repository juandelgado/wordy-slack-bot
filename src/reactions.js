const REACTION_NONE = 'reaction_none';
const REACTION_DIRECT_MESSAGE = 'direct_message';

function ReactionNone(){
  this.type = REACTION_NONE;
}

ReactionNone.prototype.toString = function(){
  return 'ReactionNone []';
}

function ReactionDirectMessage(message){
  this.type = REACTION_DIRECT_MESSAGE;
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

ReactionDirectMessage.prototype.toString = function(){
  return 'ReactionDirectMessage []';
}

module.exports = {
  REACTION_NONE: REACTION_NONE,
  REACTION_DIRECT_MESSAGE: REACTION_DIRECT_MESSAGE,
  ReactionNone,
  ReactionDirectMessage,
};
