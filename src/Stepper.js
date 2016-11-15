import raf from 'raf';
import Status from './Status';
import linear from './easings/linear';

class Stepper {
    constructor() {
        this.rafId = 0;
        this.pastTime = 0;
        this.status = new Status();
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

        this.fnStopped = stopped;

        const getNow = reverse ? (time => 1 - easing(time)) : (time => 0 + easing(time));
        let startTime = (+new Date()) - this.pastTime;
        const stepping = () => {
            const pastTime = (+new Date()) - startTime;
            const progress = pastTime / duration;
            if (this.status.isPaused()) {
                // Cache past time for replay.
                this.pastTime = pastTime;
                this.rafId = 0;

                raf.cancel(this.rafId);
                paused();

                return;
            }

            if (pastTime >= duration) {
                if (loop) {
                    startTime = (+new Date());
                } else {
                    this.pastTime = 0;
                    this.rafId = 0;

                    this.status.stop();

                    ended();

                    return;
                }
            }

            doing(getNow(progress));
            this.rafId = raf(stepping);
        };

        this.status.play();

        start();
        stepping();
    }

    pause() {
        this.status.pause();
    }

    stop() {
        if (this.status.stop()) {
            raf.cancel(this.rafId);

            this.pastTime = 0;
            this.rafId = 0;

            if (this.fnStopped) {
                this.fnStopped();
            }
        }
    }
}

export default Stepper;
