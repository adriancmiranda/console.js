/**
 * @author Adrian C. Miranda <adriancmiranda@gmail.com>
 * @see https://github.com/adriancmiranda/console.js
 * @version 1.1.0
 */
(function(global, factory){
  'use strict';

  if(typeof module === 'object' && typeof module.exports === 'object'){
    module.exports = factory(global, true);
  }else{
    global.trace = factory(global).log;
  }

}(typeof window !== 'undefined' ? window : this, function(global, nodeEnv){
  'use strict';

  var debug = !nodeEnv && /\bdebug\b/.test(global.location.href);
  var slice = Array.prototype.slice;

  function isDefined(value){
    return typeof value !== 'undefined';
  }

  function backtrace(opts){
  }

  function getNativeStackTrace(error){
    return error.stack || error['opera#sourceloc'];
  }

  function parseStackTrace(opts, error){
    if(isDefined(error.stacktrace) || isDefined(error['opera#sourceloc'])){
    }else if(error.stack){
    }
  }

  function getStackTrace(){
    try{
      throw new Error();
    }catch(error){
      if(getNativeStackTrace(error)){
        return parseStackTrace(opts, error);
      }
      return backtrace(opts);
    }
  }

  function getMethodNameByIndex(index){
    return '';
  }

  function trace(console, outputFn, method){
    console[method] = function(){
      if(!console.enabled) return void(0);
      var prefix = getMethodNameByIndex(-1);
      var args = [prefix? prefix+':' : prefix].concat(slice.call(arguments));
      if(console.history.length >= console.scrollback){
        console.history.shift();
      }
      console.history.push({ type:method, message:args });
      return outputFn.apply(console, args);
    };
  }

  function Logger(console){
    var ctor = function(){};
    console.enabled = debug || console.enabled;
    for(var methods = 'assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,timeStamp,profile,profileEnd,time,timeEnd,trace,warn,log'.split(','), method; method = methods.pop();){
      trace.call(console, console, console[method] || ctor, method);
    }
  }

  return Logger(function(limit){
    try{
      console.log();
      global.console.history = [];
      global.console.scrollback = limit;
      return global.console;
    }catch(error){
      global.console = { history:[], scrollback:limit };
      return global.console;
    }
  }(global.console && typeof global.console.scrollback === 'number'?
    global.console.scrollback : 10
  ));
}));
