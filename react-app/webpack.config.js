const path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    watchContentBase: true,
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },
    contentBase: path.join(__dirname, "build"),
    compress: true,
  }
};
