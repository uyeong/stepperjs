import outBounce from './outBounce';

function inBounce(n) {
    return 1 - outBounce(1 - n);
}

export default inBounce;
