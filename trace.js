/**
* @author Adrian C. Miranda <adriancmiranda@gmail.com>
* @see https://github.com/adriancmiranda/console.js
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

	(function(console){
		var type = {};
		var ctor = function(){};
		for(var methods = 'assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,timeStamp,profile,profileEnd,time,timeEnd,trace,warn,log'.split(','), method; method = methods.pop();){
			(function(logger, method){
				console[method] = function(){
					var params = Array.prototype.slice.call(arguments);
					if(typeof type[method] === 'undefined'){
						type[method] = [params];
					}else{
						type[method].push(params);
					}
					console.history.push(type);
					return logger.apply(console, params);
				};
			}).call(console, console[method] || ctor, method);
		}
	}(function(){
		try{
			console.log();
			window.console.history = [];
			return window.console;
		}catch(error){
			window.console = { history:[] };
			return window.console;
		}
	}()));

	return console.log;
}));
