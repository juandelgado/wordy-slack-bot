const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const response = require('../src/wordy_webserver_response.js');
const analytics = require('../test/dummy_analytics.js');
const slackGateway = require('../test/dummy_slack_gateway.js');

describe('Wordy WebServer Response', () => {
  var mockDataStore, mockRegisterUser, mockInRequest, mockOutRequest, mockUnknownRequest, mockCommandCallback, userId, errorId;

  beforeEach(function(){
    sandbox = sinon.sandbox.create();

    userId = 'XXXX';
    errorId = 'ERROR_XXXX';
    mockDataStore = {registerUser: () => {}, getInterestedUsers: (successCallback, errorCallback) => { successCallback(5)}};
    mockRegisterUser = sandbox.stub(mockDataStore, 'registerUser');
    mockInRequest = {body: {command: '/wordy-in', user_id: userId}};
    mockOutRequest = {body: {command: '/wordy-out', user_id: userId}};
    mockUnknownRequest = {body: {command: '/wadus'}};
    mockCommandCallback = sinon.spy();
    mockGateway = new slackGateway.DummySlackGateway();
    mockAnalytics = new analytics.DummyAnalytics();
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('Should display a nice homepage', () => {
    should.equal(response.homeResponse(), 'WordyBot');
  });

  it('Should register a user', () => {
    response.processCommand(mockGateway, mockAnalytics, mockDataStore, mockInRequest, mockCommandCallback);

    mockRegisterUser.args[0][2]();

    assert(mockRegisterUser.calledWith(userId, true));
    assert(mockCommandCallback.calledWith('Thank you for registering.'));
  });

  it('Should unregister a user', () => {
    response.processCommand(mockGateway, mockAnalytics, mockDataStore, mockOutRequest, mockCommandCallback);

    mockRegisterUser.args[0][2]();

    assert(mockRegisterUser.calledWith(userId, false));
    assert(mockCommandCallback.calledWith('Sorry to see you go.'));
  });

  it('Should inform the user if there is trouble when opting-in', () => {
    response.processCommand(mockGateway, mockAnalytics, mockDataStore, mockInRequest, mockCommandCallback);

    mockRegisterUser.args[0][3](errorId);
    assert(mockCommandCallback.calledWith(`Ooops, something went wrong: ${errorId}`));
  });

  it('Should inform the user if there is trouble when opting-out', () => {
    response.processCommand(mockGateway, mockAnalytics, mockDataStore, mockOutRequest, mockCommandCallback);

    mockRegisterUser.args[0][3](errorId);
    assert(mockCommandCallback.calledWith(`Ooops, something went wrong: ${errorId}`));
  });

  it('Should warn when not knowing what to do with a command', () => {
    response.processCommand(mockGateway, mockAnalytics, mockDataStore, mockUnknownRequest, mockCommandCallback);

    assert(mockCommandCallback.calledWith('Unknown command.'));
  });
});
