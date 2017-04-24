'use strict';

const chai = require('chai');
const should = require('should');
const trace = require('../');

const expect = chai.expect;
const assert = chai.assert;

const storage = { method: {}, output: {} };

const methods = [
	'table,assert,count,debug,dir,dirxml,error,profile',
	'group,groupCollapsed,groupEnd,info,timeStamp,log',
	'exception,profileEnd,time,timeEnd,trace,warn'
].join(',').split(',');

const store = function () {
	methods.forEach(name => {
		storage.method[name] = console[name];
		storage.output[name] = [];
		console[name] = function (val) {
			storage.output[name].push(val);
		};
	});
};

const restore = function () {
	methods.forEach(name => {
		console[name] = storage.method[name];
		storage.output[name].length = 0;
		delete storage.output[name];
	});
};

describe('trace', function () {
	beforeEach(store);
	afterEach(restore);

	it('should exists trace method and your properties', function () {
		assert.typeOf(console.scrollback, 'undefined');
		assert.typeOf(console.history, 'undefined');
		assert.typeOf(console.enabled, 'undefined');
		should.exist(trace);
		expect(trace).to.have.been.calledOnce;
		methods.forEach(function (level) {
			expect(console[level]).to.have.been.calledOnce;
		});
	});

	it('should suppress all output if a non-AssertionError was thrown', function () {
		methods.forEach(name => {
			console[name]('foo');
			console[name]('bar');
			expect(storage.output[name]).to.deep.equal(['foo', 'bar']);
		});
	});
});
