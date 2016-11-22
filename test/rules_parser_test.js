const assert = require('assert');
const should = require('should');
const rules = require('../src/rules.js');

describe('Rules', () => {

  it('Should properly parse rules', () => {

    const rulesJson = {
    	"rules": [{
    		"term": "crazy",
    		"reaction": "Please dont say crazy"
    	}, {
    		"term": "mad",
    		"reaction": "Please dont say mad"
    	}]
    };

    const parsedRules = rules.rulesFromJson(rulesJson);

    assert(parsedRules.length().should.be.exactly(2));
    assert(parsedRules.rules[0].expression.test('crazy').should.be.true());
    assert(parsedRules.rules[0].reaction.message.should.be.exactly('Please dont say crazy'));
    assert(parsedRules.rules[1].expression.test('mad').should.be.true());
    assert(parsedRules.rules[1].reaction.message.should.be.exactly('Please dont say mad'));
  });

  it('Should ignore rules without a term', () => {
    const rulesJson = {
    	"rules": [{
    		"reaction": "Please dont say crazy"
    	}, {
    		"term": "mad",
    		"reaction": "Please dont say mad"
    	}]
    };

    const parsedRules = rules.rulesFromJson(rulesJson);
    assert(parsedRules.length().should.be.exactly(1));
  });

  it('Should ignore rules without a reaction', () => {
    const rulesJson = {
    	"rules": [{
    		"term": "crazy",
    	}, {
    		"term": "mad",
    		"reaction": "Please dont say mad"
    	}]
    };

    const parsedRules = rules.rulesFromJson(rulesJson);
    assert(parsedRules.length().should.be.exactly(1));
  });

  it('Should throw if no rules provided', () => {

    // No JSON
    assert.throws(() => {
      rules.rulesFromJson();
    },
    checkError);

    // Empty JSON
    assert.throws(() => {
      rules.rulesFromJson({});
    },
    checkError);

    // JSON with empty rules
    assert.throws(() => {
      rules.rulesFromJson({rules: []});
    },
    checkError);

    // JSON with only invalid rules
    assert.throws(() => {
      rules.rulesFromJson({rules: [{term: 'LOL'}, {reaction: 'LOL'}]});
    },
    checkError);
  });
});

function checkError(error) {
  if (error instanceof Error && /No rules found/.test(error)) {
    return true;
  }
}
