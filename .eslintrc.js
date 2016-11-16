'use strict';

module.exports = {
  root: true,
  extends: 'airbnb-base',
  rules: {
    // Turning off errors about using console, since this is a Node app,
    // as recommended here: http://eslint.org/docs/rules/no-console#when-not-to-use-it
    'no-console': 'off',
    strict: ['error', 'global'],
  },
  parserOptions: {
    sourceType: 'script',
  },
  ecmaFeatures: {
    impliedStrict: false,
  },
};
