'use strict';

const express = require('express');
const bodyParser = require('body-parser');
// http://expressjs.com/en/advanced/best-practice-security.html
const helmet = require('helmet');
const response = require('./wordy_webserver_response.js');
const serverAuth = require('./wordy_webserver_auth.js');
const serverAnalytics = require('./wordy_webserver_analytics.js');

class WordyWebServer {
  constructor(gateway, storage, analytics, port, host, slackCommandToken, slackTeamId) {
    const webapp = express();
    webapp.use(helmet());
    webapp.use(bodyParser.urlencoded({ extended: true }));

    const router = express.Router();
    router.post('/slack/command', serverAnalytics.trackCommand(analytics));
    router.post('/slack/command', serverAuth.validateCommand(slackCommandToken, slackTeamId));
    webapp.use('/', router);

    webapp.get('/', (req, res) => {
      res.send(response.homeResponse());
    });

    webapp.post('/slack/command', (req, res) => {
      response.processCommand(gateway, analytics, storage, req, (commandResponse) => {
        res.send(commandResponse);
      });
    });

    this.server = webapp.listen(port, host, () => {
      console.log(`Wordy Web App up and running at http://${host}:${port}`);
    });
  }

  close(done) {
    this.server.close(done);
  }
}

module.exports = {
  WordyWebServer,
};
