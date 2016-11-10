'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _linear = require('./easings/linear');

var _linear2 = _interopRequireDefault(_linear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stepper = function () {
    function Stepper() {
        _classCallCheck(this, Stepper);

        this.rafId = 0;
        this.stopped = null;
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
     *     start: () => ... ,
     *     doing: (n) => ... ,
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
                _options$start = options.start,
                start = _options$start === undefined ? function () {} : _options$start,
                _options$doing = options.doing,
                doing = _options$doing === undefined ? function () {} : _options$doing,
                _options$ended = options.ended,
                ended = _options$ended === undefined ? function () {} : _options$ended,
                _options$stopped = options.stopped,
                stopped = _options$stopped === undefined ? function () {} : _options$stopped;


            if (!duration) {
                return;
            }

            this.stopped = stopped;

            if (this.rafId) {
                this.stop();
            }

            var end = +new Date() + duration;
            var stepping = function stepping() {
                var remaining = end - +new Date();
                var time = remaining / duration;

                if (remaining < 0) {
                    ended();
                    _this.rafId = 0;
                    end = +new Date() + duration;

                    if (!loop) {
                        return;
                    }
                }

                doing(1 - easing(time));
                _this.rafId = (0, _raf2.default)(stepping);
            };

            start();
            stepping();
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (!this.rafId) {
                return;
            }

            _raf2.default.cancel(this.rafId);
            this.rafId = 0;

            if (this.stopped) {
                this.stopped();
            }
        }
    }]);

    return Stepper;
}();

exports.default = Stepper;