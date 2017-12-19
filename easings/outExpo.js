"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function outExpo(n) {
    return 1 == n ? n : 1 - Math.pow(2, -10 * n);
}

exports.default = outExpo;