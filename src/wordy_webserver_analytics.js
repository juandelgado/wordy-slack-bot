'use strict';

function trackCommand(analytics) {
  return (req, res, next) => {
    const command = req.body.command;
    if (command) {
      analytics.trackCommand(command);
    } else {
      console.error('Command not found in request, cannot track.');
    }
    next();
  };
}

module.exports = {
  trackCommand,
};
