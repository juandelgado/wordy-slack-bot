'use strict';

const firebase = require('firebase-admin');

// Server side time stamp, more here:
// https://firebase.google.com/docs/reference/android/com/google/firebase/database/ServerValue.html#TIMESTAMP
const timestamp = firebase.database.ServerValue.TIMESTAMP;

function trackEvent(db, path, value) {
  db.ref(path).push(value, (error) => {
    if (error) {
      console.error(`Unable to track ${path}. Firebase error: ${error}`);
    }
  });
}

class FirebaseAnalytics {
  constructor(db) {
    this.db = db;
  }

  trackCommand(command) {
    trackEvent(this.db, '/analytics/commands', { command, timestamp });
  }

  trackUsers(total, interested) {
    trackEvent(this.db, '/analytics/users', { total, interested, timestamp });
  }

  trackTerm(term, isInterested) {
    trackEvent(this.db, '/analytics/terms', { term, isInterested, timestamp });
  }
}

module.exports = {
  FirebaseAnalytics,
};
