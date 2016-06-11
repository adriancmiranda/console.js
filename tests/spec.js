'use strict';

var should = require('should');
var trace = require('../trace');

describe('Checking if the trace is created correctly', function(){
  it('should trace', function(){
    should.exist(trace);
    trace('tracing...');
  });
});
