'use strict';

const SlackBot = require('slackbots');
const firebase = require('firebase-admin');
const fs = require('fs');
const bots = require('./wordy_bot.js');
const servers = require('./wordy_webserver.js');
const rules = require('./rules.js');
const dataStore = require('./firebase_datastore.js');
const analytics = require('./firebase_analytics.js');
const slackGateway = require('./slack_gateway.js');

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

firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/(\\n)/g, '\n'),
  }),
  databaseURL: FIREBASE_DB_URL,
});

const firebaseDataBase = firebase.database();
const firebaseDataStore = new dataStore.FirebaseDataStore(firebaseDataBase);
const firebaseAnalytics = new analytics.FirebaseAnalytics(firebaseDataBase);

// TODO: error out if no token found
const slackBot = new SlackBot({
  token: SLACK_TOKEN,
});

const gateway = new slackGateway.SlackGateway(slackBot);

const rulesJson = JSON.parse(fs.readFileSync('./config.json', { encoding: 'utf8' }));
const wordyRules = rules.rulesFromJson(rulesJson);

/* eslint-disable no-new */
// While I understand the rule, I really prefer to have a class
// and and instance here for consistency with the rest of the code.
new bots.WordyBot(firebaseDataStore, firebaseAnalytics, slackBot, wordyRules);

const webServerPort = PORT || WORDY_WEBSERVER_PORT || 33333;
const webServerHost = WORDY_WEBSERVER_HOST || '0.0.0.0';
const slackCommandToken = SLACK_COMMAND_TOKEN;
const slackTeamId = SLACK_TEAM_ID;

new servers.WordyWebServer(
  gateway,
  firebaseDataStore, firebaseAnalytics,
  webServerPort, webServerHost,
  slackCommandToken, slackTeamId);
