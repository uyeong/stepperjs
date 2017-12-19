"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function inOutExpo(n) {
    if (0 == n) {
        return 0;
    } else if (1 == n) {
        return 1;
    } else if ((n *= 2) < 1) {
        return .5 * Math.pow(1024, n - 1);
    }

    return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
}

exports.default = inOutExpo;