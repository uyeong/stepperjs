"use strict";

function outExpo(n) {
    return 1 == n ? n : 1 - Math.pow(2, -10 * n);
}

module.exports = outExpo;