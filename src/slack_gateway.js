'use strict';

class SlackGateway {
  constructor(slackBot) {
    this.slackBot = slackBot;
  }

  getTotalUsers(successCallback, errorCallback) {
    this.slackBot.getUsers().then((usersData) => {
      successCallback(usersData.members.length);
    }, errorCallback);
  }
}

module.exports = {
  SlackGateway,
};
