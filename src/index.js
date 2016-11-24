'use strict';

const SlackBot = require('slackbots');
const firebase = require('firebase-admin');
const fs = require('fs');
const bots = require('./wordy_bot.js');
const servers = require('./wordy_webserver.js');
const rules = require('./rules.js');
const dataStore = require('./firebase_datastore.js');

// Pull relevant ENV vars into constants
const { FIREBASE_PROJECT_ID,
        FIREBASE_CLIENT_EMAIL,
        FIREBASE_PRIVATE_KEY,
        FIREBASE_DB_URL,
        SLACK_TOKEN,
        SLACK_COMMAND_TOKEN,
        SLACK_TEAM_ID,
        WORDY_WEBSERVER_PORT,
        WORDY_WEBSERVER_HOST,
        PORT,
        } = process.env;

console.log(FIREBASE_PROJECT_ID);

firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/(\\n)/g, '\n'),
  }),
  databaseURL: FIREBASE_DB_URL,
});

const ds = new dataStore.FirebaseDataStore(firebase.database());

// TODO: error out if no token found
const slackBot = new SlackBot({
  token: SLACK_TOKEN,
});

const rulesJson = JSON.parse(fs.readFileSync('./config.json', { encoding: 'utf8' }));
const wordyRules = rules.rulesFromJson(rulesJson);

/* eslint-disable no-new */
// While I understand the rule, I really prefer to have a class
// and and instance here for consistency with the rest of the code.
new bots.WordyBot(ds, slackBot, wordyRules);

const webServerPort = PORT || WORDY_WEBSERVER_PORT || 33333;
const webServerHost = WORDY_WEBSERVER_HOST || '0.0.0.0';
const slackCommandToken = SLACK_COMMAND_TOKEN;
const slackTeamId = SLACK_TEAM_ID;

new servers.WordyWebServer(ds, webServerPort, webServerHost, slackCommandToken, slackTeamId);
