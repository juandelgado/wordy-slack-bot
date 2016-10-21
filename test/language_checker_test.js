const assert = require('assert');
const should = require('should');
const models = require('../src/models.js');
const reactions = require('../src/reactions.js');
const checker = require('../src/language_checker.js');

describe("Message / Reaction", function(){

  it('Should return no action if no offending pattern found', function(){

    const user_message = new models.UserMessage('jd', 'alsdkjasl', 'hello');
    const reaction = new checker.LanguageChecker(defaultRules()).check(user_message);

    reaction.should.be.instanceOf(reactions.ReactionNone);
  });

  it('Should return DM action if offending pattern found', function(){

    const user_message = new models.UserMessage('jd', 'alsdkjasl', 'hello guys');
    const reaction = new checker.LanguageChecker(defaultRules()).check(user_message);

    reaction.should.be.instanceOf(reactions.ReactionDirectMessage);
  });
});

function defaultRules(){

  const rules = new models.Rules();
  const expression = new RegExp(/guys/);
  const reaction = new reactions.ReactionDirectMessage();

  rules.add(new models.Rule(expression, reaction));

  return rules;
}
