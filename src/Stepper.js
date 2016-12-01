import raf from 'raf';
import Status from './Status';
import linear from './easings/linear';

class Stepper {
    constructor() {
        this.rafId = 0;
        this.pastTime = 0;
        this.status = new Status();
        this.fnPaused = null;
        this.fnStopped = null;
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
     *     paused = () => ... ,
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
            paused = () => {},
            ended = () => {},
            stopped = () => {}
        } = options;

        if (duration === 0 || this.status.isPlaying()) {
            return;
        }

        this.fnPaused = paused;
        this.fnStopped = stopped;

        const getNow = reverse ? (time => 1 - easing(time)) : (time => 0 + easing(time));
        let startTime = 0;

        const stepping = (timestamp) => {
            if (!startTime) {
                startTime = timestamp - this.pastTime;
            }

            const pastTime = timestamp - startTime;
            const progress = pastTime / duration;

            if (pastTime >= duration) {
                if (loop) {
                    startTime = timestamp;
                } else {
                    this.pastTime = 0;
                    this.rafId = 0;
                    this.status.stop();

                    ended();

                    return;
                }
            }

            doing(getNow(progress));

            this.pastTime = pastTime;
            this.rafId = raf(stepping);
        };

        this.status.play();

        start();
        raf(stepping);
    }

    pause() {
        if (this.status.isPaused()) {
            return;
        }

        raf.cancel(this.rafId);

        this.rafId = 0;
        this.status.pause();

        if (this.fnPaused) {
            this.fnPaused();
        }
    }

    stop() {
        if (this.status.isStopped()) {
            return;
        }

        raf.cancel(this.rafId);

        this.pastTime = 0;
        this.rafId = 0;
        this.status.stop();

        if (this.fnStopped) {
            this.fnStopped();
        }
    }
}

export default Stepper;
