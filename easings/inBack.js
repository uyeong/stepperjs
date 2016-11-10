"use strict";

function inBack(n) {
    var s = 1.70158;

    return n * n * ((s + 1) * n - s);
}

module.exports = inBack;