import raf from 'raf';
import Stepper from './Stepper';
import easings from './easings';

raf.polyfill();

module.exports.Stepper = Stepper;
module.exports.easings = easings;
