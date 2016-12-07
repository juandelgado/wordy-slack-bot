const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const dataStore = require('../src/firebase_datastore.js');

describe('Firebase Data Store', function(){

  var sandbox, mockDb, mockOnce, mockRef, mockOrderByChild, mockSuccessCallback, ds;
  var mockUpdate, mockErrorCallback;

  beforeEach(function(){
    sandbox = sinon.sandbox.create();

    // Bit too much set up :|
    mockDb = {ref: function(){}};
    mockOnce = sandbox.spy();
    mockUpdate = sandbox.spy();
    mockEqualTo = sandbox.stub().returns({once: mockOnce});
    mockOrderByChild = sandbox.stub().returns({equalTo: mockEqualTo});
    mockRef = sandbox.stub(mockDb, 'ref').returns({once: mockOnce, update: mockUpdate, orderByChild: mockOrderByChild});
    mockSuccessCallback = sandbox.spy();
    mockErrorCallback = sandbox.spy();

    ds = new dataStore.FirebaseDataStore(mockDb);
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('Should call Firebase JS SDK appropiately', function(){
    ds.isUserInterested('USER_ID');

    assert(mockRef.calledWith('users/USER_ID'));
    assert(mockOnce.calledWith('value'));
  });

  it('Should return false if the user has not registered', function(){
    ds.isUserInterested('USER_ID', mockSuccessCallback);

    // Firebase returns null for data.val() if
    // no record can be found
    mockOnce.args[0][1]({val: function(){ return null;}});

    assert(mockSuccessCallback.calledWith(false));
  });

  it('Should return false if the user has opted out', function() {
    ds.isUserInterested('USER_ID', mockSuccessCallback);

    mockOnce.args[0][1](getMockDbData(false));

    assert(mockSuccessCallback.calledWith(false));
  });

  it('Should return true if the user has opted in', function(){
    ds.isUserInterested('USER_ID', mockSuccessCallback);

    // This is executing the success callback
    // passing our mocked db data
    mockOnce.args[0][1](getMockDbData(true));

    assert(mockSuccessCallback.calledWith(true));
  });

  it('Should call error callback appropiately when there is a Firebase error', function(){
    ds.isUserInterested('USER_ID', mockSuccessCallback, mockErrorCallback);

    const errorObject = {code: 'XXXXX'};

    // This is executing the error callback
    // passing the mock error object
    mockOnce.args[0][2](errorObject);

    assert(mockErrorCallback.calledWith(errorObject.code));
  });

  it('Should appropriately opt in a user', function(){
    ds.registerUser('USER_ID', true);

    assert(mockRef.calledWith('users/USER_ID'));
    assert(mockUpdate.calledWith({interested: true}));
  });

  it('Should appropriately opt out a user', function(){
    ds.registerUser('USER_ID', false);

    assert(mockRef.calledWith('users/USER_ID'));
    assert(mockUpdate.calledWith({interested: false}));
  });

  it('Should call the success callback after successful update', function(){
    ds.registerUser('USER_ID', false, mockSuccessCallback);

    mockUpdate.args[0][1]();

    assert(mockSuccessCallback.calledWithExactly());
  });

  it('Should call the error callback after unsuccessful update', function(){
    ds.registerUser('USER_ID', false, mockSuccessCallback, mockErrorCallback);

    const dbError = 'XXXXX';
    mockUpdate.args[0][1](dbError);

    assert(mockErrorCallback.calledWithExactly(dbError));
  });

  it('Should return the number of registered users', () => {
    ds.getInterestedUsers(mockSuccessCallback, mockErrorCallback);

    mockOnce.args[0][1]({val: () => {return {lol: {interested: true}, wadus: {interested: true}}}});

    assert(mockRef.calledWith('users'));
    assert(mockOrderByChild.calledWith('interested'));
    assert(mockEqualTo.calledWith(true));
    assert(mockSuccessCallback.calledWithExactly(2));
  });

  it('Should return 0 as the number of users registered if the table is empty', () => {
    ds.getInterestedUsers(mockSuccessCallback, mockErrorCallback);

    mockOnce.args[0][1]({val: () => {return null;}});
    assert(mockSuccessCallback.calledWithExactly(0));
  });

  it('Should call the error callback if cant retrive number of registered users', () => {
    ds.getInterestedUsers(mockSuccessCallback, mockErrorCallback);

    const errorObject = {code: 'XXXXX'};
    mockOnce.args[0][2](errorObject);

    assert(mockErrorCallback.calledWithExactly(errorObject.code));
  });
});

function getMockDbData(isUserInterested){
  return {val: function(){ return {interested: isUserInterested};}};
}
