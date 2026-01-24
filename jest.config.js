const {defaults} = require('jest-config');
/** @type {import('jest').Config} */

module.exports = {
  preset: 'react-native',
  moduleDirectories: [...defaults.moduleDirectories, 'bower_components'],
  setupFiles: ['./utils/test/worklets.js', './utils/test/keyboardController.js'],
  setupFilesAfterEnv: ['./utils/test/reanimated.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-native-keyboard-controller|react-native-reanimated|react-native-worklets)',
  ],
};
