const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const SlackBot = require('slackbots');
const bots = require('../src/wordy_bot.js');

describe('WordyBot', function(){

  it('Should subscribe to message events', function(){

    const slackBot = new SlackBot({token: 'XXX'});

    sinon.spy(slackBot, 'on');

    const bot = new bots.WordyBot(null, slackBot, null);

    assert(slackBot.on.calledWith('message'));

    slackBot.on.restore();
  });
});
