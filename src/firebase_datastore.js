'use strict';

// Reference:
// https://firebase.google.com/docs/database/admin/start

class FirebaseDataStore {
  constructor(db) {
    this.db = db;
  }

  isUserInterested(userId, successCallback, errorCallback) {
    this.db.ref(`users/${userId}`).once('value', (data) => {
      if (successCallback) {
        const userData = data.val();
        const interested = (userData != null) ? userData.interested : false;
        successCallback(interested);
      }
    }, (errorObject) => {
      console.log(`Firebase DataStore error: ${errorObject}`);
      if (errorCallback) {
        errorCallback(errorObject.code);
      }
    });
  }

  registerUser(userId, isInterested, successCallback, errorCallback) {
    this.db.ref(`users/${userId}`).update({ interested: isInterested }, (error) => {
      if (error) {
        if (errorCallback) {
          errorCallback(error);
        }
      } else if (successCallback) {
        successCallback();
      }
    });
  }

  getInterestedUsers(successCallback, errorCallback) {
    this.db.ref('users').orderByChild('interested').equalTo(true).once('value', (data) => {
      if (successCallback) {
        let totalRegisteredUsers = 0;
        if (data.val() != null) {
          totalRegisteredUsers = Object.keys(data.val()).length;
        }
        successCallback(totalRegisteredUsers);
      }
    }, (errorObject) => {
      console.log(`Firebase DataStore error: ${errorObject}`);
      if (errorCallback) {
        errorCallback(errorObject.code);
      }
    });
  }
}

module.exports = {
  FirebaseDataStore,
};
