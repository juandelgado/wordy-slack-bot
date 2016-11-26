'use strict';

const firebase = require('firebase-admin');

function trackEvent(db, path, value) {
  db.ref(path).push(value, (error) => {
    if (error) {
      console.error(`Unable to track ${path}. Firebase error: ${error}`);
    }
  });
}

// Server side time stamp, more here:
// https://firebase.google.com/docs/reference/android/com/google/firebase/database/ServerValue.html#TIMESTAMP
function t() {
  return firebase.database.ServerValue.TIMESTAMP;
}

class FirebaseAnalytics {
  constructor(db) {
    this.db = db;
  }

  trackCommand(command) {
    trackEvent(this.db, '/analytics/commands', { command, timestamp: t() });
  }

  trackUsers(total, interested) {
    trackEvent(this.db, '/analytics/users', { total, interested, timestamp: t() });
  }

  trackTerm(term, isInterested) {
    trackEvent(this.db, '/analytics/terms', { term, isInterested, timestamp: t() });
  }
}

module.exports = {
  FirebaseAnalytics,
};
