const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const dataStore = require('../src/firebase_datastore.js');

describe('Firebase Data Store', function(){

  var sandbox, mock_db, mock_once, mock_ref, mock_success_callback, ds;

  beforeEach(function(){
    sandbox = sinon.sandbox.create();

    // Bit too much set up :|
    mock_db = {ref: function(){}};
    mock_once = sandbox.spy();
    mock_update = sandbox.spy();
    mock_ref = sandbox.stub(mock_db, 'ref').returns({once: mock_once, update: mock_update});
    mock_success_callback = sandbox.spy();
    mock_error_callback = sandbox.spy();

    ds = new dataStore.FirebaseDataStore(mock_db);
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('Should call Firebase JS SDK appropiately', function(){
    ds.isUserInterested('USER_ID');

    assert(mock_ref.calledWith('users/USER_ID'));
    assert(mock_once.calledWith('value'));
  });

  it('Should return false if the user has not registered', function(){
    ds.isUserInterested('USER_ID', mock_success_callback);

    // Firebase returns null for data.val() if
    // no record can be found
    mock_once.args[0][1]({val: function(){ return null;}});

    assert(mock_success_callback.calledWith(false));
  });

  it('Should return false if the user has opted out', function() {
    ds.isUserInterested('USER_ID', mock_success_callback);

    mock_once.args[0][1](getMockDbData(false));

    assert(mock_success_callback.calledWith(false));
  });

  it('Should return true if the user has opted in', function(){
    ds.isUserInterested('USER_ID', mock_success_callback);

    // This is executing the success callback
    // passing our mocked db data
    mock_once.args[0][1](getMockDbData(true));

    assert(mock_success_callback.calledWith(true));
  });

  it('Should call error callback appropiately when there is a Firebase error', function(){
    ds.isUserInterested('USER_ID', mock_success_callback, mock_error_callback);

    const errorObject = {code: 'XXXXX'};

    // This is executing the error callback
    // passing the mock error object
    mock_once.args[0][2](errorObject);

    assert(mock_error_callback.calledWith(errorObject.code));
  });

  it('Should appropriately opt in a user', function(){
    ds.registerUser('USER_ID', true);

    assert(mock_ref.calledWith('users/USER_ID'));
    assert(mock_update.calledWith({interested: true}));
  });

  it('Should appropriately opt out a user', function(){
    ds.registerUser('USER_ID', false);

    assert(mock_ref.calledWith('users/USER_ID'));
    assert(mock_update.calledWith({interested: false}));
  });

  it('Should call the success callback after successful update', function(){
    ds.registerUser('USER_ID', false, mock_success_callback);

    mock_update.args[0][1]();

    assert(mock_success_callback.calledWithExactly());
  });

  it('Should call the error callback after unsuccessful update', function(){
    ds.registerUser('USER_ID', false, mock_success_callback, mock_error_callback);

    const db_error = 'XXXXX';
    mock_update.args[0][1](db_error);

    assert(mock_error_callback.calledWithExactly(db_error));
  });
});

function getMockDbData(isUserInterested){
  return {val: function(){ return {interested: isUserInterested};}};
}
