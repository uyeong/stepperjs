'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _Stepper = require('./Stepper');

var _Stepper2 = _interopRequireDefault(_Stepper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_raf2.default.polyfill();

exports.default = _Stepper2.default;