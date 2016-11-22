'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// http://expressjs.com/en/advanced/best-practice-security.html
const response = require('./wordy_webserver_response.js');
const auth = require('./wordy_webserver_auth.js');

class WordyWebServer {
  constructor(storage, port, host, slackCommandToken, slackTeamId) {
    const webapp = express();
    webapp.use(helmet());
    webapp.use(bodyParser.urlencoded({ extended: true }));

    const router = express.Router();
    router.post('/slack/command', auth.validateCommand(slackCommandToken, slackTeamId));
    webapp.use('/', router);

    webapp.get('/', (req, res) => {
      res.send(response.homeResponse());
    });

    webapp.post('/slack/command', (req, res) => {
      response.processCommand(storage, req, (commandResponse) => {
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
