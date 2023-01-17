const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const { NODE_ENV = 'development' } = process.env;

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  mode: NODE_ENV,
  externals: [nodeExternals()],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new NodemonPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
              transpileOnly: true, // and we use ForkTsCheckerWebpackPlugin for type checking
            },
          },
        ],
      },
    ],
  },
};
