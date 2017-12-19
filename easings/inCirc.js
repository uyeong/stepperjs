"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function inCirc(n) {
    return 1 - Math.sqrt(1 - n * n);
}

exports.default = inCirc;