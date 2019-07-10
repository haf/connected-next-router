const webpack = require('webpack')
const path = require('path')

// https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/

module.exports = {
  mode: "production",
  entry: { 'connected-next-router': './src/index.ts' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'connectedNextRouter',
    libraryTarget: 'umd'
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: { loader: 'babel-loader' }
      }
    ]
  }
}
