'use strict';

class DummySlackGateway {
  constructor() {
  }

  getTotalUsers(successCallback, errorCallback) {
    successCallback(5);
  }
}

module.exports = {
  DummySlackGateway,
};
