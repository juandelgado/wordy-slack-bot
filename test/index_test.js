const assert = require('assert');
const models = require('../src/models.js');
const reactions = require('../src/reactions.js');

describe("Message / Reaction", function(){

  it('Should return no action if no offending pattern found', function(){

    const user_message = new models.UserMessage('jd', 'alsdkjasl', 'hello');
    const action = new models.LanguageChecker(defaultRules()).check(user_message);

    assert.equal(action.type, reactions.REACTION_NONE);
  });

  it('Should return DM action if offending pattern found', function(){

    const user_message = new models.UserMessage('jd', 'alsdkjasl', 'hello guys');
    const action = new models.LanguageChecker(defaultRules()).check(user_message);

    assert.equal(action.type, reactions.REACTION_DIRECT_MESSAGE);
  });
});

function defaultRules(){

  const rules = new models.Rules();
  const expression = new RegExp(/guys/);
  const reaction = new reactions.ReactionDirectMessage();

  rules.add(new models.Rule(expression, reaction));

  return rules;
}
