# grunt-baucis-swagger2

> Generates a swagger.json from baucis router.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-baucis-swagger2 --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-baucis-swagger2');
```

## The "update_json" task

### Overview
In your project's Gruntfile, add a section named `update_json` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'baucis-swagger2': {
    your_target: {
      // Target-specific src and changes go here.
    },
  },
});
```

### Options

#### src

The string of the source file.

#### dest

The string of the destination file.

### Usage Example

```js
grunt.initConfig({
  update_json: {
    production:{
        src: './lib/models',
        dest: './swagger/baucis.json'
    },
  },
});
```
