'use strict';

var baucis = require('baucis');
var path = require('path');
require('baucis-swagger2');

function buildBaucis(models) {
  Object.keys(models).forEach(function(key) {
    baucis.rest(models[key])
  });
  return baucis();
}

function generateSwaggerJson(baucisInstance) {
  baucisInstance.generateSwagger2();
  var swaggerDocument = baucisInstance.swagger2Document;

  swaggerDocument.info.version = '0.0.1';
  swaggerDocument.basePath = '/api';

  Object.keys(swaggerDocument.paths).forEach(function(pathUri) {
    var path = swaggerDocument.paths[pathUri];
    if (path.hasOwnProperty('parameters')) {
      var parameters = path.parameters;
      Object.keys(path).forEach(function(key) {
        if (key !== 'parameters' && 'parameters' in path[key]) {
          path[key].parameters = path[key].parameters.concat(parameters);
        }
      });
    }
  });

  return swaggerDocument;
}

function baucisSwagger2(grunt) {
  grunt.registerMultiTask('baucis-swagger2', 'Update json file attributes.', function() {
    var modelsDir = this.data.src;
    var destFile = this.data.dest;

    if (!grunt.file.exists(destFile)) {
      grunt.log.error('File: ' + destFile + ' not found. It will be created');
    }

    var models = require(path.resolve(__dirname, '../../..', modelsDir));
    var baucisInstance = buildBaucis(models);
    var swaggerJson = generateSwaggerJson(baucisInstance);

    grunt.file.write(destFile, JSON.stringify(swaggerJson, null, 2), {
      flag: 'wx'
    });

    return true;
  });
}

module.exports = baucisSwagger2;
