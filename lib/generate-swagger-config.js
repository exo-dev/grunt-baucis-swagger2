'use strict';

function generateSwaggerConfig(baucisInstance) {
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

module.exports = generateSwaggerConfig;
