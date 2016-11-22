const assert = require('assert');
const should = require('should');
const messages = require('../src/messages.js');
const reactions = require('../src/reactions.js');
const checker = require('../src/language_checker.js');
const rules = require('../src/rules.js');

describe("Message / Reaction", function(){

  it('Should return no action if no offending pattern found', function(){

    const user_message = new messages.UserMessage('alsdkjasl', 'hello');
    const reaction = new checker.LanguageChecker(defaultRules()).check(user_message);

    reaction.should.be.instanceOf(reactions.ReactionNone);
  });

  it('Should return DM action if offending pattern found', function(){

    const user_message = new messages.UserMessage('alsdkjasl', 'hello guys');
    const reaction = new checker.LanguageChecker(defaultRules()).check(user_message);

    reaction.should.be.instanceOf(reactions.ReactionDirectMessage);
  });
});

function defaultRules(){

  const defRules = new rules.Rules();
  const expression = new RegExp(/guys/);
  const reaction = new reactions.ReactionDirectMessage();

  defRules.add(new rules.Rule(expression, reaction));

  return defRules;
}
