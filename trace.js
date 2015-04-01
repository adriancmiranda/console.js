/** 
 * @author Adrian C. Miranda <adriancmiranda@gmail.com>
 * @see https://github.com/adriancmiranda/console.js
 */
(function(global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        // For CommonJS and CommonJS-like environments where a proper window is present,
        // execute the factory and get trace
        // For environments that do not inherently posses a window with a document
        // (such as Node.js), expose a trace-making factory as module.exports
        // This accentuates the need for the creation of a real window
        // e.g. var trace = require("trace")(window);
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    'use strict';
    
    var strundefined = typeof undefined;

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

    // Expose trace identifier, even in AMD
    // and CommonJS for browser emulators
    if (typeof noGlobal === strundefined) {
        window.trace = trace;
    }

    return trace;
}));
