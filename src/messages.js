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

module.exports = {
  UserMessage,
  NoMessage,
};
