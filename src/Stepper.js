import raf from 'raf';
import linear from './easings/linear';

class Stepper {

    /**
     * Start a step of raf with easing.
     * @param {Object} options
     * @example
     * import Stepper from 'stepperjs';
     * import linear from 'stepperjs/easings/linear';
     *
     * const stepper = new Stepper();
     *
     * stepper.start({
     *     duration: 300,
     *     easing: linear,
     *     start: () => ... ,
     *     doing: (n) => ... ,
     *     ended: () => ...
     * });
     */
    start(options = {}) {
        const {
            duration = 0,
            easing = linear,
            start = () => {},
            doing = () => {},
            ended = () => {}
        } = options;

        if (!duration) {
            return;
        }

        const end = (+new Date()) + duration;
        const stepping = () => {
            const remaining = end - (+new Date());
            const time = remaining / duration;

            if (remaining < 0) {
                ended();
                return;
            }

            doing(1 - easing(time));
            raf(stepping);
        };

        start();
        stepping();
    }
}

export default Stepper;
