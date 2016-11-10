import raf from 'raf';
import linear from './easings/linear';

class Stepper {
    constructor() {
        this.rafId = 0;
        this.stopped = null;
    }

    /**
     * Start a step of raf with easing.
     * @param {Object} options
     * @example
     * import Stepper from 'stepperjs';
     * import linear from 'stepperjs/dist/easings/linear';
     *
     * const stepper = new Stepper();
     *
     * stepper.start({
     *     duration: 300,
     *     easing: linear,
     *     loop: true,
     *     reverse: true,
     *     start: () => ... ,
     *     doing: (n) => ... ,
     *     ended: () => ... ,
     *     stopped: () => ...
     * });
     */
    start(options = {}) {
        const {
            duration = 0,
            easing = linear,
            loop = false,
            reverse = false,
            start = () => {},
            doing = () => {},
            ended = () => {},
            stopped = () => {}
        } = options;

        if (!duration) {
            return;
        }

        this.stopped = stopped;

        if (this.rafId) {
            this.stop();
        }

        const getNow = reverse ? (time => 0 + easing(time)) : (time => 1 - easing(time));

        let end = (+new Date()) + duration;
        const stepping = () => {
            const remaining = end - (+new Date());
            const time = remaining / duration;

            if (remaining < 0) {
                ended();
                this.rafId = 0;
                end = (+new Date()) + duration;

                if (!loop) {
                    return;
                }
            }

            doing(getNow(time));
            this.rafId = raf(stepping);
        };

        start();
        stepping();
    }

    stop() {
        if (!this.rafId) {
            return;
        }

        raf.cancel(this.rafId);
        this.rafId = 0;

        if (this.stopped) {
            this.stopped();
        }
    }
}

export default Stepper;
