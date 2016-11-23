'use strict';

const moment = require('moment');

// Private, not exported
function userIn(storage, userId, callback) {
  storage.registerUser(userId, true, () => {
    console.log(`User ${userId} successfully registered`);
    callback('Thank you for registering.');
  }, (error) => {
    console.error(`Error trying to register user ${userId}, error: ${error}`);
    callback(`Ooops, something went wrong: ${error}`);
  });
}

function userOut(storage, userId, callback) {
  storage.registerUser(userId, false, () => {
    console.log(`User ${userId} successfully unregistered`);
    callback('Sorry to see you go.');
  }, (error) => {
    console.error(`Error trying to unregister user ${userId}, error: ${error}`);
    callback(`Ooops, something went wrong: ${error}`);
  });
}

function ping(storage, userId, callback) {
  callback(`Pong! Alive since ${moment.duration(process.uptime() * 1000).humanize()}`);
}

function processCommand(storage, req, callback) {
  const command = req.body.command;
  const userId = req.body.user_id;

  console.log('Command received');
  console.log(`Command: ${command}`);
  console.log(`User ID: ${userId}`);

  const commandMap = {
    '/wordy-in': userIn,
    '/wordy-out': userOut,
    '/wordy-ping': ping,
  };

  const isValidCommand = Object.keys(commandMap).some(x => command === x);

  if (isValidCommand) {
    commandMap[command](storage, userId, callback);
  } else {
    console.warn('Unknown command, ignoring');
    callback('Unknown command.');
  }
}

function homeResponse() {
  return 'WordyBot';
}

module.exports = {
  homeResponse,
  processCommand,
};
