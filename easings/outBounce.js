"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function outBounce(n) {
    if (n < 1 / 2.75) {
        return 7.5625 * n * n;
    } else if (n < 2 / 2.75) {
        return 7.5625 * (n -= 1.5 / 2.75) * n + .75;
    } else if (n < 2.5 / 2.75) {
        return 7.5625 * (n -= 2.25 / 2.75) * n + .9375;
    } else {
        return 7.5625 * (n -= 2.625 / 2.75) * n + .984375;
    }
}

exports.default = outBounce;