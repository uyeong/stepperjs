'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inBounce = require('./inBounce');

var _inBounce2 = _interopRequireDefault(_inBounce);

var _outBounce = require('./outBounce');

var _outBounce2 = _interopRequireDefault(_outBounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inOutBounce(n) {
    if (n < .5) {
        return (0, _inBounce2.default)(n * 2) * .5;
    }

    return (0, _outBounce2.default)(n * 2 - 1) * .5 + .5;
}

exports.default = inOutBounce;