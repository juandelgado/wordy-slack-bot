const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const slackGateway = require('../src/slack_gateway.js');

describe('Slack Gateway', () => {

  var sandbox, mockSlackBot, mockSuccessCallback, mockErrorCallback, gateway;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    mockThen = sandbox.spy();
    mockSuccessCallback = sandbox.spy();
    mockErrorCallback = sandbox.spy();
    mockSlackBot = {getUsers: () => {return {then: mockThen}}};
    gateway = new slackGateway.SlackGateway(mockSlackBot);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should return number of users', () => {
    gateway.getTotalUsers(mockSuccessCallback, mockErrorCallback);

    const mockUsersData = [{}, {}];
    mockThen.args[0][0]({members: mockUsersData});
    assert(mockSuccessCallback.calledWith(mockUsersData.length));
    assert(mockErrorCallback.callCount.should.be.exactly(0));
  });

  it('Should execute the error callback if something does not work', () => {
    gateway.getTotalUsers(mockSuccessCallback, mockErrorCallback);

    const error = 'SOME ERROR';
    mockThen.args[0][1](error);
    assert(mockSuccessCallback.callCount.should.be.exactly(0));
    assert(mockErrorCallback.calledWith(error));
  });
});
