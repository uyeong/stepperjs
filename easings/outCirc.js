"use strict";

function outCirc(n) {
    return Math.sqrt(1 - --n * n);
}

module.exports = outCirc;