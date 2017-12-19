"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function inOutBack(n) {
    var s = 1.70158 * 1.525;

    if ((n *= 2) < 1) {
        return 0.5 * (n * n * ((s + 1) * n - s));
    }

    return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2);
}

exports.default = inOutBack;