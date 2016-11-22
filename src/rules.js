'use strict';

const reactions = require('./reactions.js');

class Rule {
  constructor(expression, reaction) {
    this.expression = expression;
    this.reaction = reaction;
  }
}

class Rules {
  constructor() {
    this.rules = [];
  }

  add(rule) {
    this.rules.push(rule);
  }

  length() {
    return this.rules.length;
  }
}

function rulesFromJson(json) {
  if (!json || !json.rules || json.rules.length <= 0) {
    throw new Error('No rules found');
  }

  const rules = new Rules();

  json.rules.map((entry) => {
    if (entry.term && entry.reaction) {
      rules.add(
        new Rule(
          new RegExp(entry.term),
          new reactions.ReactionDirectMessage(entry.reaction)
        )
      );
    }

    return entry;
  });

  if (rules.length() <= 0) {
    throw new Error('No rules found');
  }

  return rules;
}

module.exports = {
  rulesFromJson,
  Rules,
  Rule,
};
