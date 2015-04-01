/** 
 * @author Adrian C. Miranda <adriancmiranda@gmail.com>
 * @see https://github.com/adriancmiranda/console.js
 */
(function (window) {
    'use strict';
    
    (function (console) {
        var ctor = function () {};
        for (var methods = 'assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn'.split(','), method; method = methods.pop();) {
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

    var trace = function () {
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
    
    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(trace);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = trace;
    } else {
        // browser global
        window.trace = trace;
    }
}(this));
