/** @type {import('react-native-worklets/plugin').PluginOptions} */

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [['@babel/plugin-proposal-decorators', {legacy: true}], 'react-native-worklets/plugin'],
};
