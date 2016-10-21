const assert = require('assert');
const should = require('should');
const models = require('../src/models.js');
const handler = require('../src/message_handler.js');

describe("Message handler", function(){

  it('Should return user messages coming from Slack', function(){

    const slack_data = {
      type: 'message',
      user: 'user_id',
      text: 'TEXT'
    };

    const message_handler = new handler.MessageHandler();
    const user_message = message_handler.getUserMessage(slack_data);

    const expected_user_message = new models.UserMessage('USER_NAME', 'user_id', 'TEXT');

    user_message.equals(expected_user_message).should.be.true();
  });

  it('Should ignore bot messages', function(){

    // Not entirely sure if there's a better way of identifying bot messages,
    // the only difference I've found during experimentation is that they come
    // with an undefined user ID.
    const slack_data = {
      type: 'message',
      user: undefined,
      text: 'TEXT'
    };

    const message_handler = new handler.MessageHandler();
    const user_message = message_handler.getUserMessage(slack_data);

    user_message.should.be.a.NoMessage;
  });
});
