/**
 * @author Adrian C. Miranda <adriancmiranda@gmail.com>
 * @see https://github.com/adriancmiranda/console.js
 * @version 1.0.3
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
	
	var qs = function(field){
		var re = new RegExp('[?&]'+ field +'=([^&#]*)', 'i');
		var string = re.exec(window.location.href);
		return string? string[1] : null;
	};

	(function(console){
		var slice = Array.prototype.slice;
		var ctor = function(){};
		for(var methods = 'assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,timeStamp,profile,profileEnd,time,timeEnd,trace,warn,log'.split(','), method; method = methods.pop();){
			(function(logger, method){
				console[method] = function(){
					var params = slice.call(arguments);
					if(console.history.length >= console.scrollback){
						console.history.shift();
					}
					console.history.push({ type:method, message:params });
					return logger.apply(console, params);
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
