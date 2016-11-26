'use strict';

class SlackGateway {
  constructor(slackBot) {
    this.slackBot = slackBot;
  }

  getTotalUsers(successCallback, errorCallback) {
    this.slackBot.getUsers().then((usersData) => {
      successCallback(usersData.members.length);
    }, (error) => {
      errorCallback(error);
    });
  }
}

module.exports = {
  SlackGateway,
};
