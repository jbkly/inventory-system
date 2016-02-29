var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: './public/js/app.jsx',
  resolve: {
    extensions: ['','.js','.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [node_modules],
        loader: 'babel',
        query: {
          presets: ['react','es2015']
        }
      }
    ]
  }
};
