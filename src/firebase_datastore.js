"use strict"

class FirebaseDataStore {
  constructor(db){
    this.db = db;
  }

  isUserInterested(userId, successCallback, errorCallback) {
    this.db.ref(`users/${userId}`).once('value', function(data) {
      const userData = data.val();
      const interested = (userData != null)? userData.interested : false;
      successCallback(interested);
    }, function(errorObject) {
      console.log("Firebase DataStore error: " + errorObject);
      errorCallback(errorObject.code);
    });
  }
}

module.exports = {
  FirebaseDataStore,
};
