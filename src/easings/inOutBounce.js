import inBounce from './inBounce';
import outBounce from './outBounce';

function inOutBounce(n) {
    if (n < .5) {
        return inBounce(n * 2) * .5;
    }

    return outBounce(n * 2 - 1) * .5 + .5;
}

module.exports = inOutBounce;
