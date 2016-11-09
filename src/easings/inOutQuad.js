function inOutQuad(n) {
    n = n * 2;

    if (n < 1) {
        return 0.5 * n * n;
    }

    return - 0.5 * (--n * (n - 2) - 1);
}

module.exports = inOutQuad;
