(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Stepper"] = factory();
	else
		root["Stepper"] = factory();
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Stepper = __webpack_require__(1);
	
	var _Stepper2 = _interopRequireDefault(_Stepper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var easings = void 0;
	
	if (true) {
	    easings = __webpack_require__(7);
	}
	
	module.exports = _Stepper2['default'];
	module.exports.easings = easings;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _raf = __webpack_require__(2);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _Status = __webpack_require__(5);
	
	var _Status2 = _interopRequireDefault(_Status);
	
	var _linear = __webpack_require__(6);
	
	var _linear2 = _interopRequireDefault(_linear);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Stepper = function () {
	    function Stepper() {
	        _classCallCheck(this, Stepper);
	
	        this.rafId = 0;
	        this.pastTime = 0;
	        this.status = new _Status2['default']();
	        this.fnPaused = null;
	        this.fnStopped = null;
	    }
	
	    /**
	     * Start a step of raf with easing.
	     * @param {Object} options
	     * @example
	     * import Stepper from 'stepperjs';
	     * import linear from 'stepperjs/dist/easings/linear';
	     *
	     * const stepper = new Stepper();
	     *
	     * stepper.start({
	     *     duration: 300,
	     *     easing: linear,
	     *     loop: true,
	     *     reverse: true,
	     *     start: () => ... ,
	     *     doing: (n) => ... ,
	     *     paused = () => ... ,
	     *     ended: () => ... ,
	     *     stopped: () => ...
	     * });
	     */
	
	
	    Stepper.prototype.start = function start() {
	        var _this = this;
	
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        var _options$duration = options.duration,
	            duration = _options$duration === undefined ? 0 : _options$duration,
	            _options$easing = options.easing,
	            easing = _options$easing === undefined ? _linear2['default'] : _options$easing,
	            _options$loop = options.loop,
	            loop = _options$loop === undefined ? false : _options$loop,
	            _options$reverse = options.reverse,
	            reverse = _options$reverse === undefined ? false : _options$reverse,
	            _options$start = options.start,
	            start = _options$start === undefined ? function () {} : _options$start,
	            _options$doing = options.doing,
	            doing = _options$doing === undefined ? function () {} : _options$doing,
	            _options$paused = options.paused,
	            paused = _options$paused === undefined ? function () {} : _options$paused,
	            _options$ended = options.ended,
	            ended = _options$ended === undefined ? function () {} : _options$ended,
	            _options$stopped = options.stopped,
	            stopped = _options$stopped === undefined ? function () {} : _options$stopped;
	
	
	        if (duration === 0 || this.status.isPlaying()) {
	            return;
	        }
	
	        this.fnPaused = paused;
	        this.fnStopped = stopped;
	
	        var getNow = reverse ? function (time) {
	            return 1 - easing(time);
	        } : function (time) {
	            return 0 + easing(time);
	        };
	        var startTime = +new Date() - this.pastTime;
	        var stepping = function stepping() {
	            var pastTime = +new Date() - startTime;
	            var progress = pastTime / duration;
	
	            if (pastTime >= duration) {
	                if (loop) {
	                    startTime = +new Date();
	                } else {
	                    _this.pastTime = 0;
	                    _this.rafId = 0;
	                    _this.status.stop();
	
	                    ended();
	
	                    return;
	                }
	            }
	
	            doing(getNow(progress));
	
	            _this.pastTime = pastTime;
	            _this.rafId = (0, _raf2['default'])(stepping);
	        };
	
	        this.status.play();
	
	        start();
	        stepping();
	    };
	
	    Stepper.prototype.pause = function pause() {
	        if (this.status.isPaused()) {
	            return;
	        }
	
	        _raf2['default'].cancel(this.rafId);
	
	        this.rafId = 0;
	        this.status.pause();
	
	        if (this.fnPaused) {
	            this.fnPaused();
	        }
	    };
	
	    Stepper.prototype.stop = function stop() {
	        if (this.status.isStopped()) {
	            return;
	        }
	
	        _raf2['default'].cancel(this.rafId);
	
	        this.pastTime = 0;
	        this.rafId = 0;
	        this.status.stop();
	
	        if (this.fnStopped) {
	            this.fnStopped();
	        }
	    };
	
	    return Stepper;
	}();
	
	exports['default'] = Stepper;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(3)
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	function linear(n) {
	    return n;
	}
	
	module.exports = linear;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Reference to Easing function(s).
	// https://github.com/component/ease
	// https://github.com/tweenjs/tween.js
	module.exports = {
	    linear: __webpack_require__(6),
	    inQuad: __webpack_require__(8),
	    outQuad: __webpack_require__(9),
	    inOutQuad: __webpack_require__(10),
	    inCube: __webpack_require__(11),
	    outCube: __webpack_require__(12),
	    inOutCube: __webpack_require__(13),
	    inQuart: __webpack_require__(14),
	    outQuart: __webpack_require__(15),
	    inOutQuart: __webpack_require__(16),
	    inQunit: __webpack_require__(17),
	    outQunit: __webpack_require__(18),
	    inOutQunit: __webpack_require__(19),
	    inSine: __webpack_require__(20),
	    outSine: __webpack_require__(21),
	    inOutSine: __webpack_require__(22),
	    inExpo: __webpack_require__(23),
	    outExpo: __webpack_require__(24),
	    inOutExpo: __webpack_require__(25),
	    inCirc: __webpack_require__(26),
	    outCirc: __webpack_require__(27),
	    inOutCirc: __webpack_require__(28),
	    inBack: __webpack_require__(29),
	    outBack: __webpack_require__(30),
	    inOutBack: __webpack_require__(31),
	    inBounce: __webpack_require__(32),
	    outBounce: __webpack_require__(33),
	    inOutBounce: __webpack_require__(34),
	    inElastic: __webpack_require__(35),
	    outElastic: __webpack_require__(36),
	    inOutElastic: __webpack_require__(37)
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	function inQuad(n) {
	    return n * n;
	}
	
	module.exports = inQuad;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	function outQuad(n) {
	    return n * (2 - n);
	}
	
	module.exports = outQuad;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	function inOutQuad(n) {
	    n = n * 2;
	
	    if (n < 1) {
	        return 0.5 * n * n;
	    }
	
	    return -0.5 * (--n * (n - 2) - 1);
	}
	
	module.exports = inOutQuad;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	function inCube(n) {
	    return n * n * n;
	}
	
	module.exports = inCube;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	function outCube(n) {
	    return --n * n * n + 1;
	}
	
	module.exports = outCube;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	function inOutCube(n) {
	    n = n * 2;
	
	    if (n < 1) {
	        return 0.5 * n * n * n;
	    }
	
	    return 0.5 * ((n -= 2) * n * n + 2);
	}
	
	module.exports = inOutCube;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	function inQuart(n) {
	    return n * n * n * n;
	}
	
	module.exports = inQuart;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	function outQuart(n) {
	    return 1 - --n * n * n * n;
	}
	
	module.exports = outQuart;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	function inOutQuart(n) {
	    n = n * 2;
	
	    if (n < 1) {
	        return 0.5 * n * n * n * n;
	    }
	
	    return -0.5 * ((n -= 2) * n * n * n - 2);
	}
	
	module.exports = inOutQuart;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	function inQunit(n) {
	    return n * n * n * n * n;
	}
	
	module.exports = inQunit;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	function outQunit(n) {
	    return --n * n * n * n * n + 1;
	}
	
	module.exports = outQunit;

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	function inOutQuint(n) {
	    n = n * 2;
	
	    if (n < 1) {
	        return 0.5 * n * n * n * n * n;
	    }
	
	    return 0.5 * ((n -= 2) * n * n * n * n + 2);
	}
	
	module.exports = inOutQuint;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	function inSine(n) {
	    return 1 - Math.cos(n * Math.PI / 2);
	}
	
	module.exports = inSine;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	function outSine(n) {
	    return Math.sin(n * Math.PI / 2);
	}
	
	module.exports = outSine;

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	
	function inOutSine(n) {
	    return .5 * (1 - Math.cos(Math.PI * n));
	}
	
	module.exports = inOutSine;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	function inExpo(n) {
	    return 0 == n ? 0 : Math.pow(1024, n - 1);
	}
	
	module.exports = inExpo;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	
	function outExpo(n) {
	    return 1 == n ? n : 1 - Math.pow(2, -10 * n);
	}
	
	module.exports = outExpo;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	
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
	
	module.exports = inOutExpo;

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	function inCirc(n) {
	    return 1 - Math.sqrt(1 - n * n);
	}
	
	module.exports = inCirc;

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	function outCirc(n) {
	    return Math.sqrt(1 - --n * n);
	}
	
	module.exports = outCirc;

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	function inOutCirc(n) {
	    n = n * 2;
	    if (n < 1) {
	        return -0.5 * (Math.sqrt(1 - n * n) - 1);
	    }
	
	    return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
	}
	
	module.exports = inOutCirc;

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	
	function inBack(n) {
	    var s = 1.70158;
	
	    return n * n * ((s + 1) * n - s);
	}
	
	module.exports = inBack;

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	
	function outBack(n) {
	    var s = 1.70158;
	
	    return --n * n * ((s + 1) * n + s) + 1;
	}
	
	module.exports = outBack;

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	
	function inOutBack(n) {
	    var s = 1.70158 * 1.525;
	
	    if ((n *= 2) < 1) {
	        return 0.5 * (n * n * ((s + 1) * n - s));
	    }
	
	    return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2);
	}
	
	module.exports = inOutBack;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _outBounce = __webpack_require__(33);
	
	var _outBounce2 = _interopRequireDefault(_outBounce);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function inBounce(n) {
	    return 1 - (0, _outBounce2['default'])(1 - n);
	}
	
	module.exports = inBounce;

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	
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
	
	module.exports = outBounce;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inBounce = __webpack_require__(32);
	
	var _inBounce2 = _interopRequireDefault(_inBounce);
	
	var _outBounce = __webpack_require__(33);
	
	var _outBounce2 = _interopRequireDefault(_outBounce);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function inOutBounce(n) {
	    if (n < .5) {
	        return (0, _inBounce2['default'])(n * 2) * .5;
	    }
	
	    return (0, _outBounce2['default'])(n * 2 - 1) * .5 + .5;
	}
	
	module.exports = inOutBounce;

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	
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
	
	module.exports = inElastic;

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	
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
	
	module.exports = outElastic;

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
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
	
	module.exports = inOutElastic;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=stepperjs.browser-0.0.3.js.map