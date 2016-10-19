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

function LanguageChecker(rules){
  this.rules = rules;
}

LanguageChecker.prototype.check = function(message){

  var reaction = new reactions.ReactionNone();

  for(var x = 0; x < this.rules.rules.length; x++){

    const rule = this.rules.rules[x];

    if (rule.expression.test(message.text)){
      reaction = rule.reaction;
      break;
    }
  }

  return reaction;
}

module.exports = {
  UserMessage,
  LanguageChecker,
  Rules,
  Rule
};
