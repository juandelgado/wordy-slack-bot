'use strict';

class WebServerResponse {
  constructor(storage) {
    this.storage = storage;
  }

  static getHome() {
    return 'WordyBot';
  }

  processCommand(req, callback) {
    const command = req.body.command;
    const userId = req.body.user_id;

    console.log('Command received');
    console.log(`Command: ${command}`);
    console.log(`User ID: ${userId}`);

    switch (command) {
      case '/wordy-in':
        this.userIn(userId, callback);
        break;
      case '/wordy-out':
        this.userOut(userId, callback);
        break;
      default:
        console.warn('Unknown command, ignoring');
        callback('Unknown command.');
        break;
    }
  }

  userIn(userId, callback) {
    this.storage.registerUser(userId, true, () => {
      console.log(`User ${userId} successfully registered`);
      callback('Thank you for registering.');
    }, (error) => {
      console.error(`Error trying to register user ${userId}, error: ${error}`);
      callback(`Ooops, something went wrong: ${error}`);
    });
  }

  userOut(userId, callback) {
    this.storage.registerUser(userId, false, () => {
      console.log(`User ${userId} successfully unregistered`);
      callback('Sorry to see you go.');
    }, (error) => {
      console.error(`Error trying to unregister user ${userId}, error: ${error}`);
      callback(`Ooops, something went wrong: ${error}`);
    });
  }
}

module.exports = {
  WebServerResponse,
};
