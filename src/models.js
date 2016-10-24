function UserMessage(userId, text) {
  this.userId = userId;
  this.text = text;
}

UserMessage.prototype.equals = function (message) {
  return this.userId === message.userId &&
    this.text === message.text;
};

function NoMessage() {

}

function Rule(expression, reaction) {
  this.expression = expression;
  this.reaction = reaction;
}

function Rules() {
  this.rules = [];
}

Rules.prototype.add = function (rule) {
  this.rules.push(rule);
};

module.exports = {
  UserMessage,
  NoMessage,
  Rules,
  Rule,
};
