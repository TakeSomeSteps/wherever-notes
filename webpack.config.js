const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

module.exports = () => {
  const env = dotenv.config().parsed;
  // const mode = argv.mode || 'development'; // Default to development
  const mode = 'development'; // Default to development

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    mode: mode, // Add mode here
    devtool: mode === 'development' ? 'inline-source-map' : false, // Add source maps

    devServer: {
      static: './dist',
      hot: true,
      port: 3000
    },

    entry: {
      popup: './App.tsx',
      background: './background.js',
      contentScript: './contentScript.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
};

