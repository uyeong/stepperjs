'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _Status = require('./Status');

var _Status2 = _interopRequireDefault(_Status);

var _linear = require('./easings/linear');

var _linear2 = _interopRequireDefault(_linear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stepper = function () {
    function Stepper() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Stepper);

        this.duration = options.duration || 0;
        this.easing = options.easing || _linear2.default;
        this.loop = options.loop || false;
        this.reverse = options.reverse || false;
        this.emitter = new _eventemitter2.default();
        this.status = new _Status2.default();
        this.pastTime = 0;
        this.rafId = 0;
    }

    _createClass(Stepper, [{
        key: 'option',
        value: function option(key, value) {
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
        }
    }, {
        key: 'on',
        value: function on() {
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
        }
    }, {
        key: 'off',
        value: function off() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            if (args.length === 0) {
                this.emitter.removeAllListeners();
            } else {
                this.emitter.off.apply(this.emitter, args);
            }

            return this;
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            if (this.duration === 0 || this.status.isPlaying()) {
                return;
            }

            var duration = this.duration;
            var easing = this.reverse ? function (n) {
                return 1 - _this.easing(n);
            } : function (n) {
                return 0 + _this.easing(n);
            };
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
                        _this.emitter.emit('update', easing(1));
                        _this.emitter.emit('ended');

                        return;
                    }
                }

                _this.emitter.emit('update', easing(progress));

                _this.pastTime = pastTime;
                _this.rafId = window.requestAnimationFrame(stepping);
            };

            this.status.play();
            this.emitter.emit('start');

            window.requestAnimationFrame(stepping);
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (this.status.isPaused()) {
                return;
            }

            window.cancelAnimationFrame(this.rafId);

            this.rafId = 0;
            this.status.pause();
            this.emitter.emit('paused');
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.status.isStopped()) {
                return;
            }

            window.cancelAnimationFrame(this.rafId);

            this.pastTime = 0;
            this.rafId = 0;
            this.status.stop();
            this.emitter.emit('stopped');
        }
    }]);

    return Stepper;
}();

exports.default = Stepper;