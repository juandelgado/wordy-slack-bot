function ReactionNone() {
}

function ReactionDirectMessage(message) {
  this.message = message;
}

// YES, this needs the user_name, sadly not the ID as per:
// https://github.com/mishk0/slack-bot-api
ReactionDirectMessage.prototype.execute = function (userName, slackBot) {
  const botMessageParams = {
    as_user: false,
    username: 'Wordy Bot',
  };

  slackBot.postMessageToUser(userName, this.message, botMessageParams);
};

module.exports = {
  ReactionNone,
  ReactionDirectMessage,
};
