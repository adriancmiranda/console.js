/**
 * @author Adrian C. Miranda <adriancmiranda@gmail.com>
 * @see https://github.com/adriancmiranda/trace
 * @version 1.0.11
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? (module.exports = factory()) :
	typeof define === 'function' && define.amd ? define(factory) : factory();
}(this, (function () { 'use strict';
	'use strict';

	var nodeEnv = typeof window === 'undefined';
	var scope = nodeEnv ? global : window;
	var slice = Array.prototype.slice;
	var debug = /\bdebug\b/i.test(nodeEnv ? Object(scope.url).href : (
		scope.location !== scope.parent.location ?
		document.referrer :
		document.location.href
	));

	function wrap(console, method) {
		var output = console[method];
		console[method] = function () {
			if (!console.enabled) return void (0);
			var args = slice.call(arguments);
			if (console.history.length >= console.scrollback) {
				console.history.shift();
			}
			console.history[console.history.length] = { type: method, message: args };
			return output && output.apply && output.apply(console, args);
		};
	}

	function Logger(console) {
		var list = [];
		var methods = (
			'table,assert,count,debug,dir,dirxml,error,profile'+
			'group,groupCollapsed,groupEnd,info,timeStamp,log'+
			'exception,profileEnd,time,timeEnd,trace,warn'
		).split(',');
		console.enabled = debug || console.enabled;
		while (methods.length) {
			wrap(console, methods.pop());
		}
		console.push = function () {
			list = list.concat(slice.call(arguments));
		};
		console.flush = function () {
			console.log(list.join('\n'));
			list = [];
		};
		return console;
	}

	function getConsole(limit) {
		try {
			console.log();
			scope.console.history = [];
			scope.console.scrollback = limit;
		} catch (err) {
			scope.console = { history: [], scrollback: limit };
		}
		return scope.console;
	}

	scope.trace = Logger(getConsole(scope.console && typeof scope.console.scrollback === 'number' ?
		scope.console.scrollback : 1
	)).log;

	return scope.trace;
})));
