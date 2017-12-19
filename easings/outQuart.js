"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function outQuart(n) {
    return 1 - --n * n * n * n;
}

exports.default = outQuart;