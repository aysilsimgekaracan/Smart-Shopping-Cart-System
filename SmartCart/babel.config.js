module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],

    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true
        }
      ],
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            "@Components": "./src/components",
            "@Configs": "./src/configs",
            "@Assets": "./src/assets",
            "@Containers": "./src/containers",
            "@Styles": "./src/styles",
            "@Screens": "./src/screens",
            "@Hooks": "./src/hooks"
          }
        }
      ]
    ]
  }
}
