"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function inExpo(n) {
    return 0 == n ? 0 : Math.pow(1024, n - 1);
}

exports.default = inExpo;