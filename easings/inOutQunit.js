"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function inOutQuint(n) {
    n = n * 2;

    if (n < 1) {
        return 0.5 * n * n * n * n * n;
    }

    return 0.5 * ((n -= 2) * n * n * n * n + 2);
}

exports.default = inOutQuint;