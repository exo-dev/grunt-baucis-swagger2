'use strict';
const grunt = require('grunt');

exports.baucis_swagger2 = {
  setUp: function(done) {
    done();
  },
  valid01: function(test) {
    test.expect(1);

    const actual = grunt.file.read('/tmp/grunt-res_valid01');
    const expected = grunt.file.read('test/expected/valid01.json');
    test.deepEqual(JSON.parse(actual), JSON.parse(expected), 'should generate correct json file');

    test.done();
  },
};
