"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function inOutSine(n) {
    return .5 * (1 - Math.cos(Math.PI * n));
}

exports.default = inOutSine;