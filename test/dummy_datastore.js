'use strict';

class DummyDataStore {
  constructor() {
  }

  isUserInterested(userId, successCallback, errorCallback) {
    successCallback(true);
  }

  registerUser(userId, isInterested, successCallback, errorCallback) {
    successCallback();
  }

  getInterestedUsers(successCallback, errorCallback) {
    successCallback(5);
  }
}

module.exports = {
  DummyDataStore,
};
