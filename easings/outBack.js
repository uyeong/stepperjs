"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function outBack(n) {
    var s = 1.70158;

    return --n * n * ((s + 1) * n + s) + 1;
}

exports.default = outBack;