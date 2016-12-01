'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _Status = require('./Status');

var _Status2 = _interopRequireDefault(_Status);

var _linear = require('./easings/linear');

var _linear2 = _interopRequireDefault(_linear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stepper = function () {
    function Stepper() {
        _classCallCheck(this, Stepper);

        this.rafId = 0;
        this.pastTime = 0;
        this.status = new _Status2.default();
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


    _createClass(Stepper, [{
        key: 'start',
        value: function start() {
            var _this = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var _options$duration = options.duration,
                duration = _options$duration === undefined ? 0 : _options$duration,
                _options$easing = options.easing,
                easing = _options$easing === undefined ? _linear2.default : _options$easing,
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
                _this.rafId = (0, _raf2.default)(stepping);
            };

            this.status.play();

            start();
            stepping();
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (this.status.isPaused()) {
                return;
            }

            _raf2.default.cancel(this.rafId);

            this.rafId = 0;
            this.status.pause();

            if (this.fnPaused) {
                this.fnPaused();
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.status.isStopped()) {
                return;
            }

            _raf2.default.cancel(this.rafId);

            this.pastTime = 0;
            this.rafId = 0;
            this.status.stop();

            if (this.fnStopped) {
                this.fnStopped();
            }
        }
    }]);

    return Stepper;
}();

exports.default = Stepper;