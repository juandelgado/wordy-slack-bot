'use strict';

class UserMessage {
  constructor(userId, text) {
    this.userId = userId;
    this.text = text;
  }

  equals(message) {
    return this.userId === message.userId &&
      this.text === message.text;
  }
}

class NoMessage {
}

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
}

module.exports = {
  UserMessage,
  NoMessage,
  Rules,
  Rule,
};
