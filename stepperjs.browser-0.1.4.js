(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["stepperjs"] = factory();
	else
		root["stepperjs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function outBounce(n) {
    if (n < 1 / 2.75) {
        return 7.5625 * n * n;
    } else if (n < 2 / 2.75) {
        return 7.5625 * (n -= 1.5 / 2.75) * n + .75;
    } else if (n < 2.5 / 2.75) {
        return 7.5625 * (n -= 2.25 / 2.75) * n + .9375;
    } else {
        return 7.5625 * (n -= 2.625 / 2.75) * n + .984375;
    }
}

exports["default"] = outBounce;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _outBounce = __webpack_require__(0);

var _outBounce2 = _interopRequireDefault(_outBounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function inBounce(n) {
    return 1 - (0, _outBounce2['default'])(1 - n);
}

exports['default'] = inBounce;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function linear(n) {
    return n;
}

exports["default"] = linear;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _eventemitter = __webpack_require__(36);

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _Status = __webpack_require__(7);

var _Status2 = _interopRequireDefault(_Status);

var _linear = __webpack_require__(2);

var _linear2 = _interopRequireDefault(_linear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var root = typeof window === 'undefined' ? global : window;

function blender(easing, reverse) {
    if (typeof easing === 'function') {
        return function (t) {
            return [reverse ? 1 - easing(t) : 0 + easing(t)];
        };
    }

    return function (t) {
        var result = [];

        for (var i = 0, n = easing.length; i < n; i++) {
            result.push(reverse ? 1 - easing[i](t) : 0 + easing[i](t));
        }

        return result;
    };
}

var Stepper = function () {
    function Stepper() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Stepper);

        this.duration = options.duration || 0;
        this.easing = options.easing || _linear2['default'];
        this.loop = options.loop || false;
        this.reverse = options.reverse || false;
        this.emitter = new _eventemitter2['default']();
        this.status = new _Status2['default']();
        this.pastTime = 0;
        this.rafId = 0;
    }

    Stepper.prototype.option = function option(key, value) {
        if (typeof key === 'string' && value === undefined) {
            return this[key];
        }

        if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object' && key.constructor === Object) {
            for (var name in key) {
                if (key.hasOwnProperty(name)) {
                    this[name] = key[name];
                }
            }
        } else {
            this[key] = value;
        }

        return this;
    };

    Stepper.prototype.on = function on() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var arg = args[0];

        if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg.constructor === Object) {
            for (var key in arg) {
                if (arg.hasOwnProperty(key)) {
                    this.emitter.on(key, arg[key]);
                }
            }
        } else {
            this.emitter.on.apply(this.emitter, args);
        }

        return this;
    };

    Stepper.prototype.off = function off() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        if (args.length === 0) {
            this.emitter.removeAllListeners();
        } else {
            this.emitter.off.apply(this.emitter, args);
        }

        return this;
    };

    Stepper.prototype.start = function start() {
        var _this = this;

        if (this.duration === 0 || this.status.isPlaying()) {
            return;
        }

        var duration = this.duration;
        var blend = blender(this.easing, this.reverse);
        var startTime = 0;

        var stepping = function stepping(timestamp) {
            if (!startTime) {
                startTime = timestamp - _this.pastTime;
            }

            var pastTime = timestamp - startTime;
            var progress = pastTime / duration;

            if (pastTime >= duration) {
                if (_this.loop) {
                    startTime = timestamp;
                } else {
                    _this.pastTime = 0;
                    _this.rafId = 0;
                    _this.status.stop();
                    _this.emitter.emit.apply(_this.emitter, ['update'].concat(blend(1)));
                    _this.emitter.emit('ended');

                    return;
                }
            }

            _this.emitter.emit.apply(_this.emitter, ['update'].concat(blend(progress)));

            _this.pastTime = pastTime;
            _this.rafId = root.requestAnimationFrame(stepping);
        };

        this.status.play();
        this.emitter.emit('start');

        root.requestAnimationFrame(stepping);
    };

    Stepper.prototype.pause = function pause() {
        if (this.status.isPaused()) {
            return;
        }

        window.cancelAnimationFrame(this.rafId);

        this.rafId = 0;
        this.status.pause();
        this.emitter.emit('paused');
    };

    Stepper.prototype.stop = function stop() {
        if (this.status.isStopped()) {
            return;
        }

        window.cancelAnimationFrame(this.rafId);

        this.pastTime = 0;
        this.rafId = 0;
        this.status.stop();
        this.emitter.emit('stopped');
    };

    return Stepper;
}();

exports['default'] = Stepper;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _linear = __webpack_require__(2);

var _linear2 = _interopRequireDefault(_linear);

var _inQuad = __webpack_require__(23);

var _inQuad2 = _interopRequireDefault(_inQuad);

var _outQuad = __webpack_require__(32);

var _outQuad2 = _interopRequireDefault(_outQuad);

var _inOutQuad = __webpack_require__(19);

var _inOutQuad2 = _interopRequireDefault(_inOutQuad);

var _inCube = __webpack_require__(10);

var _inCube2 = _interopRequireDefault(_inCube);

var _outCube = __webpack_require__(29);

var _outCube2 = _interopRequireDefault(_outCube);

var _inOutCube = __webpack_require__(16);

var _inOutCube2 = _interopRequireDefault(_inOutCube);

var _inQuart = __webpack_require__(24);

var _inQuart2 = _interopRequireDefault(_inQuart);

var _outQuart = __webpack_require__(33);

var _outQuart2 = _interopRequireDefault(_outQuart);

var _inOutQuart = __webpack_require__(20);

var _inOutQuart2 = _interopRequireDefault(_inOutQuart);

var _inQunit = __webpack_require__(25);

var _inQunit2 = _interopRequireDefault(_inQunit);

var _outQunit = __webpack_require__(34);

var _outQunit2 = _interopRequireDefault(_outQunit);

var _inOutQunit = __webpack_require__(21);

var _inOutQunit2 = _interopRequireDefault(_inOutQunit);

var _inSine = __webpack_require__(26);

var _inSine2 = _interopRequireDefault(_inSine);

var _outSine = __webpack_require__(35);

var _outSine2 = _interopRequireDefault(_outSine);

var _inOutSine = __webpack_require__(22);

var _inOutSine2 = _interopRequireDefault(_inOutSine);

var _inExpo = __webpack_require__(12);

var _inExpo2 = _interopRequireDefault(_inExpo);

var _outExpo = __webpack_require__(31);

var _outExpo2 = _interopRequireDefault(_outExpo);

var _inOutExpo = __webpack_require__(18);

var _inOutExpo2 = _interopRequireDefault(_inOutExpo);

var _inCirc = __webpack_require__(9);

var _inCirc2 = _interopRequireDefault(_inCirc);

var _outCirc = __webpack_require__(28);

var _outCirc2 = _interopRequireDefault(_outCirc);

var _inOutCirc = __webpack_require__(15);

var _inOutCirc2 = _interopRequireDefault(_inOutCirc);

var _inBack = __webpack_require__(8);

var _inBack2 = _interopRequireDefault(_inBack);

var _outBack = __webpack_require__(27);

var _outBack2 = _interopRequireDefault(_outBack);

var _inOutBack = __webpack_require__(13);

var _inOutBack2 = _interopRequireDefault(_inOutBack);

var _inBounce = __webpack_require__(1);

var _inBounce2 = _interopRequireDefault(_inBounce);

var _outBounce = __webpack_require__(0);

var _outBounce2 = _interopRequireDefault(_outBounce);

var _inOutBounce = __webpack_require__(14);

var _inOutBounce2 = _interopRequireDefault(_inOutBounce);

var _inElastic = __webpack_require__(11);

var _inElastic2 = _interopRequireDefault(_inElastic);

var _outElastic = __webpack_require__(30);

var _outElastic2 = _interopRequireDefault(_outElastic);

var _inOutElastic = __webpack_require__(17);

var _inOutElastic2 = _interopRequireDefault(_inOutElastic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
    linear: _linear2['default'], inQuad: _inQuad2['default'], outQuad: _outQuad2['default'], inOutQuad: _inOutQuad2['default'], inCube: _inCube2['default'],
    outCube: _outCube2['default'], inOutCube: _inOutCube2['default'], inQuart: _inQuart2['default'], outQuart: _outQuart2['default'], inOutQuart: _inOutQuart2['default'],
    inQunit: _inQunit2['default'], outQunit: _outQunit2['default'], inOutQunit: _inOutQunit2['default'], inSine: _inSine2['default'], outSine: _outSine2['default'],
    inOutSine: _inOutSine2['default'], inExpo: _inExpo2['default'], outExpo: _outExpo2['default'], inOutExpo: _inOutExpo2['default'], inCirc: _inCirc2['default'],
    outCirc: _outCirc2['default'], inOutCirc: _inOutCirc2['default'], inBack: _inBack2['default'], outBack: _outBack2['default'], inOutBack: _inOutBack2['default'],
    inBounce: _inBounce2['default'], outBounce: _outBounce2['default'], inOutBounce: _inOutBounce2['default'], inElastic: _inElastic2['default'], outElastic: _outElastic2['default'],
    inOutElastic: _inOutElastic2['default']
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(37)
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Status = function () {
    function Status() {
        _classCallCheck(this, Status);

        this.stopped = true;
        this.paused = false;
    }

    Status.prototype.play = function play() {
        this.stopped = false;
        this.paused = false;
    };

    Status.prototype.pause = function pause() {
        this.paused = true;
    };

    Status.prototype.stop = function stop() {
        this.stopped = true;
    };

    Status.prototype.isPlaying = function isPlaying() {
        return !this.stopped && !this.paused;
    };

    Status.prototype.isPaused = function isPaused() {
        return this.paused;
    };

    Status.prototype.isStopped = function isStopped() {
        return this.stopped;
    };

    return Status;
}();

exports["default"] = Status;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inBack(n) {
    var s = 1.70158;

    return n * n * ((s + 1) * n - s);
}

exports["default"] = inBack;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inCirc(n) {
    return 1 - Math.sqrt(1 - n * n);
}

exports["default"] = inCirc;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inCube(n) {
    return n * n * n;
}

exports["default"] = inCube;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inElastic(n) {
    var s = void 0;
    var a = .1;
    var p = 0.4;

    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }

    if (!a || a < 1) {
        a = 1;
        s = p / 4;
    } else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    return -(a * Math.pow(2, 10 * (n = n - 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
}

exports["default"] = inElastic;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inExpo(n) {
    return 0 == n ? 0 : Math.pow(1024, n - 1);
}

exports["default"] = inExpo;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inOutBack(n) {
    var s = 1.70158 * 1.525;

    if ((n *= 2) < 1) {
        return 0.5 * (n * n * ((s + 1) * n - s));
    }

    return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2);
}

exports["default"] = inOutBack;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _inBounce = __webpack_require__(1);

var _inBounce2 = _interopRequireDefault(_inBounce);

var _outBounce = __webpack_require__(0);

var _outBounce2 = _interopRequireDefault(_outBounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function inOutBounce(n) {
    if (n < .5) {
        return (0, _inBounce2['default'])(n * 2) * .5;
    }

    return (0, _outBounce2['default'])(n * 2 - 1) * .5 + .5;
}

exports['default'] = inOutBounce;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inOutCirc(n) {
    n = n * 2;
    if (n < 1) {
        return -0.5 * (Math.sqrt(1 - n * n) - 1);
    }

    return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
}

exports["default"] = inOutCirc;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inOutCube(n) {
    n = n * 2;

    if (n < 1) {
        return 0.5 * n * n * n;
    }

    return 0.5 * ((n -= 2) * n * n + 2);
}

exports["default"] = inOutCube;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inOutElastic(n) {
    var s = void 0;
    var a = .1;
    var p = 0.4;

    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }

    if (!a || a < 1) {
        a = 1;s = p / 4;
    } else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    if ((n *= 2) < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
    }

    return a * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p) * 0.5 + 1;
}

exports["default"] = inOutElastic;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inOutExpo(n) {
    if (0 == n) {
        return 0;
    } else if (1 == n) {
        return 1;
    } else if ((n *= 2) < 1) {
        return .5 * Math.pow(1024, n - 1);
    }

    return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
}

exports["default"] = inOutExpo;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inOutQuad(n) {
    n = n * 2;

    if (n < 1) {
        return 0.5 * n * n;
    }

    return -0.5 * (--n * (n - 2) - 1);
}

exports["default"] = inOutQuad;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inOutQuart(n) {
    n = n * 2;

    if (n < 1) {
        return 0.5 * n * n * n * n;
    }

    return -0.5 * ((n -= 2) * n * n * n - 2);
}

exports["default"] = inOutQuart;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inOutQuint(n) {
    n = n * 2;

    if (n < 1) {
        return 0.5 * n * n * n * n * n;
    }

    return 0.5 * ((n -= 2) * n * n * n * n + 2);
}

exports["default"] = inOutQuint;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inOutSine(n) {
    return .5 * (1 - Math.cos(Math.PI * n));
}

exports["default"] = inOutSine;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inQuad(n) {
    return n * n;
}

exports["default"] = inQuad;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inQuart(n) {
    return n * n * n * n;
}

exports["default"] = inQuart;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inQunit(n) {
    return n * n * n * n * n;
}

exports["default"] = inQunit;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function inSine(n) {
    return 1 - Math.cos(n * Math.PI / 2);
}

exports["default"] = inSine;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function outBack(n) {
    var s = 1.70158;

    return --n * n * ((s + 1) * n + s) + 1;
}

exports["default"] = outBack;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function outCirc(n) {
    return Math.sqrt(1 - --n * n);
}

exports["default"] = outCirc;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function outCube(n) {
    return --n * n * n + 1;
}

exports["default"] = outCube;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function outElastic(n) {
    var s = void 0;
    var a = .1;
    var p = .4;

    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }

    if (!a || a < 1) {
        a = 1;
        s = p / 4;
    } else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    return a * Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
}

exports["default"] = outElastic;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function outExpo(n) {
    return 1 == n ? n : 1 - Math.pow(2, -10 * n);
}

exports["default"] = outExpo;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function outQuad(n) {
    return n * (2 - n);
}

exports["default"] = outQuad;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function outQuart(n) {
    return 1 - --n * n * n * n;
}

exports["default"] = outQuart;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function outQunit(n) {
    return --n * n * n * n * n + 1;
}

exports["default"] = outQunit;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function outSine(n) {
    return Math.sin(n * Math.PI / 2);
}

exports["default"] = outSine;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38)))

/***/ }),
/* 38 */
/***/ (function(module, exports) {

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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _raf = __webpack_require__(6);

var _raf2 = _interopRequireDefault(_raf);

var _Stepper = __webpack_require__(4);

var _Stepper2 = _interopRequireDefault(_Stepper);

var _easings = __webpack_require__(5);

var _easings2 = _interopRequireDefault(_easings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_raf2['default'].polyfill();

module.exports.Stepper = _Stepper2['default'];
module.exports.easings = _easings2['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=stepperjs.browser-0.1.4.js.map