'use strict';
require('../lib/baucis-swagger2');
const baucis = require('baucis');
const path = require('path');
const buildBaucisInstance = require('../lib/build-baucis-instance');
const generateSwaggerConfig = require('../lib/generate-swagger-config');

module.exports = function(grunt) {
  grunt.registerMultiTask('baucis_swagger2', 'Generates a swagger.json from baucis router.', function() {
    const modelsDir = this.data.options.src;
    const destFile = this.data.options.dest;

    if (!grunt.file.exists(destFile)) {
      grunt.log.error('File: ' + destFile + ' not found. It will be created');
    }

    if (!grunt.file.exists(modelsDir)) {
      grunt.log.error('Src dir: "' + modelsDir + '" not found.');
      return false;
    }

    const models = require(modelsDir);
    const baucisInstance = buildBaucisInstance(models);
    const swaggerJson = generateSwaggerConfig(baucisInstance);

    grunt.file.write(destFile, JSON.stringify(swaggerJson, null, 2), {
      flag: 'wx'
    });

    return true;
  });
};
