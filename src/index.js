import Stepper from './Stepper';
let easings;

if (process.env.BROWSER) {
    easings = require('./easings');
}

module.exports = Stepper;
module.exports.easings = easings;
