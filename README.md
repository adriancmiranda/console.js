trace
=====

> Displays expressions, or writes to log files, while debugging. A single trace statement can support multiple arguments. If any argument in a trace statement includes a data type other than a String, the trace function invokes the associated toString() method for that data type. For example, if the argument is a Boolean value the trace function invokes Boolean.toString() and displays the return value.

[![deps][deps]][deps-url]
[![depsci][depsci]][depsci-url]
[![travis][travis]][travis-url]
[![appveyor][appveyor]][appveyor-url]
[![circleci][circleci]][circleci-url]

## How to install __trace__ in your project

### bower

```bash
bower install --save-dev adriancmiranda/trace
```

### cdn


#### uncompressed

```javascript
<script src="https://rawgit.com/adriancmiranda/trace/master/index.js"></script>
```


#### compressed

```javascript
<script src="https://rawgit.com/adriancmiranda/trace/master/index.min.js"></script>
```


## Usage

Join `debug` word in URL (e.g. `<url>?debug`, `<url>/debug`, ...)  or set `console.enabled = true;`  in your `JavaScript` code to show your logs and then use the [console](https://developer.mozilla.org/en/docs/Web/API/console) normally.

`P.S.` you can also usage the `trace` method as an alias to [console.log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log) (:zap: flash feelings :sunglasses:)

### :black_circle: **trace(...arguments):void**

#### parameters

`... arguments` — One or more (comma separated) expressions to evaluate. For multiple expressions, a space is inserted between each expression in the output.


#### example

The following example uses the `trace()` method to print a simple string. Generally, the message will be printed to a _`Developer Tools > Console`_.

```javascript
trace("Hello", "World");
```
### :black_circle: **console.enabled:boolean**
A Boolean value that indicates whether the console is enabled.

### :black_circle: **console.history:array**
[read-only] Contents of the history stack

### :black_circle: **console.scrollback:uint**

The number of lines of scrollback buffer to keep above the visible part of the screen.

### :black_circle: **console.push(...arguments):void**

#### parameters

`... arguments` — One or more (comma separated) expressions to evaluate. For multiple expressions, a space is inserted between each expression in the output.

### :black_circle: **console.flush():void**

To clear the appended log with `console.push` method


## License

[MIT][license-url]


<!-- links -->

[deps]: https://david-dm.org/adriancmiranda/trace.svg
[deps-url]: https://david-dm.org/adriancmiranda/trace

[depsci]: https://dependencyci.com/github/adriancmiranda/trace/badge
[depsci-url]: https://dependencyci.com/github/adriancmiranda/trace

[travis]: https://travis-ci.org/adriancmiranda/trace.svg?branch=master
[travis-url]: https://travis-ci.org/adriancmiranda/trace

[appveyor]: https://ci.appveyor.com/api/projects/status/hucvow1n0t3q3le3/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/adriancmiranda/trace/branch/master

[circleci]: https://circleci.com/gh/adriancmiranda/trace/tree/master.svg?style=shield
[circleci-url]:  https://circleci.com/gh/adriancmiranda/trace/tree/master

[license-url]: https://github.com/adriancmiranda/trace/blob/master/LICENSE
