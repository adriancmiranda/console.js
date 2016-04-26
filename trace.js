/**
 * @author Adrian C. Miranda <adriancmiranda@gmail.com>
 * @see https://github.com/adriancmiranda/console.js
 * @version 1.0.4
 */
(function(global, factory){
	'use strict';

	if(typeof module === 'object' && typeof module.exports === 'object'){
		module.exports = factory(global, true);
	}else{
		global.trace = factory(global);
	}

}(typeof window !== 'undefined' ? window : this, function(window, nodeEnv){
	'use strict';

	var debug = /\bdebug\b/.test(window.location.href);

	(function(console){
		window.console.enabled = window.console.enabled || debug;
		var slice = Array.prototype.slice;
		var ctor = function(){};
		for(var methods = 'assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,timeStamp,profile,profileEnd,time,timeEnd,trace,warn,log'.split(','), method; method = methods.pop();){
			(function(logger, method){
				console[method] = function(){
					if(console.enabled){
						var params = slice.call(arguments);
						if(console.history.length >= console.scrollback){
							console.history.shift();
						}
						console.history.push({ type:method, message:params });
						return logger.apply(console, params);
					}
				};
			}).call(console, console[method] || ctor, method);
		}
	}(function(limit){
		try{
			console.log();
			window.console.history = [];
			window.console.scrollback = limit;
			return window.console;
		}catch(error){
			window.console = { history:[], scrollback:limit };
			return window.console;
		}
	}(window.console && typeof window.console.scrollback === 'number'?
		window.console.scrollback : 10
	)));

	return console.log;
}));
