"use strict"

const SlackBot = require('slackbots');
const firebase = require('firebase-admin');
const bots = require('./wordy_bot.js');
const servers = require('./wordy_webserver.js');
const models = require('./models.js');
const reactions = require('./reactions.js');
const dataStore = require('./firebase_datastore.js');

firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/(\\n)/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DB_URL
});

const ds = new dataStore.FirebaseDataStore(firebase.database());

// TODO: error out if no token found
const slackBot = new SlackBot({
  token: process.env.SLACK_TOKEN,
});

const rules = new models.Rules();

// TODO: this should obs come from some JSON config or similar
const expression = new RegExp(/guys/);
const reaction = new reactions.ReactionDirectMessage('Guys is not cool');
rules.add(new models.Rule(expression, reaction));

/* eslint-disable no-new */
// While I understand the rule, I really prefer to have a class
// and and instance here for consistency with the rest of the code.
new bots.WordyBot(ds, slackBot, rules);

const webServerPort = process.env.PORT || process.env.WORDY_WEBSERVER_PORT || 33333;
const webServerHost = process.env.WORDY_WEBSERVER_HOST || '0.0.0.0';

new servers.WordyWebServer(ds, webServerPort, webServerHost);
