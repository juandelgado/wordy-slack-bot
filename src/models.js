const reactions = require('./reactions.js');

function UserMessage(user_id, text){
  this.user_id = user_id;
  this.text = text;
}

UserMessage.prototype.equals = function (message) {
  return this.user_id == message.user_id &&
    this.text == message.text;
};

function NoMessage(){

}

function Rule(expression, reaction){
  this.expression = expression;
  this.reaction = reaction;
}

Rule.prototype.toString = function(){
  return 'Rule [' + this.expression + ', ' + this.reaction + ']'
}

function Rules(){
  this.rules = new Array();
}

Rules.prototype.add = function(rule){
  this.rules.push(rule);
}

module.exports = {
  UserMessage,
  NoMessage,
  Rules,
  Rule
};
