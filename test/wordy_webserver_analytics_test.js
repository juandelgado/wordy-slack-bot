const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const serverAnalytics = require('../src/wordy_webserver_analytics.js');

describe('Wordy WebServer Analytics', () => {

  var mockRequest, mockResponse, mockNextCallback, mockAnalytics;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    mockRequest = {body: {command: 'wadus'}};
    mockResponse = sandbox.spy();
    mockNextCallback = sandbox.spy();
    mockAnalyticsTrackCommand = sandbox.spy();
    mockAnalytics = {trackCommand: mockAnalyticsTrackCommand};
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should properly track the command', () => {
    const mid = serverAnalytics.trackCommand(mockAnalytics);
    mid(mockRequest, mockResponse, mockNextCallback);

    assert(mockAnalyticsTrackCommand.calledWith(mockRequest.body.command));
    assert(mockNextCallback.called);
  });

  it('Should call next middleware function even if no command found', () => {
    mockRequest = {body : {}};
    const mid = serverAnalytics.trackCommand(mockAnalytics);
    mid(mockRequest, mockResponse, mockNextCallback);

    assert(mockAnalyticsTrackCommand.callCount.should.be.exactly(0));
    assert(mockNextCallback.called);
  });
});
