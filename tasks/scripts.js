'use strict';

const gulp          = require('gulp');
const webpack       = require('webpack');
const webpackConfig = require('../webpack.config.js');
const notifier      = require('node-notifier');

module.exports = function(config) {
  return function(callback) {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return callback(err);
      }
      else {
        const jsonStats = stats.toJson();
        const err       = jsonStats.errors.length > 0;

        if (err) {
          jsonStats.errors.forEach((error) => {
            console.error(error);
          });
        }

        notifier.notify({
          title: err ? 'SCRIPTS FAILED' : 'Scripts task',
          message: err ? 'error found' : 'scripts build done',
          wait: false,
          time: 1000,
        });
      }

      return callback();
    });
  };
};
