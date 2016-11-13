"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// http://expressjs.com/en/advanced/best-practice-security.html

class WordyWebServer {
  constructor(storage, port, host) {
    this.storage = storage;
    this.webapp = express();
    this.webapp.use(helmet());
    this.webapp.use(bodyParser.urlencoded({ extended: true }));

    this.webapp.get('/', (req, res) => {
      res.send('WordyBot');
    });

    this.webapp.post('/slack/command', (req, res) => {

      const command = req.body.command;
      const userId = req.body.user_id;

      console.log('Command received via hook');
      console.log(`Command: ${command}`);
      console.log(`User ID: ${userId}`);

      switch (command) {
        case '/wordy-in':
          this.storage.registerUser(userId, true, () => {
            res.send('Thank you for registering.');
          }, (error) => {
            res.send(`Ooops, something went wrong: ${error}`);
          });
          break;
        case '/wordy-out':
          this.storage.registerUser(userId, false, () => {
            res.send('Sad to see you go.');
          }, (error) => {
            res.send(`Ooops, something went wrong: ${error}`);
          });
          break;
        default:
          console.error('Unknown command, ignoring');
          break;
      }
    });

    this.webapp.listen(port, host, () => {
      console.log(`Wordy Web App up and running at http://${host}:${port}`);
    });
  }
}

module.exports = {
  WordyWebServer,
};
