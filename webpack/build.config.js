const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

const env = process.env.NODE_ENV;

module.exports = {
  entry: {
    index: './src/index.ts',
    'index.min': './src/index.ts'
  },
  mode: env,
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    library: 'Sels',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src/')
    },
    extensions: ['.ts', '.js', '.tsc']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
      }
    ]
  }
};