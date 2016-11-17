'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// http://expressjs.com/en/advanced/best-practice-security.html
const response = require('./wordy_webserver_response.js');

class WordyWebServer {
  constructor(storage, port, host) {
    this.storage = storage;
    this.webapp = express();
    this.webapp.use(helmet());
    this.webapp.use(bodyParser.urlencoded({ extended: true }));

    const webResponse = new response.WebServerResponse(storage);

    this.webapp.get('/', (req, res) => {
      res.send(response.WebServerResponse.getHome());
    });

    this.webapp.post('/slack/command', (req, res) => {
      webResponse.processCommand(req, (commandResponse) => {
        res.send(commandResponse);
      });
    });

    this.webapp.listen(port, host, () => {
      console.log(`Wordy Web App up and running at http://${host}:${port}`);
    });
  }
}

module.exports = {
  WordyWebServer,
};
