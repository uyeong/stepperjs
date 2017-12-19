"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function outElastic(n) {
    var s = void 0;
    var a = .1;
    var p = .4;

    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }

    if (!a || a < 1) {
        a = 1;
        s = p / 4;
    } else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    return a * Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
}

exports.default = outElastic;