var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var reactMinified = path.resolve(node_modules, 'react/dist/react.min.js');
var reactDOMMinified = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');

module.exports = {
  entry: './public/js/app.jsx',
  resolve: {
    extensions: ['','.js','.jsx'],
    // alias: {
    //   'react': reactMinified,
    //   'react-dom': reactDOMMinified
    // }
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
    ],
    // noParse: [reactMinified]
  }
};
