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

	var nodeEnv = new Function('try{return this===global;}catch(err){return false;}')();
	var scope = nodeEnv ? global : window;
	var $filter = Array.prototype.filter;
	var $hasOwnProperty = Object.hasOwnProperty;
	var $slice = Array.prototype.slice;
	var reSplit = /[\s,]+/;
	var reAll = /\*/g;
	var reNot = /^[!-]/;
	var reQS = /([^?=&]+)(?:=([^&]*))?/g;
	var DEBUG = (nodeEnv ? process.env.DEBUG : qs((
		scope.location !== scope.parent.location ?
		document.referrer :
		document.location.href
	).split('?')[1]).debug);

	function isString(value) {
		return typeof value === 'string' || value instanceof String;
	}

	function isNumber(value) {
		return typeof value === 'number' || value instanceof Number;
	}

	function qs(search) {
		var hash = {};
		search.replace(reQS, function ($0, $1, $2) {
			hash[$1] = $2;
		});
		return hash;
	}

	function filter(list, cmd, context) {
		if ($filter) return $filter.call(list, cmd, context);
		var result = [];
		for (var index = 0; index < list.length; index += 1) {
			if ($hasOwnProperty.call(list, index) === false) continue;
			var value = list[index];
			if (cmd.call(context, value, index, list)) {
				result[result.length] = value;
			}
		}
		return result;
	}

	function exists(list, name) {
		if (!isString(list)) return false;
		return !!filter(list.split(reSplit), function (level) {
			reAll.lastIndex = 0;
			var namespace = level.replace(reAll, '.*?');
			if (reNot.test(level[0])) {
				return new RegExp('^(?!'+ namespace.substr(1) +')').test(name);
			}
			return new RegExp('^'+ namespace +'$').test(name);
		}).length;
	}

	function wrap(console, method) {
		var enabled = console.enabled === true
		|| exists(DEBUG, method)
		|| exists(DEBUG, console.enabled);
		var output = console[method];
		console[method] = function () {
			if ((console.enabled || enabled) === false) return void (0);
			var args = $slice.call(arguments);
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
			'table,assert,count,debug,dir,dirxml,error,profile,'+
			'group,groupCollapsed,groupEnd,info,timeStamp,log,'+
			'exception,profileEnd,time,timeEnd,trace,warn,clear'
		).split(',');
		while (methods.length) {
			wrap(console, methods.pop());
		}
		console.push = function () {
			list = list.concat($slice.call(arguments));
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

	scope.trace = Logger(getConsole(scope.console && isNumber(scope.console.scrollback) ?
		scope.console.scrollback : 1
	)).log;

	scope.Logger = Logger;
	scope.getConsole = getConsole;
	scope.wrap = wrap;
	scope.isString = isString;
	scope.isNumber = isNumber;
	scope.exists = exists;
	scope.filter = filter;
	scope.qs = qs;
	return scope;
})));
