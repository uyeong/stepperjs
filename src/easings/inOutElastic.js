function inOutElastic(n) {
    let s;
    let a = .1;
    const p = 0.4;

    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }

    if (!a || a < 1) {
        a = 1; s = p / 4;
    } else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    if (( n *= 2) < 1) {
        return - 0.5 * (a * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
    }

    return a * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p) * 0.5 + 1;
}

module.exports = inOutElastic;
