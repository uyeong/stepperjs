"use strict";

function outBack(n) {
    var s = 1.70158;

    return --n * n * ((s + 1) * n + s) + 1;
}

module.exports = outBack;