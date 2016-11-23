const assert = require('assert');
const should = require('should');
const request = require('supertest');
const server = require('../src/wordy_webserver.js');
const storage = require('../test/dummy_datastore.js');

// This is outside testing (booting up the server, making actual HTTP calls)
// particularly around authentication
// Reference:
// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/

// NOTE: all responses to Slack commands expect 200 status
// https://api.slack.com/slash-commands
describe('Wordy WebServer', () => {

  var webServer;
  const HOST = '0.0.0.0';
  const PORT = 9999;
  const BASE_URL = `http://${HOST}:${PORT}`;
  const SLACK_COMMAND_TOKEN = 'SOME_SLACK_COMMAND_TOKEN';
  const SLACK_TEAM_ID = 'SOME_SLACK_TEAM_ID';

  beforeEach(() => {
    webServer = new server.WordyWebServer(new storage.DummyDataStore(), PORT, HOST, SLACK_COMMAND_TOKEN, SLACK_TEAM_ID);
  });

  afterEach((done) => {
    webServer.close(done);
  });

  it('Should accept a valid command request', (done) => {
    request(BASE_URL)
    .post('/slack/command')
    .type('form')
    .send({
      token: SLACK_COMMAND_TOKEN,
      team_id: SLACK_TEAM_ID,
      command: '/wordy-in',
      user_id: 'wadus',
    })
    .expect(200, 'Thank you for registering.', done);
  });

  it('Should refuse request with invalid SLACK TOKEN', (done) => {
    request(BASE_URL)
    .post('/slack/command')
    .type('form')
    .send({
      token: 'LOL',
      team_id: SLACK_TEAM_ID,
      command: '/wordy-in',
      user_id: 'wadus',
    })
    .expect(200, 'Unvalid SLACK COMMAND TOKEN and / or SLACK TEAM ID', done);
  });

  it('Should refuse request with invalid SLACK TEAM ID', (done) => {
    request(BASE_URL)
    .post('/slack/command')
    .type('form')
    .send({
      token: SLACK_COMMAND_TOKEN,
      team_id: 'LOL',
      command: '/wordy-in',
      user_id: 'wadus',
    })
    .expect(200, 'Unvalid SLACK COMMAND TOKEN and / or SLACK TEAM ID', done);
  });

  it('Should refuse request without SLACK TOKEN', (done) => {
    request(BASE_URL)
    .post('/slack/command')
    .type('form')
    .send({
      team_id: SLACK_TEAM_ID,
      command: '/wordy-in',
      user_id: 'wadus',
    })
    .expect(200, 'Unvalid SLACK COMMAND TOKEN and / or SLACK TEAM ID', done);
  });

  it('Should refuse request without SLACK TEAM ID', (done) => {
    request(BASE_URL)
    .post('/slack/command')
    .type('form')
    .send({
      token: SLACK_COMMAND_TOKEN,
      command: '/wordy-in',
      user_id: 'wadus',
    })
    .expect(200, 'Unvalid SLACK COMMAND TOKEN and / or SLACK TEAM ID', done);
  });

  it('Should respond to a PING command with uptime', (done) => {
    request(BASE_URL)
    .post('/slack/command')
    .type('form')
    .send({
      token: SLACK_COMMAND_TOKEN,
      team_id: SLACK_TEAM_ID,
      command: '/wordy-ping',
    })
    .expect(200, /Pong! Alive since /, done);
  });
});
