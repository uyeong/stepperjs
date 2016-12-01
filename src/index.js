import raf from 'raf';
import Stepper from './Stepper';

raf.polyfill();

let easings;

if (process.env.BROWSER) {
    easings = require('./easings');
}

module.exports = Stepper;
module.exports.easings = easings;
