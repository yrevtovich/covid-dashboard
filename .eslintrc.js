module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],  
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  rules: {
    "linebreak-style": 0,
    "global-require": 0,
    "eslint linebreak-style": [0, "error", "windows"]
  }
};
