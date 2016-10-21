const reactions = require('./reactions.js');

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
  LanguageChecker
};
