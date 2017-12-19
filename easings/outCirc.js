"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function outCirc(n) {
    return Math.sqrt(1 - --n * n);
}

exports.default = outCirc;