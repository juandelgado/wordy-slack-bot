'use strict';

const moment = require('moment');

function reportError(error, responseCallback) {
  responseCallback(`Ooops, something went wrong: ${error}`);
}

function getInterestedUsersSuccess(analytics, totalUsers, responseCallback, message) {
  return (totalRegisteredUsers) => {
    console.log(`Found ${totalRegisteredUsers} interested users`);
    analytics.trackUsers(totalUsers, totalRegisteredUsers);
    responseCallback(message);
  };
}

function getInterestedUsersError(responseCallback) {
  return (error) => {
    console.error(`Error trying to get total interested users, error: ${error}`);
    reportError(error, responseCallback);
  };
}

function getTotalUsersSuccess(analytics, storage, responseCallback, message) {
  return (totalUsers) => {
    console.log(`Found ${totalUsers} users in Slack`);
    storage.getInterestedUsers(getInterestedUsersSuccess(analytics,
                                                          totalUsers,
                                                          responseCallback,
                                                          message),
                              getInterestedUsersError(responseCallback));
  };
}

function getTotalUsersError(responseCallback) {
  return (error) => {
    console.error(`Error trying to get total Slack users: ${error}`);
    reportError(error, responseCallback);
  };
}

function successRegister(gateway, analytics, storage, responseCallback, message) {
  return () => {
    console.log('User successfully updated');
    gateway.getTotalUsers(getTotalUsersSuccess(analytics, storage, responseCallback, message),
                          getTotalUsersError(responseCallback));
  };
}

function failedRegister(responseCallback) {
  return (error) => {
    console.error(`Error trying to update user, error: ${error}`);
    reportError(error, responseCallback);
  };
}

function userIn(gateway, analytics, storage, userId, callback) {
  storage.registerUser(userId, true,
                        successRegister(gateway, analytics, storage, callback, 'Thank you for registering.'),
                        failedRegister(callback));
}

function userOut(gateway, analytics, storage, userId, callback) {
  storage.registerUser(userId, false,
                        successRegister(gateway, analytics, storage, callback, 'Sorry to see you go.'),
                        failedRegister(callback));
}

function ping(callback) {
  callback(`Pong! Alive since ${moment.duration(process.uptime() * 1000).humanize()}`);
}

function processCommand(gateway, analytics, storage, req, callback) {
  const command = req.body.command;
  const userId = req.body.user_id;

  console.log(`Command: ${command}`);

  // We are wrapping the actual callbacks so they can have
  // different method signatures.
  const commandMap = {
    '/wordy-in': () => userIn(gateway, analytics, storage, userId, callback),
    '/wordy-out': () => userOut(gateway, analytics, storage, userId, callback),
    '/wordy-ping': () => ping(callback),
  };

  const isValidCommand = Object.keys(commandMap).some(x => command === x);

  if (isValidCommand) {
    commandMap[command]();
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
