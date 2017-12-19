'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

var _inQuad = require('./inQuad');

var _inQuad2 = _interopRequireDefault(_inQuad);

var _outQuad = require('./outQuad');

var _outQuad2 = _interopRequireDefault(_outQuad);

var _inOutQuad = require('./inOutQuad');

var _inOutQuad2 = _interopRequireDefault(_inOutQuad);

var _inCube = require('./inCube');

var _inCube2 = _interopRequireDefault(_inCube);

var _outCube = require('./outCube');

var _outCube2 = _interopRequireDefault(_outCube);

var _inOutCube = require('./inOutCube');

var _inOutCube2 = _interopRequireDefault(_inOutCube);

var _inQuart = require('./inQuart');

var _inQuart2 = _interopRequireDefault(_inQuart);

var _outQuart = require('./outQuart');

var _outQuart2 = _interopRequireDefault(_outQuart);

var _inOutQuart = require('./inOutQuart');

var _inOutQuart2 = _interopRequireDefault(_inOutQuart);

var _inQunit = require('./inQunit');

var _inQunit2 = _interopRequireDefault(_inQunit);

var _outQunit = require('./outQunit');

var _outQunit2 = _interopRequireDefault(_outQunit);

var _inOutQunit = require('./inOutQunit');

var _inOutQunit2 = _interopRequireDefault(_inOutQunit);

var _inSine = require('./inSine');

var _inSine2 = _interopRequireDefault(_inSine);

var _outSine = require('./outSine');

var _outSine2 = _interopRequireDefault(_outSine);

var _inOutSine = require('./inOutSine');

var _inOutSine2 = _interopRequireDefault(_inOutSine);

var _inExpo = require('./inExpo');

var _inExpo2 = _interopRequireDefault(_inExpo);

var _outExpo = require('./outExpo');

var _outExpo2 = _interopRequireDefault(_outExpo);

var _inOutExpo = require('./inOutExpo');

var _inOutExpo2 = _interopRequireDefault(_inOutExpo);

var _inCirc = require('./inCirc');

var _inCirc2 = _interopRequireDefault(_inCirc);

var _outCirc = require('./outCirc');

var _outCirc2 = _interopRequireDefault(_outCirc);

var _inOutCirc = require('./inOutCirc');

var _inOutCirc2 = _interopRequireDefault(_inOutCirc);

var _inBack = require('./inBack');

var _inBack2 = _interopRequireDefault(_inBack);

var _outBack = require('./outBack');

var _outBack2 = _interopRequireDefault(_outBack);

var _inOutBack = require('./inOutBack');

var _inOutBack2 = _interopRequireDefault(_inOutBack);

var _inBounce = require('./inBounce');

var _inBounce2 = _interopRequireDefault(_inBounce);

var _outBounce = require('./outBounce');

var _outBounce2 = _interopRequireDefault(_outBounce);

var _inOutBounce = require('./inOutBounce');

var _inOutBounce2 = _interopRequireDefault(_inOutBounce);

var _inElastic = require('./inElastic');

var _inElastic2 = _interopRequireDefault(_inElastic);

var _outElastic = require('./outElastic');

var _outElastic2 = _interopRequireDefault(_outElastic);

var _inOutElastic = require('./inOutElastic');

var _inOutElastic2 = _interopRequireDefault(_inOutElastic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    linear: _linear2.default, inQuad: _inQuad2.default, outQuad: _outQuad2.default, inOutQuad: _inOutQuad2.default, inCube: _inCube2.default,
    outCube: _outCube2.default, inOutCube: _inOutCube2.default, inQuart: _inQuart2.default, outQuart: _outQuart2.default, inOutQuart: _inOutQuart2.default,
    inQunit: _inQunit2.default, outQunit: _outQunit2.default, inOutQunit: _inOutQunit2.default, inSine: _inSine2.default, outSine: _outSine2.default,
    inOutSine: _inOutSine2.default, inExpo: _inExpo2.default, outExpo: _outExpo2.default, inOutExpo: _inOutExpo2.default, inCirc: _inCirc2.default,
    outCirc: _outCirc2.default, inOutCirc: _inOutCirc2.default, inBack: _inBack2.default, outBack: _outBack2.default, inOutBack: _inOutBack2.default,
    inBounce: _inBounce2.default, outBounce: _outBounce2.default, inOutBounce: _inOutBounce2.default, inElastic: _inElastic2.default, outElastic: _outElastic2.default,
    inOutElastic: _inOutElastic2.default
}; // Reference to Easing function(s).
// https://github.com/component/ease
// https://github.com/tweenjs/tween.js