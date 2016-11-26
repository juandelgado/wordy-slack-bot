'use strict';

class DummyAnalytics {
  constructor() {
  }

  trackCommand(command) {
  }

  trackUsers(total, interested) {
  }

  trackTerm(term, isInterested) {
  }
}

module.exports = {
  DummyAnalytics,
};
