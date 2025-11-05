/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/assert/build/assert.js":
/*!*********************************************!*\
  !*** ./node_modules/assert/build/assert.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b

// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var _require = __webpack_require__(/*! ./internal/errors */ "./node_modules/assert/build/internal/errors.js"),
  _require$codes = _require.codes,
  ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
  ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
  ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
  ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
var AssertionError = __webpack_require__(/*! ./internal/assert/assertion_error */ "./node_modules/assert/build/internal/assert/assertion_error.js");
var _require2 = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
  inspect = _require2.inspect;
var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
  isPromise = _require$types.isPromise,
  isRegExp = _require$types.isRegExp;
var objectAssign = __webpack_require__(/*! object.assign/polyfill */ "./node_modules/object.assign/polyfill.js")();
var objectIs = __webpack_require__(/*! object-is/polyfill */ "./node_modules/object-is/polyfill.js")();
var RegExpPrototypeTest = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js")('RegExp.prototype.test');
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;
function lazyLoadComparison() {
  var comparison = __webpack_require__(/*! ./internal/util/comparisons */ "./node_modules/assert/build/internal/util/comparisons.js");
  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
}

// Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex
var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];
var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};
var warned = false;

// The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {};

// All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}
function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;
  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }
    if (argsLen === 2) operator = '!=';
  }
  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };
  if (message !== undefined) {
    errArgs.message = message;
  }
  var err = new AssertionError(errArgs);
  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }
  throw err;
}
assert.fail = fail;

// The AssertionError is defined in internal/error.
assert.AssertionError = AssertionError;
function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;
    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }
    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}

// Pure assertion tests whether a value is truthy, as determined
// by !!value.
function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  innerOk.apply(void 0, [ok, args.length].concat(args));
}
assert.ok = ok;

// The equality assertion tests shallow, coercive equality with ==.
/* eslint-disable no-restricted-properties */
assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
};

// The non-equality assertion tests for whether two objects are not
// equal with !=.
assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
};

// The equivalence assertion tests a deep equality relation.
assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
};

// The non-equivalence assertion tests for any deep inequality.
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};
assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}
assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};
var Comparison = /*#__PURE__*/_createClass(function Comparison(obj, keys, actual) {
  var _this = this;
  _classCallCheck(this, Comparison);
  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && RegExpPrototypeTest(obj[key], actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
});
function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}
function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return RegExpPrototypeTest(expected, actual);
    // assert.doesNotThrow does not accept objects.
    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    }

    // Handle primitives properly.
    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }
    var keys = Object.keys(expected);
    // Special handle errors to make sure the name and the message are compared
    // as well.
    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }
    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && RegExpPrototypeTest(expected[key], actual[key])) {
        return;
      }
      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  }
  // Guard instanceof against arrow functions as they don't have a prototype.
  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }
  if (Error.isPrototypeOf(expected)) {
    return false;
  }
  return expected.call({}, actual) === true;
}
function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }
  try {
    fn();
  } catch (e) {
    return e;
  }
  return NO_EXCEPTION_SENTINEL;
}
function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.

  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.

  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}
function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;
    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn();
      // Fail in case no promise is returned.
      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }
    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}
function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }
    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }
    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }
  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';
    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }
    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }
  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}
function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;
  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }
  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }
  throw actual;
}
assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};
assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};
assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }
  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};
assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }
  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};
assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';
    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }
    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    });

    // Make sure we actually have a stack trace!
    var origStack = err.stack;
    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift();
      // Filter all frames existing in err.stack.
      var tmp1 = newErr.stack.split('\n');
      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);
        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }
      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }
    throw newErr;
  }
};

// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a871df3dfb8ea663ef5e1f8f62701ec51384ecb
function internalMatch(string, regexp, message, fn, fnName) {
  if (!isRegExp(regexp)) {
    throw new ERR_INVALID_ARG_TYPE('regexp', 'RegExp', regexp);
  }
  var match = fnName === 'match';
  if (typeof string !== 'string' || RegExpPrototypeTest(regexp, string) !== match) {
    if (message instanceof Error) {
      throw message;
    }
    var generatedMessage = !message;

    // 'The input was expected to not match the regular expression ' +
    message = message || (typeof string !== 'string' ? 'The "string" argument must be of type string. Received type ' + "".concat(_typeof(string), " (").concat(inspect(string), ")") : (match ? 'The input did not match the regular expression ' : 'The input was expected to not match the regular expression ') + "".concat(inspect(regexp), ". Input:\n\n").concat(inspect(string), "\n"));
    var err = new AssertionError({
      actual: string,
      expected: regexp,
      message: message,
      operator: fnName,
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}
assert.match = function match(string, regexp, message) {
  internalMatch(string, regexp, message, match, 'match');
};
assert.doesNotMatch = function doesNotMatch(string, regexp, message) {
  internalMatch(string, regexp, message, doesNotMatch, 'doesNotMatch');
};

// Expose a strict only variant of assert
function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }
  innerOk.apply(void 0, [strict, args.length].concat(args));
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ "./node_modules/assert/build/internal/assert/assertion_error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/assert/build/internal/assert/assertion_error.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _require = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
  inspect = _require.inspect;
var _require2 = __webpack_require__(/*! ../errors */ "./node_modules/assert/build/internal/errors.js"),
  ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));
  while (count) {
    str += str;
    count--;
  }
  str += str.substring(0, maxCount - str.length);
  return str;
}
var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
};

// Comparing short primitives should just show === / !== instead of using the
// diff.
var kMaxShortLength = 10;
function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}
function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}
function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = '';

  // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.
  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  }

  // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.
  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length;
    // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.
    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        }
        // Ignore the first characters.
        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  }

  // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).
  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];
  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }
    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }
  var maxLines = Math.max(actualLines.length, expectedLines.length);
  // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })
  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n');

    // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.
    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);
      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }
    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }
  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }
  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }
  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;
    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the expected line to the cache.
      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++;
      // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the actual line to the result.
      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++;
      // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i];
      // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.
      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine);
      // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //
      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }
      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }
          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        }
        // Mark the current line as the last diverging one.
        lastPos = i;
        // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.
        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2;
        // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = '';
        // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.
        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    }
    // Inspected object to big (Show ~20 rows max)
    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }
  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}
var AssertionError = /*#__PURE__*/function (_Error, _inspect$custom) {
  _inherits(AssertionError, _Error);
  var _super = _createSuper(AssertionError);
  function AssertionError(options) {
    var _this;
    _classCallCheck(this, AssertionError);
    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }
    var message = options.message,
      operator = options.operator,
      stackStartFn = options.stackStartFn;
    var actual = options.actual,
      expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    if (message != null) {
      _this = _super.call(this, String(message));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      }
      // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.
      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }
      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _super.call(this, createErrDiff(actual, expected, operator));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n');

        // In case "actual" is an object, it should not be reference equal.
        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        }

        // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.
        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);
          while (res.length > 27) {
            res.pop();
          }
        }

        // Only print a single input.
        if (res.length === 1) {
          _this = _super.call(this, "".concat(base, " ").concat(res[0]));
        } else {
          _this = _super.call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n"));
        }
      } else {
        var _res = inspectValue(actual);
        var other = '';
        var knownOperators = kReadableOperator[operator];
        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));
          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }
          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }
          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }
        _this = _super.call(this, "".concat(_res).concat(other));
      }
    }
    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;
    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    }
    // Create error message including the error code in the name.
    _this.stack;
    // Reset the name.
    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }
  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: _inspect$custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread(_objectSpread({}, ctx), {}, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);
  return AssertionError;
}( /*#__PURE__*/_wrapNativeSuper(Error), inspect.custom);
module.exports = AssertionError;

/***/ }),

/***/ "./node_modules/assert/build/internal/errors.js":
/*!******************************************************!*\
  !*** ./node_modules/assert/build/internal/errors.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */
/* eslint node-core/alphabetize-errors: "error" */
/* eslint node-core/prefer-util-format-errors: "error" */



// The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var codes = {};

// Lazy loaded
var assert;
var util;
function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }
  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }
  var NodeError = /*#__PURE__*/function (_Base) {
    _inherits(NodeError, _Base);
    var _super = _createSuper(NodeError);
    function NodeError(arg1, arg2, arg3) {
      var _this;
      _classCallCheck(this, NodeError);
      _this = _super.call(this, getMessage(arg1, arg2, arg3));
      _this.code = code;
      return _this;
    }
    return _createClass(NodeError);
  }(Base);
  codes[code] = NodeError;
}

// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });
    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }
  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}
createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(typeof name === 'string', "'name' must be a string");

  // determiner: 'must be' or 'must not be'
  var determiner;
  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }
  var msg;
  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  // TODO(BridgeAR): Improve the output by showing `null` and similar.
  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(/*! util/ */ "./node_modules/util/util.js");
  var inspected = util.inspect(value);
  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }
  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;
  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }
  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });
  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;
    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;
    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }
  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ "./node_modules/assert/build/internal/util/comparisons.js":
/*!****************************************************************!*\
  !*** ./node_modules/assert/build/internal/util/comparisons.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var regexFlagsSupported = /a/g.flags !== undefined;
var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};
var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};
var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(/*! is-nan */ "./node_modules/is-nan/index.js");
function uncurryThis(f) {
  return f.call.bind(f);
}
var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);
var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
  isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
  isArrayBufferView = _require$types.isArrayBufferView,
  isDate = _require$types.isDate,
  isMap = _require$types.isMap,
  isRegExp = _require$types.isRegExp,
  isSet = _require$types.isSet,
  isNativeError = _require$types.isNativeError,
  isBoxedPrimitive = _require$types.isBoxedPrimitive,
  isNumberObject = _require$types.isNumberObject,
  isStringObject = _require$types.isStringObject,
  isBooleanObject = _require$types.isBooleanObject,
  isBigIntObject = _require$types.isBigIntObject,
  isSymbolObject = _require$types.isSymbolObject,
  isFloat32Array = _require$types.isFloat32Array,
  isFloat64Array = _require$types.isFloat64Array;
function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;
  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  }
  // The maximum size for an array is 2 ** 32 -1.
  return key.length === 10 && key >= Math.pow(2, 32);
}
function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
}

// Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }
  var x = a.length;
  var y = b.length;
  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3;

// Check if they have the same source and flags
function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}
function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }
  return true;
}
function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}
function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}
function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }
  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }
  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }
  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }
  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
}

// Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.

function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  }

  // Check more closely if val1 and val2 are equal.
  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }
    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }
    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }
      return false;
    }
    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }
  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);
  if (val1Tag !== val2Tag) {
    return false;
  }
  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }
    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (keys1.length !== keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  }
  // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.
  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }
  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    }
    // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.
    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (_keys.length !== _keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }
  return keyCheck(val1, val2, strict, memos, kNoIterator);
}
function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}
function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2);

    // The pair must have the same number of owned properties.
    if (aKeys.length !== bKeys.length) {
      return false;
    }
  }

  // Cheap key test
  var i = 0;
  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }
  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);
    if (symbolKeysA.length !== 0) {
      var count = 0;
      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];
        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }
          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }
      var symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }
  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  }

  // Use memos to handle cycles.
  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);
    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);
      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }
    memos.position++;
  }
  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}
function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];
    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }
  return false;
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').
function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;
    case 'object':
      // Only pass in null as object!
      return undefined;
    case 'symbol':
      return false;
    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through
    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }
  }
  return true;
}
function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}
function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }
  var curB = b.get(altValue);
  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }
  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}
function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);
  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i];
    // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.
    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      }
      // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.
      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false;

      // Fast path to detect missing string, symbol, undefined and null values.
      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }
      if (set === null) {
        set = new Set();
      }
      set.add(val);
    }
  }
  if (set !== null) {
    var bValues = arrayFromSet(b);
    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i];
      // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.
      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];
    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }
  return false;
}
function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);
  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
      key = _aEntries$i[0],
      item1 = _aEntries$i[1];
    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }
      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);
      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false;
        // Fast path to detect missing string, symbol, undefined and null
        // keys.
        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;
        if (set === null) {
          set = new Set();
        }
        set.add(key);
      }
    }
  }
  if (set !== null) {
    var bEntries = arrayFromMap(b);
    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
        _key = _bEntries$_i[0],
        item = _bEntries$_i[1];
      if (_typeof(_key) === 'object' && _key !== null) {
        if (!mapHasEqualEntry(set, a, _key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(_key) || !innerDeepEqual(a.get(_key), item, false, memo)) && !mapHasEqualEntry(set, a, _key, item, false, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;
  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);
        for (; i < keysA.length; i++) {
          var key = keysA[i];
          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }
        if (keysA.length !== Object.keys(b).length) {
          return false;
        }
        return true;
      }
    }
  }

  // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:
  for (i = 0; i < keys.length; i++) {
    var _key2 = keys[i];
    if (!innerDeepEqual(a[_key2], b[_key2], strict, memos)) {
      return false;
    }
  }
  return true;
}
function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}
function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}
module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ "./node_modules/available-typed-arrays/index.js":
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = __webpack_require__(/*! possible-typed-array-names */ "./node_modules/possible-typed-array-names/index.js");

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

/** @type {import('.')} */
module.exports = function availableTypedArrays() {
	var /** @type {ReturnType<typeof availableTypedArrays>} */ out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			// @ts-expect-error
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ }),

/***/ "./node_modules/call-bind-apply-helpers/actualApply.js":
/*!*************************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/actualApply.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

var $apply = __webpack_require__(/*! ./functionApply */ "./node_modules/call-bind-apply-helpers/functionApply.js");
var $call = __webpack_require__(/*! ./functionCall */ "./node_modules/call-bind-apply-helpers/functionCall.js");
var $reflectApply = __webpack_require__(/*! ./reflectApply */ "./node_modules/call-bind-apply-helpers/reflectApply.js");

/** @type {import('./actualApply')} */
module.exports = $reflectApply || bind.call($call, $apply);


/***/ }),

/***/ "./node_modules/call-bind-apply-helpers/applyBind.js":
/*!***********************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/applyBind.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var $apply = __webpack_require__(/*! ./functionApply */ "./node_modules/call-bind-apply-helpers/functionApply.js");
var actualApply = __webpack_require__(/*! ./actualApply */ "./node_modules/call-bind-apply-helpers/actualApply.js");

/** @type {import('./applyBind')} */
module.exports = function applyBind() {
	return actualApply(bind, $apply, arguments);
};


/***/ }),

/***/ "./node_modules/call-bind-apply-helpers/functionApply.js":
/*!***************************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/functionApply.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./functionApply')} */
module.exports = Function.prototype.apply;


/***/ }),

/***/ "./node_modules/call-bind-apply-helpers/functionCall.js":
/*!**************************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/functionCall.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./functionCall')} */
module.exports = Function.prototype.call;


/***/ }),

/***/ "./node_modules/call-bind-apply-helpers/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");

var $call = __webpack_require__(/*! ./functionCall */ "./node_modules/call-bind-apply-helpers/functionCall.js");
var $actualApply = __webpack_require__(/*! ./actualApply */ "./node_modules/call-bind-apply-helpers/actualApply.js");

/** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */
module.exports = function callBindBasic(args) {
	if (args.length < 1 || typeof args[0] !== 'function') {
		throw new $TypeError('a function is required');
	}
	return $actualApply(bind, $call, args);
};


/***/ }),

/***/ "./node_modules/call-bind-apply-helpers/reflectApply.js":
/*!**************************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/reflectApply.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./reflectApply')} */
module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;


/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var setFunctionLength = __webpack_require__(/*! set-function-length */ "./node_modules/set-function-length/index.js");

var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var callBindBasic = __webpack_require__(/*! call-bind-apply-helpers */ "./node_modules/call-bind-apply-helpers/index.js");
var applyBind = __webpack_require__(/*! call-bind-apply-helpers/applyBind */ "./node_modules/call-bind-apply-helpers/applyBind.js");

module.exports = function callBind(originalFunction) {
	var func = callBindBasic(arguments);
	var adjustedLength = originalFunction.length - (arguments.length - 1);
	return setFunctionLength(
		func,
		1 + (adjustedLength > 0 ? adjustedLength : 0),
		true
	);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/call-bound/index.js":
/*!******************************************!*\
  !*** ./node_modules/call-bound/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBindBasic = __webpack_require__(/*! call-bind-apply-helpers */ "./node_modules/call-bind-apply-helpers/index.js");

/** @type {(thisArg: string, searchString: string, position?: number) => number} */
var $indexOf = callBindBasic([GetIntrinsic('%String.prototype.indexOf%')]);

/** @type {import('.')} */
module.exports = function callBoundIntrinsic(name, allowMissing) {
	/* eslint no-extra-parens: 0 */

	var intrinsic = /** @type {(this: unknown, ...args: unknown[]) => unknown} */ (GetIntrinsic(name, !!allowMissing));
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBindBasic(/** @type {const} */ ([intrinsic]));
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/console-browserify/index.js":
/*!**************************************************!*\
  !*** ./node_modules/console-browserify/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global window, global*/
var util = __webpack_require__(/*! util */ "./node_modules/util/util.js")
var assert = __webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js")
function now() { return new Date().getTime() }

var slice = Array.prototype.slice
var console
var times = {}

if (typeof __webpack_require__.g !== "undefined" && __webpack_require__.g.console) {
    console = __webpack_require__.g.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    delete times[label]
    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}


/***/ }),

/***/ "./node_modules/define-data-property/index.js":
/*!****************************************************!*\
  !*** ./node_modules/define-data-property/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var $SyntaxError = __webpack_require__(/*! es-errors/syntax */ "./node_modules/es-errors/syntax.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");

var gopd = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};


/***/ }),

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var defineDataProperty = __webpack_require__(/*! define-data-property */ "./node_modules/define-data-property/index.js");

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var supportsDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}

	if (supportsDescriptors) {
		defineDataProperty(object, name, value, true);
	} else {
		defineDataProperty(object, name, value);
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "./node_modules/dunder-proto/get.js":
/*!******************************************!*\
  !*** ./node_modules/dunder-proto/get.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind-apply-helpers */ "./node_modules/call-bind-apply-helpers/index.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var hasProtoAccessor;
try {
	// eslint-disable-next-line no-extra-parens, no-proto
	hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ ([]).__proto__ === Array.prototype;
} catch (e) {
	if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
		throw e;
	}
}

// eslint-disable-next-line no-extra-parens
var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */ ('__proto__'));

var $Object = Object;
var $getPrototypeOf = $Object.getPrototypeOf;

/** @type {import('./get')} */
module.exports = desc && typeof desc.get === 'function'
	? callBind([desc.get])
	: typeof $getPrototypeOf === 'function'
		? /** @type {import('./get')} */ function getDunder(value) {
			// eslint-disable-next-line eqeqeq
			return $getPrototypeOf(value == null ? value : $Object(value));
		}
		: false;


/***/ }),

/***/ "./node_modules/es-define-property/index.js":
/*!**************************************************!*\
  !*** ./node_modules/es-define-property/index.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
var $defineProperty = Object.defineProperty || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;


/***/ }),

/***/ "./node_modules/es-errors/eval.js":
/*!****************************************!*\
  !*** ./node_modules/es-errors/eval.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./eval')} */
module.exports = EvalError;


/***/ }),

/***/ "./node_modules/es-errors/index.js":
/*!*****************************************!*\
  !*** ./node_modules/es-errors/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = Error;


/***/ }),

/***/ "./node_modules/es-errors/range.js":
/*!*****************************************!*\
  !*** ./node_modules/es-errors/range.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./range')} */
module.exports = RangeError;


/***/ }),

/***/ "./node_modules/es-errors/ref.js":
/*!***************************************!*\
  !*** ./node_modules/es-errors/ref.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./ref')} */
module.exports = ReferenceError;


/***/ }),

/***/ "./node_modules/es-errors/syntax.js":
/*!******************************************!*\
  !*** ./node_modules/es-errors/syntax.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./syntax')} */
module.exports = SyntaxError;


/***/ }),

/***/ "./node_modules/es-errors/type.js":
/*!****************************************!*\
  !*** ./node_modules/es-errors/type.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./type')} */
module.exports = TypeError;


/***/ }),

/***/ "./node_modules/es-errors/uri.js":
/*!***************************************!*\
  !*** ./node_modules/es-errors/uri.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./uri')} */
module.exports = URIError;


/***/ }),

/***/ "./node_modules/es-object-atoms/index.js":
/*!***********************************************!*\
  !*** ./node_modules/es-object-atoms/index.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = Object;


/***/ }),

/***/ "./node_modules/for-each/index.js":
/*!****************************************!*\
  !*** ./node_modules/for-each/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(/*! is-callable */ "./node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

/** @type {<This, A extends readonly unknown[]>(arr: A, iterator: (this: This | void, value: A[number], index: number, arr: A) => void, receiver: This | undefined) => void} */
var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

/** @type {<This, S extends string>(string: S, iterator: (this: This | void, value: S[number], index: number, string: S) => void, receiver: This | undefined) => void} */
var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

/** @type {<This, O>(obj: O, iterator: (this: This | void, value: O[keyof O], index: keyof O, obj: O) => void, receiver: This | undefined) => void} */
var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

/** @type {(x: unknown) => x is readonly unknown[]} */
function isArray(x) {
    return toStr.call(x) === '[object Array]';
}

/** @type {import('.')._internal} */
module.exports = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (isArray(list)) {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};


/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/generator-function/index.js":
/*!**************************************************!*\
  !*** ./node_modules/generator-function/index.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


// eslint-disable-next-line no-extra-parens, no-empty-function
const cached = /** @type {GeneratorFunctionConstructor} */ (function* () {}.constructor);

/** @type {import('.')} */
module.exports = () => cached;



/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $Object = __webpack_require__(/*! es-object-atoms */ "./node_modules/es-object-atoms/index.js");

var $Error = __webpack_require__(/*! es-errors */ "./node_modules/es-errors/index.js");
var $EvalError = __webpack_require__(/*! es-errors/eval */ "./node_modules/es-errors/eval.js");
var $RangeError = __webpack_require__(/*! es-errors/range */ "./node_modules/es-errors/range.js");
var $ReferenceError = __webpack_require__(/*! es-errors/ref */ "./node_modules/es-errors/ref.js");
var $SyntaxError = __webpack_require__(/*! es-errors/syntax */ "./node_modules/es-errors/syntax.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $URIError = __webpack_require__(/*! es-errors/uri */ "./node_modules/es-errors/uri.js");

var abs = __webpack_require__(/*! math-intrinsics/abs */ "./node_modules/math-intrinsics/abs.js");
var floor = __webpack_require__(/*! math-intrinsics/floor */ "./node_modules/math-intrinsics/floor.js");
var max = __webpack_require__(/*! math-intrinsics/max */ "./node_modules/math-intrinsics/max.js");
var min = __webpack_require__(/*! math-intrinsics/min */ "./node_modules/math-intrinsics/min.js");
var pow = __webpack_require__(/*! math-intrinsics/pow */ "./node_modules/math-intrinsics/pow.js");
var round = __webpack_require__(/*! math-intrinsics/round */ "./node_modules/math-intrinsics/round.js");
var sign = __webpack_require__(/*! math-intrinsics/sign */ "./node_modules/math-intrinsics/sign.js");

var $Function = Function;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");
var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = __webpack_require__(/*! get-proto */ "./node_modules/get-proto/index.js");
var $ObjectGPO = __webpack_require__(/*! get-proto/Object.getPrototypeOf */ "./node_modules/get-proto/Object.getPrototypeOf.js");
var $ReflectGPO = __webpack_require__(/*! get-proto/Reflect.getPrototypeOf */ "./node_modules/get-proto/Reflect.getPrototypeOf.js");

var $apply = __webpack_require__(/*! call-bind-apply-helpers/functionApply */ "./node_modules/call-bind-apply-helpers/functionApply.js");
var $call = __webpack_require__(/*! call-bind-apply-helpers/functionCall */ "./node_modules/call-bind-apply-helpers/functionCall.js");

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
	'%Float16Array%': typeof Float16Array === 'undefined' ? undefined : Float16Array,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': $Object,
	'%Object.getOwnPropertyDescriptor%': $gOPD,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,

	'%Function.prototype.call%': $call,
	'%Function.prototype.apply%': $apply,
	'%Object.defineProperty%': $defineProperty,
	'%Object.getPrototypeOf%': $ObjectGPO,
	'%Math.abs%': abs,
	'%Math.floor%': floor,
	'%Math.max%': max,
	'%Math.min%': min,
	'%Math.pow%': pow,
	'%Math.round%': round,
	'%Math.sign%': sign,
	'%Reflect.getPrototypeOf%': $ReflectGPO
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! hasown */ "./node_modules/hasown/index.js");
var $concat = bind.call($call, Array.prototype.concat);
var $spliceApply = bind.call($apply, Array.prototype.splice);
var $replace = bind.call($call, String.prototype.replace);
var $strSlice = bind.call($call, String.prototype.slice);
var $exec = bind.call($call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/get-proto/Object.getPrototypeOf.js":
/*!*********************************************************!*\
  !*** ./node_modules/get-proto/Object.getPrototypeOf.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $Object = __webpack_require__(/*! es-object-atoms */ "./node_modules/es-object-atoms/index.js");

/** @type {import('./Object.getPrototypeOf')} */
module.exports = $Object.getPrototypeOf || null;


/***/ }),

/***/ "./node_modules/get-proto/Reflect.getPrototypeOf.js":
/*!**********************************************************!*\
  !*** ./node_modules/get-proto/Reflect.getPrototypeOf.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./Reflect.getPrototypeOf')} */
module.exports = (typeof Reflect !== 'undefined' && Reflect.getPrototypeOf) || null;


/***/ }),

/***/ "./node_modules/get-proto/index.js":
/*!*****************************************!*\
  !*** ./node_modules/get-proto/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reflectGetProto = __webpack_require__(/*! ./Reflect.getPrototypeOf */ "./node_modules/get-proto/Reflect.getPrototypeOf.js");
var originalGetProto = __webpack_require__(/*! ./Object.getPrototypeOf */ "./node_modules/get-proto/Object.getPrototypeOf.js");

var getDunderProto = __webpack_require__(/*! dunder-proto/get */ "./node_modules/dunder-proto/get.js");

/** @type {import('.')} */
module.exports = reflectGetProto
	? function getProto(O) {
		// @ts-expect-error TS can't narrow inside a closure, for some reason
		return reflectGetProto(O);
	}
	: originalGetProto
		? function getProto(O) {
			if (!O || (typeof O !== 'object' && typeof O !== 'function')) {
				throw new TypeError('getProto: not an object');
			}
			// @ts-expect-error TS can't narrow inside a closure, for some reason
			return originalGetProto(O);
		}
		: getDunderProto
			? function getProto(O) {
				// @ts-expect-error TS can't narrow inside a closure, for some reason
				return getDunderProto(O);
			}
			: null;


/***/ }),

/***/ "./node_modules/gopd/gOPD.js":
/*!***********************************!*\
  !*** ./node_modules/gopd/gOPD.js ***!
  \***********************************/
/***/ ((module) => {

"use strict";


/** @type {import('./gOPD')} */
module.exports = Object.getOwnPropertyDescriptor;


/***/ }),

/***/ "./node_modules/gopd/index.js":
/*!************************************!*\
  !*** ./node_modules/gopd/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/** @type {import('.')} */
var $gOPD = __webpack_require__(/*! ./gOPD */ "./node_modules/gopd/gOPD.js");

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./node_modules/has-property-descriptors/index.js":
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

/** @type {import('.')} */
module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./shams')} */
/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	/** @type {{ [k in symbol]?: unknown }} */
	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (var _ in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		// eslint-disable-next-line no-extra-parens
		var descriptor = /** @type {PropertyDescriptor} */ (Object.getOwnPropertyDescriptor(obj, sym));
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has-tostringtag/shams.js":
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "./node_modules/hasown/index.js":
/*!**************************************!*\
  !*** ./node_modules/hasown/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/is-arguments/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");

var $toString = callBound('Object.prototype.toString');

/** @type {import('.')} */
var isStandardArguments = function isArguments(value) {
	if (
		hasToStringTag
		&& value
		&& typeof value === 'object'
		&& Symbol.toStringTag in value
	) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

/** @type {import('.')} */
var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null
		&& typeof value === 'object'
		&& 'length' in value
		&& typeof value.length === 'number'
		&& value.length >= 0
		&& $toString(value) !== '[object Array]'
		&& 'callee' in value
		&& $toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

// @ts-expect-error TODO make this not error
isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

/** @type {import('.')} */
module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "./node_modules/is-callable/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ "./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");
var safeRegexTest = __webpack_require__(/*! safe-regex-test */ "./node_modules/safe-regex-test/index.js");
var isFnRegex = safeRegexTest(/^\s*(?:function)?\*/);
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = __webpack_require__(/*! get-proto */ "./node_modules/get-proto/index.js");

var toStr = callBound('Object.prototype.toString');
var fnToStr = callBound('Function.prototype.toString');

var getGeneratorFunction = __webpack_require__(/*! generator-function */ "./node_modules/generator-function/index.js");

/** @type {import('.')} */
module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex(fnToStr(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	var GeneratorFunction = getGeneratorFunction();
	return GeneratorFunction && getProto(fn) === GeneratorFunction.prototype;
};


/***/ }),

/***/ "./node_modules/is-nan/implementation.js":
/*!***********************************************!*\
  !*** ./node_modules/is-nan/implementation.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ "./node_modules/is-nan/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-nan/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/is-nan/shim.js");

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/is-nan/polyfill.js":
/*!*****************************************!*\
  !*** ./node_modules/is-nan/polyfill.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ "./node_modules/is-nan/shim.js":
/*!*************************************!*\
  !*** ./node_modules/is-nan/shim.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/is-regex/index.js":
/*!****************************************!*\
  !*** ./node_modules/is-regex/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var hasOwn = __webpack_require__(/*! hasown */ "./node_modules/hasown/index.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

/** @type {import('.')} */
var fn;

if (hasToStringTag) {
	/** @type {(receiver: ThisParameterType<typeof RegExp.prototype.exec>, ...args: Parameters<typeof RegExp.prototype.exec>) => ReturnType<typeof RegExp.prototype.exec>} */
	var $exec = callBound('RegExp.prototype.exec');
	/** @type {object} */
	var isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	/** @type {{ toString(): never, valueOf(): never, [Symbol.toPrimitive]?(): never }} */
	var badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}

	/** @type {import('.')} */
	// @ts-expect-error TS can't figure out that the $exec call always throws
	// eslint-disable-next-line consistent-return
	fn = function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		// eslint-disable-next-line no-extra-parens
		var descriptor = /** @type {NonNullable<typeof gOPD>} */ (gOPD)(/** @type {{ lastIndex?: unknown }} */ (value), 'lastIndex');
		var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			// eslint-disable-next-line no-extra-parens
			$exec(value, /** @type {string} */ (/** @type {unknown} */ (badStringifier)));
		} catch (e) {
			return e === isRegexMarker;
		}
	};
} else {
	/** @type {(receiver: ThisParameterType<typeof Object.prototype.toString>, ...args: Parameters<typeof Object.prototype.toString>) => ReturnType<typeof Object.prototype.toString>} */
	var $toString = callBound('Object.prototype.toString');
	/** @const @type {'[object RegExp]'} */
	var regexClass = '[object RegExp]';

	/** @type {import('.')} */
	fn = function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return $toString(value) === regexClass;
	};
}

module.exports = fn;


/***/ }),

/***/ "./node_modules/is-typed-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");

/** @type {import('.')} */
module.exports = function isTypedArray(value) {
	return !!whichTypedArray(value);
};


/***/ }),

/***/ "./node_modules/math-intrinsics/abs.js":
/*!*********************************************!*\
  !*** ./node_modules/math-intrinsics/abs.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./abs')} */
module.exports = Math.abs;


/***/ }),

/***/ "./node_modules/math-intrinsics/floor.js":
/*!***********************************************!*\
  !*** ./node_modules/math-intrinsics/floor.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./floor')} */
module.exports = Math.floor;


/***/ }),

/***/ "./node_modules/math-intrinsics/isNaN.js":
/*!***********************************************!*\
  !*** ./node_modules/math-intrinsics/isNaN.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./isNaN')} */
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


/***/ }),

/***/ "./node_modules/math-intrinsics/max.js":
/*!*********************************************!*\
  !*** ./node_modules/math-intrinsics/max.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./max')} */
module.exports = Math.max;


/***/ }),

/***/ "./node_modules/math-intrinsics/min.js":
/*!*********************************************!*\
  !*** ./node_modules/math-intrinsics/min.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./min')} */
module.exports = Math.min;


/***/ }),

/***/ "./node_modules/math-intrinsics/pow.js":
/*!*********************************************!*\
  !*** ./node_modules/math-intrinsics/pow.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./pow')} */
module.exports = Math.pow;


/***/ }),

/***/ "./node_modules/math-intrinsics/round.js":
/*!***********************************************!*\
  !*** ./node_modules/math-intrinsics/round.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./round')} */
module.exports = Math.round;


/***/ }),

/***/ "./node_modules/math-intrinsics/sign.js":
/*!**********************************************!*\
  !*** ./node_modules/math-intrinsics/sign.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $isNaN = __webpack_require__(/*! ./isNaN */ "./node_modules/math-intrinsics/isNaN.js");

/** @type {import('./sign')} */
module.exports = function sign(number) {
	if ($isNaN(number) || number === 0) {
		return number;
	}
	return number < 0 ? -1 : +1;
};


/***/ }),

/***/ "./node_modules/object-is/implementation.js":
/*!**************************************************!*\
  !*** ./node_modules/object-is/implementation.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "./node_modules/object-is/index.js":
/*!*****************************************!*\
  !*** ./node_modules/object-is/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/object-is/polyfill.js":
/*!********************************************!*\
  !*** ./node_modules/object-is/polyfill.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "./node_modules/object-is/shim.js":
/*!****************************************!*\
  !*** ./node_modules/object-is/shim.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/object.assign/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/object.assign/implementation.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var objectKeys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js")();
var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");
var $Object = __webpack_require__(/*! es-object-atoms */ "./node_modules/es-object-atoms/index.js");
var $push = callBound('Array.prototype.push');
var $propIsEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var originalGetSymbols = hasSymbols ? $Object.getOwnPropertySymbols : null;

// eslint-disable-next-line no-unused-vars
module.exports = function assign(target, source1) {
	if (target == null) { throw new TypeError('target must be an object'); }
	var to = $Object(target); // step 1
	if (arguments.length === 1) {
		return to; // step 2
	}
	for (var s = 1; s < arguments.length; ++s) {
		var from = $Object(arguments[s]); // step 3.a.i

		// step 3.a.ii:
		var keys = objectKeys(from);
		var getSymbols = hasSymbols && ($Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			var syms = getSymbols(from);
			for (var j = 0; j < syms.length; ++j) {
				var key = syms[j];
				if ($propIsEnumerable(from, key)) {
					$push(keys, key);
				}
			}
		}

		// step 3.a.iii:
		for (var i = 0; i < keys.length; ++i) {
			var nextKey = keys[i];
			if ($propIsEnumerable(from, nextKey)) { // step 3.a.iii.2
				var propValue = from[nextKey]; // step 3.a.iii.2.a
				to[nextKey] = propValue; // step 3.a.iii.2.b
			}
		}
	}

	return to; // step 4
};


/***/ }),

/***/ "./node_modules/object.assign/polyfill.js":
/*!************************************************!*\
  !*** ./node_modules/object.assign/polyfill.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object.assign/implementation.js");

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	/*
	 * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	 * note: this does not detect the bug unless there's 20 characters
	 */
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	/*
	 * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	 * which is 72% slower than our shim, and Firefox 40's native implementation.
	 */
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

module.exports = function getPolyfill() {
	if (!Object.assign) {
		return implementation;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation;
	}
	if (assignHasPendingExceptions()) {
		return implementation;
	}
	return Object.assign;
};


/***/ }),

/***/ "./node_modules/possible-typed-array-names/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/possible-typed-array-names/index.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = [
	'Float16Array',
	'Float32Array',
	'Float64Array',
	'Int8Array',
	'Int16Array',
	'Int32Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Uint16Array',
	'Uint32Array',
	'BigInt64Array',
	'BigUint64Array'
];


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/safe-regex-test/index.js":
/*!***********************************************!*\
  !*** ./node_modules/safe-regex-test/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");
var isRegex = __webpack_require__(/*! is-regex */ "./node_modules/is-regex/index.js");

var $exec = callBound('RegExp.prototype.exec');
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");

/** @type {import('.')} */
module.exports = function regexTester(regex) {
	if (!isRegex(regex)) {
		throw new $TypeError('`regex` must be a RegExp');
	}
	return function test(s) {
		return $exec(regex, s) !== null;
	};
};


/***/ }),

/***/ "./node_modules/set-function-length/index.js":
/*!***************************************************!*\
  !*** ./node_modules/set-function-length/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var define = __webpack_require__(/*! define-data-property */ "./node_modules/define-data-property/index.js");
var hasDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/support/types.js":
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/which-typed-array/index.js":
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");
var getProto = __webpack_require__(/*! get-proto */ "./node_modules/get-proto/index.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');

/** @type {<T = unknown>(array: readonly T[], value: unknown) => number} */
var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};

/** @typedef {import('./types').Getter} Getter */
/** @type {import('./types').Cache} */
var cache = { __proto__: null };
if (hasToStringTag && gOPD && getProto) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr && getProto) {
			var proto = getProto(arr);
			// @ts-expect-error TS won't narrow inside a closure
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor && proto) {
				var superProto = getProto(proto);
				// @ts-expect-error TS won't narrow inside a closure
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			// @ts-expect-error TODO: fix
			cache['$' + typedArray] = callBind(descriptor.get);
		}
	});
} else {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		var fn = arr.slice || arr.set;
		if (fn) {
			cache[
				/** @type {`$${import('.').TypedArrayName}`} */ ('$' + typedArray)
			] = /** @type {import('./types').BoundSlice | import('./types').BoundSet} */ (
				// @ts-expect-error TODO FIXME
				callBind(fn)
			);
		}
	});
}

/** @type {(value: object) => false | import('.').TypedArrayName} */
var tryTypedArrays = function tryAllTypedArrays(value) {
	/** @type {ReturnType<typeof tryAllTypedArrays>} */ var found = false;
	forEach(
		/** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */ (cache),
		/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
		function (getter, typedArray) {
			if (!found) {
				try {
					// @ts-expect-error a throw is fine here
					if ('$' + getter(value) === typedArray) {
						found = /** @type {import('.').TypedArrayName} */ ($slice(typedArray, 1));
					}
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {(value: object) => false | import('.').TypedArrayName} */
var trySlices = function tryAllSlices(value) {
	/** @type {ReturnType<typeof tryAllSlices>} */ var found = false;
	forEach(
		/** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */(cache),
		/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */ function (getter, name) {
			if (!found) {
				try {
					// @ts-expect-error a throw is fine here
					getter(value);
					found = /** @type {import('.').TypedArrayName} */ ($slice(name, 1));
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {import('.')} */
module.exports = function whichTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		/** @type {string} */
		var tag = $slice($toString(value), 8, -1);
		if ($indexOf(typedArrays, tag) > -1) {
			return tag;
		}
		if (tag !== 'Object') {
			return false;
		}
		// node < 0.6 hits here on real Typed Arrays
		return trySlices(value);
	}
	if (!gOPD) { return null; } // unknown engine
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./wp-content/themes/contiso/src/scss/home.scss":
/*!******************************************************!*\
  !*** ./wp-content/themes/contiso/src/scss/home.scss ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**************************************************!*\
  !*** ./wp-content/themes/contiso/src/js/home.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_home_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/home.scss */ "./wp-content/themes/contiso/src/scss/home.scss");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
//JS
console.log("Hello world");

// SCSS

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvaG9tZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLHNCQUFzQiwyQkFBMkIsb0dBQW9HLG1CQUFtQixpQkFBaUIsc0hBQXNIO0FBQy9TLDRDQUE0QyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVEO0FBQy9QLDhEQUE4RCxzRUFBc0UsOERBQThELGtEQUFrRCxpQkFBaUIsR0FBRztBQUN4USwrQkFBK0IsdUNBQXVDO0FBQ3RFLHFDQUFxQyxpRUFBaUUsc0NBQXNDLDBCQUEwQiwrQ0FBK0MsMkNBQTJDLHVFQUF1RTtBQUN2VSxrREFBa0QsMENBQTBDO0FBQzVGLGVBQWUsbUJBQU8sQ0FBQyx5RUFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1CQUFPLENBQUMseUdBQW1DO0FBQ2hFLGdCQUFnQixtQkFBTyxDQUFDLDBDQUFPO0FBQy9CO0FBQ0EscUJBQXFCLHVFQUFzQjtBQUMzQztBQUNBO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMsd0VBQXdCO0FBQ25ELGVBQWUsbUJBQU8sQ0FBQyxnRUFBb0I7QUFDM0MsMEJBQTBCLG1CQUFPLENBQUMsa0VBQXFCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMsNkZBQTZCO0FBQ3hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsaUJBQWlCLE9BQU8sZUFBZSxPQUFPLGVBQWUsT0FBTyxXQUFXLE9BQU87QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxhQUFhO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxhQUFhLElBQUksYUFBYTtBQUNsRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxjQUFjO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QU8sQ0FBQyw4Q0FBUTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdUVBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsTUFBTTtBQUNoRDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdERhOztBQUViLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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QU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7O0FBR2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QyxLQUFLOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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dC9idWlsZC9hc3NlcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9pbnRlcm5hbC9hc3NlcnQvYXNzZXJ0aW9uX2Vycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvZXJyb3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXZhaWxhYmxlLXR5cGVkLWFycmF5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kLWFwcGx5LWhlbHBlcnMvYWN0dWFsQXBwbHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NhbGwtYmluZC1hcHBseS1oZWxwZXJzL2FwcGx5QmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kLWFwcGx5LWhlbHBlcnMvZnVuY3Rpb25BcHBseS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kLWFwcGx5LWhlbHBlcnMvZnVuY3Rpb25DYWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQtYXBwbHktaGVscGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kLWFwcGx5LWhlbHBlcnMvcmVmbGVjdEFwcGx5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvY2FsbEJvdW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NhbGwtYm91bmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbnNvbGUtYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVmaW5lLWRhdGEtcHJvcGVydHkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlZmluZS1wcm9wZXJ0aWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kdW5kZXItcHJvdG8vZ2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lcy1kZWZpbmUtcHJvcGVydHkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzLWVycm9ycy9ldmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lcy1lcnJvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzLWVycm9ycy9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXMtZXJyb3JzL3JlZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXMtZXJyb3JzL3N5bnRheC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXMtZXJyb3JzL3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzLWVycm9ycy91cmkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzLW9iamVjdC1hdG9tcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm9yLWVhY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dlbmVyYXRvci1mdW5jdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2V0LWludHJpbnNpYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2V0LXByb3RvL09iamVjdC5nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2V0LXByb3RvL1JlZmxlY3QuZ2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dldC1wcm90by9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ29wZC9nT1BELmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nb3BkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtcHJvcGVydHktZGVzY3JpcHRvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtc3ltYm9scy9zaGFtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaGFzLXRvc3RyaW5ndGFnL3NoYW1zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXNvd24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWFyZ3VtZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtY2FsbGFibGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWdlbmVyYXRvci1mdW5jdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtbmFuL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1uYW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLW5hbi9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtbmFuL3NoaW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLXJlZ2V4L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy10eXBlZC1hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWF0aC1pbnRyaW5zaWNzL2Ficy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWF0aC1pbnRyaW5zaWNzL2Zsb29yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRoLWludHJpbnNpY3MvaXNOYU4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGgtaW50cmluc2ljcy9tYXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGgtaW50cmluc2ljcy9taW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGgtaW50cmluc2ljcy9wb3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGgtaW50cmluc2ljcy9yb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWF0aC1pbnRyaW5zaWNzL3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3QtaXMvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9zaGltLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3QuYXNzaWduL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3QuYXNzaWduL3BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3NzaWJsZS10eXBlZC1hcnJheS1uYW1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zYWZlLXJlZ2V4LXRlc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NldC1mdW5jdGlvbi1sZW5ndGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXRpbC91dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGljaC10eXBlZC1hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi93cC1jb250ZW50L3RoZW1lcy9jb250aXNvL3NyYy9zY3NzL2hvbWUuc2NzcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vd3AtY29udGVudC90aGVtZXMvY29udGlzby9zcmMvanMvaG9tZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2Fzc2VydC5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8yYTUxYWU0MjRhNTEzZWM5YTZhYTM0NjZiYWEwY2MxZDU1ZGQ0ZjNiXG5cbi8vIE9yaWdpbmFsbHkgZnJvbSBuYXJ3aGFsLmpzIChodHRwOi8vbmFyd2hhbGpzLm9yZylcbi8vIENvcHlyaWdodCAoYykgMjAwOSBUaG9tYXMgUm9iaW5zb24gPDI4MG5vcnRoLmNvbT5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAnU29mdHdhcmUnKSwgdG9cbi8vIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4vLyByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Jcbi8vIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOXG4vLyBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG8pIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7IHJldHVybiB0eXBlb2YgbzsgfSA6IGZ1bmN0aW9uIChvKSB7IHJldHVybiBvICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG8uY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvOyB9LCBfdHlwZW9mKG8pOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIF90b1Byb3BlcnR5S2V5KGRlc2NyaXB0b3Iua2V5KSwgZGVzY3JpcHRvcik7IH0gfVxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6IGZhbHNlIH0pOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykgeyB2YXIga2V5ID0gX3RvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7IHJldHVybiBfdHlwZW9mKGtleSkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7IGlmIChfdHlwZW9mKGlucHV0KSAhPT0gXCJvYmplY3RcIiB8fCBpbnB1dCA9PT0gbnVsbCkgcmV0dXJuIGlucHV0OyB2YXIgcHJpbSA9IGlucHV0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmIChwcmltICE9PSB1bmRlZmluZWQpIHsgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7IGlmIChfdHlwZW9mKHJlcykgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTsgfSByZXR1cm4gKGhpbnQgPT09IFwic3RyaW5nXCIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTsgfVxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvZXJyb3JzJyksXG4gIF9yZXF1aXJlJGNvZGVzID0gX3JlcXVpcmUuY29kZXMsXG4gIEVSUl9BTUJJR1VPVVNfQVJHVU1FTlQgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfQU1CSUdVT1VTX0FSR1VNRU5ULFxuICBFUlJfSU5WQUxJRF9BUkdfVFlQRSA9IF9yZXF1aXJlJGNvZGVzLkVSUl9JTlZBTElEX0FSR19UWVBFLFxuICBFUlJfSU5WQUxJRF9BUkdfVkFMVUUgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfSU5WQUxJRF9BUkdfVkFMVUUsXG4gIEVSUl9JTlZBTElEX1JFVFVSTl9WQUxVRSA9IF9yZXF1aXJlJGNvZGVzLkVSUl9JTlZBTElEX1JFVFVSTl9WQUxVRSxcbiAgRVJSX01JU1NJTkdfQVJHUyA9IF9yZXF1aXJlJGNvZGVzLkVSUl9NSVNTSU5HX0FSR1M7XG52YXIgQXNzZXJ0aW9uRXJyb3IgPSByZXF1aXJlKCcuL2ludGVybmFsL2Fzc2VydC9hc3NlcnRpb25fZXJyb3InKTtcbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCd1dGlsLycpLFxuICBpbnNwZWN0ID0gX3JlcXVpcmUyLmluc3BlY3Q7XG52YXIgX3JlcXVpcmUkdHlwZXMgPSByZXF1aXJlKCd1dGlsLycpLnR5cGVzLFxuICBpc1Byb21pc2UgPSBfcmVxdWlyZSR0eXBlcy5pc1Byb21pc2UsXG4gIGlzUmVnRXhwID0gX3JlcXVpcmUkdHlwZXMuaXNSZWdFeHA7XG52YXIgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LmFzc2lnbi9wb2x5ZmlsbCcpKCk7XG52YXIgb2JqZWN0SXMgPSByZXF1aXJlKCdvYmplY3QtaXMvcG9seWZpbGwnKSgpO1xudmFyIFJlZ0V4cFByb3RvdHlwZVRlc3QgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJykoJ1JlZ0V4cC5wcm90b3R5cGUudGVzdCcpO1xudmFyIGVycm9yQ2FjaGUgPSBuZXcgTWFwKCk7XG52YXIgaXNEZWVwRXF1YWw7XG52YXIgaXNEZWVwU3RyaWN0RXF1YWw7XG52YXIgcGFyc2VFeHByZXNzaW9uQXQ7XG52YXIgZmluZE5vZGVBcm91bmQ7XG52YXIgZGVjb2RlcjtcbmZ1bmN0aW9uIGxhenlMb2FkQ29tcGFyaXNvbigpIHtcbiAgdmFyIGNvbXBhcmlzb24gPSByZXF1aXJlKCcuL2ludGVybmFsL3V0aWwvY29tcGFyaXNvbnMnKTtcbiAgaXNEZWVwRXF1YWwgPSBjb21wYXJpc29uLmlzRGVlcEVxdWFsO1xuICBpc0RlZXBTdHJpY3RFcXVhbCA9IGNvbXBhcmlzb24uaXNEZWVwU3RyaWN0RXF1YWw7XG59XG5cbi8vIEVzY2FwZSBjb250cm9sIGNoYXJhY3RlcnMgYnV0IG5vdCBcXG4gYW5kIFxcdCB0byBrZWVwIHRoZSBsaW5lIGJyZWFrcyBhbmRcbi8vIGluZGVudGF0aW9uIGludGFjdC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG52YXIgZXNjYXBlU2VxdWVuY2VzUmVnRXhwID0gL1tcXHgwMC1cXHgwOFxceDBiXFx4MGNcXHgwZS1cXHgxZl0vZztcbnZhciBtZXRhID0gW1wiXFxcXHUwMDAwXCIsIFwiXFxcXHUwMDAxXCIsIFwiXFxcXHUwMDAyXCIsIFwiXFxcXHUwMDAzXCIsIFwiXFxcXHUwMDA0XCIsIFwiXFxcXHUwMDA1XCIsIFwiXFxcXHUwMDA2XCIsIFwiXFxcXHUwMDA3XCIsICdcXFxcYicsICcnLCAnJywgXCJcXFxcdTAwMGJcIiwgJ1xcXFxmJywgJycsIFwiXFxcXHUwMDBlXCIsIFwiXFxcXHUwMDBmXCIsIFwiXFxcXHUwMDEwXCIsIFwiXFxcXHUwMDExXCIsIFwiXFxcXHUwMDEyXCIsIFwiXFxcXHUwMDEzXCIsIFwiXFxcXHUwMDE0XCIsIFwiXFxcXHUwMDE1XCIsIFwiXFxcXHUwMDE2XCIsIFwiXFxcXHUwMDE3XCIsIFwiXFxcXHUwMDE4XCIsIFwiXFxcXHUwMDE5XCIsIFwiXFxcXHUwMDFhXCIsIFwiXFxcXHUwMDFiXCIsIFwiXFxcXHUwMDFjXCIsIFwiXFxcXHUwMDFkXCIsIFwiXFxcXHUwMDFlXCIsIFwiXFxcXHUwMDFmXCJdO1xudmFyIGVzY2FwZUZuID0gZnVuY3Rpb24gZXNjYXBlRm4oc3RyKSB7XG4gIHJldHVybiBtZXRhW3N0ci5jaGFyQ29kZUF0KDApXTtcbn07XG52YXIgd2FybmVkID0gZmFsc2U7XG5cbi8vIFRoZSBhc3NlcnQgbW9kdWxlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0aGF0IHRocm93XG4vLyBBc3NlcnRpb25FcnJvcidzIHdoZW4gcGFydGljdWxhciBjb25kaXRpb25zIGFyZSBub3QgbWV0LiBUaGVcbi8vIGFzc2VydCBtb2R1bGUgbXVzdCBjb25mb3JtIHRvIHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlLlxuXG52YXIgYXNzZXJ0ID0gbW9kdWxlLmV4cG9ydHMgPSBvaztcbnZhciBOT19FWENFUFRJT05fU0VOVElORUwgPSB7fTtcblxuLy8gQWxsIG9mIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIG11c3QgdGhyb3cgYW4gQXNzZXJ0aW9uRXJyb3Jcbi8vIHdoZW4gYSBjb3JyZXNwb25kaW5nIGNvbmRpdGlvbiBpcyBub3QgbWV0LCB3aXRoIGEgbWVzc2FnZSB0aGF0XG4vLyBtYXkgYmUgdW5kZWZpbmVkIGlmIG5vdCBwcm92aWRlZC4gQWxsIGFzc2VydGlvbiBtZXRob2RzIHByb3ZpZGVcbi8vIGJvdGggdGhlIGFjdHVhbCBhbmQgZXhwZWN0ZWQgdmFsdWVzIHRvIHRoZSBhc3NlcnRpb24gZXJyb3IgZm9yXG4vLyBkaXNwbGF5IHB1cnBvc2VzLlxuXG5mdW5jdGlvbiBpbm5lckZhaWwob2JqKSB7XG4gIGlmIChvYmoubWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB0aHJvdyBvYmoubWVzc2FnZTtcbiAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKG9iaik7XG59XG5mdW5jdGlvbiBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yLCBzdGFja1N0YXJ0Rm4pIHtcbiAgdmFyIGFyZ3NMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW50ZXJuYWxNZXNzYWdlO1xuICBpZiAoYXJnc0xlbiA9PT0gMCkge1xuICAgIGludGVybmFsTWVzc2FnZSA9ICdGYWlsZWQnO1xuICB9IGVsc2UgaWYgKGFyZ3NMZW4gPT09IDEpIHtcbiAgICBtZXNzYWdlID0gYWN0dWFsO1xuICAgIGFjdHVhbCA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAod2FybmVkID09PSBmYWxzZSkge1xuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICAgIHZhciB3YXJuID0gcHJvY2Vzcy5lbWl0V2FybmluZyA/IHByb2Nlc3MuZW1pdFdhcm5pbmcgOiBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKTtcbiAgICAgIHdhcm4oJ2Fzc2VydC5mYWlsKCkgd2l0aCBtb3JlIHRoYW4gb25lIGFyZ3VtZW50IGlzIGRlcHJlY2F0ZWQuICcgKyAnUGxlYXNlIHVzZSBhc3NlcnQuc3RyaWN0RXF1YWwoKSBpbnN0ZWFkIG9yIG9ubHkgcGFzcyBhIG1lc3NhZ2UuJywgJ0RlcHJlY2F0aW9uV2FybmluZycsICdERVAwMDk0Jyk7XG4gICAgfVxuICAgIGlmIChhcmdzTGVuID09PSAyKSBvcGVyYXRvciA9ICchPSc7XG4gIH1cbiAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikgdGhyb3cgbWVzc2FnZTtcbiAgdmFyIGVyckFyZ3MgPSB7XG4gICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgIG9wZXJhdG9yOiBvcGVyYXRvciA9PT0gdW5kZWZpbmVkID8gJ2ZhaWwnIDogb3BlcmF0b3IsXG4gICAgc3RhY2tTdGFydEZuOiBzdGFja1N0YXJ0Rm4gfHwgZmFpbFxuICB9O1xuICBpZiAobWVzc2FnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZXJyQXJncy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgfVxuICB2YXIgZXJyID0gbmV3IEFzc2VydGlvbkVycm9yKGVyckFyZ3MpO1xuICBpZiAoaW50ZXJuYWxNZXNzYWdlKSB7XG4gICAgZXJyLm1lc3NhZ2UgPSBpbnRlcm5hbE1lc3NhZ2U7XG4gICAgZXJyLmdlbmVyYXRlZE1lc3NhZ2UgPSB0cnVlO1xuICB9XG4gIHRocm93IGVycjtcbn1cbmFzc2VydC5mYWlsID0gZmFpbDtcblxuLy8gVGhlIEFzc2VydGlvbkVycm9yIGlzIGRlZmluZWQgaW4gaW50ZXJuYWwvZXJyb3IuXG5hc3NlcnQuQXNzZXJ0aW9uRXJyb3IgPSBBc3NlcnRpb25FcnJvcjtcbmZ1bmN0aW9uIGlubmVyT2soZm4sIGFyZ0xlbiwgdmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHZhciBnZW5lcmF0ZWRNZXNzYWdlID0gZmFsc2U7XG4gICAgaWYgKGFyZ0xlbiA9PT0gMCkge1xuICAgICAgZ2VuZXJhdGVkTWVzc2FnZSA9IHRydWU7XG4gICAgICBtZXNzYWdlID0gJ05vIHZhbHVlIGFyZ3VtZW50IHBhc3NlZCB0byBgYXNzZXJ0Lm9rKClgJztcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgdGhyb3cgbWVzc2FnZTtcbiAgICB9XG4gICAgdmFyIGVyciA9IG5ldyBBc3NlcnRpb25FcnJvcih7XG4gICAgICBhY3R1YWw6IHZhbHVlLFxuICAgICAgZXhwZWN0ZWQ6IHRydWUsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICc9PScsXG4gICAgICBzdGFja1N0YXJ0Rm46IGZuXG4gICAgfSk7XG4gICAgZXJyLmdlbmVyYXRlZE1lc3NhZ2UgPSBnZW5lcmF0ZWRNZXNzYWdlO1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuXG4vLyBQdXJlIGFzc2VydGlvbiB0ZXN0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdHJ1dGh5LCBhcyBkZXRlcm1pbmVkXG4vLyBieSAhIXZhbHVlLlxuZnVuY3Rpb24gb2soKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cbiAgaW5uZXJPay5hcHBseSh2b2lkIDAsIFtvaywgYXJncy5sZW5ndGhdLmNvbmNhdChhcmdzKSk7XG59XG5hc3NlcnQub2sgPSBvaztcblxuLy8gVGhlIGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzaGFsbG93LCBjb2VyY2l2ZSBlcXVhbGl0eSB3aXRoID09LlxuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzICovXG5hc3NlcnQuZXF1YWwgPSBmdW5jdGlvbiBlcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG4gIGlmIChhY3R1YWwgIT0gZXhwZWN0ZWQpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICc9PScsXG4gICAgICBzdGFja1N0YXJ0Rm46IGVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIFRoZSBub24tZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIGZvciB3aGV0aGVyIHR3byBvYmplY3RzIGFyZSBub3Rcbi8vIGVxdWFsIHdpdGggIT0uXG5hc3NlcnQubm90RXF1YWwgPSBmdW5jdGlvbiBub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG4gIGlmIChhY3R1YWwgPT0gZXhwZWN0ZWQpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICchPScsXG4gICAgICBzdGFja1N0YXJ0Rm46IG5vdEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIFRoZSBlcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgYSBkZWVwIGVxdWFsaXR5IHJlbGF0aW9uLlxuYXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIGRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuICBpZiAoaXNEZWVwRXF1YWwgPT09IHVuZGVmaW5lZCkgbGF6eUxvYWRDb21wYXJpc29uKCk7XG4gIGlmICghaXNEZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdkZWVwRXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBkZWVwRXF1YWxcbiAgICB9KTtcbiAgfVxufTtcblxuLy8gVGhlIG5vbi1lcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgZm9yIGFueSBkZWVwIGluZXF1YWxpdHkuXG5hc3NlcnQubm90RGVlcEVxdWFsID0gZnVuY3Rpb24gbm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG4gIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcbiAgaWYgKGlzRGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnbm90RGVlcEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogbm90RGVlcEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbmFzc2VydC5kZWVwU3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBkZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cbiAgaWYgKGlzRGVlcEVxdWFsID09PSB1bmRlZmluZWQpIGxhenlMb2FkQ29tcGFyaXNvbigpO1xuICBpZiAoIWlzRGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnZGVlcFN0cmljdEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogZGVlcFN0cmljdEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG5hc3NlcnQubm90RGVlcFN0cmljdEVxdWFsID0gbm90RGVlcFN0cmljdEVxdWFsO1xuZnVuY3Rpb24gbm90RGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG4gIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcbiAgaWYgKGlzRGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnbm90RGVlcFN0cmljdEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogbm90RGVlcFN0cmljdEVxdWFsXG4gICAgfSk7XG4gIH1cbn1cbmFzc2VydC5zdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIHN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG4gIGlmICghb2JqZWN0SXMoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdzdHJpY3RFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IHN0cmljdEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG5hc3NlcnQubm90U3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuICBpZiAob2JqZWN0SXMoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdub3RTdHJpY3RFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IG5vdFN0cmljdEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG52YXIgQ29tcGFyaXNvbiA9IC8qI19fUFVSRV9fKi9fY3JlYXRlQ2xhc3MoZnVuY3Rpb24gQ29tcGFyaXNvbihvYmosIGtleXMsIGFjdHVhbCkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29tcGFyaXNvbik7XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChhY3R1YWwgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYWN0dWFsW2tleV0gPT09ICdzdHJpbmcnICYmIGlzUmVnRXhwKG9ialtrZXldKSAmJiBSZWdFeHBQcm90b3R5cGVUZXN0KG9ialtrZXldLCBhY3R1YWxba2V5XSkpIHtcbiAgICAgICAgX3RoaXNba2V5XSA9IGFjdHVhbFtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXNba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcbmZ1bmN0aW9uIGNvbXBhcmVFeGNlcHRpb25LZXkoYWN0dWFsLCBleHBlY3RlZCwga2V5LCBtZXNzYWdlLCBrZXlzLCBmbikge1xuICBpZiAoIShrZXkgaW4gYWN0dWFsKSB8fCAhaXNEZWVwU3RyaWN0RXF1YWwoYWN0dWFsW2tleV0sIGV4cGVjdGVkW2tleV0pKSB7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAvLyBDcmVhdGUgcGxhY2Vob2xkZXIgb2JqZWN0cyB0byBjcmVhdGUgYSBuaWNlIG91dHB1dC5cbiAgICAgIHZhciBhID0gbmV3IENvbXBhcmlzb24oYWN0dWFsLCBrZXlzKTtcbiAgICAgIHZhciBiID0gbmV3IENvbXBhcmlzb24oZXhwZWN0ZWQsIGtleXMsIGFjdHVhbCk7XG4gICAgICB2YXIgZXJyID0gbmV3IEFzc2VydGlvbkVycm9yKHtcbiAgICAgICAgYWN0dWFsOiBhLFxuICAgICAgICBleHBlY3RlZDogYixcbiAgICAgICAgb3BlcmF0b3I6ICdkZWVwU3RyaWN0RXF1YWwnLFxuICAgICAgICBzdGFja1N0YXJ0Rm46IGZuXG4gICAgICB9KTtcbiAgICAgIGVyci5hY3R1YWwgPSBhY3R1YWw7XG4gICAgICBlcnIuZXhwZWN0ZWQgPSBleHBlY3RlZDtcbiAgICAgIGVyci5vcGVyYXRvciA9IGZuLm5hbWU7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogZm4ubmFtZSxcbiAgICAgIHN0YWNrU3RhcnRGbjogZm5cbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCwgbXNnLCBmbikge1xuICBpZiAodHlwZW9mIGV4cGVjdGVkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGlzUmVnRXhwKGV4cGVjdGVkKSkgcmV0dXJuIFJlZ0V4cFByb3RvdHlwZVRlc3QoZXhwZWN0ZWQsIGFjdHVhbCk7XG4gICAgLy8gYXNzZXJ0LmRvZXNOb3RUaHJvdyBkb2VzIG5vdCBhY2NlcHQgb2JqZWN0cy5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdleHBlY3RlZCcsIFsnRnVuY3Rpb24nLCAnUmVnRXhwJ10sIGV4cGVjdGVkKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJpbWl0aXZlcyBwcm9wZXJseS5cbiAgICBpZiAoX3R5cGVvZihhY3R1YWwpICE9PSAnb2JqZWN0JyB8fCBhY3R1YWwgPT09IG51bGwpIHtcbiAgICAgIHZhciBlcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3Ioe1xuICAgICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgICBtZXNzYWdlOiBtc2csXG4gICAgICAgIG9wZXJhdG9yOiAnZGVlcFN0cmljdEVxdWFsJyxcbiAgICAgICAgc3RhY2tTdGFydEZuOiBmblxuICAgICAgfSk7XG4gICAgICBlcnIub3BlcmF0b3IgPSBmbi5uYW1lO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV4cGVjdGVkKTtcbiAgICAvLyBTcGVjaWFsIGhhbmRsZSBlcnJvcnMgdG8gbWFrZSBzdXJlIHRoZSBuYW1lIGFuZCB0aGUgbWVzc2FnZSBhcmUgY29tcGFyZWRcbiAgICAvLyBhcyB3ZWxsLlxuICAgIGlmIChleHBlY3RlZCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBrZXlzLnB1c2goJ25hbWUnLCAnbWVzc2FnZScpO1xuICAgIH0gZWxzZSBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVkFMVUUoJ2Vycm9yJywgZXhwZWN0ZWQsICdtYXkgbm90IGJlIGFuIGVtcHR5IG9iamVjdCcpO1xuICAgIH1cbiAgICBpZiAoaXNEZWVwRXF1YWwgPT09IHVuZGVmaW5lZCkgbGF6eUxvYWRDb21wYXJpc29uKCk7XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmICh0eXBlb2YgYWN0dWFsW2tleV0gPT09ICdzdHJpbmcnICYmIGlzUmVnRXhwKGV4cGVjdGVkW2tleV0pICYmIFJlZ0V4cFByb3RvdHlwZVRlc3QoZXhwZWN0ZWRba2V5XSwgYWN0dWFsW2tleV0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbXBhcmVFeGNlcHRpb25LZXkoYWN0dWFsLCBleHBlY3RlZCwga2V5LCBtc2csIGtleXMsIGZuKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvLyBHdWFyZCBpbnN0YW5jZW9mIGFnYWluc3QgYXJyb3cgZnVuY3Rpb25zIGFzIHRoZXkgZG9uJ3QgaGF2ZSBhIHByb3RvdHlwZS5cbiAgaWYgKGV4cGVjdGVkLnByb3RvdHlwZSAhPT0gdW5kZWZpbmVkICYmIGFjdHVhbCBpbnN0YW5jZW9mIGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKEVycm9yLmlzUHJvdG90eXBlT2YoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBleHBlY3RlZC5jYWxsKHt9LCBhY3R1YWwpID09PSB0cnVlO1xufVxuZnVuY3Rpb24gZ2V0QWN0dWFsKGZuKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ2ZuJywgJ0Z1bmN0aW9uJywgZm4pO1xuICB9XG4gIHRyeSB7XG4gICAgZm4oKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBlO1xuICB9XG4gIHJldHVybiBOT19FWENFUFRJT05fU0VOVElORUw7XG59XG5mdW5jdGlvbiBjaGVja0lzUHJvbWlzZShvYmopIHtcbiAgLy8gQWNjZXB0IG5hdGl2ZSBFUzYgcHJvbWlzZXMgYW5kIHByb21pc2VzIHRoYXQgYXJlIGltcGxlbWVudGVkIGluIGEgc2ltaWxhclxuICAvLyB3YXkuIERvIG5vdCBhY2NlcHQgdGhlbmFibGVzIHRoYXQgdXNlIGEgZnVuY3Rpb24gYXMgYG9iamAgYW5kIHRoYXQgaGF2ZSBub1xuICAvLyBgY2F0Y2hgIGhhbmRsZXIuXG5cbiAgLy8gVE9ETzogdGhlbmFibGVzIGFyZSBjaGVja2VkIHVwIHVudGlsIHRoZXkgaGF2ZSB0aGUgY29ycmVjdCBtZXRob2RzLFxuICAvLyBidXQgYWNjb3JkaW5nIHRvIGRvY3VtZW50YXRpb24sIHRoZSBgdGhlbmAgbWV0aG9kIHNob3VsZCByZWNlaXZlXG4gIC8vIHRoZSBgZnVsZmlsbGAgYW5kIGByZWplY3RgIGFyZ3VtZW50cyBhcyB3ZWxsIG9yIGl0IG1heSBiZSBuZXZlciByZXNvbHZlZC5cblxuICByZXR1cm4gaXNQcm9taXNlKG9iaikgfHwgb2JqICE9PSBudWxsICYmIF90eXBlb2Yob2JqKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouY2F0Y2ggPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiB3YWl0Rm9yQWN0dWFsKHByb21pc2VGbikge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdFByb21pc2U7XG4gICAgaWYgKHR5cGVvZiBwcm9taXNlRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIFJldHVybiBhIHJlamVjdGVkIHByb21pc2UgaWYgYHByb21pc2VGbmAgdGhyb3dzIHN5bmNocm9ub3VzbHkuXG4gICAgICByZXN1bHRQcm9taXNlID0gcHJvbWlzZUZuKCk7XG4gICAgICAvLyBGYWlsIGluIGNhc2Ugbm8gcHJvbWlzZSBpcyByZXR1cm5lZC5cbiAgICAgIGlmICghY2hlY2tJc1Byb21pc2UocmVzdWx0UHJvbWlzZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX1JFVFVSTl9WQUxVRSgnaW5zdGFuY2Ugb2YgUHJvbWlzZScsICdwcm9taXNlRm4nLCByZXN1bHRQcm9taXNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNoZWNrSXNQcm9taXNlKHByb21pc2VGbikpIHtcbiAgICAgIHJlc3VsdFByb21pc2UgPSBwcm9taXNlRm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgncHJvbWlzZUZuJywgWydGdW5jdGlvbicsICdQcm9taXNlJ10sIHByb21pc2VGbik7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZXN1bHRQcm9taXNlO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIE5PX0VYQ0VQVElPTl9TRU5USU5FTDtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGU7XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZXhwZWN0c0Vycm9yKHN0YWNrU3RhcnRGbiwgYWN0dWFsLCBlcnJvciwgbWVzc2FnZSkge1xuICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0KSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ2Vycm9yJywgWydPYmplY3QnLCAnRXJyb3InLCAnRnVuY3Rpb24nLCAnUmVnRXhwJ10sIGVycm9yKTtcbiAgICB9XG4gICAgaWYgKF90eXBlb2YoYWN0dWFsKSA9PT0gJ29iamVjdCcgJiYgYWN0dWFsICE9PSBudWxsKSB7XG4gICAgICBpZiAoYWN0dWFsLm1lc3NhZ2UgPT09IGVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFUlJfQU1CSUdVT1VTX0FSR1VNRU5UKCdlcnJvci9tZXNzYWdlJywgXCJUaGUgZXJyb3IgbWVzc2FnZSBcXFwiXCIuY29uY2F0KGFjdHVhbC5tZXNzYWdlLCBcIlxcXCIgaXMgaWRlbnRpY2FsIHRvIHRoZSBtZXNzYWdlLlwiKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY3R1YWwgPT09IGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0FNQklHVU9VU19BUkdVTUVOVCgnZXJyb3IvbWVzc2FnZScsIFwiVGhlIGVycm9yIFxcXCJcIi5jb25jYXQoYWN0dWFsLCBcIlxcXCIgaXMgaWRlbnRpY2FsIHRvIHRoZSBtZXNzYWdlLlwiKSk7XG4gICAgfVxuICAgIG1lc3NhZ2UgPSBlcnJvcjtcbiAgICBlcnJvciA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmIChlcnJvciAhPSBudWxsICYmIF90eXBlb2YoZXJyb3IpICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ2Vycm9yJywgWydPYmplY3QnLCAnRXJyb3InLCAnRnVuY3Rpb24nLCAnUmVnRXhwJ10sIGVycm9yKTtcbiAgfVxuICBpZiAoYWN0dWFsID09PSBOT19FWENFUFRJT05fU0VOVElORUwpIHtcbiAgICB2YXIgZGV0YWlscyA9ICcnO1xuICAgIGlmIChlcnJvciAmJiBlcnJvci5uYW1lKSB7XG4gICAgICBkZXRhaWxzICs9IFwiIChcIi5jb25jYXQoZXJyb3IubmFtZSwgXCIpXCIpO1xuICAgIH1cbiAgICBkZXRhaWxzICs9IG1lc3NhZ2UgPyBcIjogXCIuY29uY2F0KG1lc3NhZ2UpIDogJy4nO1xuICAgIHZhciBmblR5cGUgPSBzdGFja1N0YXJ0Rm4ubmFtZSA9PT0gJ3JlamVjdHMnID8gJ3JlamVjdGlvbicgOiAnZXhjZXB0aW9uJztcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiB1bmRlZmluZWQsXG4gICAgICBleHBlY3RlZDogZXJyb3IsXG4gICAgICBvcGVyYXRvcjogc3RhY2tTdGFydEZuLm5hbWUsXG4gICAgICBtZXNzYWdlOiBcIk1pc3NpbmcgZXhwZWN0ZWQgXCIuY29uY2F0KGZuVHlwZSkuY29uY2F0KGRldGFpbHMpLFxuICAgICAgc3RhY2tTdGFydEZuOiBzdGFja1N0YXJ0Rm5cbiAgICB9KTtcbiAgfVxuICBpZiAoZXJyb3IgJiYgIWV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXJyb3IsIG1lc3NhZ2UsIHN0YWNrU3RhcnRGbikpIHtcbiAgICB0aHJvdyBhY3R1YWw7XG4gIH1cbn1cbmZ1bmN0aW9uIGV4cGVjdHNOb0Vycm9yKHN0YWNrU3RhcnRGbiwgYWN0dWFsLCBlcnJvciwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsID09PSBOT19FWENFUFRJT05fU0VOVElORUwpIHJldHVybjtcbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgZXJyb3IgPSB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKCFlcnJvciB8fCBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGVycm9yKSkge1xuICAgIHZhciBkZXRhaWxzID0gbWVzc2FnZSA/IFwiOiBcIi5jb25jYXQobWVzc2FnZSkgOiAnLic7XG4gICAgdmFyIGZuVHlwZSA9IHN0YWNrU3RhcnRGbi5uYW1lID09PSAnZG9lc05vdFJlamVjdCcgPyAncmVqZWN0aW9uJyA6ICdleGNlcHRpb24nO1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBlcnJvcixcbiAgICAgIG9wZXJhdG9yOiBzdGFja1N0YXJ0Rm4ubmFtZSxcbiAgICAgIG1lc3NhZ2U6IFwiR290IHVud2FudGVkIFwiLmNvbmNhdChmblR5cGUpLmNvbmNhdChkZXRhaWxzLCBcIlxcblwiKSArIFwiQWN0dWFsIG1lc3NhZ2U6IFxcXCJcIi5jb25jYXQoYWN0dWFsICYmIGFjdHVhbC5tZXNzYWdlLCBcIlxcXCJcIiksXG4gICAgICBzdGFja1N0YXJ0Rm46IHN0YWNrU3RhcnRGblxuICAgIH0pO1xuICB9XG4gIHRocm93IGFjdHVhbDtcbn1cbmFzc2VydC50aHJvd3MgPSBmdW5jdGlvbiB0aHJvd3MocHJvbWlzZUZuKSB7XG4gIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgYXJnc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgfVxuICBleHBlY3RzRXJyb3IuYXBwbHkodm9pZCAwLCBbdGhyb3dzLCBnZXRBY3R1YWwocHJvbWlzZUZuKV0uY29uY2F0KGFyZ3MpKTtcbn07XG5hc3NlcnQucmVqZWN0cyA9IGZ1bmN0aW9uIHJlamVjdHMocHJvbWlzZUZuKSB7XG4gIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMyA+IDEgPyBfbGVuMyAtIDEgOiAwKSwgX2tleTMgPSAxOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgYXJnc1tfa2V5MyAtIDFdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgfVxuICByZXR1cm4gd2FpdEZvckFjdHVhbChwcm9taXNlRm4pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHJldHVybiBleHBlY3RzRXJyb3IuYXBwbHkodm9pZCAwLCBbcmVqZWN0cywgcmVzdWx0XS5jb25jYXQoYXJncykpO1xuICB9KTtcbn07XG5hc3NlcnQuZG9lc05vdFRocm93ID0gZnVuY3Rpb24gZG9lc05vdFRocm93KGZuKSB7XG4gIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCA+IDEgPyBfbGVuNCAtIDEgOiAwKSwgX2tleTQgPSAxOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgYXJnc1tfa2V5NCAtIDFdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgfVxuICBleHBlY3RzTm9FcnJvci5hcHBseSh2b2lkIDAsIFtkb2VzTm90VGhyb3csIGdldEFjdHVhbChmbildLmNvbmNhdChhcmdzKSk7XG59O1xuYXNzZXJ0LmRvZXNOb3RSZWplY3QgPSBmdW5jdGlvbiBkb2VzTm90UmVqZWN0KGZuKSB7XG4gIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNSA+IDEgPyBfbGVuNSAtIDEgOiAwKSwgX2tleTUgPSAxOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgYXJnc1tfa2V5NSAtIDFdID0gYXJndW1lbnRzW19rZXk1XTtcbiAgfVxuICByZXR1cm4gd2FpdEZvckFjdHVhbChmbikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgcmV0dXJuIGV4cGVjdHNOb0Vycm9yLmFwcGx5KHZvaWQgMCwgW2RvZXNOb3RSZWplY3QsIHJlc3VsdF0uY29uY2F0KGFyZ3MpKTtcbiAgfSk7XG59O1xuYXNzZXJ0LmlmRXJyb3IgPSBmdW5jdGlvbiBpZkVycm9yKGVycikge1xuICBpZiAoZXJyICE9PSBudWxsICYmIGVyciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnaWZFcnJvciBnb3QgdW53YW50ZWQgZXhjZXB0aW9uOiAnO1xuICAgIGlmIChfdHlwZW9mKGVycikgPT09ICdvYmplY3QnICYmIHR5cGVvZiBlcnIubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChlcnIubWVzc2FnZS5sZW5ndGggPT09IDAgJiYgZXJyLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gZXJyLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlICs9IGVyci5tZXNzYWdlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlICs9IGluc3BlY3QoZXJyKTtcbiAgICB9XG4gICAgdmFyIG5ld0VyciA9IG5ldyBBc3NlcnRpb25FcnJvcih7XG4gICAgICBhY3R1YWw6IGVycixcbiAgICAgIGV4cGVjdGVkOiBudWxsLFxuICAgICAgb3BlcmF0b3I6ICdpZkVycm9yJyxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBzdGFja1N0YXJ0Rm46IGlmRXJyb3JcbiAgICB9KTtcblxuICAgIC8vIE1ha2Ugc3VyZSB3ZSBhY3R1YWxseSBoYXZlIGEgc3RhY2sgdHJhY2UhXG4gICAgdmFyIG9yaWdTdGFjayA9IGVyci5zdGFjaztcbiAgICBpZiAodHlwZW9mIG9yaWdTdGFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFRoaXMgd2lsbCByZW1vdmUgYW55IGR1cGxpY2F0ZWQgZnJhbWVzIGZyb20gdGhlIGVycm9yIGZyYW1lcyB0YWtlblxuICAgICAgLy8gZnJvbSB3aXRoaW4gYGlmRXJyb3JgIGFuZCBhZGQgdGhlIG9yaWdpbmFsIGVycm9yIGZyYW1lcyB0byB0aGUgbmV3bHlcbiAgICAgIC8vIGNyZWF0ZWQgb25lcy5cbiAgICAgIHZhciB0bXAyID0gb3JpZ1N0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAgIHRtcDIuc2hpZnQoKTtcbiAgICAgIC8vIEZpbHRlciBhbGwgZnJhbWVzIGV4aXN0aW5nIGluIGVyci5zdGFjay5cbiAgICAgIHZhciB0bXAxID0gbmV3RXJyLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG1wMi5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBGaW5kIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBmcmFtZS5cbiAgICAgICAgdmFyIHBvcyA9IHRtcDEuaW5kZXhPZih0bXAyW2ldKTtcbiAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcbiAgICAgICAgICAvLyBPbmx5IGtlZXAgbmV3IGZyYW1lcy5cbiAgICAgICAgICB0bXAxID0gdG1wMS5zbGljZSgwLCBwb3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBuZXdFcnIuc3RhY2sgPSBcIlwiLmNvbmNhdCh0bXAxLmpvaW4oJ1xcbicpLCBcIlxcblwiKS5jb25jYXQodG1wMi5qb2luKCdcXG4nKSk7XG4gICAgfVxuICAgIHRocm93IG5ld0VycjtcbiAgfVxufTtcblxuLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9hc3NlcnQuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMmE4NzFkZjNkZmI4ZWE2NjNlZjVlMWY4ZjYyNzAxZWM1MTM4NGVjYlxuZnVuY3Rpb24gaW50ZXJuYWxNYXRjaChzdHJpbmcsIHJlZ2V4cCwgbWVzc2FnZSwgZm4sIGZuTmFtZSkge1xuICBpZiAoIWlzUmVnRXhwKHJlZ2V4cCkpIHtcbiAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ3JlZ2V4cCcsICdSZWdFeHAnLCByZWdleHApO1xuICB9XG4gIHZhciBtYXRjaCA9IGZuTmFtZSA9PT0gJ21hdGNoJztcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnIHx8IFJlZ0V4cFByb3RvdHlwZVRlc3QocmVnZXhwLCBzdHJpbmcpICE9PSBtYXRjaCkge1xuICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHRocm93IG1lc3NhZ2U7XG4gICAgfVxuICAgIHZhciBnZW5lcmF0ZWRNZXNzYWdlID0gIW1lc3NhZ2U7XG5cbiAgICAvLyAnVGhlIGlucHV0IHdhcyBleHBlY3RlZCB0byBub3QgbWF0Y2ggdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiAnICtcbiAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycgPyAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy4gUmVjZWl2ZWQgdHlwZSAnICsgXCJcIi5jb25jYXQoX3R5cGVvZihzdHJpbmcpLCBcIiAoXCIpLmNvbmNhdChpbnNwZWN0KHN0cmluZyksIFwiKVwiKSA6IChtYXRjaCA/ICdUaGUgaW5wdXQgZGlkIG5vdCBtYXRjaCB0aGUgcmVndWxhciBleHByZXNzaW9uICcgOiAnVGhlIGlucHV0IHdhcyBleHBlY3RlZCB0byBub3QgbWF0Y2ggdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiAnKSArIFwiXCIuY29uY2F0KGluc3BlY3QocmVnZXhwKSwgXCIuIElucHV0OlxcblxcblwiKS5jb25jYXQoaW5zcGVjdChzdHJpbmcpLCBcIlxcblwiKSk7XG4gICAgdmFyIGVyciA9IG5ldyBBc3NlcnRpb25FcnJvcih7XG4gICAgICBhY3R1YWw6IHN0cmluZyxcbiAgICAgIGV4cGVjdGVkOiByZWdleHAsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6IGZuTmFtZSxcbiAgICAgIHN0YWNrU3RhcnRGbjogZm5cbiAgICB9KTtcbiAgICBlcnIuZ2VuZXJhdGVkTWVzc2FnZSA9IGdlbmVyYXRlZE1lc3NhZ2U7XG4gICAgdGhyb3cgZXJyO1xuICB9XG59XG5hc3NlcnQubWF0Y2ggPSBmdW5jdGlvbiBtYXRjaChzdHJpbmcsIHJlZ2V4cCwgbWVzc2FnZSkge1xuICBpbnRlcm5hbE1hdGNoKHN0cmluZywgcmVnZXhwLCBtZXNzYWdlLCBtYXRjaCwgJ21hdGNoJyk7XG59O1xuYXNzZXJ0LmRvZXNOb3RNYXRjaCA9IGZ1bmN0aW9uIGRvZXNOb3RNYXRjaChzdHJpbmcsIHJlZ2V4cCwgbWVzc2FnZSkge1xuICBpbnRlcm5hbE1hdGNoKHN0cmluZywgcmVnZXhwLCBtZXNzYWdlLCBkb2VzTm90TWF0Y2gsICdkb2VzTm90TWF0Y2gnKTtcbn07XG5cbi8vIEV4cG9zZSBhIHN0cmljdCBvbmx5IHZhcmlhbnQgb2YgYXNzZXJ0XG5mdW5jdGlvbiBzdHJpY3QoKSB7XG4gIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNiksIF9rZXk2ID0gMDsgX2tleTYgPCBfbGVuNjsgX2tleTYrKykge1xuICAgIGFyZ3NbX2tleTZdID0gYXJndW1lbnRzW19rZXk2XTtcbiAgfVxuICBpbm5lck9rLmFwcGx5KHZvaWQgMCwgW3N0cmljdCwgYXJncy5sZW5ndGhdLmNvbmNhdChhcmdzKSk7XG59XG5hc3NlcnQuc3RyaWN0ID0gb2JqZWN0QXNzaWduKHN0cmljdCwgYXNzZXJ0LCB7XG4gIGVxdWFsOiBhc3NlcnQuc3RyaWN0RXF1YWwsXG4gIGRlZXBFcXVhbDogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCxcbiAgbm90RXF1YWw6IGFzc2VydC5ub3RTdHJpY3RFcXVhbCxcbiAgbm90RGVlcEVxdWFsOiBhc3NlcnQubm90RGVlcFN0cmljdEVxdWFsXG59KTtcbmFzc2VydC5zdHJpY3Quc3RyaWN0ID0gYXNzZXJ0LnN0cmljdDsiLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2ludGVybmFsL2Fzc2VydC9hc3NlcnRpb25fZXJyb3IuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMDgxNzg0MGY3NzUwMzIxNjlkZGQ3MGM4NWFjMDU5ZjE4ZmZjYzgxY1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG93bktleXMoZSwgcikgeyB2YXIgdCA9IE9iamVjdC5rZXlzKGUpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgbyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7IHIgJiYgKG8gPSBvLmZpbHRlcihmdW5jdGlvbiAocikgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCByKS5lbnVtZXJhYmxlOyB9KSksIHQucHVzaC5hcHBseSh0LCBvKTsgfSByZXR1cm4gdDsgfVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZChlKSB7IGZvciAodmFyIHIgPSAxOyByIDwgYXJndW1lbnRzLmxlbmd0aDsgcisrKSB7IHZhciB0ID0gbnVsbCAhPSBhcmd1bWVudHNbcl0gPyBhcmd1bWVudHNbcl0gOiB7fTsgciAlIDIgPyBvd25LZXlzKE9iamVjdCh0KSwgITApLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgX2RlZmluZVByb3BlcnR5KGUsIHIsIHRbcl0pOyB9KSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnModCkpIDogb3duS2V5cyhPYmplY3QodCkpLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCwgcikpOyB9KTsgfSByZXR1cm4gZTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBrZXkgPSBfdG9Qcm9wZXJ0eUtleShrZXkpOyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIF90b1Byb3BlcnR5S2V5KGRlc2NyaXB0b3Iua2V5KSwgZGVzY3JpcHRvcik7IH0gfVxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6IGZhbHNlIH0pOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykgeyB2YXIga2V5ID0gX3RvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7IHJldHVybiBfdHlwZW9mKGtleSkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7IGlmIChfdHlwZW9mKGlucHV0KSAhPT0gXCJvYmplY3RcIiB8fCBpbnB1dCA9PT0gbnVsbCkgcmV0dXJuIGlucHV0OyB2YXIgcHJpbSA9IGlucHV0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmIChwcmltICE9PSB1bmRlZmluZWQpIHsgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7IGlmIChfdHlwZW9mKHJlcykgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTsgfSByZXR1cm4gKGhpbnQgPT09IFwic3RyaW5nXCIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTsgfVxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN1YkNsYXNzLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IGVsc2UgaWYgKGNhbGwgIT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRGVyaXZlZCBjb25zdHJ1Y3RvcnMgbWF5IG9ubHkgcmV0dXJuIG9iamVjdCBvciB1bmRlZmluZWRcIik7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuZnVuY3Rpb24gX3dyYXBOYXRpdmVTdXBlcihDbGFzcykgeyB2YXIgX2NhY2hlID0gdHlwZW9mIE1hcCA9PT0gXCJmdW5jdGlvblwiID8gbmV3IE1hcCgpIDogdW5kZWZpbmVkOyBfd3JhcE5hdGl2ZVN1cGVyID0gZnVuY3Rpb24gX3dyYXBOYXRpdmVTdXBlcihDbGFzcykgeyBpZiAoQ2xhc3MgPT09IG51bGwgfHwgIV9pc05hdGl2ZUZ1bmN0aW9uKENsYXNzKSkgcmV0dXJuIENsYXNzOyBpZiAodHlwZW9mIENsYXNzICE9PSBcImZ1bmN0aW9uXCIpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IGlmICh0eXBlb2YgX2NhY2hlICE9PSBcInVuZGVmaW5lZFwiKSB7IGlmIChfY2FjaGUuaGFzKENsYXNzKSkgcmV0dXJuIF9jYWNoZS5nZXQoQ2xhc3MpOyBfY2FjaGUuc2V0KENsYXNzLCBXcmFwcGVyKTsgfSBmdW5jdGlvbiBXcmFwcGVyKCkgeyByZXR1cm4gX2NvbnN0cnVjdChDbGFzcywgYXJndW1lbnRzLCBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3IpOyB9IFdyYXBwZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IFdyYXBwZXIsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IHJldHVybiBfc2V0UHJvdG90eXBlT2YoV3JhcHBlciwgQ2xhc3MpOyB9OyByZXR1cm4gX3dyYXBOYXRpdmVTdXBlcihDbGFzcyk7IH1cbmZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykgeyBpZiAoX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpKSB7IF9jb25zdHJ1Y3QgPSBSZWZsZWN0LmNvbnN0cnVjdC5iaW5kKCk7IH0gZWxzZSB7IF9jb25zdHJ1Y3QgPSBmdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHsgdmFyIGEgPSBbbnVsbF07IGEucHVzaC5hcHBseShhLCBhcmdzKTsgdmFyIENvbnN0cnVjdG9yID0gRnVuY3Rpb24uYmluZC5hcHBseShQYXJlbnQsIGEpOyB2YXIgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTsgaWYgKENsYXNzKSBfc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIENsYXNzLnByb3RvdHlwZSk7IHJldHVybiBpbnN0YW5jZTsgfTsgfSByZXR1cm4gX2NvbnN0cnVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpOyB9XG5mdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7IGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7IGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7IHRyeSB7IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChCb29sZWFuLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cbmZ1bmN0aW9uIF9pc05hdGl2ZUZ1bmN0aW9uKGZuKSB7IHJldHVybiBGdW5jdGlvbi50b1N0cmluZy5jYWxsKGZuKS5pbmRleE9mKFwiW25hdGl2ZSBjb2RlXVwiKSAhPT0gLTE7IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgndXRpbC8nKSxcbiAgaW5zcGVjdCA9IF9yZXF1aXJlLmluc3BlY3Q7XG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgnLi4vZXJyb3JzJyksXG4gIEVSUl9JTlZBTElEX0FSR19UWVBFID0gX3JlcXVpcmUyLmNvZGVzLkVSUl9JTlZBTElEX0FSR19UWVBFO1xuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvZW5kc1dpdGhcbmZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc2VhcmNoLCB0aGlzX2xlbikge1xuICBpZiAodGhpc19sZW4gPT09IHVuZGVmaW5lZCB8fCB0aGlzX2xlbiA+IHN0ci5sZW5ndGgpIHtcbiAgICB0aGlzX2xlbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIHN0ci5zdWJzdHJpbmcodGhpc19sZW4gLSBzZWFyY2gubGVuZ3RoLCB0aGlzX2xlbikgPT09IHNlYXJjaDtcbn1cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL3JlcGVhdFxuZnVuY3Rpb24gcmVwZWF0KHN0ciwgY291bnQpIHtcbiAgY291bnQgPSBNYXRoLmZsb29yKGNvdW50KTtcbiAgaWYgKHN0ci5sZW5ndGggPT0gMCB8fCBjb3VudCA9PSAwKSByZXR1cm4gJyc7XG4gIHZhciBtYXhDb3VudCA9IHN0ci5sZW5ndGggKiBjb3VudDtcbiAgY291bnQgPSBNYXRoLmZsb29yKE1hdGgubG9nKGNvdW50KSAvIE1hdGgubG9nKDIpKTtcbiAgd2hpbGUgKGNvdW50KSB7XG4gICAgc3RyICs9IHN0cjtcbiAgICBjb3VudC0tO1xuICB9XG4gIHN0ciArPSBzdHIuc3Vic3RyaW5nKDAsIG1heENvdW50IC0gc3RyLmxlbmd0aCk7XG4gIHJldHVybiBzdHI7XG59XG52YXIgYmx1ZSA9ICcnO1xudmFyIGdyZWVuID0gJyc7XG52YXIgcmVkID0gJyc7XG52YXIgd2hpdGUgPSAnJztcbnZhciBrUmVhZGFibGVPcGVyYXRvciA9IHtcbiAgZGVlcFN0cmljdEVxdWFsOiAnRXhwZWN0ZWQgdmFsdWVzIHRvIGJlIHN0cmljdGx5IGRlZXAtZXF1YWw6JyxcbiAgc3RyaWN0RXF1YWw6ICdFeHBlY3RlZCB2YWx1ZXMgdG8gYmUgc3RyaWN0bHkgZXF1YWw6JyxcbiAgc3RyaWN0RXF1YWxPYmplY3Q6ICdFeHBlY3RlZCBcImFjdHVhbFwiIHRvIGJlIHJlZmVyZW5jZS1lcXVhbCB0byBcImV4cGVjdGVkXCI6JyxcbiAgZGVlcEVxdWFsOiAnRXhwZWN0ZWQgdmFsdWVzIHRvIGJlIGxvb3NlbHkgZGVlcC1lcXVhbDonLFxuICBlcXVhbDogJ0V4cGVjdGVkIHZhbHVlcyB0byBiZSBsb29zZWx5IGVxdWFsOicsXG4gIG5vdERlZXBTdHJpY3RFcXVhbDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgbm90IHRvIGJlIHN0cmljdGx5IGRlZXAtZXF1YWwgdG86JyxcbiAgbm90U3RyaWN0RXF1YWw6ICdFeHBlY3RlZCBcImFjdHVhbFwiIHRvIGJlIHN0cmljdGx5IHVuZXF1YWwgdG86JyxcbiAgbm90U3RyaWN0RXF1YWxPYmplY3Q6ICdFeHBlY3RlZCBcImFjdHVhbFwiIG5vdCB0byBiZSByZWZlcmVuY2UtZXF1YWwgdG8gXCJleHBlY3RlZFwiOicsXG4gIG5vdERlZXBFcXVhbDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgbm90IHRvIGJlIGxvb3NlbHkgZGVlcC1lcXVhbCB0bzonLFxuICBub3RFcXVhbDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgdG8gYmUgbG9vc2VseSB1bmVxdWFsIHRvOicsXG4gIG5vdElkZW50aWNhbDogJ1ZhbHVlcyBpZGVudGljYWwgYnV0IG5vdCByZWZlcmVuY2UtZXF1YWw6J1xufTtcblxuLy8gQ29tcGFyaW5nIHNob3J0IHByaW1pdGl2ZXMgc2hvdWxkIGp1c3Qgc2hvdyA9PT0gLyAhPT0gaW5zdGVhZCBvZiB1c2luZyB0aGVcbi8vIGRpZmYuXG52YXIga01heFNob3J0TGVuZ3RoID0gMTA7XG5mdW5jdGlvbiBjb3B5RXJyb3Ioc291cmNlKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIHRhcmdldCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKHNvdXJjZSkpO1xuICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCAnbWVzc2FnZScsIHtcbiAgICB2YWx1ZTogc291cmNlLm1lc3NhZ2VcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBpbnNwZWN0VmFsdWUodmFsKSB7XG4gIC8vIFRoZSB1dGlsLmluc3BlY3QgZGVmYXVsdCB2YWx1ZXMgY291bGQgYmUgY2hhbmdlZC4gVGhpcyBtYWtlcyBzdXJlIHRoZVxuICAvLyBlcnJvciBtZXNzYWdlcyBjb250YWluIHRoZSBuZWNlc3NhcnkgaW5mb3JtYXRpb24gbmV2ZXJ0aGVsZXNzLlxuICByZXR1cm4gaW5zcGVjdCh2YWwsIHtcbiAgICBjb21wYWN0OiBmYWxzZSxcbiAgICBjdXN0b21JbnNwZWN0OiBmYWxzZSxcbiAgICBkZXB0aDogMTAwMCxcbiAgICBtYXhBcnJheUxlbmd0aDogSW5maW5pdHksXG4gICAgLy8gQXNzZXJ0IGNvbXBhcmVzIG9ubHkgZW51bWVyYWJsZSBwcm9wZXJ0aWVzICh3aXRoIGEgZmV3IGV4Y2VwdGlvbnMpLlxuICAgIHNob3dIaWRkZW46IGZhbHNlLFxuICAgIC8vIEhhdmluZyBhIGxvbmcgbGluZSBhcyBlcnJvciBpcyBiZXR0ZXIgdGhhbiB3cmFwcGluZyB0aGUgbGluZSBmb3JcbiAgICAvLyBjb21wYXJpc29uIGZvciBub3cuXG4gICAgLy8gVE9ETyhCcmlkZ2VBUik6IGBicmVha0xlbmd0aGAgc2hvdWxkIGJlIGxpbWl0ZWQgYXMgc29vbiBhcyBzb29uIGFzIHdlXG4gICAgLy8gaGF2ZSBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBpbnNwZWN0ZWQgcHJvcGVydGllcyAoaS5lLiwga25vdyB3aGVyZVxuICAgIC8vIGluIHdoYXQgbGluZSB0aGUgcHJvcGVydHkgc3RhcnRzIGFuZCBlbmRzKS5cbiAgICBicmVha0xlbmd0aDogSW5maW5pdHksXG4gICAgLy8gQXNzZXJ0IGRvZXMgbm90IGRldGVjdCBwcm94aWVzIGN1cnJlbnRseS5cbiAgICBzaG93UHJveHk6IGZhbHNlLFxuICAgIHNvcnRlZDogdHJ1ZSxcbiAgICAvLyBJbnNwZWN0IGdldHRlcnMgYXMgd2UgYWxzbyBjaGVjayB0aGVtIHdoZW4gY29tcGFyaW5nIGVudHJpZXMuXG4gICAgZ2V0dGVyczogdHJ1ZVxuICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUVyckRpZmYoYWN0dWFsLCBleHBlY3RlZCwgb3BlcmF0b3IpIHtcbiAgdmFyIG90aGVyID0gJyc7XG4gIHZhciByZXMgPSAnJztcbiAgdmFyIGxhc3RQb3MgPSAwO1xuICB2YXIgZW5kID0gJyc7XG4gIHZhciBza2lwcGVkID0gZmFsc2U7XG4gIHZhciBhY3R1YWxJbnNwZWN0ZWQgPSBpbnNwZWN0VmFsdWUoYWN0dWFsKTtcbiAgdmFyIGFjdHVhbExpbmVzID0gYWN0dWFsSW5zcGVjdGVkLnNwbGl0KCdcXG4nKTtcbiAgdmFyIGV4cGVjdGVkTGluZXMgPSBpbnNwZWN0VmFsdWUoZXhwZWN0ZWQpLnNwbGl0KCdcXG4nKTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgaW5kaWNhdG9yID0gJyc7XG5cbiAgLy8gSW4gY2FzZSBib3RoIHZhbHVlcyBhcmUgb2JqZWN0cyBleHBsaWNpdGx5IG1hcmsgdGhlbSBhcyBub3QgcmVmZXJlbmNlIGVxdWFsXG4gIC8vIGZvciB0aGUgYHN0cmljdEVxdWFsYCBvcGVyYXRvci5cbiAgaWYgKG9wZXJhdG9yID09PSAnc3RyaWN0RXF1YWwnICYmIF90eXBlb2YoYWN0dWFsKSA9PT0gJ29iamVjdCcgJiYgX3R5cGVvZihleHBlY3RlZCkgPT09ICdvYmplY3QnICYmIGFjdHVhbCAhPT0gbnVsbCAmJiBleHBlY3RlZCAhPT0gbnVsbCkge1xuICAgIG9wZXJhdG9yID0gJ3N0cmljdEVxdWFsT2JqZWN0JztcbiAgfVxuXG4gIC8vIElmIFwiYWN0dWFsXCIgYW5kIFwiZXhwZWN0ZWRcIiBmaXQgb24gYSBzaW5nbGUgbGluZSBhbmQgdGhleSBhcmUgbm90IHN0cmljdGx5XG4gIC8vIGVxdWFsLCBjaGVjayBmdXJ0aGVyIHNwZWNpYWwgaGFuZGxpbmcuXG4gIGlmIChhY3R1YWxMaW5lcy5sZW5ndGggPT09IDEgJiYgZXhwZWN0ZWRMaW5lcy5sZW5ndGggPT09IDEgJiYgYWN0dWFsTGluZXNbMF0gIT09IGV4cGVjdGVkTGluZXNbMF0pIHtcbiAgICB2YXIgaW5wdXRMZW5ndGggPSBhY3R1YWxMaW5lc1swXS5sZW5ndGggKyBleHBlY3RlZExpbmVzWzBdLmxlbmd0aDtcbiAgICAvLyBJZiB0aGUgY2hhcmFjdGVyIGxlbmd0aCBvZiBcImFjdHVhbFwiIGFuZCBcImV4cGVjdGVkXCIgdG9nZXRoZXIgaXMgbGVzcyB0aGFuXG4gICAgLy8ga01heFNob3J0TGVuZ3RoIGFuZCBpZiBuZWl0aGVyIGlzIGFuIG9iamVjdCBhbmQgYXQgbGVhc3Qgb25lIG9mIHRoZW0gaXNcbiAgICAvLyBub3QgYHplcm9gLCB1c2UgdGhlIHN0cmljdCBlcXVhbCBjb21wYXJpc29uIHRvIHZpc3VhbGl6ZSB0aGUgb3V0cHV0LlxuICAgIGlmIChpbnB1dExlbmd0aCA8PSBrTWF4U2hvcnRMZW5ndGgpIHtcbiAgICAgIGlmICgoX3R5cGVvZihhY3R1YWwpICE9PSAnb2JqZWN0JyB8fCBhY3R1YWwgPT09IG51bGwpICYmIChfdHlwZW9mKGV4cGVjdGVkKSAhPT0gJ29iamVjdCcgfHwgZXhwZWN0ZWQgPT09IG51bGwpICYmIChhY3R1YWwgIT09IDAgfHwgZXhwZWN0ZWQgIT09IDApKSB7XG4gICAgICAgIC8vIC0wID09PSArMFxuICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQoa1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdLCBcIlxcblxcblwiKSArIFwiXCIuY29uY2F0KGFjdHVhbExpbmVzWzBdLCBcIiAhPT0gXCIpLmNvbmNhdChleHBlY3RlZExpbmVzWzBdLCBcIlxcblwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yICE9PSAnc3RyaWN0RXF1YWxPYmplY3QnKSB7XG4gICAgICAvLyBJZiB0aGUgc3RkZXJyIGlzIGEgdHR5IGFuZCB0aGUgaW5wdXQgbGVuZ3RoIGlzIGxvd2VyIHRoYW4gdGhlIGN1cnJlbnRcbiAgICAgIC8vIGNvbHVtbnMgcGVyIGxpbmUsIGFkZCBhIG1pc21hdGNoIGluZGljYXRvciBiZWxvdyB0aGUgb3V0cHV0LiBJZiBpdCBpc1xuICAgICAgLy8gbm90IGEgdHR5LCB1c2UgYSBkZWZhdWx0IHZhbHVlIG9mIDgwIGNoYXJhY3RlcnMuXG4gICAgICB2YXIgbWF4TGVuZ3RoID0gcHJvY2Vzcy5zdGRlcnIgJiYgcHJvY2Vzcy5zdGRlcnIuaXNUVFkgPyBwcm9jZXNzLnN0ZGVyci5jb2x1bW5zIDogODA7XG4gICAgICBpZiAoaW5wdXRMZW5ndGggPCBtYXhMZW5ndGgpIHtcbiAgICAgICAgd2hpbGUgKGFjdHVhbExpbmVzWzBdW2ldID09PSBleHBlY3RlZExpbmVzWzBdW2ldKSB7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmlyc3QgY2hhcmFjdGVycy5cbiAgICAgICAgaWYgKGkgPiAyKSB7XG4gICAgICAgICAgLy8gQWRkIHBvc2l0aW9uIGluZGljYXRvciBmb3IgdGhlIGZpcnN0IG1pc21hdGNoIGluIGNhc2UgaXQgaXMgYVxuICAgICAgICAgIC8vIHNpbmdsZSBsaW5lIGFuZCB0aGUgaW5wdXQgbGVuZ3RoIGlzIGxlc3MgdGhhbiB0aGUgY29sdW1uIGxlbmd0aC5cbiAgICAgICAgICBpbmRpY2F0b3IgPSBcIlxcbiAgXCIuY29uY2F0KHJlcGVhdCgnICcsIGkpLCBcIl5cIik7XG4gICAgICAgICAgaSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBSZW1vdmUgYWxsIGVuZGluZyBsaW5lcyB0aGF0IG1hdGNoICh0aGlzIG9wdGltaXplcyB0aGUgb3V0cHV0IGZvclxuICAvLyByZWFkYWJpbGl0eSBieSByZWR1Y2luZyB0aGUgbnVtYmVyIG9mIHRvdGFsIGNoYW5nZWQgbGluZXMpLlxuICB2YXIgYSA9IGFjdHVhbExpbmVzW2FjdHVhbExpbmVzLmxlbmd0aCAtIDFdO1xuICB2YXIgYiA9IGV4cGVjdGVkTGluZXNbZXhwZWN0ZWRMaW5lcy5sZW5ndGggLSAxXTtcbiAgd2hpbGUgKGEgPT09IGIpIHtcbiAgICBpZiAoaSsrIDwgMikge1xuICAgICAgZW5kID0gXCJcXG4gIFwiLmNvbmNhdChhKS5jb25jYXQoZW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3RoZXIgPSBhO1xuICAgIH1cbiAgICBhY3R1YWxMaW5lcy5wb3AoKTtcbiAgICBleHBlY3RlZExpbmVzLnBvcCgpO1xuICAgIGlmIChhY3R1YWxMaW5lcy5sZW5ndGggPT09IDAgfHwgZXhwZWN0ZWRMaW5lcy5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgIGEgPSBhY3R1YWxMaW5lc1thY3R1YWxMaW5lcy5sZW5ndGggLSAxXTtcbiAgICBiID0gZXhwZWN0ZWRMaW5lc1tleHBlY3RlZExpbmVzLmxlbmd0aCAtIDFdO1xuICB9XG4gIHZhciBtYXhMaW5lcyA9IE1hdGgubWF4KGFjdHVhbExpbmVzLmxlbmd0aCwgZXhwZWN0ZWRMaW5lcy5sZW5ndGgpO1xuICAvLyBTdHJpY3QgZXF1YWwgd2l0aCBpZGVudGljYWwgb2JqZWN0cyB0aGF0IGFyZSBub3QgaWRlbnRpY2FsIGJ5IHJlZmVyZW5jZS5cbiAgLy8gRS5nLiwgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCh7IGE6IFN5bWJvbCgpIH0sIHsgYTogU3ltYm9sKCkgfSlcbiAgaWYgKG1heExpbmVzID09PSAwKSB7XG4gICAgLy8gV2UgaGF2ZSB0byBnZXQgdGhlIHJlc3VsdCBhZ2Fpbi4gVGhlIGxpbmVzIHdlcmUgYWxsIHJlbW92ZWQgYmVmb3JlLlxuICAgIHZhciBfYWN0dWFsTGluZXMgPSBhY3R1YWxJbnNwZWN0ZWQuc3BsaXQoJ1xcbicpO1xuXG4gICAgLy8gT25seSByZW1vdmUgbGluZXMgaW4gY2FzZSBpdCBtYWtlcyBzZW5zZSB0byBjb2xsYXBzZSB0aG9zZS5cbiAgICAvLyBUT0RPOiBBY2NlcHQgZW52IHRvIGFsd2F5cyBzaG93IHRoZSBmdWxsIGVycm9yLlxuICAgIGlmIChfYWN0dWFsTGluZXMubGVuZ3RoID4gMzApIHtcbiAgICAgIF9hY3R1YWxMaW5lc1syNl0gPSBcIlwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuICAgICAgd2hpbGUgKF9hY3R1YWxMaW5lcy5sZW5ndGggPiAyNykge1xuICAgICAgICBfYWN0dWFsTGluZXMucG9wKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBcIlwiLmNvbmNhdChrUmVhZGFibGVPcGVyYXRvci5ub3RJZGVudGljYWwsIFwiXFxuXFxuXCIpLmNvbmNhdChfYWN0dWFsTGluZXMuam9pbignXFxuJyksIFwiXFxuXCIpO1xuICB9XG4gIGlmIChpID4gMykge1xuICAgIGVuZCA9IFwiXFxuXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSkuY29uY2F0KGVuZCk7XG4gICAgc2tpcHBlZCA9IHRydWU7XG4gIH1cbiAgaWYgKG90aGVyICE9PSAnJykge1xuICAgIGVuZCA9IFwiXFxuICBcIi5jb25jYXQob3RoZXIpLmNvbmNhdChlbmQpO1xuICAgIG90aGVyID0gJyc7XG4gIH1cbiAgdmFyIHByaW50ZWRMaW5lcyA9IDA7XG4gIHZhciBtc2cgPSBrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl0gKyBcIlxcblwiLmNvbmNhdChncmVlbiwgXCIrIGFjdHVhbFwiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQocmVkLCBcIi0gZXhwZWN0ZWRcIikuY29uY2F0KHdoaXRlKTtcbiAgdmFyIHNraXBwZWRNc2cgPSBcIiBcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlLCBcIiBMaW5lcyBza2lwcGVkXCIpO1xuICBmb3IgKGkgPSAwOyBpIDwgbWF4TGluZXM7IGkrKykge1xuICAgIC8vIE9ubHkgZXh0cmEgZXhwZWN0ZWQgbGluZXMgZXhpc3RcbiAgICB2YXIgY3VyID0gaSAtIGxhc3RQb3M7XG4gICAgaWYgKGFjdHVhbExpbmVzLmxlbmd0aCA8IGkgKyAxKSB7XG4gICAgICAvLyBJZiB0aGUgbGFzdCBkaXZlcmdpbmcgbGluZSBpcyBtb3JlIHRoYW4gb25lIGxpbmUgYWJvdmUgYW5kIHRoZVxuICAgICAgLy8gY3VycmVudCBsaW5lIGlzIGF0IGxlYXN0IGxpbmUgdGhyZWUsIGFkZCBzb21lIG9mIHRoZSBmb3JtZXIgbGluZXMgYW5kXG4gICAgICAvLyBhbHNvIGFkZCBkb3RzIHRvIGluZGljYXRlIHNraXBwZWQgZW50cmllcy5cbiAgICAgIGlmIChjdXIgPiAxICYmIGkgPiAyKSB7XG4gICAgICAgIGlmIChjdXIgPiA0KSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG4gICAgICAgICAgc2tpcHBlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VyID4gMykge1xuICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGV4cGVjdGVkTGluZXNbaSAtIDJdKTtcbiAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgfVxuICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChleHBlY3RlZExpbmVzW2kgLSAxXSk7XG4gICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgfVxuICAgICAgLy8gTWFyayB0aGUgY3VycmVudCBsaW5lIGFzIHRoZSBsYXN0IGRpdmVyZ2luZyBvbmUuXG4gICAgICBsYXN0UG9zID0gaTtcbiAgICAgIC8vIEFkZCB0aGUgZXhwZWN0ZWQgbGluZSB0byB0aGUgY2FjaGUuXG4gICAgICBvdGhlciArPSBcIlxcblwiLmNvbmNhdChyZWQsIFwiLVwiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWRMaW5lc1tpXSk7XG4gICAgICBwcmludGVkTGluZXMrKztcbiAgICAgIC8vIE9ubHkgZXh0cmEgYWN0dWFsIGxpbmVzIGV4aXN0XG4gICAgfSBlbHNlIGlmIChleHBlY3RlZExpbmVzLmxlbmd0aCA8IGkgKyAxKSB7XG4gICAgICAvLyBJZiB0aGUgbGFzdCBkaXZlcmdpbmcgbGluZSBpcyBtb3JlIHRoYW4gb25lIGxpbmUgYWJvdmUgYW5kIHRoZVxuICAgICAgLy8gY3VycmVudCBsaW5lIGlzIGF0IGxlYXN0IGxpbmUgdGhyZWUsIGFkZCBzb21lIG9mIHRoZSBmb3JtZXIgbGluZXMgYW5kXG4gICAgICAvLyBhbHNvIGFkZCBkb3RzIHRvIGluZGljYXRlIHNraXBwZWQgZW50cmllcy5cbiAgICAgIGlmIChjdXIgPiAxICYmIGkgPiAyKSB7XG4gICAgICAgIGlmIChjdXIgPiA0KSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG4gICAgICAgICAgc2tpcHBlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VyID4gMykge1xuICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAyXSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH1cbiAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoYWN0dWFsTGluZXNbaSAtIDFdKTtcbiAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICB9XG4gICAgICAvLyBNYXJrIHRoZSBjdXJyZW50IGxpbmUgYXMgdGhlIGxhc3QgZGl2ZXJnaW5nIG9uZS5cbiAgICAgIGxhc3RQb3MgPSBpO1xuICAgICAgLy8gQWRkIHRoZSBhY3R1YWwgbGluZSB0byB0aGUgcmVzdWx0LlxuICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGdyZWVuLCBcIitcIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KGFjdHVhbExpbmVzW2ldKTtcbiAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgLy8gTGluZXMgZGl2ZXJnZVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZXhwZWN0ZWRMaW5lID0gZXhwZWN0ZWRMaW5lc1tpXTtcbiAgICAgIHZhciBhY3R1YWxMaW5lID0gYWN0dWFsTGluZXNbaV07XG4gICAgICAvLyBJZiB0aGUgbGluZXMgZGl2ZXJnZSwgc3BlY2lmaWNhbGx5IGNoZWNrIGZvciBsaW5lcyB0aGF0IG9ubHkgZGl2ZXJnZSBieVxuICAgICAgLy8gYSB0cmFpbGluZyBjb21tYS4gSW4gdGhhdCBjYXNlIGl0IGlzIGFjdHVhbGx5IGlkZW50aWNhbCBhbmQgd2Ugc2hvdWxkXG4gICAgICAvLyBtYXJrIGl0IGFzIHN1Y2guXG4gICAgICB2YXIgZGl2ZXJnaW5nTGluZXMgPSBhY3R1YWxMaW5lICE9PSBleHBlY3RlZExpbmUgJiYgKCFlbmRzV2l0aChhY3R1YWxMaW5lLCAnLCcpIHx8IGFjdHVhbExpbmUuc2xpY2UoMCwgLTEpICE9PSBleHBlY3RlZExpbmUpO1xuICAgICAgLy8gSWYgdGhlIGV4cGVjdGVkIGxpbmUgaGFzIGEgdHJhaWxpbmcgY29tbWEgYnV0IGlzIG90aGVyd2lzZSBpZGVudGljYWwsXG4gICAgICAvLyBhZGQgYSBjb21tYSBhdCB0aGUgZW5kIG9mIHRoZSBhY3R1YWwgbGluZS4gT3RoZXJ3aXNlIHRoZSBvdXRwdXQgY291bGRcbiAgICAgIC8vIGxvb2sgd2VpcmQgYXMgaW46XG4gICAgICAvL1xuICAgICAgLy8gICBbXG4gICAgICAvLyAgICAgMSAgICAgICAgIC8vIE5vIGNvbW1hIGF0IHRoZSBlbmQhXG4gICAgICAvLyArICAgMlxuICAgICAgLy8gICBdXG4gICAgICAvL1xuICAgICAgaWYgKGRpdmVyZ2luZ0xpbmVzICYmIGVuZHNXaXRoKGV4cGVjdGVkTGluZSwgJywnKSAmJiBleHBlY3RlZExpbmUuc2xpY2UoMCwgLTEpID09PSBhY3R1YWxMaW5lKSB7XG4gICAgICAgIGRpdmVyZ2luZ0xpbmVzID0gZmFsc2U7XG4gICAgICAgIGFjdHVhbExpbmUgKz0gJywnO1xuICAgICAgfVxuICAgICAgaWYgKGRpdmVyZ2luZ0xpbmVzKSB7XG4gICAgICAgIC8vIElmIHRoZSBsYXN0IGRpdmVyZ2luZyBsaW5lIGlzIG1vcmUgdGhhbiBvbmUgbGluZSBhYm92ZSBhbmQgdGhlXG4gICAgICAgIC8vIGN1cnJlbnQgbGluZSBpcyBhdCBsZWFzdCBsaW5lIHRocmVlLCBhZGQgc29tZSBvZiB0aGUgZm9ybWVyIGxpbmVzIGFuZFxuICAgICAgICAvLyBhbHNvIGFkZCBkb3RzIHRvIGluZGljYXRlIHNraXBwZWQgZW50cmllcy5cbiAgICAgICAgaWYgKGN1ciA+IDEgJiYgaSA+IDIpIHtcbiAgICAgICAgICBpZiAoY3VyID4gNCkge1xuICAgICAgICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG4gICAgICAgICAgICBza2lwcGVkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1ciA+IDMpIHtcbiAgICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAyXSk7XG4gICAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoYWN0dWFsTGluZXNbaSAtIDFdKTtcbiAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgfVxuICAgICAgICAvLyBNYXJrIHRoZSBjdXJyZW50IGxpbmUgYXMgdGhlIGxhc3QgZGl2ZXJnaW5nIG9uZS5cbiAgICAgICAgbGFzdFBvcyA9IGk7XG4gICAgICAgIC8vIEFkZCB0aGUgYWN0dWFsIGxpbmUgdG8gdGhlIHJlc3VsdCBhbmQgY2FjaGUgdGhlIGV4cGVjdGVkIGRpdmVyZ2luZ1xuICAgICAgICAvLyBsaW5lIHNvIGNvbnNlY3V0aXZlIGRpdmVyZ2luZyBsaW5lcyBzaG93IHVwIGFzICsrKy0tLSBhbmQgbm90ICstKy0rLS5cbiAgICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGdyZWVuLCBcIitcIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KGFjdHVhbExpbmUpO1xuICAgICAgICBvdGhlciArPSBcIlxcblwiLmNvbmNhdChyZWQsIFwiLVwiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWRMaW5lKTtcbiAgICAgICAgcHJpbnRlZExpbmVzICs9IDI7XG4gICAgICAgIC8vIExpbmVzIGFyZSBpZGVudGljYWxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFkZCBhbGwgY2FjaGVkIGluZm9ybWF0aW9uIHRvIHRoZSByZXN1bHQgYmVmb3JlIGFkZGluZyBvdGhlciB0aGluZ3NcbiAgICAgICAgLy8gYW5kIHJlc2V0IHRoZSBjYWNoZS5cbiAgICAgICAgcmVzICs9IG90aGVyO1xuICAgICAgICBvdGhlciA9ICcnO1xuICAgICAgICAvLyBJZiB0aGUgbGFzdCBkaXZlcmdpbmcgbGluZSBpcyBleGFjdGx5IG9uZSBsaW5lIGFib3ZlIG9yIGlmIGl0IGlzIHRoZVxuICAgICAgICAvLyB2ZXJ5IGZpcnN0IGxpbmUsIGFkZCB0aGUgbGluZSB0byB0aGUgcmVzdWx0LlxuICAgICAgICBpZiAoY3VyID09PSAxIHx8IGkgPT09IDApIHtcbiAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChhY3R1YWxMaW5lKTtcbiAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBJbnNwZWN0ZWQgb2JqZWN0IHRvIGJpZyAoU2hvdyB+MjAgcm93cyBtYXgpXG4gICAgaWYgKHByaW50ZWRMaW5lcyA+IDIwICYmIGkgPCBtYXhMaW5lcyAtIDIpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChtc2cpLmNvbmNhdChza2lwcGVkTXNnLCBcIlxcblwiKS5jb25jYXQocmVzLCBcIlxcblwiKS5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKS5jb25jYXQob3RoZXIsIFwiXFxuXCIpICsgXCJcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiXCIuY29uY2F0KG1zZykuY29uY2F0KHNraXBwZWQgPyBza2lwcGVkTXNnIDogJycsIFwiXFxuXCIpLmNvbmNhdChyZXMpLmNvbmNhdChvdGhlcikuY29uY2F0KGVuZCkuY29uY2F0KGluZGljYXRvcik7XG59XG52YXIgQXNzZXJ0aW9uRXJyb3IgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9FcnJvciwgX2luc3BlY3QkY3VzdG9tKSB7XG4gIF9pbmhlcml0cyhBc3NlcnRpb25FcnJvciwgX0Vycm9yKTtcbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihBc3NlcnRpb25FcnJvcik7XG4gIGZ1bmN0aW9uIEFzc2VydGlvbkVycm9yKG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFzc2VydGlvbkVycm9yKTtcbiAgICBpZiAoX3R5cGVvZihvcHRpb25zKSAhPT0gJ29iamVjdCcgfHwgb3B0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdvcHRpb25zJywgJ09iamVjdCcsIG9wdGlvbnMpO1xuICAgIH1cbiAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yID0gb3B0aW9ucy5vcGVyYXRvcixcbiAgICAgIHN0YWNrU3RhcnRGbiA9IG9wdGlvbnMuc3RhY2tTdGFydEZuO1xuICAgIHZhciBhY3R1YWwgPSBvcHRpb25zLmFjdHVhbCxcbiAgICAgIGV4cGVjdGVkID0gb3B0aW9ucy5leHBlY3RlZDtcbiAgICB2YXIgbGltaXQgPSBFcnJvci5zdGFja1RyYWNlTGltaXQ7XG4gICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gMDtcbiAgICBpZiAobWVzc2FnZSAhPSBudWxsKSB7XG4gICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFN0cmluZyhtZXNzYWdlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcm9jZXNzLnN0ZGVyciAmJiBwcm9jZXNzLnN0ZGVyci5pc1RUWSkge1xuICAgICAgICAvLyBSZXNldCBvbiBlYWNoIGNhbGwgdG8gbWFrZSBzdXJlIHdlIGhhbmRsZSBkeW5hbWljYWxseSBzZXQgZW52aXJvbm1lbnRcbiAgICAgICAgLy8gdmFyaWFibGVzIGNvcnJlY3QuXG4gICAgICAgIGlmIChwcm9jZXNzLnN0ZGVyciAmJiBwcm9jZXNzLnN0ZGVyci5nZXRDb2xvckRlcHRoICYmIHByb2Nlc3Muc3RkZXJyLmdldENvbG9yRGVwdGgoKSAhPT0gMSkge1xuICAgICAgICAgIGJsdWUgPSBcIlxceDFCWzM0bVwiO1xuICAgICAgICAgIGdyZWVuID0gXCJcXHgxQlszMm1cIjtcbiAgICAgICAgICB3aGl0ZSA9IFwiXFx4MUJbMzltXCI7XG4gICAgICAgICAgcmVkID0gXCJcXHgxQlszMW1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBibHVlID0gJyc7XG4gICAgICAgICAgZ3JlZW4gPSAnJztcbiAgICAgICAgICB3aGl0ZSA9ICcnO1xuICAgICAgICAgIHJlZCA9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBQcmV2ZW50IHRoZSBlcnJvciBzdGFjayBmcm9tIGJlaW5nIHZpc2libGUgYnkgZHVwbGljYXRpbmcgdGhlIGVycm9yXG4gICAgICAvLyBpbiBhIHZlcnkgY2xvc2Ugd2F5IHRvIHRoZSBvcmlnaW5hbCBpbiBjYXNlIGJvdGggc2lkZXMgYXJlIGFjdHVhbGx5XG4gICAgICAvLyBpbnN0YW5jZXMgb2YgRXJyb3IuXG4gICAgICBpZiAoX3R5cGVvZihhY3R1YWwpID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT09IG51bGwgJiYgX3R5cGVvZihleHBlY3RlZCkgPT09ICdvYmplY3QnICYmIGV4cGVjdGVkICE9PSBudWxsICYmICdzdGFjaycgaW4gYWN0dWFsICYmIGFjdHVhbCBpbnN0YW5jZW9mIEVycm9yICYmICdzdGFjaycgaW4gZXhwZWN0ZWQgJiYgZXhwZWN0ZWQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBhY3R1YWwgPSBjb3B5RXJyb3IoYWN0dWFsKTtcbiAgICAgICAgZXhwZWN0ZWQgPSBjb3B5RXJyb3IoZXhwZWN0ZWQpO1xuICAgICAgfVxuICAgICAgaWYgKG9wZXJhdG9yID09PSAnZGVlcFN0cmljdEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ3N0cmljdEVxdWFsJykge1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNyZWF0ZUVyckRpZmYoYWN0dWFsLCBleHBlY3RlZCwgb3BlcmF0b3IpKTtcbiAgICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09ICdub3REZWVwU3RyaWN0RXF1YWwnIHx8IG9wZXJhdG9yID09PSAnbm90U3RyaWN0RXF1YWwnKSB7XG4gICAgICAgIC8vIEluIGNhc2UgdGhlIG9iamVjdHMgYXJlIGVxdWFsIGJ1dCB0aGUgb3BlcmF0b3IgcmVxdWlyZXMgdW5lcXVhbCwgc2hvd1xuICAgICAgICAvLyB0aGUgZmlyc3Qgb2JqZWN0IGFuZCBzYXkgQSBlcXVhbHMgQlxuICAgICAgICB2YXIgYmFzZSA9IGtSZWFkYWJsZU9wZXJhdG9yW29wZXJhdG9yXTtcbiAgICAgICAgdmFyIHJlcyA9IGluc3BlY3RWYWx1ZShhY3R1YWwpLnNwbGl0KCdcXG4nKTtcblxuICAgICAgICAvLyBJbiBjYXNlIFwiYWN0dWFsXCIgaXMgYW4gb2JqZWN0LCBpdCBzaG91bGQgbm90IGJlIHJlZmVyZW5jZSBlcXVhbC5cbiAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnbm90U3RyaWN0RXF1YWwnICYmIF90eXBlb2YoYWN0dWFsKSA9PT0gJ29iamVjdCcgJiYgYWN0dWFsICE9PSBudWxsKSB7XG4gICAgICAgICAgYmFzZSA9IGtSZWFkYWJsZU9wZXJhdG9yLm5vdFN0cmljdEVxdWFsT2JqZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSByZW1vdmUgbGluZXMgaW4gY2FzZSBpdCBtYWtlcyBzZW5zZSB0byBjb2xsYXBzZSB0aG9zZS5cbiAgICAgICAgLy8gVE9ETzogQWNjZXB0IGVudiB0byBhbHdheXMgc2hvdyB0aGUgZnVsbCBlcnJvci5cbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAzMCkge1xuICAgICAgICAgIHJlc1syNl0gPSBcIlwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuICAgICAgICAgIHdoaWxlIChyZXMubGVuZ3RoID4gMjcpIHtcbiAgICAgICAgICAgIHJlcy5wb3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPbmx5IHByaW50IGEgc2luZ2xlIGlucHV0LlxuICAgICAgICBpZiAocmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXCJcIi5jb25jYXQoYmFzZSwgXCIgXCIpLmNvbmNhdChyZXNbMF0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFwiXCIuY29uY2F0KGJhc2UsIFwiXFxuXFxuXCIpLmNvbmNhdChyZXMuam9pbignXFxuJyksIFwiXFxuXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF9yZXMgPSBpbnNwZWN0VmFsdWUoYWN0dWFsKTtcbiAgICAgICAgdmFyIG90aGVyID0gJyc7XG4gICAgICAgIHZhciBrbm93bk9wZXJhdG9ycyA9IGtSZWFkYWJsZU9wZXJhdG9yW29wZXJhdG9yXTtcbiAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnbm90RGVlcEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ25vdEVxdWFsJykge1xuICAgICAgICAgIF9yZXMgPSBcIlwiLmNvbmNhdChrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl0sIFwiXFxuXFxuXCIpLmNvbmNhdChfcmVzKTtcbiAgICAgICAgICBpZiAoX3Jlcy5sZW5ndGggPiAxMDI0KSB7XG4gICAgICAgICAgICBfcmVzID0gXCJcIi5jb25jYXQoX3Jlcy5zbGljZSgwLCAxMDIxKSwgXCIuLi5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG90aGVyID0gXCJcIi5jb25jYXQoaW5zcGVjdFZhbHVlKGV4cGVjdGVkKSk7XG4gICAgICAgICAgaWYgKF9yZXMubGVuZ3RoID4gNTEyKSB7XG4gICAgICAgICAgICBfcmVzID0gXCJcIi5jb25jYXQoX3Jlcy5zbGljZSgwLCA1MDkpLCBcIi4uLlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG90aGVyLmxlbmd0aCA+IDUxMikge1xuICAgICAgICAgICAgb3RoZXIgPSBcIlwiLmNvbmNhdChvdGhlci5zbGljZSgwLCA1MDkpLCBcIi4uLlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnZGVlcEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ2VxdWFsJykge1xuICAgICAgICAgICAgX3JlcyA9IFwiXCIuY29uY2F0KGtub3duT3BlcmF0b3JzLCBcIlxcblxcblwiKS5jb25jYXQoX3JlcywgXCJcXG5cXG5zaG91bGQgZXF1YWxcXG5cXG5cIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG90aGVyID0gXCIgXCIuY29uY2F0KG9wZXJhdG9yLCBcIiBcIikuY29uY2F0KG90aGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBcIlwiLmNvbmNhdChfcmVzKS5jb25jYXQob3RoZXIpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gbGltaXQ7XG4gICAgX3RoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9ICFtZXNzYWdlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgJ25hbWUnLCB7XG4gICAgICB2YWx1ZTogJ0Fzc2VydGlvbkVycm9yIFtFUlJfQVNTRVJUSU9OXScsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgX3RoaXMuY29kZSA9ICdFUlJfQVNTRVJUSU9OJztcbiAgICBfdGhpcy5hY3R1YWwgPSBhY3R1YWw7XG4gICAgX3RoaXMuZXhwZWN0ZWQgPSBleHBlY3RlZDtcbiAgICBfdGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgc3RhY2tTdGFydEZuKTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBlcnJvciBjb2RlIGluIHRoZSBuYW1lLlxuICAgIF90aGlzLnN0YWNrO1xuICAgIC8vIFJlc2V0IHRoZSBuYW1lLlxuICAgIF90aGlzLm5hbWUgPSAnQXNzZXJ0aW9uRXJyb3InO1xuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcyk7XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKEFzc2VydGlvbkVycm9yLCBbe1xuICAgIGtleTogXCJ0b1N0cmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh0aGlzLm5hbWUsIFwiIFtcIikuY29uY2F0KHRoaXMuY29kZSwgXCJdOiBcIikuY29uY2F0KHRoaXMubWVzc2FnZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBfaW5zcGVjdCRjdXN0b20sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHJlY3Vyc2VUaW1lcywgY3R4KSB7XG4gICAgICAvLyBUaGlzIGxpbWl0cyB0aGUgYGFjdHVhbGAgYW5kIGBleHBlY3RlZGAgcHJvcGVydHkgZGVmYXVsdCBpbnNwZWN0aW9uIHRvXG4gICAgICAvLyB0aGUgbWluaW11bSBkZXB0aC4gT3RoZXJ3aXNlIHRob3NlIHZhbHVlcyB3b3VsZCBiZSB0b28gdmVyYm9zZSBjb21wYXJlZFxuICAgICAgLy8gdG8gdGhlIGFjdHVhbCBlcnJvciBtZXNzYWdlIHdoaWNoIGNvbnRhaW5zIGEgY29tYmluZWQgdmlldyBvZiB0aGVzZSB0d29cbiAgICAgIC8vIGlucHV0IHZhbHVlcy5cbiAgICAgIHJldHVybiBpbnNwZWN0KHRoaXMsIF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgY3R4KSwge30sIHtcbiAgICAgICAgY3VzdG9tSW5zcGVjdDogZmFsc2UsXG4gICAgICAgIGRlcHRoOiAwXG4gICAgICB9KSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBBc3NlcnRpb25FcnJvcjtcbn0oIC8qI19fUFVSRV9fKi9fd3JhcE5hdGl2ZVN1cGVyKEVycm9yKSwgaW5zcGVjdC5jdXN0b20pO1xubW9kdWxlLmV4cG9ydHMgPSBBc3NlcnRpb25FcnJvcjsiLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2ludGVybmFsL2Vycm9ycy5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8zYjA0NDk2MmM0OGZlMzEzOTA1ODc3YTk2YjVkMDg5NGE1NDA0ZjZmXG5cbi8qIGVzbGludCBub2RlLWNvcmUvZG9jdW1lbnRlZC1lcnJvcnM6IFwiZXJyb3JcIiAqL1xuLyogZXNsaW50IG5vZGUtY29yZS9hbHBoYWJldGl6ZS1lcnJvcnM6IFwiZXJyb3JcIiAqL1xuLyogZXNsaW50IG5vZGUtY29yZS9wcmVmZXItdXRpbC1mb3JtYXQtZXJyb3JzOiBcImVycm9yXCIgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGUgd2hvbGUgcG9pbnQgYmVoaW5kIHRoaXMgaW50ZXJuYWwgbW9kdWxlIGlzIHRvIGFsbG93IE5vZGUuanMgdG8gbm9cbi8vIGxvbmdlciBiZSBmb3JjZWQgdG8gdHJlYXQgZXZlcnkgZXJyb3IgbWVzc2FnZSBjaGFuZ2UgYXMgYSBzZW12ZXItbWFqb3Jcbi8vIGNoYW5nZS4gVGhlIE5vZGVFcnJvciBjbGFzc2VzIGhlcmUgYWxsIGV4cG9zZSBhIGBjb2RlYCBwcm9wZXJ0eSB3aG9zZVxuLy8gdmFsdWUgc3RhdGljYWxseSBhbmQgcGVybWFuZW50bHkgaWRlbnRpZmllcyB0aGUgZXJyb3IuIFdoaWxlIHRoZSBlcnJvclxuLy8gbWVzc2FnZSBtYXkgY2hhbmdlLCB0aGUgY29kZSBzaG91bGQgbm90LlxuZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBfdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpOyB9IH1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleShhcmcpIHsgdmFyIGtleSA9IF90b1ByaW1pdGl2ZShhcmcsIFwic3RyaW5nXCIpOyByZXR1cm4gX3R5cGVvZihrZXkpID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkgeyBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDsgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7IHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpOyBpZiAoX3R5cGVvZihyZXMpICE9PSBcIm9iamVjdFwiKSByZXR1cm4gcmVzOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7IH1cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3ViQ2xhc3MsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6IGZhbHNlIH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IGVsc2UgaWYgKGNhbGwgIT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRGVyaXZlZCBjb25zdHJ1Y3RvcnMgbWF5IG9ubHkgcmV0dXJuIG9iamVjdCBvciB1bmRlZmluZWRcIik7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxudmFyIGNvZGVzID0ge307XG5cbi8vIExhenkgbG9hZGVkXG52YXIgYXNzZXJ0O1xudmFyIHV0aWw7XG5mdW5jdGlvbiBjcmVhdGVFcnJvclR5cGUoY29kZSwgbWVzc2FnZSwgQmFzZSkge1xuICBpZiAoIUJhc2UpIHtcbiAgICBCYXNlID0gRXJyb3I7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0TWVzc2FnZShhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtZXNzYWdlKGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgIH1cbiAgfVxuICB2YXIgTm9kZUVycm9yID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQmFzZSkge1xuICAgIF9pbmhlcml0cyhOb2RlRXJyb3IsIF9CYXNlKTtcbiAgICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKE5vZGVFcnJvcik7XG4gICAgZnVuY3Rpb24gTm9kZUVycm9yKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgIHZhciBfdGhpcztcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOb2RlRXJyb3IpO1xuICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBnZXRNZXNzYWdlKGFyZzEsIGFyZzIsIGFyZzMpKTtcbiAgICAgIF90aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gX2NyZWF0ZUNsYXNzKE5vZGVFcnJvcik7XG4gIH0oQmFzZSk7XG4gIGNvZGVzW2NvZGVdID0gTm9kZUVycm9yO1xufVxuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi92MTAuOC4wL2xpYi9pbnRlcm5hbC9lcnJvcnMuanNcbmZ1bmN0aW9uIG9uZU9mKGV4cGVjdGVkLCB0aGluZykge1xuICBpZiAoQXJyYXkuaXNBcnJheShleHBlY3RlZCkpIHtcbiAgICB2YXIgbGVuID0gZXhwZWN0ZWQubGVuZ3RoO1xuICAgIGV4cGVjdGVkID0gZXhwZWN0ZWQubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gU3RyaW5nKGkpO1xuICAgIH0pO1xuICAgIGlmIChsZW4gPiAyKSB7XG4gICAgICByZXR1cm4gXCJvbmUgb2YgXCIuY29uY2F0KHRoaW5nLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkLnNsaWNlKDAsIGxlbiAtIDEpLmpvaW4oJywgJyksIFwiLCBvciBcIikgKyBleHBlY3RlZFtsZW4gLSAxXTtcbiAgICB9IGVsc2UgaWYgKGxlbiA9PT0gMikge1xuICAgICAgcmV0dXJuIFwib25lIG9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChleHBlY3RlZFswXSwgXCIgb3IgXCIpLmNvbmNhdChleHBlY3RlZFsxXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIm9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChleHBlY3RlZFswXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIm9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChTdHJpbmcoZXhwZWN0ZWQpKTtcbiAgfVxufVxuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvc3RhcnRzV2l0aFxuZnVuY3Rpb24gc3RhcnRzV2l0aChzdHIsIHNlYXJjaCwgcG9zKSB7XG4gIHJldHVybiBzdHIuc3Vic3RyKCFwb3MgfHwgcG9zIDwgMCA/IDAgOiArcG9zLCBzZWFyY2gubGVuZ3RoKSA9PT0gc2VhcmNoO1xufVxuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvZW5kc1dpdGhcbmZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc2VhcmNoLCB0aGlzX2xlbikge1xuICBpZiAodGhpc19sZW4gPT09IHVuZGVmaW5lZCB8fCB0aGlzX2xlbiA+IHN0ci5sZW5ndGgpIHtcbiAgICB0aGlzX2xlbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIHN0ci5zdWJzdHJpbmcodGhpc19sZW4gLSBzZWFyY2gubGVuZ3RoLCB0aGlzX2xlbikgPT09IHNlYXJjaDtcbn1cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL2luY2x1ZGVzXG5mdW5jdGlvbiBpbmNsdWRlcyhzdHIsIHNlYXJjaCwgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBzdGFydCAhPT0gJ251bWJlcicpIHtcbiAgICBzdGFydCA9IDA7XG4gIH1cbiAgaWYgKHN0YXJ0ICsgc2VhcmNoLmxlbmd0aCA+IHN0ci5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKHNlYXJjaCwgc3RhcnQpICE9PSAtMTtcbiAgfVxufVxuY3JlYXRlRXJyb3JUeXBlKCdFUlJfQU1CSUdVT1VTX0FSR1VNRU5UJywgJ1RoZSBcIiVzXCIgYXJndW1lbnQgaXMgYW1iaWd1b3VzLiAlcycsIFR5cGVFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJywgZnVuY3Rpb24gKG5hbWUsIGV4cGVjdGVkLCBhY3R1YWwpIHtcbiAgaWYgKGFzc2VydCA9PT0gdW5kZWZpbmVkKSBhc3NlcnQgPSByZXF1aXJlKCcuLi9hc3NlcnQnKTtcbiAgYXNzZXJ0KHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJywgXCInbmFtZScgbXVzdCBiZSBhIHN0cmluZ1wiKTtcblxuICAvLyBkZXRlcm1pbmVyOiAnbXVzdCBiZScgb3IgJ211c3Qgbm90IGJlJ1xuICB2YXIgZGV0ZXJtaW5lcjtcbiAgaWYgKHR5cGVvZiBleHBlY3RlZCA9PT0gJ3N0cmluZycgJiYgc3RhcnRzV2l0aChleHBlY3RlZCwgJ25vdCAnKSkge1xuICAgIGRldGVybWluZXIgPSAnbXVzdCBub3QgYmUnO1xuICAgIGV4cGVjdGVkID0gZXhwZWN0ZWQucmVwbGFjZSgvXm5vdCAvLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgZGV0ZXJtaW5lciA9ICdtdXN0IGJlJztcbiAgfVxuICB2YXIgbXNnO1xuICBpZiAoZW5kc1dpdGgobmFtZSwgJyBhcmd1bWVudCcpKSB7XG4gICAgLy8gRm9yIGNhc2VzIGxpa2UgJ2ZpcnN0IGFyZ3VtZW50J1xuICAgIG1zZyA9IFwiVGhlIFwiLmNvbmNhdChuYW1lLCBcIiBcIikuY29uY2F0KGRldGVybWluZXIsIFwiIFwiKS5jb25jYXQob25lT2YoZXhwZWN0ZWQsICd0eXBlJykpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0eXBlID0gaW5jbHVkZXMobmFtZSwgJy4nKSA/ICdwcm9wZXJ0eScgOiAnYXJndW1lbnQnO1xuICAgIG1zZyA9IFwiVGhlIFxcXCJcIi5jb25jYXQobmFtZSwgXCJcXFwiIFwiKS5jb25jYXQodHlwZSwgXCIgXCIpLmNvbmNhdChkZXRlcm1pbmVyLCBcIiBcIikuY29uY2F0KG9uZU9mKGV4cGVjdGVkLCAndHlwZScpKTtcbiAgfVxuXG4gIC8vIFRPRE8oQnJpZGdlQVIpOiBJbXByb3ZlIHRoZSBvdXRwdXQgYnkgc2hvd2luZyBgbnVsbGAgYW5kIHNpbWlsYXIuXG4gIG1zZyArPSBcIi4gUmVjZWl2ZWQgdHlwZSBcIi5jb25jYXQoX3R5cGVvZihhY3R1YWwpKTtcbiAgcmV0dXJuIG1zZztcbn0sIFR5cGVFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9JTlZBTElEX0FSR19WQUxVRScsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICB2YXIgcmVhc29uID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAnaXMgaW52YWxpZCc7XG4gIGlmICh1dGlsID09PSB1bmRlZmluZWQpIHV0aWwgPSByZXF1aXJlKCd1dGlsLycpO1xuICB2YXIgaW5zcGVjdGVkID0gdXRpbC5pbnNwZWN0KHZhbHVlKTtcbiAgaWYgKGluc3BlY3RlZC5sZW5ndGggPiAxMjgpIHtcbiAgICBpbnNwZWN0ZWQgPSBcIlwiLmNvbmNhdChpbnNwZWN0ZWQuc2xpY2UoMCwgMTI4KSwgXCIuLi5cIik7XG4gIH1cbiAgcmV0dXJuIFwiVGhlIGFyZ3VtZW50ICdcIi5jb25jYXQobmFtZSwgXCInIFwiKS5jb25jYXQocmVhc29uLCBcIi4gUmVjZWl2ZWQgXCIpLmNvbmNhdChpbnNwZWN0ZWQpO1xufSwgVHlwZUVycm9yLCBSYW5nZUVycm9yKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX0lOVkFMSURfUkVUVVJOX1ZBTFVFJywgZnVuY3Rpb24gKGlucHV0LCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgdHlwZTtcbiAgaWYgKHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICB0eXBlID0gXCJpbnN0YW5jZSBvZiBcIi5jb25jYXQodmFsdWUuY29uc3RydWN0b3IubmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgdHlwZSA9IFwidHlwZSBcIi5jb25jYXQoX3R5cGVvZih2YWx1ZSkpO1xuICB9XG4gIHJldHVybiBcIkV4cGVjdGVkIFwiLmNvbmNhdChpbnB1dCwgXCIgdG8gYmUgcmV0dXJuZWQgZnJvbSB0aGUgXFxcIlwiKS5jb25jYXQobmFtZSwgXCJcXFwiXCIpICsgXCIgZnVuY3Rpb24gYnV0IGdvdCBcIi5jb25jYXQodHlwZSwgXCIuXCIpO1xufSwgVHlwZUVycm9yKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX01JU1NJTkdfQVJHUycsIGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuICBpZiAoYXNzZXJ0ID09PSB1bmRlZmluZWQpIGFzc2VydCA9IHJlcXVpcmUoJy4uL2Fzc2VydCcpO1xuICBhc3NlcnQoYXJncy5sZW5ndGggPiAwLCAnQXQgbGVhc3Qgb25lIGFyZyBuZWVkcyB0byBiZSBzcGVjaWZpZWQnKTtcbiAgdmFyIG1zZyA9ICdUaGUgJztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICBhcmdzID0gYXJncy5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KGEsIFwiXFxcIlwiKTtcbiAgfSk7XG4gIHN3aXRjaCAobGVuKSB7XG4gICAgY2FzZSAxOlxuICAgICAgbXNnICs9IFwiXCIuY29uY2F0KGFyZ3NbMF0sIFwiIGFyZ3VtZW50XCIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgbXNnICs9IFwiXCIuY29uY2F0KGFyZ3NbMF0sIFwiIGFuZCBcIikuY29uY2F0KGFyZ3NbMV0sIFwiIGFyZ3VtZW50c1wiKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBtc2cgKz0gYXJncy5zbGljZSgwLCBsZW4gLSAxKS5qb2luKCcsICcpO1xuICAgICAgbXNnICs9IFwiLCBhbmQgXCIuY29uY2F0KGFyZ3NbbGVuIC0gMV0sIFwiIGFyZ3VtZW50c1wiKTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiBcIlwiLmNvbmNhdChtc2csIFwiIG11c3QgYmUgc3BlY2lmaWVkXCIpO1xufSwgVHlwZUVycm9yKTtcbm1vZHVsZS5leHBvcnRzLmNvZGVzID0gY29kZXM7IiwiLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9pbnRlcm5hbC91dGlsL2NvbXBhcmlzb25zLmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvY29tbWl0LzExMmNjN2MyNzU1MTI1NGFhMmIxNzA5OGZiNzc0ODY3ZjA1ZWQwZDlcblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSBhcnIyW2ldID0gYXJyW2ldOyByZXR1cm4gYXJyMjsgfVxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KHIsIGwpIHsgdmFyIHQgPSBudWxsID09IHIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIHJbU3ltYm9sLml0ZXJhdG9yXSB8fCByW1wiQEBpdGVyYXRvclwiXTsgaWYgKG51bGwgIT0gdCkgeyB2YXIgZSwgbiwgaSwgdSwgYSA9IFtdLCBmID0gITAsIG8gPSAhMTsgdHJ5IHsgaWYgKGkgPSAodCA9IHQuY2FsbChyKSkubmV4dCwgMCA9PT0gbCkgeyBpZiAoT2JqZWN0KHQpICE9PSB0KSByZXR1cm47IGYgPSAhMTsgfSBlbHNlIGZvciAoOyAhKGYgPSAoZSA9IGkuY2FsbCh0KSkuZG9uZSkgJiYgKGEucHVzaChlLnZhbHVlKSwgYS5sZW5ndGggIT09IGwpOyBmID0gITApOyB9IGNhdGNoIChyKSB7IG8gPSAhMCwgbiA9IHI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghZiAmJiBudWxsICE9IHQucmV0dXJuICYmICh1ID0gdC5yZXR1cm4oKSwgT2JqZWN0KHUpICE9PSB1KSkgcmV0dXJuOyB9IGZpbmFsbHkgeyBpZiAobykgdGhyb3cgbjsgfSB9IHJldHVybiBhOyB9IH1cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxudmFyIHJlZ2V4RmxhZ3NTdXBwb3J0ZWQgPSAvYS9nLmZsYWdzICE9PSB1bmRlZmluZWQ7XG52YXIgYXJyYXlGcm9tU2V0ID0gZnVuY3Rpb24gYXJyYXlGcm9tU2V0KHNldCkge1xuICB2YXIgYXJyYXkgPSBbXTtcbiAgc2V0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGFycmF5LnB1c2godmFsdWUpO1xuICB9KTtcbiAgcmV0dXJuIGFycmF5O1xufTtcbnZhciBhcnJheUZyb21NYXAgPSBmdW5jdGlvbiBhcnJheUZyb21NYXAobWFwKSB7XG4gIHZhciBhcnJheSA9IFtdO1xuICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIHJldHVybiBhcnJheS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0pO1xuICByZXR1cm4gYXJyYXk7XG59O1xudmFyIG9iamVjdElzID0gT2JqZWN0LmlzID8gT2JqZWN0LmlzIDogcmVxdWlyZSgnb2JqZWN0LWlzJyk7XG52YXIgb2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBbXTtcbn07XG52YXIgbnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gPyBOdW1iZXIuaXNOYU4gOiByZXF1aXJlKCdpcy1uYW4nKTtcbmZ1bmN0aW9uIHVuY3VycnlUaGlzKGYpIHtcbiAgcmV0dXJuIGYuY2FsbC5iaW5kKGYpO1xufVxudmFyIGhhc093blByb3BlcnR5ID0gdW5jdXJyeVRoaXMoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSB1bmN1cnJ5VGhpcyhPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlKTtcbnZhciBvYmplY3RUb1N0cmluZyA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpO1xudmFyIF9yZXF1aXJlJHR5cGVzID0gcmVxdWlyZSgndXRpbC8nKS50eXBlcyxcbiAgaXNBbnlBcnJheUJ1ZmZlciA9IF9yZXF1aXJlJHR5cGVzLmlzQW55QXJyYXlCdWZmZXIsXG4gIGlzQXJyYXlCdWZmZXJWaWV3ID0gX3JlcXVpcmUkdHlwZXMuaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzRGF0ZSA9IF9yZXF1aXJlJHR5cGVzLmlzRGF0ZSxcbiAgaXNNYXAgPSBfcmVxdWlyZSR0eXBlcy5pc01hcCxcbiAgaXNSZWdFeHAgPSBfcmVxdWlyZSR0eXBlcy5pc1JlZ0V4cCxcbiAgaXNTZXQgPSBfcmVxdWlyZSR0eXBlcy5pc1NldCxcbiAgaXNOYXRpdmVFcnJvciA9IF9yZXF1aXJlJHR5cGVzLmlzTmF0aXZlRXJyb3IsXG4gIGlzQm94ZWRQcmltaXRpdmUgPSBfcmVxdWlyZSR0eXBlcy5pc0JveGVkUHJpbWl0aXZlLFxuICBpc051bWJlck9iamVjdCA9IF9yZXF1aXJlJHR5cGVzLmlzTnVtYmVyT2JqZWN0LFxuICBpc1N0cmluZ09iamVjdCA9IF9yZXF1aXJlJHR5cGVzLmlzU3RyaW5nT2JqZWN0LFxuICBpc0Jvb2xlYW5PYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc0Jvb2xlYW5PYmplY3QsXG4gIGlzQmlnSW50T2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNCaWdJbnRPYmplY3QsXG4gIGlzU3ltYm9sT2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNTeW1ib2xPYmplY3QsXG4gIGlzRmxvYXQzMkFycmF5ID0gX3JlcXVpcmUkdHlwZXMuaXNGbG9hdDMyQXJyYXksXG4gIGlzRmxvYXQ2NEFycmF5ID0gX3JlcXVpcmUkdHlwZXMuaXNGbG9hdDY0QXJyYXk7XG5mdW5jdGlvbiBpc05vbkluZGV4KGtleSkge1xuICBpZiAoa2V5Lmxlbmd0aCA9PT0gMCB8fCBrZXkubGVuZ3RoID4gMTApIHJldHVybiB0cnVlO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjb2RlID0ga2V5LmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNvZGUgPCA0OCB8fCBjb2RlID4gNTcpIHJldHVybiB0cnVlO1xuICB9XG4gIC8vIFRoZSBtYXhpbXVtIHNpemUgZm9yIGFuIGFycmF5IGlzIDIgKiogMzIgLTEuXG4gIHJldHVybiBrZXkubGVuZ3RoID09PSAxMCAmJiBrZXkgPj0gTWF0aC5wb3coMiwgMzIpO1xufVxuZnVuY3Rpb24gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSkuZmlsdGVyKGlzTm9uSW5kZXgpLmNvbmNhdChvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHModmFsdWUpLmZpbHRlcihPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmJpbmQodmFsdWUpKSk7XG59XG5cbi8vIFRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvYmxvYi82ODBlOWU1ZTQ4OGYyMmFhYzI3NTk5YTU3ZGM4NDRhNjMxNTkyOGRkL2luZGV4LmpzXG4vLyBvcmlnaW5hbCBub3RpY2U6XG4vKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5mdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICB2YXIgeCA9IGEubGVuZ3RoO1xuICB2YXIgeSA9IGIubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXTtcbiAgICAgIHkgPSBiW2ldO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmICh4IDwgeSkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICBpZiAoeSA8IHgpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMDtcbn1cbnZhciBPTkxZX0VOVU1FUkFCTEUgPSB1bmRlZmluZWQ7XG52YXIga1N0cmljdCA9IHRydWU7XG52YXIga0xvb3NlID0gZmFsc2U7XG52YXIga05vSXRlcmF0b3IgPSAwO1xudmFyIGtJc0FycmF5ID0gMTtcbnZhciBrSXNTZXQgPSAyO1xudmFyIGtJc01hcCA9IDM7XG5cbi8vIENoZWNrIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBzb3VyY2UgYW5kIGZsYWdzXG5mdW5jdGlvbiBhcmVTaW1pbGFyUmVnRXhwcyhhLCBiKSB7XG4gIHJldHVybiByZWdleEZsYWdzU3VwcG9ydGVkID8gYS5zb3VyY2UgPT09IGIuc291cmNlICYmIGEuZmxhZ3MgPT09IGIuZmxhZ3MgOiBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkgPT09IFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChiKTtcbn1cbmZ1bmN0aW9uIGFyZVNpbWlsYXJGbG9hdEFycmF5cyhhLCBiKSB7XG4gIGlmIChhLmJ5dGVMZW5ndGggIT09IGIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBhLmJ5dGVMZW5ndGg7IG9mZnNldCsrKSB7XG4gICAgaWYgKGFbb2Zmc2V0XSAhPT0gYltvZmZzZXRdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gYXJlU2ltaWxhclR5cGVkQXJyYXlzKGEsIGIpIHtcbiAgaWYgKGEuYnl0ZUxlbmd0aCAhPT0gYi5ieXRlTGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBjb21wYXJlKG5ldyBVaW50OEFycmF5KGEuYnVmZmVyLCBhLmJ5dGVPZmZzZXQsIGEuYnl0ZUxlbmd0aCksIG5ldyBVaW50OEFycmF5KGIuYnVmZmVyLCBiLmJ5dGVPZmZzZXQsIGIuYnl0ZUxlbmd0aCkpID09PSAwO1xufVxuZnVuY3Rpb24gYXJlRXF1YWxBcnJheUJ1ZmZlcnMoYnVmMSwgYnVmMikge1xuICByZXR1cm4gYnVmMS5ieXRlTGVuZ3RoID09PSBidWYyLmJ5dGVMZW5ndGggJiYgY29tcGFyZShuZXcgVWludDhBcnJheShidWYxKSwgbmV3IFVpbnQ4QXJyYXkoYnVmMikpID09PSAwO1xufVxuZnVuY3Rpb24gaXNFcXVhbEJveGVkUHJpbWl0aXZlKHZhbDEsIHZhbDIpIHtcbiAgaWYgKGlzTnVtYmVyT2JqZWN0KHZhbDEpKSB7XG4gICAgcmV0dXJuIGlzTnVtYmVyT2JqZWN0KHZhbDIpICYmIG9iamVjdElzKE51bWJlci5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDEpLCBOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKSk7XG4gIH1cbiAgaWYgKGlzU3RyaW5nT2JqZWN0KHZhbDEpKSB7XG4gICAgcmV0dXJuIGlzU3RyaW5nT2JqZWN0KHZhbDIpICYmIFN0cmluZy5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDEpID09PSBTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKTtcbiAgfVxuICBpZiAoaXNCb29sZWFuT2JqZWN0KHZhbDEpKSB7XG4gICAgcmV0dXJuIGlzQm9vbGVhbk9iamVjdCh2YWwyKSAmJiBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMSkgPT09IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKTtcbiAgfVxuICBpZiAoaXNCaWdJbnRPYmplY3QodmFsMSkpIHtcbiAgICByZXR1cm4gaXNCaWdJbnRPYmplY3QodmFsMikgJiYgQmlnSW50LnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMSkgPT09IEJpZ0ludC5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDIpO1xuICB9XG4gIHJldHVybiBpc1N5bWJvbE9iamVjdCh2YWwyKSAmJiBTeW1ib2wucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSA9PT0gU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMik7XG59XG5cbi8vIE5vdGVzOiBUeXBlIHRhZ3MgYXJlIGhpc3RvcmljYWwgW1tDbGFzc11dIHByb3BlcnRpZXMgdGhhdCBjYW4gYmUgc2V0IGJ5XG4vLyBGdW5jdGlvblRlbXBsYXRlOjpTZXRDbGFzc05hbWUoKSBpbiBDKysgb3IgU3ltYm9sLnRvU3RyaW5nVGFnIGluIEpTXG4vLyBhbmQgcmV0cmlldmVkIHVzaW5nIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopIGluIEpTXG4vLyBTZWUgaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xuLy8gZm9yIGEgbGlzdCBvZiB0YWdzIHByZS1kZWZpbmVkIGluIHRoZSBzcGVjLlxuLy8gVGhlcmUgYXJlIHNvbWUgdW5zcGVjaWZpZWQgdGFncyBpbiB0aGUgd2lsZCB0b28gKGUuZy4gdHlwZWQgYXJyYXkgdGFncykuXG4vLyBTaW5jZSB0YWdzIGNhbiBiZSBhbHRlcmVkLCB0aGV5IG9ubHkgc2VydmUgZmFzdCBmYWlsdXJlc1xuLy9cbi8vIFR5cGVkIGFycmF5cyBhbmQgYnVmZmVycyBhcmUgY2hlY2tlZCBieSBjb21wYXJpbmcgdGhlIGNvbnRlbnQgaW4gdGhlaXJcbi8vIHVuZGVybHlpbmcgQXJyYXlCdWZmZXIuIFRoaXMgb3B0aW1pemF0aW9uIHJlcXVpcmVzIHRoYXQgaXQnc1xuLy8gcmVhc29uYWJsZSB0byBpbnRlcnByZXQgdGhlaXIgdW5kZXJseWluZyBtZW1vcnkgaW4gdGhlIHNhbWUgd2F5LFxuLy8gd2hpY2ggaXMgY2hlY2tlZCBieSBjb21wYXJpbmcgdGhlaXIgdHlwZSB0YWdzLlxuLy8gKGUuZy4gYSBVaW50OEFycmF5IGFuZCBhIFVpbnQxNkFycmF5IHdpdGggdGhlIHNhbWUgbWVtb3J5IGNvbnRlbnRcbi8vIGNvdWxkIHN0aWxsIGJlIGRpZmZlcmVudCBiZWNhdXNlIHRoZXkgd2lsbCBiZSBpbnRlcnByZXRlZCBkaWZmZXJlbnRseSkuXG4vL1xuLy8gRm9yIHN0cmljdCBjb21wYXJpc29uLCBvYmplY3RzIHNob3VsZCBoYXZlXG4vLyBhKSBUaGUgc2FtZSBidWlsdC1pbiB0eXBlIHRhZ3Ncbi8vIGIpIFRoZSBzYW1lIHByb3RvdHlwZXMuXG5cbmZ1bmN0aW9uIGlubmVyRGVlcEVxdWFsKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MpIHtcbiAgLy8gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAodmFsMSA9PT0gdmFsMikge1xuICAgIGlmICh2YWwxICE9PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gc3RyaWN0ID8gb2JqZWN0SXModmFsMSwgdmFsMikgOiB0cnVlO1xuICB9XG5cbiAgLy8gQ2hlY2sgbW9yZSBjbG9zZWx5IGlmIHZhbDEgYW5kIHZhbDIgYXJlIGVxdWFsLlxuICBpZiAoc3RyaWN0KSB7XG4gICAgaWYgKF90eXBlb2YodmFsMSkgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbDEgPT09ICdudW1iZXInICYmIG51bWJlcklzTmFOKHZhbDEpICYmIG51bWJlcklzTmFOKHZhbDIpO1xuICAgIH1cbiAgICBpZiAoX3R5cGVvZih2YWwyKSAhPT0gJ29iamVjdCcgfHwgdmFsMSA9PT0gbnVsbCB8fCB2YWwyID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsMSkgIT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsMSA9PT0gbnVsbCB8fCBfdHlwZW9mKHZhbDEpICE9PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHZhbDIgPT09IG51bGwgfHwgX3R5cGVvZih2YWwyKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuICAgICAgICByZXR1cm4gdmFsMSA9PSB2YWwyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodmFsMiA9PT0gbnVsbCB8fCBfdHlwZW9mKHZhbDIpICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICB2YXIgdmFsMVRhZyA9IG9iamVjdFRvU3RyaW5nKHZhbDEpO1xuICB2YXIgdmFsMlRhZyA9IG9iamVjdFRvU3RyaW5nKHZhbDIpO1xuICBpZiAodmFsMVRhZyAhPT0gdmFsMlRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwxKSkge1xuICAgIC8vIENoZWNrIGZvciBzcGFyc2UgYXJyYXlzIGFuZCBnZW5lcmFsIGZhc3QgcGF0aFxuICAgIGlmICh2YWwxLmxlbmd0aCAhPT0gdmFsMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGtleXMxID0gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbDEsIE9OTFlfRU5VTUVSQUJMRSk7XG4gICAgdmFyIGtleXMyID0gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbDIsIE9OTFlfRU5VTUVSQUJMRSk7XG4gICAgaWYgKGtleXMxLmxlbmd0aCAhPT0ga2V5czIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrSXNBcnJheSwga2V5czEpO1xuICB9XG4gIC8vIFticm93c2VyaWZ5XSBUaGlzIHRyaWdnZXJzIG9uIGNlcnRhaW4gdHlwZXMgaW4gSUUgKE1hcC9TZXQpIHNvIHdlIGRvbid0XG4gIC8vIHdhbid0IHRvIGVhcmx5IHJldHVybiBvdXQgb2YgdGhlIHJlc3Qgb2YgdGhlIGNoZWNrcy4gSG93ZXZlciB3ZSBjYW4gY2hlY2tcbiAgLy8gaWYgdGhlIHNlY29uZCB2YWx1ZSBpcyBvbmUgb2YgdGhlc2UgdmFsdWVzIGFuZCB0aGUgZmlyc3QgaXNuJ3QuXG4gIGlmICh2YWwxVGFnID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIC8vIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrTm9JdGVyYXRvcik7XG4gICAgaWYgKCFpc01hcCh2YWwxKSAmJiBpc01hcCh2YWwyKSB8fCAhaXNTZXQodmFsMSkgJiYgaXNTZXQodmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzRGF0ZSh2YWwxKSkge1xuICAgIGlmICghaXNEYXRlKHZhbDIpIHx8IERhdGUucHJvdG90eXBlLmdldFRpbWUuY2FsbCh2YWwxKSAhPT0gRGF0ZS5wcm90b3R5cGUuZ2V0VGltZS5jYWxsKHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzUmVnRXhwKHZhbDEpKSB7XG4gICAgaWYgKCFpc1JlZ0V4cCh2YWwyKSB8fCAhYXJlU2ltaWxhclJlZ0V4cHModmFsMSwgdmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNOYXRpdmVFcnJvcih2YWwxKSB8fCB2YWwxIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAvLyBEbyBub3QgY29tcGFyZSB0aGUgc3RhY2sgYXMgaXQgbWlnaHQgZGlmZmVyIGV2ZW4gdGhvdWdoIHRoZSBlcnJvciBpdHNlbGZcbiAgICAvLyBpcyBvdGhlcndpc2UgaWRlbnRpY2FsLlxuICAgIGlmICh2YWwxLm1lc3NhZ2UgIT09IHZhbDIubWVzc2FnZSB8fCB2YWwxLm5hbWUgIT09IHZhbDIubmFtZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0FycmF5QnVmZmVyVmlldyh2YWwxKSkge1xuICAgIGlmICghc3RyaWN0ICYmIChpc0Zsb2F0MzJBcnJheSh2YWwxKSB8fCBpc0Zsb2F0NjRBcnJheSh2YWwxKSkpIHtcbiAgICAgIGlmICghYXJlU2ltaWxhckZsb2F0QXJyYXlzKHZhbDEsIHZhbDIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFhcmVTaW1pbGFyVHlwZWRBcnJheXModmFsMSwgdmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gQnVmZmVyLmNvbXBhcmUgcmV0dXJucyB0cnVlLCBzbyB2YWwxLmxlbmd0aCA9PT0gdmFsMi5sZW5ndGguIElmIHRoZXkgYm90aFxuICAgIC8vIG9ubHkgY29udGFpbiBudW1lcmljIGtleXMsIHdlIGRvbid0IG5lZWQgdG8gZXhhbSBmdXJ0aGVyIHRoYW4gY2hlY2tpbmdcbiAgICAvLyB0aGUgc3ltYm9scy5cbiAgICB2YXIgX2tleXMgPSBnZXRPd25Ob25JbmRleFByb3BlcnRpZXModmFsMSwgT05MWV9FTlVNRVJBQkxFKTtcbiAgICB2YXIgX2tleXMyID0gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbDIsIE9OTFlfRU5VTUVSQUJMRSk7XG4gICAgaWYgKF9rZXlzLmxlbmd0aCAhPT0gX2tleXMyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga05vSXRlcmF0b3IsIF9rZXlzKTtcbiAgfSBlbHNlIGlmIChpc1NldCh2YWwxKSkge1xuICAgIGlmICghaXNTZXQodmFsMikgfHwgdmFsMS5zaXplICE9PSB2YWwyLnNpemUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGtJc1NldCk7XG4gIH0gZWxzZSBpZiAoaXNNYXAodmFsMSkpIHtcbiAgICBpZiAoIWlzTWFwKHZhbDIpIHx8IHZhbDEuc2l6ZSAhPT0gdmFsMi5zaXplKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrSXNNYXApO1xuICB9IGVsc2UgaWYgKGlzQW55QXJyYXlCdWZmZXIodmFsMSkpIHtcbiAgICBpZiAoIWFyZUVxdWFsQXJyYXlCdWZmZXJzKHZhbDEsIHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzQm94ZWRQcmltaXRpdmUodmFsMSkgJiYgIWlzRXF1YWxCb3hlZFByaW1pdGl2ZSh2YWwxLCB2YWwyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga05vSXRlcmF0b3IpO1xufVxuZnVuY3Rpb24gZ2V0RW51bWVyYWJsZXModmFsLCBrZXlzKSB7XG4gIHJldHVybiBrZXlzLmZpbHRlcihmdW5jdGlvbiAoaykge1xuICAgIHJldHVybiBwcm9wZXJ0eUlzRW51bWVyYWJsZSh2YWwsIGspO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGl0ZXJhdGlvblR5cGUsIGFLZXlzKSB7XG4gIC8vIEZvciBhbGwgcmVtYWluaW5nIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5LCBvYmplY3RzIGFuZCBNYXBzLFxuICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5IGhhdmluZzpcbiAgLy8gYSkgVGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIGVudW1lcmFibGUgcHJvcGVydGllc1xuICAvLyBiKSBUaGUgc2FtZSBzZXQgb2Yga2V5cy9pbmRleGVzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpXG4gIC8vIGMpIEVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleS9pbmRleFxuICAvLyBkKSBGb3IgU2V0cyBhbmQgTWFwcywgZXF1YWwgY29udGVudHNcbiAgLy8gTm90ZTogdGhpcyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDUpIHtcbiAgICBhS2V5cyA9IE9iamVjdC5rZXlzKHZhbDEpO1xuICAgIHZhciBiS2V5cyA9IE9iamVjdC5rZXlzKHZhbDIpO1xuXG4gICAgLy8gVGhlIHBhaXIgbXVzdCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzLlxuICAgIGlmIChhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIENoZWFwIGtleSB0ZXN0XG4gIHZhciBpID0gMDtcbiAgZm9yICg7IGkgPCBhS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duUHJvcGVydHkodmFsMiwgYUtleXNbaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChzdHJpY3QgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gNSkge1xuICAgIHZhciBzeW1ib2xLZXlzQSA9IG9iamVjdEdldE93blByb3BlcnR5U3ltYm9scyh2YWwxKTtcbiAgICBpZiAoc3ltYm9sS2V5c0EubGVuZ3RoICE9PSAwKSB7XG4gICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHN5bWJvbEtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBzeW1ib2xLZXlzQVtpXTtcbiAgICAgICAgaWYgKHByb3BlcnR5SXNFbnVtZXJhYmxlKHZhbDEsIGtleSkpIHtcbiAgICAgICAgICBpZiAoIXByb3BlcnR5SXNFbnVtZXJhYmxlKHZhbDIsIGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYUtleXMucHVzaChrZXkpO1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHlJc0VudW1lcmFibGUodmFsMiwga2V5KSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHN5bWJvbEtleXNCID0gb2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzKHZhbDIpO1xuICAgICAgaWYgKHN5bWJvbEtleXNBLmxlbmd0aCAhPT0gc3ltYm9sS2V5c0IubGVuZ3RoICYmIGdldEVudW1lcmFibGVzKHZhbDIsIHN5bWJvbEtleXNCKS5sZW5ndGggIT09IGNvdW50KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9zeW1ib2xLZXlzQiA9IG9iamVjdEdldE93blByb3BlcnR5U3ltYm9scyh2YWwyKTtcbiAgICAgIGlmIChfc3ltYm9sS2V5c0IubGVuZ3RoICE9PSAwICYmIGdldEVudW1lcmFibGVzKHZhbDIsIF9zeW1ib2xLZXlzQikubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGFLZXlzLmxlbmd0aCA9PT0gMCAmJiAoaXRlcmF0aW9uVHlwZSA9PT0ga05vSXRlcmF0b3IgfHwgaXRlcmF0aW9uVHlwZSA9PT0ga0lzQXJyYXkgJiYgdmFsMS5sZW5ndGggPT09IDAgfHwgdmFsMS5zaXplID09PSAwKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gVXNlIG1lbW9zIHRvIGhhbmRsZSBjeWNsZXMuXG4gIGlmIChtZW1vcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWVtb3MgPSB7XG4gICAgICB2YWwxOiBuZXcgTWFwKCksXG4gICAgICB2YWwyOiBuZXcgTWFwKCksXG4gICAgICBwb3NpdGlvbjogMFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gV2UgcHJldmVudCB1cCB0byB0d28gbWFwLmhhcyh4KSBjYWxscyBieSBkaXJlY3RseSByZXRyaWV2aW5nIHRoZSB2YWx1ZVxuICAgIC8vIGFuZCBjaGVja2luZyBmb3IgdW5kZWZpbmVkLiBUaGUgbWFwIGNhbiBvbmx5IGNvbnRhaW4gbnVtYmVycywgc28gaXQgaXNcbiAgICAvLyBzYWZlIHRvIGNoZWNrIGZvciB1bmRlZmluZWQgb25seS5cbiAgICB2YXIgdmFsMk1lbW9BID0gbWVtb3MudmFsMS5nZXQodmFsMSk7XG4gICAgaWYgKHZhbDJNZW1vQSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgdmFsMk1lbW9CID0gbWVtb3MudmFsMi5nZXQodmFsMik7XG4gICAgICBpZiAodmFsMk1lbW9CICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbDJNZW1vQSA9PT0gdmFsMk1lbW9CO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vcy5wb3NpdGlvbisrO1xuICB9XG4gIG1lbW9zLnZhbDEuc2V0KHZhbDEsIG1lbW9zLnBvc2l0aW9uKTtcbiAgbWVtb3MudmFsMi5zZXQodmFsMiwgbWVtb3MucG9zaXRpb24pO1xuICB2YXIgYXJlRXEgPSBvYmpFcXVpdih2YWwxLCB2YWwyLCBzdHJpY3QsIGFLZXlzLCBtZW1vcywgaXRlcmF0aW9uVHlwZSk7XG4gIG1lbW9zLnZhbDEuZGVsZXRlKHZhbDEpO1xuICBtZW1vcy52YWwyLmRlbGV0ZSh2YWwyKTtcbiAgcmV0dXJuIGFyZUVxO1xufVxuZnVuY3Rpb24gc2V0SGFzRXF1YWxFbGVtZW50KHNldCwgdmFsMSwgc3RyaWN0LCBtZW1vKSB7XG4gIC8vIEdvIGxvb2tpbmcuXG4gIHZhciBzZXRWYWx1ZXMgPSBhcnJheUZyb21TZXQoc2V0KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdmFsMiA9IHNldFZhbHVlc1tpXTtcbiAgICBpZiAoaW5uZXJEZWVwRXF1YWwodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vKSkge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBtYXRjaGluZyBlbGVtZW50IHRvIG1ha2Ugc3VyZSB3ZSBkbyBub3QgY2hlY2sgdGhhdCBhZ2Fpbi5cbiAgICAgIHNldC5kZWxldGUodmFsMik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9FcXVhbGl0eV9jb21wYXJpc29uc19hbmRfc2FtZW5lc3MjTG9vc2VfZXF1YWxpdHlfdXNpbmdcbi8vIFNhZGx5IGl0IGlzIG5vdCBwb3NzaWJsZSB0byBkZXRlY3QgY29ycmVzcG9uZGluZyB2YWx1ZXMgcHJvcGVybHkgaW4gY2FzZSB0aGVcbi8vIHR5cGUgaXMgYSBzdHJpbmcsIG51bWJlciwgYmlnaW50IG9yIGJvb2xlYW4uIFRoZSByZWFzb24gaXMgdGhhdCB0aG9zZSB2YWx1ZXNcbi8vIGNhbiBtYXRjaCBsb3RzIG9mIGRpZmZlcmVudCBzdHJpbmcgdmFsdWVzIChlLmcuLCAxbiA9PSAnKzAwMDAxJykuXG5mdW5jdGlvbiBmaW5kTG9vc2VNYXRjaGluZ1ByaW1pdGl2ZXMocHJpbSkge1xuICBzd2l0Y2ggKF90eXBlb2YocHJpbSkpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIC8vIE9ubHkgcGFzcyBpbiBudWxsIGFzIG9iamVjdCFcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcHJpbSA9ICtwcmltO1xuICAgIC8vIExvb3NlIGVxdWFsIGVudHJpZXMgZXhpc3Qgb25seSBpZiB0aGUgc3RyaW5nIGlzIHBvc3NpYmxlIHRvIGNvbnZlcnQgdG9cbiAgICAvLyBhIHJlZ3VsYXIgbnVtYmVyIGFuZCBub3QgTmFOLlxuICAgIC8vIEZhbGwgdGhyb3VnaFxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBpZiAobnVtYmVySXNOYU4ocHJpbSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gc2V0TWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIHByaW0pIHtcbiAgdmFyIGFsdFZhbHVlID0gZmluZExvb3NlTWF0Y2hpbmdQcmltaXRpdmVzKHByaW0pO1xuICBpZiAoYWx0VmFsdWUgIT0gbnVsbCkgcmV0dXJuIGFsdFZhbHVlO1xuICByZXR1cm4gYi5oYXMoYWx0VmFsdWUpICYmICFhLmhhcyhhbHRWYWx1ZSk7XG59XG5mdW5jdGlvbiBtYXBNaWdodEhhdmVMb29zZVByaW0oYSwgYiwgcHJpbSwgaXRlbSwgbWVtbykge1xuICB2YXIgYWx0VmFsdWUgPSBmaW5kTG9vc2VNYXRjaGluZ1ByaW1pdGl2ZXMocHJpbSk7XG4gIGlmIChhbHRWYWx1ZSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGFsdFZhbHVlO1xuICB9XG4gIHZhciBjdXJCID0gYi5nZXQoYWx0VmFsdWUpO1xuICBpZiAoY3VyQiA9PT0gdW5kZWZpbmVkICYmICFiLmhhcyhhbHRWYWx1ZSkgfHwgIWlubmVyRGVlcEVxdWFsKGl0ZW0sIGN1ckIsIGZhbHNlLCBtZW1vKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gIWEuaGFzKGFsdFZhbHVlKSAmJiBpbm5lckRlZXBFcXVhbChpdGVtLCBjdXJCLCBmYWxzZSwgbWVtbyk7XG59XG5mdW5jdGlvbiBzZXRFcXVpdihhLCBiLCBzdHJpY3QsIG1lbW8pIHtcbiAgLy8gVGhpcyBpcyBhIGxhemlseSBpbml0aWF0ZWQgU2V0IG9mIGVudHJpZXMgd2hpY2ggaGF2ZSB0byBiZSBjb21wYXJlZFxuICAvLyBwYWlyd2lzZS5cbiAgdmFyIHNldCA9IG51bGw7XG4gIHZhciBhVmFsdWVzID0gYXJyYXlGcm9tU2V0KGEpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdmFsID0gYVZhbHVlc1tpXTtcbiAgICAvLyBOb3RlOiBDaGVja2luZyBmb3IgdGhlIG9iamVjdHMgZmlyc3QgaW1wcm92ZXMgdGhlIHBlcmZvcm1hbmNlIGZvciBvYmplY3RcbiAgICAvLyBoZWF2eSBzZXRzIGJ1dCBpdCBpcyBhIG1pbm9yIHNsb3cgZG93biBmb3IgcHJpbWl0aXZlcy4gQXMgdGhleSBhcmUgZmFzdFxuICAgIC8vIHRvIGNoZWNrIHRoaXMgaW1wcm92ZXMgdGhlIHdvcnN0IGNhc2Ugc2NlbmFyaW8gaW5zdGVhZC5cbiAgICBpZiAoX3R5cGVvZih2YWwpID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwpIHtcbiAgICAgIGlmIChzZXQgPT09IG51bGwpIHtcbiAgICAgICAgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgfVxuICAgICAgLy8gSWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBkb2Vzbid0IGV4aXN0IGluIHRoZSBzZWNvbmQgc2V0IGl0cyBhbiBub3QgbnVsbFxuICAgICAgLy8gb2JqZWN0IChvciBub24gc3RyaWN0IG9ubHk6IGEgbm90IG1hdGNoaW5nIHByaW1pdGl2ZSkgd2UnbGwgbmVlZCB0byBnb1xuICAgICAgLy8gaHVudGluZyBmb3Igc29tZXRoaW5nIHRoYXRzIGRlZXAtKHN0cmljdC0pZXF1YWwgdG8gaXQuIFRvIG1ha2UgdGhpc1xuICAgICAgLy8gTyhuIGxvZyBuKSBjb21wbGV4aXR5IHdlIGhhdmUgdG8gY29weSB0aGVzZSB2YWx1ZXMgaW4gYSBuZXcgc2V0IGZpcnN0LlxuICAgICAgc2V0LmFkZCh2YWwpO1xuICAgIH0gZWxzZSBpZiAoIWIuaGFzKHZhbCkpIHtcbiAgICAgIGlmIChzdHJpY3QpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gRmFzdCBwYXRoIHRvIGRldGVjdCBtaXNzaW5nIHN0cmluZywgc3ltYm9sLCB1bmRlZmluZWQgYW5kIG51bGwgdmFsdWVzLlxuICAgICAgaWYgKCFzZXRNaWdodEhhdmVMb29zZVByaW0oYSwgYiwgdmFsKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoc2V0ID09PSBudWxsKSB7XG4gICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgIH1cbiAgICAgIHNldC5hZGQodmFsKTtcbiAgICB9XG4gIH1cbiAgaWYgKHNldCAhPT0gbnVsbCkge1xuICAgIHZhciBiVmFsdWVzID0gYXJyYXlGcm9tU2V0KGIpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBiVmFsdWVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF92YWwgPSBiVmFsdWVzW19pXTtcbiAgICAgIC8vIFdlIGhhdmUgdG8gY2hlY2sgaWYgYSBwcmltaXRpdmUgdmFsdWUgaXMgYWxyZWFkeVxuICAgICAgLy8gbWF0Y2hpbmcgYW5kIG9ubHkgaWYgaXQncyBub3QsIGdvIGh1bnRpbmcgZm9yIGl0LlxuICAgICAgaWYgKF90eXBlb2YoX3ZhbCkgPT09ICdvYmplY3QnICYmIF92YWwgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKCFzZXRIYXNFcXVhbEVsZW1lbnQoc2V0LCBfdmFsLCBzdHJpY3QsIG1lbW8pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgIWEuaGFzKF92YWwpICYmICFzZXRIYXNFcXVhbEVsZW1lbnQoc2V0LCBfdmFsLCBzdHJpY3QsIG1lbW8pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNldC5zaXplID09PSAwO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gbWFwSGFzRXF1YWxFbnRyeShzZXQsIG1hcCwga2V5MSwgaXRlbTEsIHN0cmljdCwgbWVtbykge1xuICAvLyBUbyBiZSBhYmxlIHRvIGhhbmRsZSBjYXNlcyBsaWtlOlxuICAvLyAgIE1hcChbW3t9LCAnYSddLCBbe30sICdiJ11dKSB2cyBNYXAoW1t7fSwgJ2InXSwgW3t9LCAnYSddXSlcbiAgLy8gLi4uIHdlIG5lZWQgdG8gY29uc2lkZXIgKmFsbCogbWF0Y2hpbmcga2V5cywgbm90IGp1c3QgdGhlIGZpcnN0IHdlIGZpbmQuXG4gIHZhciBzZXRWYWx1ZXMgPSBhcnJheUZyb21TZXQoc2V0KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5MiA9IHNldFZhbHVlc1tpXTtcbiAgICBpZiAoaW5uZXJEZWVwRXF1YWwoa2V5MSwga2V5Miwgc3RyaWN0LCBtZW1vKSAmJiBpbm5lckRlZXBFcXVhbChpdGVtMSwgbWFwLmdldChrZXkyKSwgc3RyaWN0LCBtZW1vKSkge1xuICAgICAgc2V0LmRlbGV0ZShrZXkyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBtYXBFcXVpdihhLCBiLCBzdHJpY3QsIG1lbW8pIHtcbiAgdmFyIHNldCA9IG51bGw7XG4gIHZhciBhRW50cmllcyA9IGFycmF5RnJvbU1hcChhKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhRW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBfYUVudHJpZXMkaSA9IF9zbGljZWRUb0FycmF5KGFFbnRyaWVzW2ldLCAyKSxcbiAgICAgIGtleSA9IF9hRW50cmllcyRpWzBdLFxuICAgICAgaXRlbTEgPSBfYUVudHJpZXMkaVsxXTtcbiAgICBpZiAoX3R5cGVvZihrZXkpID09PSAnb2JqZWN0JyAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgIGlmIChzZXQgPT09IG51bGwpIHtcbiAgICAgICAgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgfVxuICAgICAgc2V0LmFkZChrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBCeSBkaXJlY3RseSByZXRyaWV2aW5nIHRoZSB2YWx1ZSB3ZSBwcmV2ZW50IGFub3RoZXIgYi5oYXMoa2V5KSBjaGVjayBpblxuICAgICAgLy8gYWxtb3N0IGFsbCBwb3NzaWJsZSBjYXNlcy5cbiAgICAgIHZhciBpdGVtMiA9IGIuZ2V0KGtleSk7XG4gICAgICBpZiAoaXRlbTIgPT09IHVuZGVmaW5lZCAmJiAhYi5oYXMoa2V5KSB8fCAhaW5uZXJEZWVwRXF1YWwoaXRlbTEsIGl0ZW0yLCBzdHJpY3QsIG1lbW8pKSB7XG4gICAgICAgIGlmIChzdHJpY3QpIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gRmFzdCBwYXRoIHRvIGRldGVjdCBtaXNzaW5nIHN0cmluZywgc3ltYm9sLCB1bmRlZmluZWQgYW5kIG51bGxcbiAgICAgICAgLy8ga2V5cy5cbiAgICAgICAgaWYgKCFtYXBNaWdodEhhdmVMb29zZVByaW0oYSwgYiwga2V5LCBpdGVtMSwgbWVtbykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHNldCA9PT0gbnVsbCkge1xuICAgICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBzZXQuYWRkKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChzZXQgIT09IG51bGwpIHtcbiAgICB2YXIgYkVudHJpZXMgPSBhcnJheUZyb21NYXAoYik7XG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgYkVudHJpZXMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIF9iRW50cmllcyRfaSA9IF9zbGljZWRUb0FycmF5KGJFbnRyaWVzW19pMl0sIDIpLFxuICAgICAgICBfa2V5ID0gX2JFbnRyaWVzJF9pWzBdLFxuICAgICAgICBpdGVtID0gX2JFbnRyaWVzJF9pWzFdO1xuICAgICAgaWYgKF90eXBlb2YoX2tleSkgPT09ICdvYmplY3QnICYmIF9rZXkgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKCFtYXBIYXNFcXVhbEVudHJ5KHNldCwgYSwgX2tleSwgaXRlbSwgc3RyaWN0LCBtZW1vKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmICghYS5oYXMoX2tleSkgfHwgIWlubmVyRGVlcEVxdWFsKGEuZ2V0KF9rZXkpLCBpdGVtLCBmYWxzZSwgbWVtbykpICYmICFtYXBIYXNFcXVhbEVudHJ5KHNldCwgYSwgX2tleSwgaXRlbSwgZmFsc2UsIG1lbW8pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNldC5zaXplID09PSAwO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgc3RyaWN0LCBrZXlzLCBtZW1vcywgaXRlcmF0aW9uVHlwZSkge1xuICAvLyBTZXRzIGFuZCBtYXBzIGRvbid0IGhhdmUgdGhlaXIgZW50cmllcyBhY2Nlc3NpYmxlIHZpYSBub3JtYWwgb2JqZWN0XG4gIC8vIHByb3BlcnRpZXMuXG4gIHZhciBpID0gMDtcbiAgaWYgKGl0ZXJhdGlvblR5cGUgPT09IGtJc1NldCkge1xuICAgIGlmICghc2V0RXF1aXYoYSwgYiwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXRlcmF0aW9uVHlwZSA9PT0ga0lzTWFwKSB7XG4gICAgaWYgKCFtYXBFcXVpdihhLCBiLCBzdHJpY3QsIG1lbW9zKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpdGVyYXRpb25UeXBlID09PSBrSXNBcnJheSkge1xuICAgIGZvciAoOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5KGEsIGkpKSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcGVydHkoYiwgaSkgfHwgIWlubmVyRGVlcEVxdWFsKGFbaV0sIGJbaV0sIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KGIsIGkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFycmF5IGlzIHNwYXJzZS5cbiAgICAgICAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMoYSk7XG4gICAgICAgIGZvciAoOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c0FbaV07XG4gICAgICAgICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShiLCBrZXkpIHx8ICFpbm5lckRlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleXNBLmxlbmd0aCAhPT0gT2JqZWN0LmtleXMoYikubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFRoZSBwYWlyIG11c3QgaGF2ZSBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXkuXG4gIC8vIFBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3Q6XG4gIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIF9rZXkyID0ga2V5c1tpXTtcbiAgICBpZiAoIWlubmVyRGVlcEVxdWFsKGFbX2tleTJdLCBiW19rZXkyXSwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBpc0RlZXBFcXVhbCh2YWwxLCB2YWwyKSB7XG4gIHJldHVybiBpbm5lckRlZXBFcXVhbCh2YWwxLCB2YWwyLCBrTG9vc2UpO1xufVxuZnVuY3Rpb24gaXNEZWVwU3RyaWN0RXF1YWwodmFsMSwgdmFsMikge1xuICByZXR1cm4gaW5uZXJEZWVwRXF1YWwodmFsMSwgdmFsMiwga1N0cmljdCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNEZWVwRXF1YWw6IGlzRGVlcEVxdWFsLFxuICBpc0RlZXBTdHJpY3RFcXVhbDogaXNEZWVwU3RyaWN0RXF1YWxcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcG9zc2libGVOYW1lcyA9IHJlcXVpcmUoJ3Bvc3NpYmxlLXR5cGVkLWFycmF5LW5hbWVzJyk7XG5cbnZhciBnID0gdHlwZW9mIGdsb2JhbFRoaXMgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogZ2xvYmFsVGhpcztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXZhaWxhYmxlVHlwZWRBcnJheXMoKSB7XG5cdHZhciAvKiogQHR5cGUge1JldHVyblR5cGU8dHlwZW9mIGF2YWlsYWJsZVR5cGVkQXJyYXlzPn0gKi8gb3V0ID0gW107XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcG9zc2libGVOYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICh0eXBlb2YgZ1twb3NzaWJsZU5hbWVzW2ldXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdFx0b3V0W291dC5sZW5ndGhdID0gcG9zc2libGVOYW1lc1tpXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG91dDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xuXG52YXIgJGFwcGx5ID0gcmVxdWlyZSgnLi9mdW5jdGlvbkFwcGx5Jyk7XG52YXIgJGNhbGwgPSByZXF1aXJlKCcuL2Z1bmN0aW9uQ2FsbCcpO1xudmFyICRyZWZsZWN0QXBwbHkgPSByZXF1aXJlKCcuL3JlZmxlY3RBcHBseScpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9hY3R1YWxBcHBseScpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSAkcmVmbGVjdEFwcGx5IHx8IGJpbmQuY2FsbCgkY2FsbCwgJGFwcGx5KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgJGFwcGx5ID0gcmVxdWlyZSgnLi9mdW5jdGlvbkFwcGx5Jyk7XG52YXIgYWN0dWFsQXBwbHkgPSByZXF1aXJlKCcuL2FjdHVhbEFwcGx5Jyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2FwcGx5QmluZCcpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcHBseUJpbmQoKSB7XG5cdHJldHVybiBhY3R1YWxBcHBseShiaW5kLCAkYXBwbHksIGFyZ3VtZW50cyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9mdW5jdGlvbkFwcGx5Jyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vZnVuY3Rpb25DYWxsJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciAkVHlwZUVycm9yID0gcmVxdWlyZSgnZXMtZXJyb3JzL3R5cGUnKTtcblxudmFyICRjYWxsID0gcmVxdWlyZSgnLi9mdW5jdGlvbkNhbGwnKTtcbnZhciAkYWN0dWFsQXBwbHkgPSByZXF1aXJlKCcuL2FjdHVhbEFwcGx5Jyk7XG5cbi8qKiBAdHlwZSB7KGFyZ3M6IFtGdW5jdGlvbiwgdGhpc0FyZz86IHVua25vd24sIC4uLmFyZ3M6IHVua25vd25bXV0pID0+IEZ1bmN0aW9ufSBUT0RPIEZJWE1FLCBmaW5kIGEgd2F5IHRvIHVzZSBpbXBvcnQoJy4nKSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQmluZEJhc2ljKGFyZ3MpIHtcblx0aWYgKGFyZ3MubGVuZ3RoIDwgMSB8fCB0eXBlb2YgYXJnc1swXSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdhIGZ1bmN0aW9uIGlzIHJlcXVpcmVkJyk7XG5cdH1cblx0cmV0dXJuICRhY3R1YWxBcHBseShiaW5kLCAkY2FsbCwgYXJncyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9yZWZsZWN0QXBwbHknKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIFJlZmxlY3QgJiYgUmVmbGVjdC5hcHBseTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnLi8nKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJpbmQoR2V0SW50cmluc2ljKCdTdHJpbmcucHJvdG90eXBlLmluZGV4T2YnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljID0gR2V0SW50cmluc2ljKG5hbWUsICEhYWxsb3dNaXNzaW5nKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykgPiAtMSkge1xuXHRcdHJldHVybiBjYWxsQmluZChpbnRyaW5zaWMpO1xuXHR9XG5cdHJldHVybiBpbnRyaW5zaWM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2V0RnVuY3Rpb25MZW5ndGggPSByZXF1aXJlKCdzZXQtZnVuY3Rpb24tbGVuZ3RoJyk7XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCdlcy1kZWZpbmUtcHJvcGVydHknKTtcblxudmFyIGNhbGxCaW5kQmFzaWMgPSByZXF1aXJlKCdjYWxsLWJpbmQtYXBwbHktaGVscGVycycpO1xudmFyIGFwcGx5QmluZCA9IHJlcXVpcmUoJ2NhbGwtYmluZC1hcHBseS1oZWxwZXJzL2FwcGx5QmluZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGxCaW5kKG9yaWdpbmFsRnVuY3Rpb24pIHtcblx0dmFyIGZ1bmMgPSBjYWxsQmluZEJhc2ljKGFyZ3VtZW50cyk7XG5cdHZhciBhZGp1c3RlZExlbmd0aCA9IG9yaWdpbmFsRnVuY3Rpb24ubGVuZ3RoIC0gKGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcblx0cmV0dXJuIHNldEZ1bmN0aW9uTGVuZ3RoKFxuXHRcdGZ1bmMsXG5cdFx0MSArIChhZGp1c3RlZExlbmd0aCA+IDAgPyBhZGp1c3RlZExlbmd0aCA6IDApLFxuXHRcdHRydWVcblx0KTtcbn07XG5cbmlmICgkZGVmaW5lUHJvcGVydHkpIHtcblx0JGRlZmluZVByb3BlcnR5KG1vZHVsZS5leHBvcnRzLCAnYXBwbHknLCB7IHZhbHVlOiBhcHBseUJpbmQgfSk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cy5hcHBseSA9IGFwcGx5QmluZDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyIGNhbGxCaW5kQmFzaWMgPSByZXF1aXJlKCdjYWxsLWJpbmQtYXBwbHktaGVscGVycycpO1xuXG4vKiogQHR5cGUgeyh0aGlzQXJnOiBzdHJpbmcsIHNlYXJjaFN0cmluZzogc3RyaW5nLCBwb3NpdGlvbj86IG51bWJlcikgPT4gbnVtYmVyfSAqL1xudmFyICRpbmRleE9mID0gY2FsbEJpbmRCYXNpYyhbR2V0SW50cmluc2ljKCclU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mJScpXSk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGxCb3VuZEludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0LyogZXNsaW50IG5vLWV4dHJhLXBhcmVuczogMCAqL1xuXG5cdHZhciBpbnRyaW5zaWMgPSAvKiogQHR5cGUgeyh0aGlzOiB1bmtub3duLCAuLi5hcmdzOiB1bmtub3duW10pID0+IHVua25vd259ICovIChHZXRJbnRyaW5zaWMobmFtZSwgISFhbGxvd01pc3NpbmcpKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykgPiAtMSkge1xuXHRcdHJldHVybiBjYWxsQmluZEJhc2ljKC8qKiBAdHlwZSB7Y29uc3R9ICovIChbaW50cmluc2ljXSkpO1xuXHR9XG5cdHJldHVybiBpbnRyaW5zaWM7XG59O1xuIiwiLypnbG9iYWwgd2luZG93LCBnbG9iYWwqL1xudmFyIHV0aWwgPSByZXF1aXJlKFwidXRpbFwiKVxudmFyIGFzc2VydCA9IHJlcXVpcmUoXCJhc3NlcnRcIilcbmZ1bmN0aW9uIG5vdygpIHsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpIH1cblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG52YXIgY29uc29sZVxudmFyIHRpbWVzID0ge31cblxuaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNvbnNvbGUpIHtcbiAgICBjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGVcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuY29uc29sZSkge1xuICAgIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZVxufSBlbHNlIHtcbiAgICBjb25zb2xlID0ge31cbn1cblxudmFyIGZ1bmN0aW9ucyA9IFtcbiAgICBbbG9nLCBcImxvZ1wiXSxcbiAgICBbaW5mbywgXCJpbmZvXCJdLFxuICAgIFt3YXJuLCBcIndhcm5cIl0sXG4gICAgW2Vycm9yLCBcImVycm9yXCJdLFxuICAgIFt0aW1lLCBcInRpbWVcIl0sXG4gICAgW3RpbWVFbmQsIFwidGltZUVuZFwiXSxcbiAgICBbdHJhY2UsIFwidHJhY2VcIl0sXG4gICAgW2RpciwgXCJkaXJcIl0sXG4gICAgW2NvbnNvbGVBc3NlcnQsIFwiYXNzZXJ0XCJdXG5dXG5cbmZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHR1cGxlID0gZnVuY3Rpb25zW2ldXG4gICAgdmFyIGYgPSB0dXBsZVswXVxuICAgIHZhciBuYW1lID0gdHVwbGVbMV1cblxuICAgIGlmICghY29uc29sZVtuYW1lXSkge1xuICAgICAgICBjb25zb2xlW25hbWVdID0gZlxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25zb2xlXG5cbmZ1bmN0aW9uIGxvZygpIHt9XG5cbmZ1bmN0aW9uIGluZm8oKSB7XG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKVxufVxuXG5mdW5jdGlvbiB3YXJuKCkge1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcbn1cblxuZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcbn1cblxuZnVuY3Rpb24gdGltZShsYWJlbCkge1xuICAgIHRpbWVzW2xhYmVsXSA9IG5vdygpXG59XG5cbmZ1bmN0aW9uIHRpbWVFbmQobGFiZWwpIHtcbiAgICB2YXIgdGltZSA9IHRpbWVzW2xhYmVsXVxuICAgIGlmICghdGltZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsOiBcIiArIGxhYmVsKVxuICAgIH1cblxuICAgIGRlbGV0ZSB0aW1lc1tsYWJlbF1cbiAgICB2YXIgZHVyYXRpb24gPSBub3coKSAtIHRpbWVcbiAgICBjb25zb2xlLmxvZyhsYWJlbCArIFwiOiBcIiArIGR1cmF0aW9uICsgXCJtc1wiKVxufVxuXG5mdW5jdGlvbiB0cmFjZSgpIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKClcbiAgICBlcnIubmFtZSA9IFwiVHJhY2VcIlxuICAgIGVyci5tZXNzYWdlID0gdXRpbC5mb3JtYXQuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKVxufVxuXG5mdW5jdGlvbiBkaXIob2JqZWN0KSB7XG4gICAgY29uc29sZS5sb2codXRpbC5pbnNwZWN0KG9iamVjdCkgKyBcIlxcblwiKVxufVxuXG5mdW5jdGlvbiBjb25zb2xlQXNzZXJ0KGV4cHJlc3Npb24pIHtcbiAgICBpZiAoIWV4cHJlc3Npb24pIHtcbiAgICAgICAgdmFyIGFyciA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICAgICBhc3NlcnQub2soZmFsc2UsIHV0aWwuZm9ybWF0LmFwcGx5KG51bGwsIGFycikpXG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnZXMtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbnZhciAkU3ludGF4RXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvc3ludGF4Jyk7XG52YXIgJFR5cGVFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy90eXBlJyk7XG5cbnZhciBnb3BkID0gcmVxdWlyZSgnZ29wZCcpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVEYXRhUHJvcGVydHkoXG5cdG9iaixcblx0cHJvcGVydHksXG5cdHZhbHVlXG4pIHtcblx0aWYgKCFvYmogfHwgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmogIT09ICdmdW5jdGlvbicpKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2BvYmpgIG11c3QgYmUgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb25gJyk7XG5cdH1cblx0aWYgKHR5cGVvZiBwcm9wZXJ0eSAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIHByb3BlcnR5ICE9PSAnc3ltYm9sJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgcHJvcGVydHlgIG11c3QgYmUgYSBzdHJpbmcgb3IgYSBzeW1ib2xgJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIHR5cGVvZiBhcmd1bWVudHNbM10gIT09ICdib29sZWFuJyAmJiBhcmd1bWVudHNbM10gIT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYG5vbkVudW1lcmFibGVgLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBhIGJvb2xlYW4gb3IgbnVsbCcpO1xuXHR9XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gNCAmJiB0eXBlb2YgYXJndW1lbnRzWzRdICE9PSAnYm9vbGVhbicgJiYgYXJndW1lbnRzWzRdICE9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2Bub25Xcml0YWJsZWAsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGEgYm9vbGVhbiBvciBudWxsJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiA1ICYmIHR5cGVvZiBhcmd1bWVudHNbNV0gIT09ICdib29sZWFuJyAmJiBhcmd1bWVudHNbNV0gIT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYG5vbkNvbmZpZ3VyYWJsZWAsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGEgYm9vbGVhbiBvciBudWxsJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiA2ICYmIHR5cGVvZiBhcmd1bWVudHNbNl0gIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgbG9vc2VgLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBhIGJvb2xlYW4nKTtcblx0fVxuXG5cdHZhciBub25FbnVtZXJhYmxlID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgPyBhcmd1bWVudHNbM10gOiBudWxsO1xuXHR2YXIgbm9uV3JpdGFibGUgPSBhcmd1bWVudHMubGVuZ3RoID4gNCA/IGFyZ3VtZW50c1s0XSA6IG51bGw7XG5cdHZhciBub25Db25maWd1cmFibGUgPSBhcmd1bWVudHMubGVuZ3RoID4gNSA/IGFyZ3VtZW50c1s1XSA6IG51bGw7XG5cdHZhciBsb29zZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA2ID8gYXJndW1lbnRzWzZdIDogZmFsc2U7XG5cblx0LyogQHR5cGUge2ZhbHNlIHwgVHlwZWRQcm9wZXJ0eURlc2NyaXB0b3I8dW5rbm93bj59ICovXG5cdHZhciBkZXNjID0gISFnb3BkICYmIGdvcGQob2JqLCBwcm9wZXJ0eSk7XG5cblx0aWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHRcdCRkZWZpbmVQcm9wZXJ0eShvYmosIHByb3BlcnR5LCB7XG5cdFx0XHRjb25maWd1cmFibGU6IG5vbkNvbmZpZ3VyYWJsZSA9PT0gbnVsbCAmJiBkZXNjID8gZGVzYy5jb25maWd1cmFibGUgOiAhbm9uQ29uZmlndXJhYmxlLFxuXHRcdFx0ZW51bWVyYWJsZTogbm9uRW51bWVyYWJsZSA9PT0gbnVsbCAmJiBkZXNjID8gZGVzYy5lbnVtZXJhYmxlIDogIW5vbkVudW1lcmFibGUsXG5cdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHR3cml0YWJsZTogbm9uV3JpdGFibGUgPT09IG51bGwgJiYgZGVzYyA/IGRlc2Mud3JpdGFibGUgOiAhbm9uV3JpdGFibGVcblx0XHR9KTtcblx0fSBlbHNlIGlmIChsb29zZSB8fCAoIW5vbkVudW1lcmFibGUgJiYgIW5vbldyaXRhYmxlICYmICFub25Db25maWd1cmFibGUpKSB7XG5cdFx0Ly8gbXVzdCBmYWxsIGJhY2sgdG8gW1tTZXRdXSwgYW5kIHdhcyBub3QgZXhwbGljaXRseSBhc2tlZCB0byBtYWtlIG5vbi1lbnVtZXJhYmxlLCBub24td3JpdGFibGUsIG9yIG5vbi1jb25maWd1cmFibGVcblx0XHRvYmpbcHJvcGVydHldID0gdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdUaGlzIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgZGVmaW5pbmcgYSBwcm9wZXJ0eSBhcyBub24tY29uZmlndXJhYmxlLCBub24td3JpdGFibGUsIG9yIG5vbi1lbnVtZXJhYmxlLicpO1xuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyA9IHJlcXVpcmUoJ29iamVjdC1rZXlzJyk7XG52YXIgaGFzU3ltYm9scyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbCgnZm9vJykgPT09ICdzeW1ib2wnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGNvbmNhdCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQ7XG52YXIgZGVmaW5lRGF0YVByb3BlcnR5ID0gcmVxdWlyZSgnZGVmaW5lLWRhdGEtcHJvcGVydHknKTtcblxudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4pIHtcblx0cmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0ci5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnZhciBzdXBwb3J0c0Rlc2NyaXB0b3JzID0gcmVxdWlyZSgnaGFzLXByb3BlcnR5LWRlc2NyaXB0b3JzJykoKTtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgdmFsdWUsIHByZWRpY2F0ZSkge1xuXHRpZiAobmFtZSBpbiBvYmplY3QpIHtcblx0XHRpZiAocHJlZGljYXRlID09PSB0cnVlKSB7XG5cdFx0XHRpZiAob2JqZWN0W25hbWVdID09PSB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICghaXNGdW5jdGlvbihwcmVkaWNhdGUpIHx8ICFwcmVkaWNhdGUoKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXG5cdGlmIChzdXBwb3J0c0Rlc2NyaXB0b3JzKSB7XG5cdFx0ZGVmaW5lRGF0YVByb3BlcnR5KG9iamVjdCwgbmFtZSwgdmFsdWUsIHRydWUpO1xuXHR9IGVsc2Uge1xuXHRcdGRlZmluZURhdGFQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHZhbHVlKTtcblx0fVxufTtcblxudmFyIGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqZWN0LCBtYXApIHtcblx0dmFyIHByZWRpY2F0ZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHt9O1xuXHR2YXIgcHJvcHMgPSBrZXlzKG1hcCk7XG5cdGlmIChoYXNTeW1ib2xzKSB7XG5cdFx0cHJvcHMgPSBjb25jYXQuY2FsbChwcm9wcywgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhtYXApKTtcblx0fVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0ZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wc1tpXSwgbWFwW3Byb3BzW2ldXSwgcHJlZGljYXRlc1twcm9wc1tpXV0pO1xuXHR9XG59O1xuXG5kZWZpbmVQcm9wZXJ0aWVzLnN1cHBvcnRzRGVzY3JpcHRvcnMgPSAhIXN1cHBvcnRzRGVzY3JpcHRvcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmaW5lUHJvcGVydGllcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kLWFwcGx5LWhlbHBlcnMnKTtcbnZhciBnT1BEID0gcmVxdWlyZSgnZ29wZCcpO1xuXG52YXIgaGFzUHJvdG9BY2Nlc3NvcjtcbnRyeSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnMsIG5vLXByb3RvXG5cdGhhc1Byb3RvQWNjZXNzb3IgPSAvKiogQHR5cGUge3sgX19wcm90b19fPzogdHlwZW9mIEFycmF5LnByb3RvdHlwZSB9fSAqLyAoW10pLl9fcHJvdG9fXyA9PT0gQXJyYXkucHJvdG90eXBlO1xufSBjYXRjaCAoZSkge1xuXHRpZiAoIWUgfHwgdHlwZW9mIGUgIT09ICdvYmplY3QnIHx8ICEoJ2NvZGUnIGluIGUpIHx8IGUuY29kZSAhPT0gJ0VSUl9QUk9UT19BQ0NFU1MnKSB7XG5cdFx0dGhyb3cgZTtcblx0fVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXG52YXIgZGVzYyA9ICEhaGFzUHJvdG9BY2Nlc3NvciAmJiBnT1BEICYmIGdPUEQoT2JqZWN0LnByb3RvdHlwZSwgLyoqIEB0eXBlIHtrZXlvZiB0eXBlb2YgT2JqZWN0LnByb3RvdHlwZX0gKi8gKCdfX3Byb3RvX18nKSk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyICRnZXRQcm90b3R5cGVPZiA9ICRPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2dldCcpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBkZXNjICYmIHR5cGVvZiBkZXNjLmdldCA9PT0gJ2Z1bmN0aW9uJ1xuXHQ/IGNhbGxCaW5kKFtkZXNjLmdldF0pXG5cdDogdHlwZW9mICRnZXRQcm90b3R5cGVPZiA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdD8gLyoqIEB0eXBlIHtpbXBvcnQoJy4vZ2V0Jyl9ICovIGZ1bmN0aW9uIGdldER1bmRlcih2YWx1ZSkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRcdFx0cmV0dXJuICRnZXRQcm90b3R5cGVPZih2YWx1ZSA9PSBudWxsID8gdmFsdWUgOiAkT2JqZWN0KHZhbHVlKSk7XG5cdFx0fVxuXHRcdDogZmFsc2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG52YXIgJGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5IHx8IGZhbHNlO1xuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdCRkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IHZhbHVlOiAxIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZGVmaW5lUHJvcGVydHlcblx0XHQkZGVmaW5lUHJvcGVydHkgPSBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9ICRkZWZpbmVQcm9wZXJ0eTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vZXZhbCcpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBFdmFsRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IEVycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9yYW5nZScpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBSYW5nZUVycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9yZWYnKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gUmVmZXJlbmNlRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL3N5bnRheCcpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBTeW50YXhFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vdHlwZScpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBUeXBlRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL3VyaScpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBVUklFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJ2lzLWNhbGxhYmxlJyk7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKiogQHR5cGUgezxUaGlzLCBBIGV4dGVuZHMgcmVhZG9ubHkgdW5rbm93bltdPihhcnI6IEEsIGl0ZXJhdG9yOiAodGhpczogVGhpcyB8IHZvaWQsIHZhbHVlOiBBW251bWJlcl0sIGluZGV4OiBudW1iZXIsIGFycjogQSkgPT4gdm9pZCwgcmVjZWl2ZXI6IFRoaXMgfCB1bmRlZmluZWQpID0+IHZvaWR9ICovXG52YXIgZm9yRWFjaEFycmF5ID0gZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksIGkpKSB7XG4gICAgICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKGFycmF5W2ldLCBpLCBhcnJheSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIGFycmF5W2ldLCBpLCBhcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKiogQHR5cGUgezxUaGlzLCBTIGV4dGVuZHMgc3RyaW5nPihzdHJpbmc6IFMsIGl0ZXJhdG9yOiAodGhpczogVGhpcyB8IHZvaWQsIHZhbHVlOiBTW251bWJlcl0sIGluZGV4OiBudW1iZXIsIHN0cmluZzogUykgPT4gdm9pZCwgcmVjZWl2ZXI6IFRoaXMgfCB1bmRlZmluZWQpID0+IHZvaWR9ICovXG52YXIgZm9yRWFjaFN0cmluZyA9IGZ1bmN0aW9uIGZvckVhY2hTdHJpbmcoc3RyaW5nLCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyaW5nLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIC8vIG5vIHN1Y2ggdGhpbmcgYXMgYSBzcGFyc2Ugc3RyaW5nLlxuICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgaXRlcmF0b3Ioc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIHN0cmluZy5jaGFyQXQoaSksIGksIHN0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKiogQHR5cGUgezxUaGlzLCBPPihvYmo6IE8sIGl0ZXJhdG9yOiAodGhpczogVGhpcyB8IHZvaWQsIHZhbHVlOiBPW2tleW9mIE9dLCBpbmRleDoga2V5b2YgTywgb2JqOiBPKSA9PiB2b2lkLCByZWNlaXZlcjogVGhpcyB8IHVuZGVmaW5lZCkgPT4gdm9pZH0gKi9cbnZhciBmb3JFYWNoT2JqZWN0ID0gZnVuY3Rpb24gZm9yRWFjaE9iamVjdChvYmplY3QsIGl0ZXJhdG9yLCByZWNlaXZlcikge1xuICAgIGZvciAodmFyIGsgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgaykpIHtcbiAgICAgICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3Iob2JqZWN0W2tdLCBrLCBvYmplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKHJlY2VpdmVyLCBvYmplY3Rba10sIGssIG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKiogQHR5cGUgeyh4OiB1bmtub3duKSA9PiB4IGlzIHJlYWRvbmx5IHVua25vd25bXX0gKi9cbmZ1bmN0aW9uIGlzQXJyYXkoeCkge1xuICAgIHJldHVybiB0b1N0ci5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpLl9pbnRlcm5hbH0gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9yRWFjaChsaXN0LCBpdGVyYXRvciwgdGhpc0FyZykge1xuICAgIGlmICghaXNDYWxsYWJsZShpdGVyYXRvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgdmFyIHJlY2VpdmVyO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIHtcbiAgICAgICAgcmVjZWl2ZXIgPSB0aGlzQXJnO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KGxpc3QpKSB7XG4gICAgICAgIGZvckVhY2hBcnJheShsaXN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZvckVhY2hTdHJpbmcobGlzdCwgaXRlcmF0b3IsIHJlY2VpdmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3JFYWNoT2JqZWN0KGxpc3QsIGl0ZXJhdG9yLCByZWNlaXZlcik7XG4gICAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IG5vLWludmFsaWQtdGhpczogMSAqL1xuXG52YXIgRVJST1JfTUVTU0FHRSA9ICdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBjYWxsZWQgb24gaW5jb21wYXRpYmxlICc7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIGZ1bmNUeXBlID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxudmFyIGNvbmNhdHR5ID0gZnVuY3Rpb24gY29uY2F0dHkoYSwgYikge1xuICAgIHZhciBhcnIgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhcnJbaV0gPSBhW2ldO1xuICAgIH1cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGIubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgYXJyW2ogKyBhLmxlbmd0aF0gPSBiW2pdO1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG59O1xuXG52YXIgc2xpY3kgPSBmdW5jdGlvbiBzbGljeShhcnJMaWtlLCBvZmZzZXQpIHtcbiAgICB2YXIgYXJyID0gW107XG4gICAgZm9yICh2YXIgaSA9IG9mZnNldCB8fCAwLCBqID0gMDsgaSA8IGFyckxpa2UubGVuZ3RoOyBpICs9IDEsIGogKz0gMSkge1xuICAgICAgICBhcnJbal0gPSBhcnJMaWtlW2ldO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xufTtcblxudmFyIGpvaW55ID0gZnVuY3Rpb24gKGFyciwgam9pbmVyKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHN0ciArPSBhcnJbaV07XG4gICAgICAgIGlmIChpICsgMSA8IGFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHN0ciArPSBqb2luZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZCh0aGF0KSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicgfHwgdG9TdHIuYXBwbHkodGFyZ2V0KSAhPT0gZnVuY1R5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihFUlJPUl9NRVNTQUdFICsgdGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBzbGljeShhcmd1bWVudHMsIDEpO1xuXG4gICAgdmFyIGJvdW5kO1xuICAgIHZhciBiaW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYm91bmQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICBjb25jYXR0eShhcmdzLCBhcmd1bWVudHMpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKE9iamVjdChyZXN1bHQpID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhcmdldC5hcHBseShcbiAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICBjb25jYXR0eShhcmdzLCBhcmd1bWVudHMpXG4gICAgICAgICk7XG5cbiAgICB9O1xuXG4gICAgdmFyIGJvdW5kTGVuZ3RoID0gbWF4KDAsIHRhcmdldC5sZW5ndGggLSBhcmdzLmxlbmd0aCk7XG4gICAgdmFyIGJvdW5kQXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRMZW5ndGg7IGkrKykge1xuICAgICAgICBib3VuZEFyZ3NbaV0gPSAnJCcgKyBpO1xuICAgIH1cblxuICAgIGJvdW5kID0gRnVuY3Rpb24oJ2JpbmRlcicsICdyZXR1cm4gZnVuY3Rpb24gKCcgKyBqb2lueShib3VuZEFyZ3MsICcsJykgKyAnKXsgcmV0dXJuIGJpbmRlci5hcHBseSh0aGlzLGFyZ3VtZW50cyk7IH0nKShiaW5kZXIpO1xuXG4gICAgaWYgKHRhcmdldC5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIEVtcHR5ID0gZnVuY3Rpb24gRW1wdHkoKSB7fTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgYm91bmQucHJvdG90eXBlID0gbmV3IEVtcHR5KCk7XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIHx8IGltcGxlbWVudGF0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zLCBuby1lbXB0eS1mdW5jdGlvblxuY29uc3QgY2FjaGVkID0gLyoqIEB0eXBlIHtHZW5lcmF0b3JGdW5jdGlvbkNvbnN0cnVjdG9yfSAqLyAoZnVuY3Rpb24qICgpIHt9LmNvbnN0cnVjdG9yKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4gY2FjaGVkO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1bmRlZmluZWQ7XG5cbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnZXMtb2JqZWN0LWF0b21zJyk7XG5cbnZhciAkRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMnKTtcbnZhciAkRXZhbEVycm9yID0gcmVxdWlyZSgnZXMtZXJyb3JzL2V2YWwnKTtcbnZhciAkUmFuZ2VFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy9yYW5nZScpO1xudmFyICRSZWZlcmVuY2VFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy9yZWYnKTtcbnZhciAkU3ludGF4RXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvc3ludGF4Jyk7XG52YXIgJFR5cGVFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy90eXBlJyk7XG52YXIgJFVSSUVycm9yID0gcmVxdWlyZSgnZXMtZXJyb3JzL3VyaScpO1xuXG52YXIgYWJzID0gcmVxdWlyZSgnbWF0aC1pbnRyaW5zaWNzL2FicycpO1xudmFyIGZsb29yID0gcmVxdWlyZSgnbWF0aC1pbnRyaW5zaWNzL2Zsb29yJyk7XG52YXIgbWF4ID0gcmVxdWlyZSgnbWF0aC1pbnRyaW5zaWNzL21heCcpO1xudmFyIG1pbiA9IHJlcXVpcmUoJ21hdGgtaW50cmluc2ljcy9taW4nKTtcbnZhciBwb3cgPSByZXF1aXJlKCdtYXRoLWludHJpbnNpY3MvcG93Jyk7XG52YXIgcm91bmQgPSByZXF1aXJlKCdtYXRoLWludHJpbnNpY3Mvcm91bmQnKTtcbnZhciBzaWduID0gcmVxdWlyZSgnbWF0aC1pbnRyaW5zaWNzL3NpZ24nKTtcblxudmFyICRGdW5jdGlvbiA9IEZ1bmN0aW9uO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbnZhciBnZXRFdmFsbGVkQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvblN5bnRheCkge1xuXHR0cnkge1xuXHRcdHJldHVybiAkRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOyByZXR1cm4gKCcgKyBleHByZXNzaW9uU3ludGF4ICsgJykuY29uc3RydWN0b3I7JykoKTtcblx0fSBjYXRjaCAoZSkge31cbn07XG5cbnZhciAkZ09QRCA9IHJlcXVpcmUoJ2dvcGQnKTtcbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCdlcy1kZWZpbmUtcHJvcGVydHknKTtcblxudmFyIHRocm93VHlwZUVycm9yID0gZnVuY3Rpb24gKCkge1xuXHR0aHJvdyBuZXcgJFR5cGVFcnJvcigpO1xufTtcbnZhciBUaHJvd1R5cGVFcnJvciA9ICRnT1BEXG5cdD8gKGZ1bmN0aW9uICgpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tY2FsbGVyLCBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcblx0XHRcdGFyZ3VtZW50cy5jYWxsZWU7IC8vIElFIDggZG9lcyBub3QgdGhyb3cgaGVyZVxuXHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdH0gY2F0Y2ggKGNhbGxlZVRocm93cykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gSUUgOCB0aHJvd3Mgb24gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhcmd1bWVudHMsICcnKVxuXHRcdFx0XHRyZXR1cm4gJGdPUEQoYXJndW1lbnRzLCAnY2FsbGVlJykuZ2V0O1xuXHRcdFx0fSBjYXRjaCAoZ09QRHRocm93cykge1xuXHRcdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KCkpXG5cdDogdGhyb3dUeXBlRXJyb3I7XG5cbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xuXG52YXIgZ2V0UHJvdG8gPSByZXF1aXJlKCdnZXQtcHJvdG8nKTtcbnZhciAkT2JqZWN0R1BPID0gcmVxdWlyZSgnZ2V0LXByb3RvL09iamVjdC5nZXRQcm90b3R5cGVPZicpO1xudmFyICRSZWZsZWN0R1BPID0gcmVxdWlyZSgnZ2V0LXByb3RvL1JlZmxlY3QuZ2V0UHJvdG90eXBlT2YnKTtcblxudmFyICRhcHBseSA9IHJlcXVpcmUoJ2NhbGwtYmluZC1hcHBseS1oZWxwZXJzL2Z1bmN0aW9uQXBwbHknKTtcbnZhciAkY2FsbCA9IHJlcXVpcmUoJ2NhbGwtYmluZC1hcHBseS1oZWxwZXJzL2Z1bmN0aW9uQ2FsbCcpO1xuXG52YXIgbmVlZHNFdmFsID0ge307XG5cbnZhciBUeXBlZEFycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnIHx8ICFnZXRQcm90byA/IHVuZGVmaW5lZCA6IGdldFByb3RvKFVpbnQ4QXJyYXkpO1xuXG52YXIgSU5UUklOU0lDUyA9IHtcblx0X19wcm90b19fOiBudWxsLFxuXHQnJUFnZ3JlZ2F0ZUVycm9yJSc6IHR5cGVvZiBBZ2dyZWdhdGVFcnJvciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBZ2dyZWdhdGVFcnJvcixcblx0JyVBcnJheSUnOiBBcnJheSxcblx0JyVBcnJheUJ1ZmZlciUnOiB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXJyYXlCdWZmZXIsXG5cdCclQXJyYXlJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzICYmIGdldFByb3RvID8gZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Zyb21TeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IG5lZWRzRXZhbCxcblx0JyVBdG9taWNzJSc6IHR5cGVvZiBBdG9taWNzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEF0b21pY3MsXG5cdCclQmlnSW50JSc6IHR5cGVvZiBCaWdJbnQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnSW50LFxuXHQnJUJpZ0ludDY0QXJyYXklJzogdHlwZW9mIEJpZ0ludDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnSW50NjRBcnJheSxcblx0JyVCaWdVaW50NjRBcnJheSUnOiB0eXBlb2YgQmlnVWludDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnVWludDY0QXJyYXksXG5cdCclQm9vbGVhbiUnOiBCb29sZWFuLFxuXHQnJURhdGFWaWV3JSc6IHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBEYXRhVmlldyxcblx0JyVEYXRlJSc6IERhdGUsXG5cdCclZGVjb2RlVVJJJSc6IGRlY29kZVVSSSxcblx0JyVkZWNvZGVVUklDb21wb25lbnQlJzogZGVjb2RlVVJJQ29tcG9uZW50LFxuXHQnJWVuY29kZVVSSSUnOiBlbmNvZGVVUkksXG5cdCclZW5jb2RlVVJJQ29tcG9uZW50JSc6IGVuY29kZVVSSUNvbXBvbmVudCxcblx0JyVFcnJvciUnOiAkRXJyb3IsXG5cdCclZXZhbCUnOiBldmFsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcblx0JyVFdmFsRXJyb3IlJzogJEV2YWxFcnJvcixcblx0JyVGbG9hdDE2QXJyYXklJzogdHlwZW9mIEZsb2F0MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDE2QXJyYXksXG5cdCclRmxvYXQzMkFycmF5JSc6IHR5cGVvZiBGbG9hdDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQzMkFycmF5LFxuXHQnJUZsb2F0NjRBcnJheSUnOiB0eXBlb2YgRmxvYXQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0NjRBcnJheSxcblx0JyVGaW5hbGl6YXRpb25SZWdpc3RyeSUnOiB0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmluYWxpemF0aW9uUmVnaXN0cnksXG5cdCclRnVuY3Rpb24lJzogJEZ1bmN0aW9uLFxuXHQnJUdlbmVyYXRvckZ1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVJbnQ4QXJyYXklJzogdHlwZW9mIEludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXksXG5cdCclSW50MTZBcnJheSUnOiB0eXBlb2YgSW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQxNkFycmF5LFxuXHQnJUludDMyQXJyYXklJzogdHlwZW9mIEludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MzJBcnJheSxcblx0JyVpc0Zpbml0ZSUnOiBpc0Zpbml0ZSxcblx0JyVpc05hTiUnOiBpc05hTixcblx0JyVJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzICYmIGdldFByb3RvID8gZ2V0UHJvdG8oZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSkgOiB1bmRlZmluZWQsXG5cdCclSlNPTiUnOiB0eXBlb2YgSlNPTiA9PT0gJ29iamVjdCcgPyBKU09OIDogdW5kZWZpbmVkLFxuXHQnJU1hcCUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IE1hcCxcblx0JyVNYXBJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyB8fCAhZ2V0UHJvdG8gPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgTWFwKClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyVNYXRoJSc6IE1hdGgsXG5cdCclTnVtYmVyJSc6IE51bWJlcixcblx0JyVPYmplY3QlJzogJE9iamVjdCxcblx0JyVPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJSc6ICRnT1BELFxuXHQnJXBhcnNlRmxvYXQlJzogcGFyc2VGbG9hdCxcblx0JyVwYXJzZUludCUnOiBwYXJzZUludCxcblx0JyVQcm9taXNlJSc6IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb21pc2UsXG5cdCclUHJveHklJzogdHlwZW9mIFByb3h5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb3h5LFxuXHQnJVJhbmdlRXJyb3IlJzogJFJhbmdlRXJyb3IsXG5cdCclUmVmZXJlbmNlRXJyb3IlJzogJFJlZmVyZW5jZUVycm9yLFxuXHQnJVJlZmxlY3QlJzogdHlwZW9mIFJlZmxlY3QgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUmVmbGVjdCxcblx0JyVSZWdFeHAlJzogUmVnRXhwLFxuXHQnJVNldCUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNldCxcblx0JyVTZXRJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyB8fCAhZ2V0UHJvdG8gPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgU2V0KClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlciUnOiB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2hhcmVkQXJyYXlCdWZmZXIsXG5cdCclU3RyaW5nJSc6IFN0cmluZyxcblx0JyVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzICYmIGdldFByb3RvID8gZ2V0UHJvdG8oJydbU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVTeW1ib2wlJzogaGFzU3ltYm9scyA/IFN5bWJvbCA6IHVuZGVmaW5lZCxcblx0JyVTeW50YXhFcnJvciUnOiAkU3ludGF4RXJyb3IsXG5cdCclVGhyb3dUeXBlRXJyb3IlJzogVGhyb3dUeXBlRXJyb3IsXG5cdCclVHlwZWRBcnJheSUnOiBUeXBlZEFycmF5LFxuXHQnJVR5cGVFcnJvciUnOiAkVHlwZUVycm9yLFxuXHQnJVVpbnQ4QXJyYXklJzogdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhBcnJheSxcblx0JyVVaW50OENsYW1wZWRBcnJheSUnOiB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhDbGFtcGVkQXJyYXksXG5cdCclVWludDE2QXJyYXklJzogdHlwZW9mIFVpbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQxNkFycmF5LFxuXHQnJVVpbnQzMkFycmF5JSc6IHR5cGVvZiBVaW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MzJBcnJheSxcblx0JyVVUklFcnJvciUnOiAkVVJJRXJyb3IsXG5cdCclV2Vha01hcCUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLFxuXHQnJVdlYWtSZWYlJzogdHlwZW9mIFdlYWtSZWYgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1JlZixcblx0JyVXZWFrU2V0JSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXQsXG5cblx0JyVGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCUnOiAkY2FsbCxcblx0JyVGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHklJzogJGFwcGx5LFxuXHQnJU9iamVjdC5kZWZpbmVQcm9wZXJ0eSUnOiAkZGVmaW5lUHJvcGVydHksXG5cdCclT2JqZWN0LmdldFByb3RvdHlwZU9mJSc6ICRPYmplY3RHUE8sXG5cdCclTWF0aC5hYnMlJzogYWJzLFxuXHQnJU1hdGguZmxvb3IlJzogZmxvb3IsXG5cdCclTWF0aC5tYXglJzogbWF4LFxuXHQnJU1hdGgubWluJSc6IG1pbixcblx0JyVNYXRoLnBvdyUnOiBwb3csXG5cdCclTWF0aC5yb3VuZCUnOiByb3VuZCxcblx0JyVNYXRoLnNpZ24lJzogc2lnbixcblx0JyVSZWZsZWN0LmdldFByb3RvdHlwZU9mJSc6ICRSZWZsZWN0R1BPXG59O1xuXG5pZiAoZ2V0UHJvdG8pIHtcblx0dHJ5IHtcblx0XHRudWxsLmVycm9yOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtc2hhZG93cmVhbG0vcHVsbC8zODQjaXNzdWVjb21tZW50LTEzNjQyNjQyMjlcblx0XHR2YXIgZXJyb3JQcm90byA9IGdldFByb3RvKGdldFByb3RvKGUpKTtcblx0XHRJTlRSSU5TSUNTWyclRXJyb3IucHJvdG90eXBlJSddID0gZXJyb3JQcm90bztcblx0fVxufVxuXG52YXIgZG9FdmFsID0gZnVuY3Rpb24gZG9FdmFsKG5hbWUpIHtcblx0dmFyIHZhbHVlO1xuXHRpZiAobmFtZSA9PT0gJyVBc3luY0Z1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24gKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUdlbmVyYXRvckZ1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignZnVuY3Rpb24qICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24qICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0dlbmVyYXRvciUnKSB7XG5cdFx0dmFyIGZuID0gZG9FdmFsKCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnKTtcblx0XHRpZiAoZm4pIHtcblx0XHRcdHZhbHVlID0gZm4ucHJvdG90eXBlO1xuXHRcdH1cblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJykge1xuXHRcdHZhciBnZW4gPSBkb0V2YWwoJyVBc3luY0dlbmVyYXRvciUnKTtcblx0XHRpZiAoZ2VuICYmIGdldFByb3RvKSB7XG5cdFx0XHR2YWx1ZSA9IGdldFByb3RvKGdlbi5wcm90b3R5cGUpO1xuXHRcdH1cblx0fVxuXG5cdElOVFJJTlNJQ1NbbmFtZV0gPSB2YWx1ZTtcblxuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgTEVHQUNZX0FMSUFTRVMgPSB7XG5cdF9fcHJvdG9fXzogbnVsbCxcblx0JyVBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ0FycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG90eXBlJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b19lbnRyaWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2VudHJpZXMnXSxcblx0JyVBcnJheVByb3RvX2ZvckVhY2glJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZm9yRWFjaCddLFxuXHQnJUFycmF5UHJvdG9fa2V5cyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdrZXlzJ10sXG5cdCclQXJyYXlQcm90b192YWx1ZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAndmFsdWVzJ10sXG5cdCclQXN5bmNGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0FzeW5jRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclQm9vbGVhblByb3RvdHlwZSUnOiBbJ0Jvb2xlYW4nLCAncHJvdG90eXBlJ10sXG5cdCclRGF0YVZpZXdQcm90b3R5cGUlJzogWydEYXRhVmlldycsICdwcm90b3R5cGUnXSxcblx0JyVEYXRlUHJvdG90eXBlJSc6IFsnRGF0ZScsICdwcm90b3R5cGUnXSxcblx0JyVFcnJvclByb3RvdHlwZSUnOiBbJ0Vycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUV2YWxFcnJvclByb3RvdHlwZSUnOiBbJ0V2YWxFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDMyQXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQ2NEFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQ2NEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZ1bmN0aW9uUHJvdG90eXBlJSc6IFsnRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDhBcnJheVByb3RvdHlwZSUnOiBbJ0ludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnSW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnSW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVKU09OUGFyc2UlJzogWydKU09OJywgJ3BhcnNlJ10sXG5cdCclSlNPTlN0cmluZ2lmeSUnOiBbJ0pTT04nLCAnc3RyaW5naWZ5J10sXG5cdCclTWFwUHJvdG90eXBlJSc6IFsnTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJU51bWJlclByb3RvdHlwZSUnOiBbJ051bWJlcicsICdwcm90b3R5cGUnXSxcblx0JyVPYmplY3RQcm90b3R5cGUlJzogWydPYmplY3QnLCAncHJvdG90eXBlJ10sXG5cdCclT2JqUHJvdG9fdG9TdHJpbmclJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3RvU3RyaW5nJ10sXG5cdCclT2JqUHJvdG9fdmFsdWVPZiUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndmFsdWVPZiddLFxuXHQnJVByb21pc2VQcm90b3R5cGUlJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZSddLFxuXHQnJVByb21pc2VQcm90b190aGVuJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnLCAndGhlbiddLFxuXHQnJVByb21pc2VfYWxsJSc6IFsnUHJvbWlzZScsICdhbGwnXSxcblx0JyVQcm9taXNlX3JlamVjdCUnOiBbJ1Byb21pc2UnLCAncmVqZWN0J10sXG5cdCclUHJvbWlzZV9yZXNvbHZlJSc6IFsnUHJvbWlzZScsICdyZXNvbHZlJ10sXG5cdCclUmFuZ2VFcnJvclByb3RvdHlwZSUnOiBbJ1JhbmdlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVmZXJlbmNlRXJyb3JQcm90b3R5cGUlJzogWydSZWZlcmVuY2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWdFeHBQcm90b3R5cGUlJzogWydSZWdFeHAnLCAncHJvdG90eXBlJ10sXG5cdCclU2V0UHJvdG90eXBlJSc6IFsnU2V0JywgJ3Byb3RvdHlwZSddLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnU2hhcmVkQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclU3RyaW5nUHJvdG90eXBlJSc6IFsnU3RyaW5nJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bWJvbFByb3RvdHlwZSUnOiBbJ1N5bWJvbCcsICdwcm90b3R5cGUnXSxcblx0JyVTeW50YXhFcnJvclByb3RvdHlwZSUnOiBbJ1N5bnRheEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVkQXJyYXlQcm90b3R5cGUlJzogWydUeXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVFcnJvclByb3RvdHlwZSUnOiBbJ1R5cGVFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4Q2xhbXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnVWludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDMyQXJyYXlQcm90b3R5cGUlJzogWydVaW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVUklFcnJvclByb3RvdHlwZSUnOiBbJ1VSSUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtNYXBQcm90b3R5cGUlJzogWydXZWFrTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtTZXRQcm90b3R5cGUlJzogWydXZWFrU2V0JywgJ3Byb3RvdHlwZSddXG59O1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCdoYXNvd24nKTtcbnZhciAkY29uY2F0ID0gYmluZC5jYWxsKCRjYWxsLCBBcnJheS5wcm90b3R5cGUuY29uY2F0KTtcbnZhciAkc3BsaWNlQXBwbHkgPSBiaW5kLmNhbGwoJGFwcGx5LCBBcnJheS5wcm90b3R5cGUuc3BsaWNlKTtcbnZhciAkcmVwbGFjZSA9IGJpbmQuY2FsbCgkY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbnZhciAkc3RyU2xpY2UgPSBiaW5kLmNhbGwoJGNhbGwsIFN0cmluZy5wcm90b3R5cGUuc2xpY2UpO1xudmFyICRleGVjID0gYmluZC5jYWxsKCRjYWxsLCBSZWdFeHAucHJvdG90eXBlLmV4ZWMpO1xuXG4vKiBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi80LjE3LjE1L2Rpc3QvbG9kYXNoLmpzI0w2NzM1LUw2NzQ0ICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXiUuW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JSQpKS9nO1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nOyAvKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBmdW5jdGlvbiBzdHJpbmdUb1BhdGgoc3RyaW5nKSB7XG5cdHZhciBmaXJzdCA9ICRzdHJTbGljZShzdHJpbmcsIDAsIDEpO1xuXHR2YXIgbGFzdCA9ICRzdHJTbGljZShzdHJpbmcsIC0xKTtcblx0aWYgKGZpcnN0ID09PSAnJScgJiYgbGFzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBjbG9zaW5nIGAlYCcpO1xuXHR9IGVsc2UgaWYgKGxhc3QgPT09ICclJyAmJiBmaXJzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBvcGVuaW5nIGAlYCcpO1xuXHR9XG5cdHZhciByZXN1bHQgPSBbXTtcblx0JHJlcGxhY2Uoc3RyaW5nLCByZVByb3BOYW1lLCBmdW5jdGlvbiAobWF0Y2gsIG51bWJlciwgcXVvdGUsIHN1YlN0cmluZykge1xuXHRcdHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHF1b3RlID8gJHJlcGxhY2Uoc3ViU3RyaW5nLCByZUVzY2FwZUNoYXIsICckMScpIDogbnVtYmVyIHx8IG1hdGNoO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG4vKiBlbmQgYWRhcHRhdGlvbiAqL1xuXG52YXIgZ2V0QmFzZUludHJpbnNpYyA9IGZ1bmN0aW9uIGdldEJhc2VJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWNOYW1lID0gbmFtZTtcblx0dmFyIGFsaWFzO1xuXHRpZiAoaGFzT3duKExFR0FDWV9BTElBU0VTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdGFsaWFzID0gTEVHQUNZX0FMSUFTRVNbaW50cmluc2ljTmFtZV07XG5cdFx0aW50cmluc2ljTmFtZSA9ICclJyArIGFsaWFzWzBdICsgJyUnO1xuXHR9XG5cblx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdHZhciB2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljTmFtZV07XG5cdFx0aWYgKHZhbHVlID09PSBuZWVkc0V2YWwpIHtcblx0XHRcdHZhbHVlID0gZG9FdmFsKGludHJpbnNpY05hbWUpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyAmJiAhYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCBpcyBub3QgYXZhaWxhYmxlLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZSEnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0YWxpYXM6IGFsaWFzLFxuXHRcdFx0bmFtZTogaW50cmluc2ljTmFtZSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdH1cblxuXHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGRvZXMgbm90IGV4aXN0IScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBHZXRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgbmFtZS5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdHlwZW9mIGFsbG93TWlzc2luZyAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1wiYWxsb3dNaXNzaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBhIGJvb2xlYW4nKTtcblx0fVxuXG5cdGlmICgkZXhlYygvXiU/W14lXSolPyQvLCBuYW1lKSA9PT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2AlYCBtYXkgbm90IGJlIHByZXNlbnQgYW55d2hlcmUgYnV0IGF0IHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiB0aGUgaW50cmluc2ljIG5hbWUnKTtcblx0fVxuXHR2YXIgcGFydHMgPSBzdHJpbmdUb1BhdGgobmFtZSk7XG5cdHZhciBpbnRyaW5zaWNCYXNlTmFtZSA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0c1swXSA6ICcnO1xuXG5cdHZhciBpbnRyaW5zaWMgPSBnZXRCYXNlSW50cmluc2ljKCclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnLCBhbGxvd01pc3NpbmcpO1xuXHR2YXIgaW50cmluc2ljUmVhbE5hbWUgPSBpbnRyaW5zaWMubmFtZTtcblx0dmFyIHZhbHVlID0gaW50cmluc2ljLnZhbHVlO1xuXHR2YXIgc2tpcEZ1cnRoZXJDYWNoaW5nID0gZmFsc2U7XG5cblx0dmFyIGFsaWFzID0gaW50cmluc2ljLmFsaWFzO1xuXHRpZiAoYWxpYXMpIHtcblx0XHRpbnRyaW5zaWNCYXNlTmFtZSA9IGFsaWFzWzBdO1xuXHRcdCRzcGxpY2VBcHBseShwYXJ0cywgJGNvbmNhdChbMCwgMV0sIGFsaWFzKSk7XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMSwgaXNPd24gPSB0cnVlOyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHR2YXIgcGFydCA9IHBhcnRzW2ldO1xuXHRcdHZhciBmaXJzdCA9ICRzdHJTbGljZShwYXJ0LCAwLCAxKTtcblx0XHR2YXIgbGFzdCA9ICRzdHJTbGljZShwYXJ0LCAtMSk7XG5cdFx0aWYgKFxuXHRcdFx0KFxuXHRcdFx0XHQoZmlyc3QgPT09ICdcIicgfHwgZmlyc3QgPT09IFwiJ1wiIHx8IGZpcnN0ID09PSAnYCcpXG5cdFx0XHRcdHx8IChsYXN0ID09PSAnXCInIHx8IGxhc3QgPT09IFwiJ1wiIHx8IGxhc3QgPT09ICdgJylcblx0XHRcdClcblx0XHRcdCYmIGZpcnN0ICE9PSBsYXN0XG5cdFx0KSB7XG5cdFx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdwcm9wZXJ0eSBuYW1lcyB3aXRoIHF1b3RlcyBtdXN0IGhhdmUgbWF0Y2hpbmcgcXVvdGVzJyk7XG5cdFx0fVxuXHRcdGlmIChwYXJ0ID09PSAnY29uc3RydWN0b3InIHx8ICFpc093bikge1xuXHRcdFx0c2tpcEZ1cnRoZXJDYWNoaW5nID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpbnRyaW5zaWNCYXNlTmFtZSArPSAnLicgKyBwYXJ0O1xuXHRcdGludHJpbnNpY1JlYWxOYW1lID0gJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJSc7XG5cblx0XHRpZiAoaGFzT3duKElOVFJJTlNJQ1MsIGludHJpbnNpY1JlYWxOYW1lKSkge1xuXHRcdFx0dmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXTtcblx0XHR9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcblx0XHRcdGlmICghKHBhcnQgaW4gdmFsdWUpKSB7XG5cdFx0XHRcdGlmICghYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2Jhc2UgaW50cmluc2ljIGZvciAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgdGhlIHByb3BlcnR5IGlzIG5vdCBhdmFpbGFibGUuJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZvaWQgdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCRnT1BEICYmIChpICsgMSkgPj0gcGFydHMubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBkZXNjID0gJGdPUEQodmFsdWUsIHBhcnQpO1xuXHRcdFx0XHRpc093biA9ICEhZGVzYztcblxuXHRcdFx0XHQvLyBCeSBjb252ZW50aW9uLCB3aGVuIGEgZGF0YSBwcm9wZXJ0eSBpcyBjb252ZXJ0ZWQgdG8gYW4gYWNjZXNzb3Jcblx0XHRcdFx0Ly8gcHJvcGVydHkgdG8gZW11bGF0ZSBhIGRhdGEgcHJvcGVydHkgdGhhdCBkb2VzIG5vdCBzdWZmZXIgZnJvbVxuXHRcdFx0XHQvLyB0aGUgb3ZlcnJpZGUgbWlzdGFrZSwgdGhhdCBhY2Nlc3NvcidzIGdldHRlciBpcyBtYXJrZWQgd2l0aFxuXHRcdFx0XHQvLyBhbiBgb3JpZ2luYWxWYWx1ZWAgcHJvcGVydHkuIEhlcmUsIHdoZW4gd2UgZGV0ZWN0IHRoaXMsIHdlXG5cdFx0XHRcdC8vIHVwaG9sZCB0aGUgaWxsdXNpb24gYnkgcHJldGVuZGluZyB0byBzZWUgdGhhdCBvcmlnaW5hbCBkYXRhXG5cdFx0XHRcdC8vIHByb3BlcnR5LCBpLmUuLCByZXR1cm5pbmcgdGhlIHZhbHVlIHJhdGhlciB0aGFuIHRoZSBnZXR0ZXJcblx0XHRcdFx0Ly8gaXRzZWxmLlxuXHRcdFx0XHRpZiAoaXNPd24gJiYgJ2dldCcgaW4gZGVzYyAmJiAhKCdvcmlnaW5hbFZhbHVlJyBpbiBkZXNjLmdldCkpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGRlc2MuZ2V0O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlzT3duID0gaGFzT3duKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzT3duICYmICFza2lwRnVydGhlckNhY2hpbmcpIHtcblx0XHRcdFx0SU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyICRPYmplY3QgPSByZXF1aXJlKCdlcy1vYmplY3QtYXRvbXMnKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vT2JqZWN0LmdldFByb3RvdHlwZU9mJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9ICRPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vUmVmbGVjdC5nZXRQcm90b3R5cGVPZicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSAodHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YpIHx8IG51bGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZWZsZWN0R2V0UHJvdG8gPSByZXF1aXJlKCcuL1JlZmxlY3QuZ2V0UHJvdG90eXBlT2YnKTtcbnZhciBvcmlnaW5hbEdldFByb3RvID0gcmVxdWlyZSgnLi9PYmplY3QuZ2V0UHJvdG90eXBlT2YnKTtcblxudmFyIGdldER1bmRlclByb3RvID0gcmVxdWlyZSgnZHVuZGVyLXByb3RvL2dldCcpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSByZWZsZWN0R2V0UHJvdG9cblx0PyBmdW5jdGlvbiBnZXRQcm90byhPKSB7XG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUUyBjYW4ndCBuYXJyb3cgaW5zaWRlIGEgY2xvc3VyZSwgZm9yIHNvbWUgcmVhc29uXG5cdFx0cmV0dXJuIHJlZmxlY3RHZXRQcm90byhPKTtcblx0fVxuXHQ6IG9yaWdpbmFsR2V0UHJvdG9cblx0XHQ/IGZ1bmN0aW9uIGdldFByb3RvKE8pIHtcblx0XHRcdGlmICghTyB8fCAodHlwZW9mIE8gIT09ICdvYmplY3QnICYmIHR5cGVvZiBPICE9PSAnZnVuY3Rpb24nKSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdnZXRQcm90bzogbm90IGFuIG9iamVjdCcpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUUyBjYW4ndCBuYXJyb3cgaW5zaWRlIGEgY2xvc3VyZSwgZm9yIHNvbWUgcmVhc29uXG5cdFx0XHRyZXR1cm4gb3JpZ2luYWxHZXRQcm90byhPKTtcblx0XHR9XG5cdFx0OiBnZXREdW5kZXJQcm90b1xuXHRcdFx0PyBmdW5jdGlvbiBnZXRQcm90byhPKSB7XG5cdFx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgY2FuJ3QgbmFycm93IGluc2lkZSBhIGNsb3N1cmUsIGZvciBzb21lIHJlYXNvblxuXHRcdFx0XHRyZXR1cm4gZ2V0RHVuZGVyUHJvdG8oTyk7XG5cdFx0XHR9XG5cdFx0XHQ6IG51bGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2dPUEQnKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbnZhciAkZ09QRCA9IHJlcXVpcmUoJy4vZ09QRCcpO1xuXG5pZiAoJGdPUEQpIHtcblx0dHJ5IHtcblx0XHQkZ09QRChbXSwgJ2xlbmd0aCcpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZ09QRFxuXHRcdCRnT1BEID0gbnVsbDtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9ICRnT1BEO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnZXMtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbnZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3JzID0gZnVuY3Rpb24gaGFzUHJvcGVydHlEZXNjcmlwdG9ycygpIHtcblx0cmV0dXJuICEhJGRlZmluZVByb3BlcnR5O1xufTtcblxuaGFzUHJvcGVydHlEZXNjcmlwdG9ycy5oYXNBcnJheUxlbmd0aERlZmluZUJ1ZyA9IGZ1bmN0aW9uIGhhc0FycmF5TGVuZ3RoRGVmaW5lQnVnKCkge1xuXHQvLyBub2RlIHYwLjYgaGFzIGEgYnVnIHdoZXJlIGFycmF5IGxlbmd0aHMgY2FuIGJlIFNldCBidXQgbm90IERlZmluZWRcblx0aWYgKCEkZGVmaW5lUHJvcGVydHkpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHR0cnkge1xuXHRcdHJldHVybiAkZGVmaW5lUHJvcGVydHkoW10sICdsZW5ndGgnLCB7IHZhbHVlOiAxIH0pLmxlbmd0aCAhPT0gMTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIEluIEZpcmVmb3ggNC0yMiwgZGVmaW5pbmcgbGVuZ3RoIG9uIGFuIGFycmF5IHRocm93cyBhbiBleGNlcHRpb24uXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzUHJvcGVydHlEZXNjcmlwdG9ycztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9yaWdTeW1ib2wgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2w7XG52YXIgaGFzU3ltYm9sU2hhbSA9IHJlcXVpcmUoJy4vc2hhbXMnKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzTmF0aXZlU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sKCdmb28nKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sKCdiYXInKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0cmV0dXJuIGhhc1N5bWJvbFNoYW0oKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL3NoYW1zJyl9ICovXG4vKiBlc2xpbnQgY29tcGxleGl0eTogWzIsIDE4XSwgbWF4LXN0YXRlbWVudHM6IFsyLCAzM10gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJykgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdC8qKiBAdHlwZSB7eyBbayBpbiBzeW1ib2xdPzogdW5rbm93biB9fSAqL1xuXHR2YXIgb2JqID0ge307XG5cdHZhciBzeW0gPSBTeW1ib2woJ3Rlc3QnKTtcblx0dmFyIHN5bU9iaiA9IE9iamVjdChzeW0pO1xuXHRpZiAodHlwZW9mIHN5bSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW1PYmopICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL29iamVjdC5hc3NpZ24vaXNzdWVzLzE3XG5cdC8vIGlmIChzeW0gaW5zdGFuY2VvZiBTeW1ib2wpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uL2dldC1vd24tcHJvcGVydHktc3ltYm9scy9pc3N1ZXMvNFxuXHQvLyBpZiAoIShzeW1PYmogaW5zdGFuY2VvZiBTeW1ib2wpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIGlmICh0eXBlb2YgU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gaWYgKFN0cmluZyhzeW0pICE9PSBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHR2YXIgc3ltVmFsID0gNDI7XG5cdG9ialtzeW1dID0gc3ltVmFsO1xuXHRmb3IgKHZhciBfIGluIG9iaikgeyByZXR1cm4gZmFsc2U7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheCwgbm8tdW5yZWFjaGFibGUtbG9vcFxuXHRpZiAodHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaik7XG5cdGlmIChzeW1zLmxlbmd0aCAhPT0gMSB8fCBzeW1zWzBdICE9PSBzeW0pIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnNcblx0XHR2YXIgZGVzY3JpcHRvciA9IC8qKiBAdHlwZSB7UHJvcGVydHlEZXNjcmlwdG9yfSAqLyAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHN5bSkpO1xuXHRcdGlmIChkZXNjcmlwdG9yLnZhbHVlICE9PSBzeW1WYWwgfHwgZGVzY3JpcHRvci5lbnVtZXJhYmxlICE9PSB0cnVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzL3NoYW1zJyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc1RvU3RyaW5nVGFnU2hhbXMoKSB7XG5cdHJldHVybiBoYXNTeW1ib2xzKCkgJiYgISFTeW1ib2wudG9TdHJpbmdUYWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xudmFyICRoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmQuY2FsbChjYWxsLCAkaGFzT3duKTtcbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgaWYgKHN1cGVyQ3Rvcikge1xuICAgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgICB9XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc1RvU3RyaW5nVGFnID0gcmVxdWlyZSgnaGFzLXRvc3RyaW5ndGFnL3NoYW1zJykoKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJvdW5kJyk7XG5cbnZhciAkdG9TdHJpbmcgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcnKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbnZhciBpc1N0YW5kYXJkQXJndW1lbnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0aWYgKFxuXHRcdGhhc1RvU3RyaW5nVGFnXG5cdFx0JiYgdmFsdWVcblx0XHQmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXG5cdFx0JiYgU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbHVlXG5cdCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gJHRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59O1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xudmFyIGlzTGVnYWN5QXJndW1lbnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0aWYgKGlzU3RhbmRhcmRBcmd1bWVudHModmFsdWUpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIHZhbHVlICE9PSBudWxsXG5cdFx0JiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0J1xuXHRcdCYmICdsZW5ndGgnIGluIHZhbHVlXG5cdFx0JiYgdHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcidcblx0XHQmJiB2YWx1ZS5sZW5ndGggPj0gMFxuXHRcdCYmICR0b1N0cmluZyh2YWx1ZSkgIT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHQmJiAnY2FsbGVlJyBpbiB2YWx1ZVxuXHRcdCYmICR0b1N0cmluZyh2YWx1ZS5jYWxsZWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudmFyIHN1cHBvcnRzU3RhbmRhcmRBcmd1bWVudHMgPSAoZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gaXNTdGFuZGFyZEFyZ3VtZW50cyhhcmd1bWVudHMpO1xufSgpKTtcblxuLy8gQHRzLWV4cGVjdC1lcnJvciBUT0RPIG1ha2UgdGhpcyBub3QgZXJyb3JcbmlzU3RhbmRhcmRBcmd1bWVudHMuaXNMZWdhY3lBcmd1bWVudHMgPSBpc0xlZ2FjeUFyZ3VtZW50czsgLy8gZm9yIHRlc3RzXG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzU3RhbmRhcmRBcmd1bWVudHMgPyBpc1N0YW5kYXJkQXJndW1lbnRzIDogaXNMZWdhY3lBcmd1bWVudHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmblRvU3RyID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIHJlZmxlY3RBcHBseSA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyAmJiBSZWZsZWN0ICE9PSBudWxsICYmIFJlZmxlY3QuYXBwbHk7XG52YXIgYmFkQXJyYXlMaWtlO1xudmFyIGlzQ2FsbGFibGVNYXJrZXI7XG5pZiAodHlwZW9mIHJlZmxlY3RBcHBseSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5ID09PSAnZnVuY3Rpb24nKSB7XG5cdHRyeSB7XG5cdFx0YmFkQXJyYXlMaWtlID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnbGVuZ3RoJywge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRocm93IGlzQ2FsbGFibGVNYXJrZXI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aXNDYWxsYWJsZU1hcmtlciA9IHt9O1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG5cdFx0cmVmbGVjdEFwcGx5KGZ1bmN0aW9uICgpIHsgdGhyb3cgNDI7IH0sIG51bGwsIGJhZEFycmF5TGlrZSk7XG5cdH0gY2F0Y2ggKF8pIHtcblx0XHRpZiAoXyAhPT0gaXNDYWxsYWJsZU1hcmtlcikge1xuXHRcdFx0cmVmbGVjdEFwcGx5ID0gbnVsbDtcblx0XHR9XG5cdH1cbn0gZWxzZSB7XG5cdHJlZmxlY3RBcHBseSA9IG51bGw7XG59XG5cbnZhciBjb25zdHJ1Y3RvclJlZ2V4ID0gL15cXHMqY2xhc3NcXGIvO1xudmFyIGlzRVM2Q2xhc3NGbiA9IGZ1bmN0aW9uIGlzRVM2Q2xhc3NGdW5jdGlvbih2YWx1ZSkge1xuXHR0cnkge1xuXHRcdHZhciBmblN0ciA9IGZuVG9TdHIuY2FsbCh2YWx1ZSk7XG5cdFx0cmV0dXJuIGNvbnN0cnVjdG9yUmVnZXgudGVzdChmblN0cik7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7IC8vIG5vdCBhIGZ1bmN0aW9uXG5cdH1cbn07XG5cbnZhciB0cnlGdW5jdGlvbk9iamVjdCA9IGZ1bmN0aW9uIHRyeUZ1bmN0aW9uVG9TdHIodmFsdWUpIHtcblx0dHJ5IHtcblx0XHRpZiAoaXNFUzZDbGFzc0ZuKHZhbHVlKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmblRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBvYmplY3RDbGFzcyA9ICdbb2JqZWN0IE9iamVjdF0nO1xudmFyIGZuQ2xhc3MgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xudmFyIGdlbkNsYXNzID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcbnZhciBkZGFDbGFzcyA9ICdbb2JqZWN0IEhUTUxBbGxDb2xsZWN0aW9uXSc7IC8vIElFIDExXG52YXIgZGRhQ2xhc3MyID0gJ1tvYmplY3QgSFRNTCBkb2N1bWVudC5hbGwgY2xhc3NdJztcbnZhciBkZGFDbGFzczMgPSAnW29iamVjdCBIVE1MQ29sbGVjdGlvbl0nOyAvLyBJRSA5LTEwXG52YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmICEhU3ltYm9sLnRvU3RyaW5nVGFnOyAvLyBiZXR0ZXI6IHVzZSBgaGFzLXRvc3RyaW5ndGFnYFxuXG52YXIgaXNJRTY4ID0gISgwIGluIFssXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc3BhcnNlLWFycmF5cywgY29tbWEtc3BhY2luZ1xuXG52YXIgaXNEREEgPSBmdW5jdGlvbiBpc0RvY3VtZW50RG90QWxsKCkgeyByZXR1cm4gZmFsc2U7IH07XG5pZiAodHlwZW9mIGRvY3VtZW50ID09PSAnb2JqZWN0Jykge1xuXHQvLyBGaXJlZm94IDMgY2Fub25pY2FsaXplcyBEREEgdG8gdW5kZWZpbmVkIHdoZW4gaXQncyBub3QgYWNjZXNzZWQgZGlyZWN0bHlcblx0dmFyIGFsbCA9IGRvY3VtZW50LmFsbDtcblx0aWYgKHRvU3RyLmNhbGwoYWxsKSA9PT0gdG9TdHIuY2FsbChkb2N1bWVudC5hbGwpKSB7XG5cdFx0aXNEREEgPSBmdW5jdGlvbiBpc0RvY3VtZW50RG90QWxsKHZhbHVlKSB7XG5cdFx0XHQvKiBnbG9iYWxzIGRvY3VtZW50OiBmYWxzZSAqL1xuXHRcdFx0Ly8gaW4gSUUgNi04LCB0eXBlb2YgZG9jdW1lbnQuYWxsIGlzIFwib2JqZWN0XCIgYW5kIGl0J3MgdHJ1dGh5XG5cdFx0XHRpZiAoKGlzSUU2OCB8fCAhdmFsdWUpICYmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dmFyIHN0ciA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRzdHIgPT09IGRkYUNsYXNzXG5cdFx0XHRcdFx0XHR8fCBzdHIgPT09IGRkYUNsYXNzMlxuXHRcdFx0XHRcdFx0fHwgc3RyID09PSBkZGFDbGFzczMgLy8gb3BlcmEgMTIuMTZcblx0XHRcdFx0XHRcdHx8IHN0ciA9PT0gb2JqZWN0Q2xhc3MgLy8gSUUgNi04XG5cdFx0XHRcdFx0KSAmJiB2YWx1ZSgnJykgPT0gbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcblx0XHRcdFx0fSBjYXRjaCAoZSkgeyAvKiovIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVmbGVjdEFwcGx5XG5cdD8gZnVuY3Rpb24gaXNDYWxsYWJsZSh2YWx1ZSkge1xuXHRcdGlmIChpc0REQSh2YWx1ZSkpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRpZiAoIXZhbHVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR0cnkge1xuXHRcdFx0cmVmbGVjdEFwcGx5KHZhbHVlLCBudWxsLCBiYWRBcnJheUxpa2UpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGlmIChlICE9PSBpc0NhbGxhYmxlTWFya2VyKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gIWlzRVM2Q2xhc3NGbih2YWx1ZSkgJiYgdHJ5RnVuY3Rpb25PYmplY3QodmFsdWUpO1xuXHR9XG5cdDogZnVuY3Rpb24gaXNDYWxsYWJsZSh2YWx1ZSkge1xuXHRcdGlmIChpc0REQSh2YWx1ZSkpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRpZiAoIXZhbHVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAoaGFzVG9TdHJpbmdUYWcpIHsgcmV0dXJuIHRyeUZ1bmN0aW9uT2JqZWN0KHZhbHVlKTsgfVxuXHRcdGlmIChpc0VTNkNsYXNzRm4odmFsdWUpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHZhciBzdHJDbGFzcyA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdGlmIChzdHJDbGFzcyAhPT0gZm5DbGFzcyAmJiBzdHJDbGFzcyAhPT0gZ2VuQ2xhc3MgJiYgISgvXlxcW29iamVjdCBIVE1MLykudGVzdChzdHJDbGFzcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0cmV0dXJuIHRyeUZ1bmN0aW9uT2JqZWN0KHZhbHVlKTtcblx0fTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYm91bmQnKTtcbnZhciBzYWZlUmVnZXhUZXN0ID0gcmVxdWlyZSgnc2FmZS1yZWdleC10ZXN0Jyk7XG52YXIgaXNGblJlZ2V4ID0gc2FmZVJlZ2V4VGVzdCgvXlxccyooPzpmdW5jdGlvbik/XFwqLyk7XG52YXIgaGFzVG9TdHJpbmdUYWcgPSByZXF1aXJlKCdoYXMtdG9zdHJpbmd0YWcvc2hhbXMnKSgpO1xudmFyIGdldFByb3RvID0gcmVxdWlyZSgnZ2V0LXByb3RvJyk7XG5cbnZhciB0b1N0ciA9IGNhbGxCb3VuZCgnT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZycpO1xudmFyIGZuVG9TdHIgPSBjYWxsQm91bmQoJ0Z1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZycpO1xuXG52YXIgZ2V0R2VuZXJhdG9yRnVuY3Rpb24gPSByZXF1aXJlKCdnZW5lcmF0b3ItZnVuY3Rpb24nKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNHZW5lcmF0b3JGdW5jdGlvbihmbikge1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChpc0ZuUmVnZXgoZm5Ub1N0cihmbikpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKCFoYXNUb1N0cmluZ1RhZykge1xuXHRcdHZhciBzdHIgPSB0b1N0cihmbik7XG5cdFx0cmV0dXJuIHN0ciA9PT0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblx0fVxuXHRpZiAoIWdldFByb3RvKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHZhciBHZW5lcmF0b3JGdW5jdGlvbiA9IGdldEdlbmVyYXRvckZ1bmN0aW9uKCk7XG5cdHJldHVybiBHZW5lcmF0b3JGdW5jdGlvbiAmJiBnZXRQcm90byhmbikgPT09IEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1udW1iZXIuaXNuYW4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc05hTih2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIHBvbHlmaWxsID0gY2FsbEJpbmQoZ2V0UG9seWZpbGwoKSwgTnVtYmVyKTtcblxuLyogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5pc25hbiAqL1xuXG5kZWZpbmUocG9seWZpbGwsIHtcblx0Z2V0UG9seWZpbGw6IGdldFBvbHlmaWxsLFxuXHRpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb24sXG5cdHNoaW06IHNoaW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvbHlmaWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UG9seWZpbGwoKSB7XG5cdGlmIChOdW1iZXIuaXNOYU4gJiYgTnVtYmVyLmlzTmFOKE5hTikgJiYgIU51bWJlci5pc05hTignYScpKSB7XG5cdFx0cmV0dXJuIE51bWJlci5pc05hTjtcblx0fVxuXHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcblxuLyogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5pc25hbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoaW1OdW1iZXJJc05hTigpIHtcblx0dmFyIHBvbHlmaWxsID0gZ2V0UG9seWZpbGwoKTtcblx0ZGVmaW5lKE51bWJlciwgeyBpc05hTjogcG9seWZpbGwgfSwge1xuXHRcdGlzTmFOOiBmdW5jdGlvbiB0ZXN0SXNOYU4oKSB7XG5cdFx0XHRyZXR1cm4gTnVtYmVyLmlzTmFOICE9PSBwb2x5ZmlsbDtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1ib3VuZCcpO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gcmVxdWlyZSgnaGFzLXRvc3RyaW5ndGFnL3NoYW1zJykoKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCdoYXNvd24nKTtcbnZhciBnT1BEID0gcmVxdWlyZSgnZ29wZCcpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xudmFyIGZuO1xuXG5pZiAoaGFzVG9TdHJpbmdUYWcpIHtcblx0LyoqIEB0eXBlIHsocmVjZWl2ZXI6IFRoaXNQYXJhbWV0ZXJUeXBlPHR5cGVvZiBSZWdFeHAucHJvdG90eXBlLmV4ZWM+LCAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBSZWdFeHAucHJvdG90eXBlLmV4ZWM+KSA9PiBSZXR1cm5UeXBlPHR5cGVvZiBSZWdFeHAucHJvdG90eXBlLmV4ZWM+fSAqL1xuXHR2YXIgJGV4ZWMgPSBjYWxsQm91bmQoJ1JlZ0V4cC5wcm90b3R5cGUuZXhlYycpO1xuXHQvKiogQHR5cGUge29iamVjdH0gKi9cblx0dmFyIGlzUmVnZXhNYXJrZXIgPSB7fTtcblxuXHR2YXIgdGhyb3dSZWdleE1hcmtlciA9IGZ1bmN0aW9uICgpIHtcblx0XHR0aHJvdyBpc1JlZ2V4TWFya2VyO1xuXHR9O1xuXHQvKiogQHR5cGUge3sgdG9TdHJpbmcoKTogbmV2ZXIsIHZhbHVlT2YoKTogbmV2ZXIsIFtTeW1ib2wudG9QcmltaXRpdmVdPygpOiBuZXZlciB9fSAqL1xuXHR2YXIgYmFkU3RyaW5naWZpZXIgPSB7XG5cdFx0dG9TdHJpbmc6IHRocm93UmVnZXhNYXJrZXIsXG5cdFx0dmFsdWVPZjogdGhyb3dSZWdleE1hcmtlclxuXHR9O1xuXG5cdGlmICh0eXBlb2YgU3ltYm9sLnRvUHJpbWl0aXZlID09PSAnc3ltYm9sJykge1xuXHRcdGJhZFN0cmluZ2lmaWVyW1N5bWJvbC50b1ByaW1pdGl2ZV0gPSB0aHJvd1JlZ2V4TWFya2VyO1xuXHR9XG5cblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cblx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUUyBjYW4ndCBmaWd1cmUgb3V0IHRoYXQgdGhlICRleGVjIGNhbGwgYWx3YXlzIHRocm93c1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cblx0Zm4gPSBmdW5jdGlvbiBpc1JlZ2V4KHZhbHVlKSB7XG5cdFx0aWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXBhcmVuc1xuXHRcdHZhciBkZXNjcmlwdG9yID0gLyoqIEB0eXBlIHtOb25OdWxsYWJsZTx0eXBlb2YgZ09QRD59ICovIChnT1BEKSgvKiogQHR5cGUge3sgbGFzdEluZGV4PzogdW5rbm93biB9fSAqLyAodmFsdWUpLCAnbGFzdEluZGV4Jyk7XG5cdFx0dmFyIGhhc0xhc3RJbmRleERhdGFQcm9wZXJ0eSA9IGRlc2NyaXB0b3IgJiYgaGFzT3duKGRlc2NyaXB0b3IsICd2YWx1ZScpO1xuXHRcdGlmICghaGFzTGFzdEluZGV4RGF0YVByb3BlcnR5KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnNcblx0XHRcdCRleGVjKHZhbHVlLCAvKiogQHR5cGUge3N0cmluZ30gKi8gKC8qKiBAdHlwZSB7dW5rbm93bn0gKi8gKGJhZFN0cmluZ2lmaWVyKSkpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBlID09PSBpc1JlZ2V4TWFya2VyO1xuXHRcdH1cblx0fTtcbn0gZWxzZSB7XG5cdC8qKiBAdHlwZSB7KHJlY2VpdmVyOiBUaGlzUGFyYW1ldGVyVHlwZTx0eXBlb2YgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZz4sIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc+KSA9PiBSZXR1cm5UeXBlPHR5cGVvZiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nPn0gKi9cblx0dmFyICR0b1N0cmluZyA9IGNhbGxCb3VuZCgnT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZycpO1xuXHQvKiogQGNvbnN0IEB0eXBlIHsnW29iamVjdCBSZWdFeHBdJ30gKi9cblx0dmFyIHJlZ2V4Q2xhc3MgPSAnW29iamVjdCBSZWdFeHBdJztcblxuXHQvKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xuXHRmbiA9IGZ1bmN0aW9uIGlzUmVnZXgodmFsdWUpIHtcblx0XHQvLyBJbiBvbGRlciBicm93c2VycywgdHlwZW9mIHJlZ2V4IGluY29ycmVjdGx5IHJldHVybnMgJ2Z1bmN0aW9uJ1xuXHRcdGlmICghdmFsdWUgfHwgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiAkdG9TdHJpbmcodmFsdWUpID09PSByZWdleENsYXNzO1xuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgd2hpY2hUeXBlZEFycmF5ID0gcmVxdWlyZSgnd2hpY2gtdHlwZWQtYXJyYXknKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNUeXBlZEFycmF5KHZhbHVlKSB7XG5cdHJldHVybiAhIXdoaWNoVHlwZWRBcnJheSh2YWx1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9hYnMnKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gTWF0aC5hYnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2Zsb29yJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGguZmxvb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2lzTmFOJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBpc05hTihhKSB7XG5cdHJldHVybiBhICE9PSBhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vbWF4Jyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGgubWF4O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9taW4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gTWF0aC5taW47XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL3BvdycpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBNYXRoLnBvdztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vcm91bmQnKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gTWF0aC5yb3VuZDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyICRpc05hTiA9IHJlcXVpcmUoJy4vaXNOYU4nKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vc2lnbicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaWduKG51bWJlcikge1xuXHRpZiAoJGlzTmFOKG51bWJlcikgfHwgbnVtYmVyID09PSAwKSB7XG5cdFx0cmV0dXJuIG51bWJlcjtcblx0fVxuXHRyZXR1cm4gbnVtYmVyIDwgMCA/IC0xIDogKzE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbnVtYmVySXNOYU4gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXMoYSwgYikge1xuXHRpZiAoYSA9PT0gMCAmJiBiID09PSAwKSB7XG5cdFx0cmV0dXJuIDEgLyBhID09PSAxIC8gYjtcblx0fVxuXHRpZiAoYSA9PT0gYikge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChudW1iZXJJc05hTihhKSAmJiBudW1iZXJJc05hTihiKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCdjYWxsLWJpbmQnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIHBvbHlmaWxsID0gY2FsbEJpbmQoZ2V0UG9seWZpbGwoKSwgT2JqZWN0KTtcblxuZGVmaW5lKHBvbHlmaWxsLCB7XG5cdGdldFBvbHlmaWxsOiBnZXRQb2x5ZmlsbCxcblx0aW1wbGVtZW50YXRpb246IGltcGxlbWVudGF0aW9uLFxuXHRzaGltOiBzaGltXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwb2x5ZmlsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFBvbHlmaWxsKCkge1xuXHRyZXR1cm4gdHlwZW9mIE9iamVjdC5pcyA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdC5pcyA6IGltcGxlbWVudGF0aW9uO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hpbU9iamVjdElzKCkge1xuXHR2YXIgcG9seWZpbGwgPSBnZXRQb2x5ZmlsbCgpO1xuXHRkZWZpbmUoT2JqZWN0LCB7IGlzOiBwb2x5ZmlsbCB9LCB7XG5cdFx0aXM6IGZ1bmN0aW9uIHRlc3RPYmplY3RJcygpIHtcblx0XHRcdHJldHVybiBPYmplY3QuaXMgIT09IHBvbHlmaWxsO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBwb2x5ZmlsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzU2hpbTtcbmlmICghT2JqZWN0LmtleXMpIHtcblx0Ly8gbW9kaWZpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW1cblx0dmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cdHZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZ2xvYmFsLXJlcXVpcmVcblx0dmFyIGlzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cdHZhciBoYXNEb250RW51bUJ1ZyA9ICFpc0VudW1lcmFibGUuY2FsbCh7IHRvU3RyaW5nOiBudWxsIH0sICd0b1N0cmluZycpO1xuXHR2YXIgaGFzUHJvdG9FbnVtQnVnID0gaXNFbnVtZXJhYmxlLmNhbGwoZnVuY3Rpb24gKCkge30sICdwcm90b3R5cGUnKTtcblx0dmFyIGRvbnRFbnVtcyA9IFtcblx0XHQndG9TdHJpbmcnLFxuXHRcdCd0b0xvY2FsZVN0cmluZycsXG5cdFx0J3ZhbHVlT2YnLFxuXHRcdCdoYXNPd25Qcm9wZXJ0eScsXG5cdFx0J2lzUHJvdG90eXBlT2YnLFxuXHRcdCdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG5cdFx0J2NvbnN0cnVjdG9yJ1xuXHRdO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUgPSBmdW5jdGlvbiAobykge1xuXHRcdHZhciBjdG9yID0gby5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gY3RvciAmJiBjdG9yLnByb3RvdHlwZSA9PT0gbztcblx0fTtcblx0dmFyIGV4Y2x1ZGVkS2V5cyA9IHtcblx0XHQkYXBwbGljYXRpb25DYWNoZTogdHJ1ZSxcblx0XHQkY29uc29sZTogdHJ1ZSxcblx0XHQkZXh0ZXJuYWw6IHRydWUsXG5cdFx0JGZyYW1lOiB0cnVlLFxuXHRcdCRmcmFtZUVsZW1lbnQ6IHRydWUsXG5cdFx0JGZyYW1lczogdHJ1ZSxcblx0XHQkaW5uZXJIZWlnaHQ6IHRydWUsXG5cdFx0JGlubmVyV2lkdGg6IHRydWUsXG5cdFx0JG9ubW96ZnVsbHNjcmVlbmNoYW5nZTogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuZXJyb3I6IHRydWUsXG5cdFx0JG91dGVySGVpZ2h0OiB0cnVlLFxuXHRcdCRvdXRlcldpZHRoOiB0cnVlLFxuXHRcdCRwYWdlWE9mZnNldDogdHJ1ZSxcblx0XHQkcGFnZVlPZmZzZXQ6IHRydWUsXG5cdFx0JHBhcmVudDogdHJ1ZSxcblx0XHQkc2Nyb2xsTGVmdDogdHJ1ZSxcblx0XHQkc2Nyb2xsVG9wOiB0cnVlLFxuXHRcdCRzY3JvbGxYOiB0cnVlLFxuXHRcdCRzY3JvbGxZOiB0cnVlLFxuXHRcdCRzZWxmOiB0cnVlLFxuXHRcdCR3ZWJraXRJbmRleGVkREI6IHRydWUsXG5cdFx0JHdlYmtpdFN0b3JhZ2VJbmZvOiB0cnVlLFxuXHRcdCR3aW5kb3c6IHRydWVcblx0fTtcblx0dmFyIGhhc0F1dG9tYXRpb25FcXVhbGl0eUJ1ZyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0LyogZ2xvYmFsIHdpbmRvdyAqL1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKHZhciBrIGluIHdpbmRvdykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCFleGNsdWRlZEtleXNbJyQnICsga10gJiYgaGFzLmNhbGwod2luZG93LCBrKSAmJiB3aW5kb3dba10gIT09IG51bGwgJiYgdHlwZW9mIHdpbmRvd1trXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0ZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUod2luZG93W2tdKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSgpKTtcblx0dmFyIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0LyogZ2xvYmFsIHdpbmRvdyAqL1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnKSB7XG5cdFx0XHRyZXR1cm4gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUobyk7XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUobyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fTtcblxuXHRrZXlzU2hpbSA9IGZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG5cdFx0dmFyIGlzT2JqZWN0ID0gb2JqZWN0ICE9PSBudWxsICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnO1xuXHRcdHZhciBpc0Z1bmN0aW9uID0gdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXHRcdHZhciBpc0FyZ3VtZW50cyA9IGlzQXJncyhvYmplY3QpO1xuXHRcdHZhciBpc1N0cmluZyA9IGlzT2JqZWN0ICYmIHRvU3RyLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdFx0dmFyIHRoZUtleXMgPSBbXTtcblxuXHRcdGlmICghaXNPYmplY3QgJiYgIWlzRnVuY3Rpb24gJiYgIWlzQXJndW1lbnRzKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3Qua2V5cyBjYWxsZWQgb24gYSBub24tb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0dmFyIHNraXBQcm90byA9IGhhc1Byb3RvRW51bUJ1ZyAmJiBpc0Z1bmN0aW9uO1xuXHRcdGlmIChpc1N0cmluZyAmJiBvYmplY3QubGVuZ3RoID4gMCAmJiAhaGFzLmNhbGwob2JqZWN0LCAwKSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlzQXJndW1lbnRzICYmIG9iamVjdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG9iamVjdC5sZW5ndGg7ICsraikge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGopKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICh2YXIgbmFtZSBpbiBvYmplY3QpIHtcblx0XHRcdFx0aWYgKCEoc2tpcFByb3RvICYmIG5hbWUgPT09ICdwcm90b3R5cGUnKSAmJiBoYXMuY2FsbChvYmplY3QsIG5hbWUpKSB7XG5cdFx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhuYW1lKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaGFzRG9udEVudW1CdWcpIHtcblx0XHRcdHZhciBza2lwQ29uc3RydWN0b3IgPSBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZUlmTm90QnVnZ3kob2JqZWN0KTtcblxuXHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBkb250RW51bXMubGVuZ3RoOyArK2spIHtcblx0XHRcdFx0aWYgKCEoc2tpcENvbnN0cnVjdG9yICYmIGRvbnRFbnVtc1trXSA9PT0gJ2NvbnN0cnVjdG9yJykgJiYgaGFzLmNhbGwob2JqZWN0LCBkb250RW51bXNba10pKSB7XG5cdFx0XHRcdFx0dGhlS2V5cy5wdXNoKGRvbnRFbnVtc1trXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoZUtleXM7XG5cdH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaXNBcmdzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpO1xuXG52YXIgb3JpZ0tleXMgPSBPYmplY3Qua2V5cztcbnZhciBrZXlzU2hpbSA9IG9yaWdLZXlzID8gZnVuY3Rpb24ga2V5cyhvKSB7IHJldHVybiBvcmlnS2V5cyhvKTsgfSA6IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxudmFyIG9yaWdpbmFsS2V5cyA9IE9iamVjdC5rZXlzO1xuXG5rZXlzU2hpbS5zaGltID0gZnVuY3Rpb24gc2hpbU9iamVjdEtleXMoKSB7XG5cdGlmIChPYmplY3Qua2V5cykge1xuXHRcdHZhciBrZXlzV29ya3NXaXRoQXJndW1lbnRzID0gKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFNhZmFyaSA1LjAgYnVnXG5cdFx0XHR2YXIgYXJncyA9IE9iamVjdC5rZXlzKGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gYXJncyAmJiBhcmdzLmxlbmd0aCA9PT0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHR9KDEsIDIpKTtcblx0XHRpZiAoIWtleXNXb3Jrc1dpdGhBcmd1bWVudHMpIHtcblx0XHRcdE9iamVjdC5rZXlzID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcblx0XHRcdFx0aWYgKGlzQXJncyhvYmplY3QpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhzbGljZS5jYWxsKG9iamVjdCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvcmlnaW5hbEtleXMob2JqZWN0KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdE9iamVjdC5rZXlzID0ga2V5c1NoaW07XG5cdH1cblx0cmV0dXJuIE9iamVjdC5rZXlzIHx8IGtleXNTaGltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzU2hpbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuXHR2YXIgc3RyID0gdG9TdHIuY2FsbCh2YWx1ZSk7XG5cdHZhciBpc0FyZ3MgPSBzdHIgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXHRpZiAoIWlzQXJncykge1xuXHRcdGlzQXJncyA9IHN0ciAhPT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuXHRcdFx0dmFsdWUgIT09IG51bGwgJiZcblx0XHRcdHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdHR5cGVvZiB2YWx1ZS5sZW5ndGggPT09ICdudW1iZXInICYmXG5cdFx0XHR2YWx1ZS5sZW5ndGggPj0gMCAmJlxuXHRcdFx0dG9TdHIuY2FsbCh2YWx1ZS5jYWxsZWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXHR9XG5cdHJldHVybiBpc0FyZ3M7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBtb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczYtc2hpbVxudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCdvYmplY3Qta2V5cycpO1xudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scy9zaGFtcycpKCk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1ib3VuZCcpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCdlcy1vYmplY3QtYXRvbXMnKTtcbnZhciAkcHVzaCA9IGNhbGxCb3VuZCgnQXJyYXkucHJvdG90eXBlLnB1c2gnKTtcbnZhciAkcHJvcElzRW51bWVyYWJsZSA9IGNhbGxCb3VuZCgnT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZScpO1xudmFyIG9yaWdpbmFsR2V0U3ltYm9scyA9IGhhc1N5bWJvbHMgPyAkT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA6IG51bGw7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UxKSB7XG5cdGlmICh0YXJnZXQgPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTsgfVxuXHR2YXIgdG8gPSAkT2JqZWN0KHRhcmdldCk7IC8vIHN0ZXAgMVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdHJldHVybiB0bzsgLy8gc3RlcCAyXG5cdH1cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyArK3MpIHtcblx0XHR2YXIgZnJvbSA9ICRPYmplY3QoYXJndW1lbnRzW3NdKTsgLy8gc3RlcCAzLmEuaVxuXG5cdFx0Ly8gc3RlcCAzLmEuaWk6XG5cdFx0dmFyIGtleXMgPSBvYmplY3RLZXlzKGZyb20pO1xuXHRcdHZhciBnZXRTeW1ib2xzID0gaGFzU3ltYm9scyAmJiAoJE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgfHwgb3JpZ2luYWxHZXRTeW1ib2xzKTtcblx0XHRpZiAoZ2V0U3ltYm9scykge1xuXHRcdFx0dmFyIHN5bXMgPSBnZXRTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBzeW1zLmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBzeW1zW2pdO1xuXHRcdFx0XHRpZiAoJHByb3BJc0VudW1lcmFibGUoZnJvbSwga2V5KSkge1xuXHRcdFx0XHRcdCRwdXNoKGtleXMsIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBzdGVwIDMuYS5paWk6XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG5cdFx0XHR2YXIgbmV4dEtleSA9IGtleXNbaV07XG5cdFx0XHRpZiAoJHByb3BJc0VudW1lcmFibGUoZnJvbSwgbmV4dEtleSkpIHsgLy8gc3RlcCAzLmEuaWlpLjJcblx0XHRcdFx0dmFyIHByb3BWYWx1ZSA9IGZyb21bbmV4dEtleV07IC8vIHN0ZXAgMy5hLmlpaS4yLmFcblx0XHRcdFx0dG9bbmV4dEtleV0gPSBwcm9wVmFsdWU7IC8vIHN0ZXAgMy5hLmlpaS4yLmJcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87IC8vIHN0ZXAgNFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG52YXIgbGFja3NQcm9wZXJFbnVtZXJhdGlvbk9yZGVyID0gZnVuY3Rpb24gKCkge1xuXHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Lypcblx0ICogdjgsIHNwZWNpZmljYWxseSBpbiBub2RlIDQueCwgaGFzIGEgYnVnIHdpdGggaW5jb3JyZWN0IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyXG5cdCAqIG5vdGU6IHRoaXMgZG9lcyBub3QgZGV0ZWN0IHRoZSBidWcgdW5sZXNzIHRoZXJlJ3MgMjAgY2hhcmFjdGVyc1xuXHQgKi9cblx0dmFyIHN0ciA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG5cdHZhciBsZXR0ZXJzID0gc3RyLnNwbGl0KCcnKTtcblx0dmFyIG1hcCA9IHt9O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxldHRlcnMubGVuZ3RoOyArK2kpIHtcblx0XHRtYXBbbGV0dGVyc1tpXV0gPSBsZXR0ZXJzW2ldO1xuXHR9XG5cdHZhciBvYmogPSBPYmplY3QuYXNzaWduKHt9LCBtYXApO1xuXHR2YXIgYWN0dWFsID0gJyc7XG5cdGZvciAodmFyIGsgaW4gb2JqKSB7XG5cdFx0YWN0dWFsICs9IGs7XG5cdH1cblx0cmV0dXJuIHN0ciAhPT0gYWN0dWFsO1xufTtcblxudmFyIGFzc2lnbkhhc1BlbmRpbmdFeGNlcHRpb25zID0gZnVuY3Rpb24gKCkge1xuXHRpZiAoIU9iamVjdC5hc3NpZ24gfHwgIU9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHQvKlxuXHQgKiBGaXJlZm94IDM3IHN0aWxsIGhhcyBcInBlbmRpbmcgZXhjZXB0aW9uXCIgbG9naWMgaW4gaXRzIE9iamVjdC5hc3NpZ24gaW1wbGVtZW50YXRpb24sXG5cdCAqIHdoaWNoIGlzIDcyJSBzbG93ZXIgdGhhbiBvdXIgc2hpbSwgYW5kIEZpcmVmb3ggNDAncyBuYXRpdmUgaW1wbGVtZW50YXRpb24uXG5cdCAqL1xuXHR2YXIgdGhyb3dlciA9IE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7IDE6IDIgfSk7XG5cdHRyeSB7XG5cdFx0T2JqZWN0LmFzc2lnbih0aHJvd2VyLCAneHknKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiB0aHJvd2VyWzFdID09PSAneSc7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRQb2x5ZmlsbCgpIHtcblx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0cmV0dXJuIGltcGxlbWVudGF0aW9uO1xuXHR9XG5cdGlmIChsYWNrc1Byb3BlckVudW1lcmF0aW9uT3JkZXIoKSkge1xuXHRcdHJldHVybiBpbXBsZW1lbnRhdGlvbjtcblx0fVxuXHRpZiAoYXNzaWduSGFzUGVuZGluZ0V4Y2VwdGlvbnMoKSkge1xuXHRcdHJldHVybiBpbXBsZW1lbnRhdGlvbjtcblx0fVxuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IFtcblx0J0Zsb2F0MTZBcnJheScsXG5cdCdGbG9hdDMyQXJyYXknLFxuXHQnRmxvYXQ2NEFycmF5Jyxcblx0J0ludDhBcnJheScsXG5cdCdJbnQxNkFycmF5Jyxcblx0J0ludDMyQXJyYXknLFxuXHQnVWludDhBcnJheScsXG5cdCdVaW50OENsYW1wZWRBcnJheScsXG5cdCdVaW50MTZBcnJheScsXG5cdCdVaW50MzJBcnJheScsXG5cdCdCaWdJbnQ2NEFycmF5Jyxcblx0J0JpZ1VpbnQ2NEFycmF5J1xuXTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJvdW5kJyk7XG52YXIgaXNSZWdleCA9IHJlcXVpcmUoJ2lzLXJlZ2V4Jyk7XG5cbnZhciAkZXhlYyA9IGNhbGxCb3VuZCgnUmVnRXhwLnByb3RvdHlwZS5leGVjJyk7XG52YXIgJFR5cGVFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy90eXBlJyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlZ2V4VGVzdGVyKHJlZ2V4KSB7XG5cdGlmICghaXNSZWdleChyZWdleCkpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYHJlZ2V4YCBtdXN0IGJlIGEgUmVnRXhwJyk7XG5cdH1cblx0cmV0dXJuIGZ1bmN0aW9uIHRlc3Qocykge1xuXHRcdHJldHVybiAkZXhlYyhyZWdleCwgcykgIT09IG51bGw7XG5cdH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1kYXRhLXByb3BlcnR5Jyk7XG52YXIgaGFzRGVzY3JpcHRvcnMgPSByZXF1aXJlKCdoYXMtcHJvcGVydHktZGVzY3JpcHRvcnMnKSgpO1xudmFyIGdPUEQgPSByZXF1aXJlKCdnb3BkJyk7XG5cbnZhciAkVHlwZUVycm9yID0gcmVxdWlyZSgnZXMtZXJyb3JzL3R5cGUnKTtcbnZhciAkZmxvb3IgPSBHZXRJbnRyaW5zaWMoJyVNYXRoLmZsb29yJScpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXRGdW5jdGlvbkxlbmd0aChmbiwgbGVuZ3RoKSB7XG5cdGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYGZuYCBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHR9XG5cdGlmICh0eXBlb2YgbGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBsZW5ndGggPCAwIHx8IGxlbmd0aCA+IDB4RkZGRkZGRkYgfHwgJGZsb29yKGxlbmd0aCkgIT09IGxlbmd0aCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgbGVuZ3RoYCBtdXN0IGJlIGEgcG9zaXRpdmUgMzItYml0IGludGVnZXInKTtcblx0fVxuXG5cdHZhciBsb29zZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmICEhYXJndW1lbnRzWzJdO1xuXG5cdHZhciBmdW5jdGlvbkxlbmd0aElzQ29uZmlndXJhYmxlID0gdHJ1ZTtcblx0dmFyIGZ1bmN0aW9uTGVuZ3RoSXNXcml0YWJsZSA9IHRydWU7XG5cdGlmICgnbGVuZ3RoJyBpbiBmbiAmJiBnT1BEKSB7XG5cdFx0dmFyIGRlc2MgPSBnT1BEKGZuLCAnbGVuZ3RoJyk7XG5cdFx0aWYgKGRlc2MgJiYgIWRlc2MuY29uZmlndXJhYmxlKSB7XG5cdFx0XHRmdW5jdGlvbkxlbmd0aElzQ29uZmlndXJhYmxlID0gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChkZXNjICYmICFkZXNjLndyaXRhYmxlKSB7XG5cdFx0XHRmdW5jdGlvbkxlbmd0aElzV3JpdGFibGUgPSBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRpZiAoZnVuY3Rpb25MZW5ndGhJc0NvbmZpZ3VyYWJsZSB8fCBmdW5jdGlvbkxlbmd0aElzV3JpdGFibGUgfHwgIWxvb3NlKSB7XG5cdFx0aWYgKGhhc0Rlc2NyaXB0b3JzKSB7XG5cdFx0XHRkZWZpbmUoLyoqIEB0eXBlIHtQYXJhbWV0ZXJzPGRlZmluZT5bMF19ICovIChmbiksICdsZW5ndGgnLCBsZW5ndGgsIHRydWUsIHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWZpbmUoLyoqIEB0eXBlIHtQYXJhbWV0ZXJzPGRlZmluZT5bMF19ICovIChmbiksICdsZW5ndGgnLCBsZW5ndGgpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZm47XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlcihhcmcpIHtcbiAgcmV0dXJuIGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0J1xuICAgICYmIHR5cGVvZiBhcmcuY29weSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcuZmlsbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcucmVhZFVJbnQ4ID09PSAnZnVuY3Rpb24nO1xufSIsIi8vIEN1cnJlbnRseSBpbiBzeW5jIHdpdGggTm9kZS5qcyBsaWIvaW50ZXJuYWwvdXRpbC90eXBlcy5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8xMTJjYzdjMjc1NTEyNTRhYTJiMTcwOThmYjc3NDg2N2YwNWVkMGQ5XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJndW1lbnRzT2JqZWN0ID0gcmVxdWlyZSgnaXMtYXJndW1lbnRzJyk7XG52YXIgaXNHZW5lcmF0b3JGdW5jdGlvbiA9IHJlcXVpcmUoJ2lzLWdlbmVyYXRvci1mdW5jdGlvbicpO1xudmFyIHdoaWNoVHlwZWRBcnJheSA9IHJlcXVpcmUoJ3doaWNoLXR5cGVkLWFycmF5Jyk7XG52YXIgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnaXMtdHlwZWQtYXJyYXknKTtcblxuZnVuY3Rpb24gdW5jdXJyeVRoaXMoZikge1xuICByZXR1cm4gZi5jYWxsLmJpbmQoZik7XG59XG5cbnZhciBCaWdJbnRTdXBwb3J0ZWQgPSB0eXBlb2YgQmlnSW50ICE9PSAndW5kZWZpbmVkJztcbnZhciBTeW1ib2xTdXBwb3J0ZWQgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJztcblxudmFyIE9iamVjdFRvU3RyaW5nID0gdW5jdXJyeVRoaXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyk7XG5cbnZhciBudW1iZXJWYWx1ZSA9IHVuY3VycnlUaGlzKE51bWJlci5wcm90b3R5cGUudmFsdWVPZik7XG52YXIgc3RyaW5nVmFsdWUgPSB1bmN1cnJ5VGhpcyhTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YpO1xudmFyIGJvb2xlYW5WYWx1ZSA9IHVuY3VycnlUaGlzKEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YpO1xuXG5pZiAoQmlnSW50U3VwcG9ydGVkKSB7XG4gIHZhciBiaWdJbnRWYWx1ZSA9IHVuY3VycnlUaGlzKEJpZ0ludC5wcm90b3R5cGUudmFsdWVPZik7XG59XG5cbmlmIChTeW1ib2xTdXBwb3J0ZWQpIHtcbiAgdmFyIHN5bWJvbFZhbHVlID0gdW5jdXJyeVRoaXMoU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgcHJvdG90eXBlVmFsdWVPZikge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB0cnkge1xuICAgIHByb3RvdHlwZVZhbHVlT2YodmFsdWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0cy5pc0FyZ3VtZW50c09iamVjdCA9IGlzQXJndW1lbnRzT2JqZWN0O1xuZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gaXNHZW5lcmF0b3JGdW5jdGlvbjtcbmV4cG9ydHMuaXNUeXBlZEFycmF5ID0gaXNUeXBlZEFycmF5O1xuXG4vLyBUYWtlbiBmcm9tIGhlcmUgYW5kIG1vZGlmaWVkIGZvciBiZXR0ZXIgYnJvd3NlciBzdXBwb3J0XG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3AtaXMtcHJvbWlzZS9ibG9iL2NkYTM1YTUxM2JkYTAzZjk3N2FkNWNkZTNhMDc5ZDIzN2U4MmQ3ZWYvaW5kZXguanNcbmZ1bmN0aW9uIGlzUHJvbWlzZShpbnB1dCkge1xuXHRyZXR1cm4gKFxuXHRcdChcblx0XHRcdHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJyAmJlxuXHRcdFx0aW5wdXQgaW5zdGFuY2VvZiBQcm9taXNlXG5cdFx0KSB8fFxuXHRcdChcblx0XHRcdGlucHV0ICE9PSBudWxsICYmXG5cdFx0XHR0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmXG5cdFx0XHR0eXBlb2YgaW5wdXQudGhlbiA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0dHlwZW9mIGlucHV0LmNhdGNoID09PSAnZnVuY3Rpb24nXG5cdFx0KVxuXHQpO1xufVxuZXhwb3J0cy5pc1Byb21pc2UgPSBpc1Byb21pc2U7XG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEFycmF5QnVmZmVyLmlzVmlldykge1xuICAgIHJldHVybiBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICBpc1R5cGVkQXJyYXkodmFsdWUpIHx8XG4gICAgaXNEYXRhVmlldyh2YWx1ZSlcbiAgKTtcbn1cbmV4cG9ydHMuaXNBcnJheUJ1ZmZlclZpZXcgPSBpc0FycmF5QnVmZmVyVmlldztcblxuXG5mdW5jdGlvbiBpc1VpbnQ4QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdVaW50OEFycmF5Jztcbn1cbmV4cG9ydHMuaXNVaW50OEFycmF5ID0gaXNVaW50OEFycmF5O1xuXG5mdW5jdGlvbiBpc1VpbnQ4Q2xhbXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDhDbGFtcGVkQXJyYXknO1xufVxuZXhwb3J0cy5pc1VpbnQ4Q2xhbXBlZEFycmF5ID0gaXNVaW50OENsYW1wZWRBcnJheTtcblxuZnVuY3Rpb24gaXNVaW50MTZBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ1VpbnQxNkFycmF5Jztcbn1cbmV4cG9ydHMuaXNVaW50MTZBcnJheSA9IGlzVWludDE2QXJyYXk7XG5cbmZ1bmN0aW9uIGlzVWludDMyQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdVaW50MzJBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDMyQXJyYXkgPSBpc1VpbnQzMkFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDhBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0ludDhBcnJheSc7XG59XG5leHBvcnRzLmlzSW50OEFycmF5ID0gaXNJbnQ4QXJyYXk7XG5cbmZ1bmN0aW9uIGlzSW50MTZBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0ludDE2QXJyYXknO1xufVxuZXhwb3J0cy5pc0ludDE2QXJyYXkgPSBpc0ludDE2QXJyYXk7XG5cbmZ1bmN0aW9uIGlzSW50MzJBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0ludDMyQXJyYXknO1xufVxuZXhwb3J0cy5pc0ludDMyQXJyYXkgPSBpc0ludDMyQXJyYXk7XG5cbmZ1bmN0aW9uIGlzRmxvYXQzMkFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnRmxvYXQzMkFycmF5Jztcbn1cbmV4cG9ydHMuaXNGbG9hdDMyQXJyYXkgPSBpc0Zsb2F0MzJBcnJheTtcblxuZnVuY3Rpb24gaXNGbG9hdDY0QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdGbG9hdDY0QXJyYXknO1xufVxuZXhwb3J0cy5pc0Zsb2F0NjRBcnJheSA9IGlzRmxvYXQ2NEFycmF5O1xuXG5mdW5jdGlvbiBpc0JpZ0ludDY0QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdCaWdJbnQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNCaWdJbnQ2NEFycmF5ID0gaXNCaWdJbnQ2NEFycmF5O1xuXG5mdW5jdGlvbiBpc0JpZ1VpbnQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnQmlnVWludDY0QXJyYXknO1xufVxuZXhwb3J0cy5pc0JpZ1VpbnQ2NEFycmF5ID0gaXNCaWdVaW50NjRBcnJheTtcblxuZnVuY3Rpb24gaXNNYXBUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBNYXBdJztcbn1cbmlzTWFwVG9TdHJpbmcud29ya2luZyA9IChcbiAgdHlwZW9mIE1hcCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNNYXBUb1N0cmluZyhuZXcgTWFwKCkpXG4pO1xuXG5mdW5jdGlvbiBpc01hcCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNNYXBUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc01hcFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBNYXA7XG59XG5leHBvcnRzLmlzTWFwID0gaXNNYXA7XG5cbmZ1bmN0aW9uIGlzU2V0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgU2V0XSc7XG59XG5pc1NldFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBTZXQgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzU2V0VG9TdHJpbmcobmV3IFNldCgpKVxuKTtcbmZ1bmN0aW9uIGlzU2V0KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBpc1NldFRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzU2V0VG9TdHJpbmcodmFsdWUpXG4gICAgOiB2YWx1ZSBpbnN0YW5jZW9mIFNldDtcbn1cbmV4cG9ydHMuaXNTZXQgPSBpc1NldDtcblxuZnVuY3Rpb24gaXNXZWFrTWFwVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgV2Vha01hcF0nO1xufVxuaXNXZWFrTWFwVG9TdHJpbmcud29ya2luZyA9IChcbiAgdHlwZW9mIFdlYWtNYXAgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzV2Vha01hcFRvU3RyaW5nKG5ldyBXZWFrTWFwKCkpXG4pO1xuZnVuY3Rpb24gaXNXZWFrTWFwKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNXZWFrTWFwVG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNXZWFrTWFwVG9TdHJpbmcodmFsdWUpXG4gICAgOiB2YWx1ZSBpbnN0YW5jZW9mIFdlYWtNYXA7XG59XG5leHBvcnRzLmlzV2Vha01hcCA9IGlzV2Vha01hcDtcblxuZnVuY3Rpb24gaXNXZWFrU2V0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgV2Vha1NldF0nO1xufVxuaXNXZWFrU2V0VG9TdHJpbmcud29ya2luZyA9IChcbiAgdHlwZW9mIFdlYWtTZXQgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzV2Vha1NldFRvU3RyaW5nKG5ldyBXZWFrU2V0KCkpXG4pO1xuZnVuY3Rpb24gaXNXZWFrU2V0KHZhbHVlKSB7XG4gIHJldHVybiBpc1dlYWtTZXRUb1N0cmluZyh2YWx1ZSk7XG59XG5leHBvcnRzLmlzV2Vha1NldCA9IGlzV2Vha1NldDtcblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5pc0FycmF5QnVmZmVyVG9TdHJpbmcud29ya2luZyA9IChcbiAgdHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc0FycmF5QnVmZmVyVG9TdHJpbmcobmV3IEFycmF5QnVmZmVyKCkpXG4pO1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBpc0FycmF5QnVmZmVyVG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNBcnJheUJ1ZmZlclRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn1cbmV4cG9ydHMuaXNBcnJheUJ1ZmZlciA9IGlzQXJyYXlCdWZmZXI7XG5cbmZ1bmN0aW9uIGlzRGF0YVZpZXdUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBEYXRhVmlld10nO1xufVxuaXNEYXRhVmlld1RvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgdHlwZW9mIERhdGFWaWV3ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc0RhdGFWaWV3VG9TdHJpbmcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSwgMCwgMSkpXG4pO1xuZnVuY3Rpb24gaXNEYXRhVmlldyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBpc0RhdGFWaWV3VG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNEYXRhVmlld1RvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBEYXRhVmlldztcbn1cbmV4cG9ydHMuaXNEYXRhVmlldyA9IGlzRGF0YVZpZXc7XG5cbi8vIFN0b3JlIGEgY29weSBvZiBTaGFyZWRBcnJheUJ1ZmZlciBpbiBjYXNlIGl0J3MgZGVsZXRlZCBlbHNld2hlcmVcbnZhciBTaGFyZWRBcnJheUJ1ZmZlckNvcHkgPSB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnID8gU2hhcmVkQXJyYXlCdWZmZXIgOiB1bmRlZmluZWQ7XG5mdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgU2hhcmVkQXJyYXlCdWZmZXJdJztcbn1cbmZ1bmN0aW9uIGlzU2hhcmVkQXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlckNvcHkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcud29ya2luZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcud29ya2luZyA9IGlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZyhuZXcgU2hhcmVkQXJyYXlCdWZmZXJDb3B5KCkpO1xuICB9XG5cbiAgcmV0dXJuIGlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcodmFsdWUpXG4gICAgOiB2YWx1ZSBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyQ29weTtcbn1cbmV4cG9ydHMuaXNTaGFyZWRBcnJheUJ1ZmZlciA9IGlzU2hhcmVkQXJyYXlCdWZmZXI7XG5cbmZ1bmN0aW9uIGlzQXN5bmNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXSc7XG59XG5leHBvcnRzLmlzQXN5bmNGdW5jdGlvbiA9IGlzQXN5bmNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNNYXBJdGVyYXRvcih2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBNYXAgSXRlcmF0b3JdJztcbn1cbmV4cG9ydHMuaXNNYXBJdGVyYXRvciA9IGlzTWFwSXRlcmF0b3I7XG5cbmZ1bmN0aW9uIGlzU2V0SXRlcmF0b3IodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgU2V0IEl0ZXJhdG9yXSc7XG59XG5leHBvcnRzLmlzU2V0SXRlcmF0b3IgPSBpc1NldEl0ZXJhdG9yO1xuXG5mdW5jdGlvbiBpc0dlbmVyYXRvck9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBHZW5lcmF0b3JdJztcbn1cbmV4cG9ydHMuaXNHZW5lcmF0b3JPYmplY3QgPSBpc0dlbmVyYXRvck9iamVjdDtcblxuZnVuY3Rpb24gaXNXZWJBc3NlbWJseUNvbXBpbGVkTW9kdWxlKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYkFzc2VtYmx5Lk1vZHVsZV0nO1xufVxuZXhwb3J0cy5pc1dlYkFzc2VtYmx5Q29tcGlsZWRNb2R1bGUgPSBpc1dlYkFzc2VtYmx5Q29tcGlsZWRNb2R1bGU7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjaGVja0JveGVkUHJpbWl0aXZlKHZhbHVlLCBudW1iZXJWYWx1ZSk7XG59XG5leHBvcnRzLmlzTnVtYmVyT2JqZWN0ID0gaXNOdW1iZXJPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjaGVja0JveGVkUHJpbWl0aXZlKHZhbHVlLCBzdHJpbmdWYWx1ZSk7XG59XG5leHBvcnRzLmlzU3RyaW5nT2JqZWN0ID0gaXNTdHJpbmdPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgYm9vbGVhblZhbHVlKTtcbn1cbmV4cG9ydHMuaXNCb29sZWFuT2JqZWN0ID0gaXNCb29sZWFuT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0JpZ0ludE9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gQmlnSW50U3VwcG9ydGVkICYmIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIGJpZ0ludFZhbHVlKTtcbn1cbmV4cG9ydHMuaXNCaWdJbnRPYmplY3QgPSBpc0JpZ0ludE9iamVjdDtcblxuZnVuY3Rpb24gaXNTeW1ib2xPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIFN5bWJvbFN1cHBvcnRlZCAmJiBjaGVja0JveGVkUHJpbWl0aXZlKHZhbHVlLCBzeW1ib2xWYWx1ZSk7XG59XG5leHBvcnRzLmlzU3ltYm9sT2JqZWN0ID0gaXNTeW1ib2xPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzQm94ZWRQcmltaXRpdmUodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICBpc051bWJlck9iamVjdCh2YWx1ZSkgfHxcbiAgICBpc1N0cmluZ09iamVjdCh2YWx1ZSkgfHxcbiAgICBpc0Jvb2xlYW5PYmplY3QodmFsdWUpIHx8XG4gICAgaXNCaWdJbnRPYmplY3QodmFsdWUpIHx8XG4gICAgaXNTeW1ib2xPYmplY3QodmFsdWUpXG4gICk7XG59XG5leHBvcnRzLmlzQm94ZWRQcmltaXRpdmUgPSBpc0JveGVkUHJpbWl0aXZlO1xuXG5mdW5jdGlvbiBpc0FueUFycmF5QnVmZmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgKFxuICAgIGlzQXJyYXlCdWZmZXIodmFsdWUpIHx8XG4gICAgaXNTaGFyZWRBcnJheUJ1ZmZlcih2YWx1ZSlcbiAgKTtcbn1cbmV4cG9ydHMuaXNBbnlBcnJheUJ1ZmZlciA9IGlzQW55QXJyYXlCdWZmZXI7XG5cblsnaXNQcm94eScsICdpc0V4dGVybmFsJywgJ2lzTW9kdWxlTmFtZXNwYWNlT2JqZWN0J10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG1ldGhvZCwge1xuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXRob2QgKyAnIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdXNlcmxhbmQnKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyB8fFxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaikge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB2YXIgZGVzY3JpcHRvcnMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlc2NyaXB0b3JzW2tleXNbaV1dID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gZGVzY3JpcHRvcnM7XG4gIH07XG5cbnZhciBmb3JtYXRSZWdFeHAgPSAvJVtzZGolXS9nO1xuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihmKSB7XG4gIGlmICghaXNTdHJpbmcoZikpIHtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpO1xuICB9XG5cbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggPT09ICclJScpIHJldHVybiAnJSc7XG4gICAgaWYgKGkgPj0gbGVuKSByZXR1cm4geDtcbiAgICBzd2l0Y2ggKHgpIHtcbiAgICAgIGNhc2UgJyVzJzogcmV0dXJuIFN0cmluZyhhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWQnOiByZXR1cm4gTnVtYmVyKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclaic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZ3NbaSsrXSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gIH0pO1xuICBmb3IgKHZhciB4ID0gYXJnc1tpXTsgaSA8IGxlbjsgeCA9IGFyZ3NbKytpXSkge1xuICAgIGlmIChpc051bGwoeCkgfHwgIWlzT2JqZWN0KHgpKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyICs9ICcgJyArIGluc3BlY3QoeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG5cbi8vIE1hcmsgdGhhdCBhIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4vLyBSZXR1cm5zIGEgbW9kaWZpZWQgZnVuY3Rpb24gd2hpY2ggd2FybnMgb25jZSBieSBkZWZhdWx0LlxuLy8gSWYgLS1uby1kZXByZWNhdGlvbiBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbmV4cG9ydHMuZGVwcmVjYXRlID0gZnVuY3Rpb24oZm4sIG1zZykge1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAocHJvY2Vzcy50aHJvd0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLnRyYWNlRGVwcmVjYXRpb24pIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn07XG5cblxudmFyIGRlYnVncyA9IHt9O1xudmFyIGRlYnVnRW52UmVnZXggPSAvXiQvO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRykge1xuICB2YXIgZGVidWdFbnYgPSBwcm9jZXNzLmVudi5OT0RFX0RFQlVHO1xuICBkZWJ1Z0VudiA9IGRlYnVnRW52LnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrPy5dL2csICdcXFxcJCYnKVxuICAgIC5yZXBsYWNlKC9cXCovZywgJy4qJylcbiAgICAucmVwbGFjZSgvLC9nLCAnJHxeJylcbiAgICAudG9VcHBlckNhc2UoKTtcbiAgZGVidWdFbnZSZWdleCA9IG5ldyBSZWdFeHAoJ14nICsgZGVidWdFbnYgKyAnJCcsICdpJyk7XG59XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKGRlYnVnRW52UmVnZXgudGVzdChzZXQpKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnNsaWNlKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMSwgLTEpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmV4cG9ydHMudHlwZXMgPSByZXF1aXJlKCcuL3N1cHBvcnQvdHlwZXMnKTtcblxuZnVuY3Rpb24gaXNBcnJheShhcikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcik7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuXG5mdW5jdGlvbiBpc0Jvb2xlYW4oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnYm9vbGVhbic7XG59XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcblxuZnVuY3Rpb24gaXNOdWxsKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGwgPSBpc051bGw7XG5cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsT3JVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N0cmluZyc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbmZ1bmN0aW9uIGlzU3ltYm9sKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCc7XG59XG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKHJlKSB7XG4gIHJldHVybiBpc09iamVjdChyZSkgJiYgb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcbmV4cG9ydHMudHlwZXMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBpc09iamVjdChkKSAmJiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5leHBvcnRzLnR5cGVzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJlxuICAgICAgKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuZXhwb3J0cy50eXBlcy5pc05hdGl2ZUVycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IHJlcXVpcmUoJy4vc3VwcG9ydC9pc0J1ZmZlcicpO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5cblxuZnVuY3Rpb24gcGFkKG4pIHtcbiAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4udG9TdHJpbmcoMTApIDogbi50b1N0cmluZygxMCk7XG59XG5cblxudmFyIG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLFxuICAgICAgICAgICAgICAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuLy8gMjYgRmViIDE2OjE5OjM0XG5mdW5jdGlvbiB0aW1lc3RhbXAoKSB7XG4gIHZhciBkID0gbmV3IERhdGUoKTtcbiAgdmFyIHRpbWUgPSBbcGFkKGQuZ2V0SG91cnMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldE1pbnV0ZXMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldFNlY29uZHMoKSldLmpvaW4oJzonKTtcbiAgcmV0dXJuIFtkLmdldERhdGUoKSwgbW9udGhzW2QuZ2V0TW9udGgoKV0sIHRpbWVdLmpvaW4oJyAnKTtcbn1cblxuXG4vLyBsb2cgaXMganVzdCBhIHRoaW4gd3JhcHBlciB0byBjb25zb2xlLmxvZyB0aGF0IHByZXBlbmRzIGEgdGltZXN0YW1wXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnJXMgLSAlcycsIHRpbWVzdGFtcCgpLCBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpKTtcbn07XG5cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXIuXG4gKlxuICogVGhlIEZ1bmN0aW9uLnByb3RvdHlwZS5pbmhlcml0cyBmcm9tIGxhbmcuanMgcmV3cml0dGVuIGFzIGEgc3RhbmRhbG9uZVxuICogZnVuY3Rpb24gKG5vdCBvbiBGdW5jdGlvbi5wcm90b3R5cGUpLiBOT1RFOiBJZiB0aGlzIGZpbGUgaXMgdG8gYmUgbG9hZGVkXG4gKiBkdXJpbmcgYm9vdHN0cmFwcGluZyB0aGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIHJld3JpdHRlbiB1c2luZyBzb21lIG5hdGl2ZVxuICogZnVuY3Rpb25zIGFzIHByb3RvdHlwZSBzZXR1cCB1c2luZyBub3JtYWwgSmF2YVNjcmlwdCBkb2VzIG5vdCB3b3JrIGFzXG4gKiBleHBlY3RlZCBkdXJpbmcgYm9vdHN0cmFwcGluZyAoc2VlIG1pcnJvci5qcyBpbiByMTE0OTAzKS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlXG4gKiAgICAgcHJvdG90eXBlLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGluaGVyaXQgcHJvdG90eXBlIGZyb20uXG4gKi9cbmV4cG9ydHMuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5leHBvcnRzLl9leHRlbmQgPSBmdW5jdGlvbihvcmlnaW4sIGFkZCkge1xuICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhZGQgaXNuJ3QgYW4gb2JqZWN0XG4gIGlmICghYWRkIHx8ICFpc09iamVjdChhZGQpKSByZXR1cm4gb3JpZ2luO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXTtcbiAgfVxuICByZXR1cm4gb3JpZ2luO1xufTtcblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxudmFyIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnID8gU3ltYm9sKCd1dGlsLnByb21pc2lmeS5jdXN0b20nKSA6IHVuZGVmaW5lZDtcblxuZXhwb3J0cy5wcm9taXNpZnkgPSBmdW5jdGlvbiBwcm9taXNpZnkob3JpZ2luYWwpIHtcbiAgaWYgKHR5cGVvZiBvcmlnaW5hbCAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJvcmlnaW5hbFwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuXG4gIGlmIChrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wgJiYgb3JpZ2luYWxba0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXSkge1xuICAgIHZhciBmbiA9IG9yaWdpbmFsW2tDdXN0b21Qcm9taXNpZmllZFN5bWJvbF07XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwidXRpbC5wcm9taXNpZnkuY3VzdG9tXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sLCB7XG4gICAgICB2YWx1ZTogZm4sIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZuKCkge1xuICAgIHZhciBwcm9taXNlUmVzb2x2ZSwgcHJvbWlzZVJlamVjdDtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHByb21pc2VSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIHByb21pc2VSZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG5cbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG4gICAgYXJncy5wdXNoKGZ1bmN0aW9uIChlcnIsIHZhbHVlKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHByb21pc2VSZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2VSZXNvbHZlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHByb21pc2VSZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihmbiwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9yaWdpbmFsKSk7XG5cbiAgaWYgKGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wsIHtcbiAgICB2YWx1ZTogZm4sIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFxuICAgIGZuLFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob3JpZ2luYWwpXG4gICk7XG59XG5cbmV4cG9ydHMucHJvbWlzaWZ5LmN1c3RvbSA9IGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbFxuXG5mdW5jdGlvbiBjYWxsYmFja2lmeU9uUmVqZWN0ZWQocmVhc29uLCBjYikge1xuICAvLyBgIXJlYXNvbmAgZ3VhcmQgaW5zcGlyZWQgYnkgYmx1ZWJpcmQgKFJlZjogaHR0cHM6Ly9nb28uZ2wvdDVJUzZNKS5cbiAgLy8gQmVjYXVzZSBgbnVsbGAgaXMgYSBzcGVjaWFsIGVycm9yIHZhbHVlIGluIGNhbGxiYWNrcyB3aGljaCBtZWFucyBcIm5vIGVycm9yXG4gIC8vIG9jY3VycmVkXCIsIHdlIGVycm9yLXdyYXAgc28gdGhlIGNhbGxiYWNrIGNvbnN1bWVyIGNhbiBkaXN0aW5ndWlzaCBiZXR3ZWVuXG4gIC8vIFwidGhlIHByb21pc2UgcmVqZWN0ZWQgd2l0aCBudWxsXCIgb3IgXCJ0aGUgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aCB1bmRlZmluZWRcIi5cbiAgaWYgKCFyZWFzb24pIHtcbiAgICB2YXIgbmV3UmVhc29uID0gbmV3IEVycm9yKCdQcm9taXNlIHdhcyByZWplY3RlZCB3aXRoIGEgZmFsc3kgdmFsdWUnKTtcbiAgICBuZXdSZWFzb24ucmVhc29uID0gcmVhc29uO1xuICAgIHJlYXNvbiA9IG5ld1JlYXNvbjtcbiAgfVxuICByZXR1cm4gY2IocmVhc29uKTtcbn1cblxuZnVuY3Rpb24gY2FsbGJhY2tpZnkob3JpZ2luYWwpIHtcbiAgaWYgKHR5cGVvZiBvcmlnaW5hbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcIm9yaWdpbmFsXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gIH1cblxuICAvLyBXZSBETyBOT1QgcmV0dXJuIHRoZSBwcm9taXNlIGFzIGl0IGdpdmVzIHRoZSB1c2VyIGEgZmFsc2Ugc2Vuc2UgdGhhdFxuICAvLyB0aGUgcHJvbWlzZSBpcyBhY3R1YWxseSBzb21laG93IHJlbGF0ZWQgdG8gdGhlIGNhbGxiYWNrJ3MgZXhlY3V0aW9uXG4gIC8vIGFuZCB0aGF0IHRoZSBjYWxsYmFjayB0aHJvd2luZyB3aWxsIHJlamVjdCB0aGUgcHJvbWlzZS5cbiAgZnVuY3Rpb24gY2FsbGJhY2tpZmllZCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgbWF5YmVDYiA9IGFyZ3MucG9wKCk7XG4gICAgaWYgKHR5cGVvZiBtYXliZUNiICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGFzdCBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG1heWJlQ2IuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIC8vIEluIHRydWUgbm9kZSBzdHlsZSB3ZSBwcm9jZXNzIHRoZSBjYWxsYmFjayBvbiBgbmV4dFRpY2tgIHdpdGggYWxsIHRoZVxuICAgIC8vIGltcGxpY2F0aW9ucyAoc3RhY2ssIGB1bmNhdWdodEV4Y2VwdGlvbmAsIGBhc3luY19ob29rc2ApXG4gICAgb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJldCkgeyBwcm9jZXNzLm5leHRUaWNrKGNiLmJpbmQobnVsbCwgbnVsbCwgcmV0KSkgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlaikgeyBwcm9jZXNzLm5leHRUaWNrKGNhbGxiYWNraWZ5T25SZWplY3RlZC5iaW5kKG51bGwsIHJlaiwgY2IpKSB9KTtcbiAgfVxuXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihjYWxsYmFja2lmaWVkLCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3JpZ2luYWwpKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY2FsbGJhY2tpZmllZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvcmlnaW5hbCkpO1xuICByZXR1cm4gY2FsbGJhY2tpZmllZDtcbn1cbmV4cG9ydHMuY2FsbGJhY2tpZnkgPSBjYWxsYmFja2lmeTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZvckVhY2ggPSByZXF1aXJlKCdmb3ItZWFjaCcpO1xudmFyIGF2YWlsYWJsZVR5cGVkQXJyYXlzID0gcmVxdWlyZSgnYXZhaWxhYmxlLXR5cGVkLWFycmF5cycpO1xudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kJyk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1ib3VuZCcpO1xudmFyIGdPUEQgPSByZXF1aXJlKCdnb3BkJyk7XG52YXIgZ2V0UHJvdG8gPSByZXF1aXJlKCdnZXQtcHJvdG8nKTtcblxudmFyICR0b1N0cmluZyA9IGNhbGxCb3VuZCgnT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZycpO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gcmVxdWlyZSgnaGFzLXRvc3RyaW5ndGFnL3NoYW1zJykoKTtcblxudmFyIGcgPSB0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiBnbG9iYWxUaGlzO1xudmFyIHR5cGVkQXJyYXlzID0gYXZhaWxhYmxlVHlwZWRBcnJheXMoKTtcblxudmFyICRzbGljZSA9IGNhbGxCb3VuZCgnU3RyaW5nLnByb3RvdHlwZS5zbGljZScpO1xuXG4vKiogQHR5cGUgezxUID0gdW5rbm93bj4oYXJyYXk6IHJlYWRvbmx5IFRbXSwgdmFsdWU6IHVua25vd24pID0+IG51bWJlcn0gKi9cbnZhciAkaW5kZXhPZiA9IGNhbGxCb3VuZCgnQXJyYXkucHJvdG90eXBlLmluZGV4T2YnLCB0cnVlKSB8fCBmdW5jdGlvbiBpbmRleE9mKGFycmF5LCB2YWx1ZSkge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAtMTtcbn07XG5cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3R5cGVzJykuR2V0dGVyfSBHZXR0ZXIgKi9cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL3R5cGVzJykuQ2FjaGV9ICovXG52YXIgY2FjaGUgPSB7IF9fcHJvdG9fXzogbnVsbCB9O1xuaWYgKGhhc1RvU3RyaW5nVGFnICYmIGdPUEQgJiYgZ2V0UHJvdG8pIHtcblx0Zm9yRWFjaCh0eXBlZEFycmF5cywgZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0XHR2YXIgYXJyID0gbmV3IGdbdHlwZWRBcnJheV0oKTtcblx0XHRpZiAoU3ltYm9sLnRvU3RyaW5nVGFnIGluIGFyciAmJiBnZXRQcm90bykge1xuXHRcdFx0dmFyIHByb3RvID0gZ2V0UHJvdG8oYXJyKTtcblx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgd29uJ3QgbmFycm93IGluc2lkZSBhIGNsb3N1cmVcblx0XHRcdHZhciBkZXNjcmlwdG9yID0gZ09QRChwcm90bywgU3ltYm9sLnRvU3RyaW5nVGFnKTtcblx0XHRcdGlmICghZGVzY3JpcHRvciAmJiBwcm90bykge1xuXHRcdFx0XHR2YXIgc3VwZXJQcm90byA9IGdldFByb3RvKHByb3RvKTtcblx0XHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUUyB3b24ndCBuYXJyb3cgaW5zaWRlIGEgY2xvc3VyZVxuXHRcdFx0XHRkZXNjcmlwdG9yID0gZ09QRChzdXBlclByb3RvLCBTeW1ib2wudG9TdHJpbmdUYWcpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUT0RPOiBmaXhcblx0XHRcdGNhY2hlWyckJyArIHR5cGVkQXJyYXldID0gY2FsbEJpbmQoZGVzY3JpcHRvci5nZXQpO1xuXHRcdH1cblx0fSk7XG59IGVsc2Uge1xuXHRmb3JFYWNoKHR5cGVkQXJyYXlzLCBmdW5jdGlvbiAodHlwZWRBcnJheSkge1xuXHRcdHZhciBhcnIgPSBuZXcgZ1t0eXBlZEFycmF5XSgpO1xuXHRcdHZhciBmbiA9IGFyci5zbGljZSB8fCBhcnIuc2V0O1xuXHRcdGlmIChmbikge1xuXHRcdFx0Y2FjaGVbXG5cdFx0XHRcdC8qKiBAdHlwZSB7YCQke2ltcG9ydCgnLicpLlR5cGVkQXJyYXlOYW1lfWB9ICovICgnJCcgKyB0eXBlZEFycmF5KVxuXHRcdFx0XSA9IC8qKiBAdHlwZSB7aW1wb3J0KCcuL3R5cGVzJykuQm91bmRTbGljZSB8IGltcG9ydCgnLi90eXBlcycpLkJvdW5kU2V0fSAqLyAoXG5cdFx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVE9ETyBGSVhNRVxuXHRcdFx0XHRjYWxsQmluZChmbilcblx0XHRcdCk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqIEB0eXBlIHsodmFsdWU6IG9iamVjdCkgPT4gZmFsc2UgfCBpbXBvcnQoJy4nKS5UeXBlZEFycmF5TmFtZX0gKi9cbnZhciB0cnlUeXBlZEFycmF5cyA9IGZ1bmN0aW9uIHRyeUFsbFR5cGVkQXJyYXlzKHZhbHVlKSB7XG5cdC8qKiBAdHlwZSB7UmV0dXJuVHlwZTx0eXBlb2YgdHJ5QWxsVHlwZWRBcnJheXM+fSAqLyB2YXIgZm91bmQgPSBmYWxzZTtcblx0Zm9yRWFjaChcblx0XHQvKiogQHR5cGUge1JlY29yZDxgXFwkJHtpbXBvcnQoJy4nKS5UeXBlZEFycmF5TmFtZX1gLCBHZXR0ZXI+fSAqLyAoY2FjaGUpLFxuXHRcdC8qKiBAdHlwZSB7KGdldHRlcjogR2V0dGVyLCBuYW1lOiBgXFwkJHtpbXBvcnQoJy4nKS5UeXBlZEFycmF5TmFtZX1gKSA9PiB2b2lkfSAqL1xuXHRcdGZ1bmN0aW9uIChnZXR0ZXIsIHR5cGVkQXJyYXkpIHtcblx0XHRcdGlmICghZm91bmQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIGEgdGhyb3cgaXMgZmluZSBoZXJlXG5cdFx0XHRcdFx0aWYgKCckJyArIGdldHRlcih2YWx1ZSkgPT09IHR5cGVkQXJyYXkpIHtcblx0XHRcdFx0XHRcdGZvdW5kID0gLyoqIEB0eXBlIHtpbXBvcnQoJy4nKS5UeXBlZEFycmF5TmFtZX0gKi8gKCRzbGljZSh0eXBlZEFycmF5LCAxKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7IC8qKi8gfVxuXHRcdFx0fVxuXHRcdH1cblx0KTtcblx0cmV0dXJuIGZvdW5kO1xufTtcblxuLyoqIEB0eXBlIHsodmFsdWU6IG9iamVjdCkgPT4gZmFsc2UgfCBpbXBvcnQoJy4nKS5UeXBlZEFycmF5TmFtZX0gKi9cbnZhciB0cnlTbGljZXMgPSBmdW5jdGlvbiB0cnlBbGxTbGljZXModmFsdWUpIHtcblx0LyoqIEB0eXBlIHtSZXR1cm5UeXBlPHR5cGVvZiB0cnlBbGxTbGljZXM+fSAqLyB2YXIgZm91bmQgPSBmYWxzZTtcblx0Zm9yRWFjaChcblx0XHQvKiogQHR5cGUge1JlY29yZDxgXFwkJHtpbXBvcnQoJy4nKS5UeXBlZEFycmF5TmFtZX1gLCBHZXR0ZXI+fSAqLyhjYWNoZSksXG5cdFx0LyoqIEB0eXBlIHsoZ2V0dGVyOiBHZXR0ZXIsIG5hbWU6IGBcXCQke2ltcG9ydCgnLicpLlR5cGVkQXJyYXlOYW1lfWApID0+IHZvaWR9ICovIGZ1bmN0aW9uIChnZXR0ZXIsIG5hbWUpIHtcblx0XHRcdGlmICghZm91bmQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIGEgdGhyb3cgaXMgZmluZSBoZXJlXG5cdFx0XHRcdFx0Z2V0dGVyKHZhbHVlKTtcblx0XHRcdFx0XHRmb3VuZCA9IC8qKiBAdHlwZSB7aW1wb3J0KCcuJykuVHlwZWRBcnJheU5hbWV9ICovICgkc2xpY2UobmFtZSwgMSkpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7IC8qKi8gfVxuXHRcdFx0fVxuXHRcdH1cblx0KTtcblx0cmV0dXJuIGZvdW5kO1xufTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSB7XG5cdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKCFoYXNUb1N0cmluZ1RhZykge1xuXHRcdC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuXHRcdHZhciB0YWcgPSAkc2xpY2UoJHRvU3RyaW5nKHZhbHVlKSwgOCwgLTEpO1xuXHRcdGlmICgkaW5kZXhPZih0eXBlZEFycmF5cywgdGFnKSA+IC0xKSB7XG5cdFx0XHRyZXR1cm4gdGFnO1xuXHRcdH1cblx0XHRpZiAodGFnICE9PSAnT2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHQvLyBub2RlIDwgMC42IGhpdHMgaGVyZSBvbiByZWFsIFR5cGVkIEFycmF5c1xuXHRcdHJldHVybiB0cnlTbGljZXModmFsdWUpO1xuXHR9XG5cdGlmICghZ09QRCkgeyByZXR1cm4gbnVsbDsgfSAvLyB1bmtub3duIGVuZ2luZVxuXHRyZXR1cm4gdHJ5VHlwZWRBcnJheXModmFsdWUpO1xufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vSlNcclxuY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZFwiKVxyXG5cclxuLy8gU0NTU1xyXG5pbXBvcnQgJy4uL3Njc3MvaG9tZS5zY3NzJyJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==