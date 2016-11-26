const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const firebase = require('firebase-admin');
const analytics = require('../src/firebase_analytics.js');

describe('Firebase Analytics', () => {

  var sandbox, mockDb, mockPush, mockRef, fbAnalytics;

  beforeEach(function(){
    sandbox = sinon.sandbox.create();

    mockDb = {ref: function(){}};
    mockPush = sandbox.spy();
    mockRef = sandbox.stub(mockDb, 'ref').returns({push: mockPush});

    fbAnalytics = new analytics.FirebaseAnalytics(mockDb);
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('Should track commands', () => {
    const command = '/wadus';
    fbAnalytics.trackCommand(command);

    assert(mockRef.calledWith('/analytics/commands'));
    assert(mockPush.calledWith({command: command, timestamp: firebase.database.ServerValue.TIMESTAMP}));
  });

  it('Should track terms', () => {
    const term = 'guys';
    const isInterested = true;
    fbAnalytics.trackTerm(term, isInterested);

    assert(mockRef.calledWith('/analytics/terms'));
    assert(mockPush.calledWith({term: term, isInterested: isInterested, timestamp: firebase.database.ServerValue.TIMESTAMP}));
  });

  it('Should track users', () => {
    const total = 56;
    const interested = 34;
    fbAnalytics.trackUsers(total, interested);

    assert(mockRef.calledWith('/analytics/users'));
    assert(mockPush.calledWith({total: total, interested: interested, timestamp: firebase.database.ServerValue.TIMESTAMP}));
  });
});
