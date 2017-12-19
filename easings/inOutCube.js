"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function inOutCube(n) {
    n = n * 2;

    if (n < 1) {
        return 0.5 * n * n * n;
    }

    return 0.5 * ((n -= 2) * n * n + 2);
}

exports.default = inOutCube;