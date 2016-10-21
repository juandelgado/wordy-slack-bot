const reactions = require('./reactions.js');

function UserMessage(user_name, user_id, text){

  this.user_name = user_name;
  this.user_id = user_id;
  this.text = text;
}

UserMessage.prototype.toString = function(){
  return 'UserMessage []'
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
  Rules,
  Rule
};
