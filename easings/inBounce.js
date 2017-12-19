'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _outBounce = require('./outBounce');

var _outBounce2 = _interopRequireDefault(_outBounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inBounce(n) {
    return 1 - (0, _outBounce2.default)(1 - n);
}

exports.default = inBounce;