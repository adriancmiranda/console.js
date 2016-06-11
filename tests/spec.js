'use strict';

var sinon = require('sinon');
var should = require('should');
var trace = require('../trace');

describe('Checking if the trace is created correctly', function(){
  it('should exists trace method and your properties', function(){
    should.exist(trace);
  });
  it('should log an error if no target is passed in', function(){
    console.enabled = true;
    trace('\ttracing...');
    // console.log('\ttracing...');
    sinon.assert.notCalled(trace);
    // sinon.assert.calledOnce(console.error);
    // sinon.assert.calledWithExactly(console.error, '\ttracing...');
  });
});
