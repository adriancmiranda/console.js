/** 
 * @author Adrian C. Miranda <adriancmiranda@gmail.com>
 * @see https://github.com/adriancmiranda/console.js
 */
(function (window) {
    'use strict';
    
    (function (console) {
        var ctor = function () {};
        for (var methods='assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn'.split(','), method; method = methods.pop();) {
            console[method] = console[method] || ctor;
        }
    }(function () {
        try {
            console.log();
            return window.console;
        } catch(error) {
            return window.console = {};
        }
    }()));

    window.trace = function () {
        trace.history = trace.history || [];
        trace.history.push(arguments);
        if (window.console) {
            var params = [].slice.call(arguments);
            if (typeof console.log === 'object') {
                trace.apply.call(console.log, console, params);
            } else {
                console.log.apply(console, params);
            }
        }
    };
}(this));
