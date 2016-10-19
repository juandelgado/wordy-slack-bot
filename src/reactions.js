const REACTION_NONE = 'reaction_none';
const REACTION_DIRECT_MESSAGE = 'direct_message';

function ReactionNone(){
  this.type = REACTION_NONE;
}

ReactionNone.prototype.toString = function(){
  return 'ReactionNone []';
}

function ReactionDirectMessage(){
  this.type = REACTION_DIRECT_MESSAGE;
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
