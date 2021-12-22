'use strict';
const utils = require('./utils');
const params = require('./parameters');

// Figure out the basePath for Swagger API definition
function getBase(request, extra) {
  const parts = request.originalUrl.split('/');
  // Remove extra path parts.
  parts.splice(-extra, extra);
  return parts.join('/');
}

function generateValidationErrorDefinition() {
  return {
    required  : ['message', 'name', 'kind', 'path'],
    properties: {
      properties: {
        '$ref': '#/definitions/ValidationErrorProperties'
      },
      message   : {
        type: 'string'
      },
      name      : {
        type: 'string'
      },
      kind      : {
        type: 'string'
      },
      path      : {
        type: 'string'
      }
    }
  };
}
function generateValidationErrorPropertiesDefinition() {
  return {
    required  : ['type', 'message', 'path'],
    properties: {
      type   : {
        type: 'string'
      },
      message: {
        type: 'string'
      },
      path   : {
        type: 'string'
      }
    }
  };
}

function buildTags(options) {
  return options.controllers.map((controller) => {
    return {
      name        : controller.model().singular(),
      description : utils.capitalize(controller.model().singular()) + ' resource.',
      'x-resource': true //custom extension to state this tag represent a resource
    };
  });
}

function buildPaths(controllers) {
  const paths = {};
  const existingDefinitions = [];
  controllers.forEach(function(controller) {
    controller.generateSwagger2(existingDefinitions);
    const collection = controller.swagger2.paths;
    for (let path in collection) {
      if (collection.hasOwnProperty(path)) {
        paths[path] = collection[path];
      }
    }
  });
  return paths;
}

function buildDefinitions(controllers) {
  const definitions = {};
  const existingDefinitions = [];
  controllers.forEach(function(controller) {
    controller.generateSwagger2(existingDefinitions);
    const collection = controller.swagger2.definitions;
    for (let def in collection) {
      if (collection.hasOwnProperty(def)) {
        definitions[def] = collection[def];
      }
    }
    definitions.ValidationError = generateValidationErrorDefinition();
    definitions.ValidationErrorProperties = generateValidationErrorPropertiesDefinition();
  });
  return definitions;
}

// A method for generating a Swagger resource listing
function generateResourceListing(options) {
  const controllers = options.controllers;
  const opts = options.options || {};

  const paths = buildPaths(controllers);
  const definitions = buildDefinitions(controllers);

  const listing = {
    swagger    : '2.0',
    info       : {
      description: 'Baucis generated API',
      version    : options.version,
      title      : 'api'
      //termsOfService: 'TOS: to be defined.',
      //contact: {
      //  email: 'me@address.com'
      //},
      //license: {
      //  name: 'TBD',
      //  url: 'http://license.com'
      //}
    },
    //host: null,
    basePath   : options.basePath,
    tags       : buildTags(options),
    schemes    : ['http', 'https'],
    consumes   : ['application/json'],
    produces   : ['application/json', 'text/html'],
    paths      : paths,
    definitions: definitions,
    parameters : params.generateCommonParams()
    //responses: getReusableResponses(),
    //securityDefinitions: {},
    //security: []  // Must be added via extensions
    //externalDocs: null
  };

  if (opts.security) {
    listing.security = opts.security;
  }

  if (opts.securityDefinitions) {
    listing.securityDefinitions = opts.securityDefinitions;
  }

  return listing;
}

//build an specific spec based on options and filtered controllers
function generateResourceListingForVersion(options) {
  const clone = JSON.parse(JSON.stringify(options.rootDocument));
  clone.info.version = options.version;
  clone.basePath = options.basePath;
  clone.paths = clone.paths || {};
  clone.definitions = clone.definitions || {};
  mergeIn(clone.paths, buildPaths(options.controllers));
  mergeIn(clone.definitions, buildDefinitions(options.controllers));

  return clone;
}

function mergeIn(container, items) {
  if (!items) {
    return;
  }
  for (var key in items) {
    if (items.hasOwnProperty(key)) {
      container[key] = items[key];
    }
  }
}

module.exports = function(options, protect) {
  const api = this;

  api.generateSwagger2 = function() {
    //user can extend this swagger2Document
    api.swagger2Document = generateResourceListing({
      version    : null,
      controllers: protect.controllers('0.0.1'),
      basePath   : null,
      options    : options
    }, []);
    return api;
  };

  return api;
};
