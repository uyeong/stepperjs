"use strict";

function inOutSine(n) {
    return .5 * (1 - Math.cos(Math.PI * n));
}

module.exports = inOutSine;