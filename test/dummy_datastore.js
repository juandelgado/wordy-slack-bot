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
}

module.exports = {
  DummyDataStore,
};
