'use strict';
const baucis = require('baucis');

function buildBaucisInstance(models) {
  Object.keys(models).forEach((key) => {
    baucis.rest(key);
  });
  return baucis();
}

module.exports = buildBaucisInstance;
