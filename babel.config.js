/** @type {import('react-native-worklets/plugin').PluginOptions} */

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@app': './src',
          '@app/components/*': 'src/components/*',
          '@app/consts/*': 'src/consts/*',
        },
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
    'react-native-worklets/plugin',
  ],
};
