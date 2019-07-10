const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

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
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    },
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    }
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
