const Path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    resolveLoader: {
      modules: ['node_modules', './loaders']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'replaceLoader',
              options: {
                  name: 'oujiamin'
              }
            }
          ]
        }
      ]
    },
    output: {
      path: Path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    }
  }