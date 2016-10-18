var SlackBot = require('slackbots');

var bot = new SlackBot({
    token: process.env.SLACK_API_TOKEN
});

bot.on('start', function() {
  console.log('Wordy Bot started');
});

bot.on('open', function() {
  console.log('Connection is open');
});

bot.on('close', function() {
  console.log('Connection is CLOSED');
});

bot.on('error', function() {
  console.error('ERROR WHILE CONNECTING TO SLACK :sad_face:');
});

bot.on('message', function(data) {

  if (data.type == 'message'){

    var user_id = data.user;
    var user_message = data.text;

    if(user_message == 'guys'){

      console.log('Offending message: ' + user_message);

      bot.getUsers().then(function(users_data){

        var users = users_data.members;

        for(var x = 0; x < users.length; x++){

          var user = users[x];

          if (user.id == user_id){

            var bot_message_params = {
              as_user: false,
              username: 'Wordy Bot'
            }

            var message_to_user = 'You said: \"' + user_message + '\". Uncool.';
            bot.postMessageToUser(user.name, message_to_user, bot_message_params);

            break;
          }
        }
      });
    }
  }
});
