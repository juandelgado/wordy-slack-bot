'use strict';

// This is Express middleware, simply not calling next()
// stops the execution. More info:
// http://expressjs.com/en/guide/writing-middleware.html
function validateCommand(slackCommandToken, slackTeamId) {
  return (req, res, next) => {
    if (req.body.token === slackCommandToken && req.body.team_id === slackTeamId) {
      next();
    } else {
      console.error('Unvalid SLACK COMMAND TOKEN and / or SLACK TEAM ID');
      res.send('Unvalid SLACK COMMAND TOKEN and / or SLACK TEAM ID');
    }
  };
}

module.exports = {
  validateCommand,
};
