const baucis = require('baucis');
const deco = require('deco');
const decorators = deco.require(__dirname, [ 'Controller', 'Api' ]).hash;

baucis.Controller.decorators(decorators.Controller);
baucis.Api.decorators(decorators.Api);
