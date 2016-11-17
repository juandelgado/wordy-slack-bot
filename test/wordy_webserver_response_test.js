const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const response = require('../src/wordy_webserver_response.js');

describe('Wordy WebServer Response', () => {
  var mock_dataStore, mock_registerUser, mock_InRequest, mock_OutRequest, webResponse, userId, errorId;

  beforeEach(function(){
    sandbox = sinon.sandbox.create();

    mock_dataStore = {registerUser: () => {}};
    mock_registerUser = sandbox.stub(mock_dataStore, 'registerUser');
    mock_commandCallback = sandbox.spy();
    mock_InRequest = {body: {command: '/wordy-in', user_id: userId}};
    mock_OutRequest = {body: {command: '/wordy-out', user_id: userId}};
    mock_UnknownRequest = {body: {command: '/wadus'}};
    webResponse = new response.WebServerResponse(mock_dataStore);
    userId = 'XXXX';
    errorId = 'ERROR_XXXX';
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('Should display a nice homepage', () => {
    should.equal(response.WebServerResponse.getHome(), 'WordyBot');
  });

  it('Should register a user', () => {
    webResponse.processCommand(mock_InRequest, mock_commandCallback);

    mock_registerUser.args[0][2]();

    assert(mock_registerUser.calledWith(userId, true));
    assert(mock_commandCallback.calledWith('Thank you for registering.'));
  });

  it('Should unregister a user', () => {
    webResponse.processCommand(mock_OutRequest, mock_commandCallback);

    mock_registerUser.args[0][2]();

    assert(mock_registerUser.calledWith(userId, false));
    assert(mock_commandCallback.calledWith('Sorry to see you go.'));
  });

  it('Should inform the user if there is trouble when opting-in', () => {
    webResponse.processCommand(mock_InRequest, mock_commandCallback);

    mock_registerUser.args[0][3](errorId);
    assert(mock_commandCallback.calledWith(`Ooops, something went wrong: ${errorId}`));
  });

  it('Should inform the user if there is trouble when opting-out', () => {
    webResponse.processCommand(mock_OutRequest, mock_commandCallback);

    mock_registerUser.args[0][3](errorId);
    assert(mock_commandCallback.calledWith(`Ooops, something went wrong: ${errorId}`));
  });

  it('Should warn when not knowing what to do with a command', () => {
    webResponse.processCommand(mock_UnknownRequest, mock_commandCallback);

    assert(mock_commandCallback.calledWith('Unknown command.'));
  });
});
