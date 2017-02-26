function inOutCirc(n) {
    n = n * 2;
    if (n < 1) {
        return -0.5 * (Math.sqrt(1 - n * n) - 1);
    }

    return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
}

export default inOutCirc;
