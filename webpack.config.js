const path = require('path')

// https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/

module.exports = {
  entry: {
    'my-lib': './src/index.ts',
    'my-lib.min': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'connectedNextRouter',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.(j|t)s$/,
    })
  ],,
  module: {
    rules: [
       {
         test: /\.tsx?$/,
         use: { loader: 'awesome-typescript-loader' },
         query: {
           declaration: false,
         }
       },
       {
         test: /\.jsx?$/,
         use: { loader: 'babel-loader' }
       },
    ]
  }
}
