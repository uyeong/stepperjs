import EventEmitter3 from 'eventemitter3';
import Status from './Status';
import linear from './easings/linear';

const root = typeof window === 'undefined' ? global : window;

function blender(easing, reverse) {
    if (typeof easing === 'function') {
        return (t) => [reverse ? 1 - easing(t) : 0 + easing(t)];
    }

    return (t) => {
        const result = [];

        for(let i = 0, n = easing.length; i < n; i++) {
            result.push(reverse ? 1 - easing[i](t) : 0 + easing[i](t));
        }

        return result;
    }
}

class Stepper {
    constructor(options = {}) {
        this.duration = options.duration || 0;
        this.easing = options.easing || linear;
        this.loop = options.loop || false;
        this.reverse = options.reverse || false;
        this.onceUpdate = [];
        this.emitter = new EventEmitter3();
        this.status = new Status();
        this.pastTime = 0;
        this.rafId = 0;
    }

    option(key, value) {
        if (typeof key === 'string' && value === undefined) {
            return this[key];
        }

        if (typeof key === 'object' && key.constructor === Object) {
            for (let name in key) {
                if (key.hasOwnProperty(name)) {
                    this[name] = key[name];
                }
            }
        } else {
            this[key] = value;
        }

        return this;
    }

    on(...args) {
        const arg = args[0];

        if (typeof arg === 'object' && arg.constructor === Object) {
            for (let key in arg) {
                if (arg.hasOwnProperty(key)) {
                    this.emitter.on(key, arg[key]);
                }
            }
        } else {
            this.emitter.on.apply(this.emitter, args);
        }

        return this;
    }

    once(...args) {
        const arg = args[0];

        if (typeof arg === 'object' && arg.constructor === Object) {
            for (let key in arg) {
                if (arg.hasOwnProperty(key)) {
                this.emitter[key === 'update' ? 'on' : 'once'](key, arg[key]);
                    if (key === 'update') {
                        this.onceUpdate.push([key, arg[key]]);
                    }
                }
            }
        } else {
            this.emitter[arg === 'update' ? 'on' : 'once'](...args);
            if (arg === 'update') {
                this.onceUpdate.push(args);
            }
        }

        return this;
    }

    off(...args) {
        if (args.length === 0) {
            this.emitter.removeAllListeners();
        } else {
            this.emitter.off.apply(this.emitter, args);
        }

        return this;
    }

    start() {
        if (this.duration === 0 || this.status.isPlaying()) {
            return;
        }

        const duration = this.duration;
        const blend = blender(this.easing, this.reverse);
        let startTime = 0;

        const stepping = (timestamp) => {
            if (!startTime) {
                startTime = timestamp - this.pastTime;
            }

            const pastTime = timestamp - startTime;
            const progress = pastTime / duration;

            if (pastTime >= duration) {
                this.emitter.emit.apply(this.emitter, ['update'].concat(blend(1)));

                if (this.loop) {
                    startTime = timestamp;
                } else {
                    this.pastTime = 0;
                    this.rafId = 0;
                    this.status.stop();
                    this.emitter.emit('done');
                    if (this.onceUpdate.length > 0) {
                        for(let i = 0, n = this.onceUpdate.length; i < n; i++) {
                            this.off(...this.onceUpdate.pop());
                        }
                    }
                    return;
                }
            } else {
                this.emitter.emit.apply(this.emitter, ['update'].concat(blend(progress)));
            }

            this.pastTime = pastTime;
            this.rafId = root.requestAnimationFrame(stepping);
        };

        this.status.play();
        this.emitter.emit('start');

        root.requestAnimationFrame(stepping);
    }

    pause() {
        if (this.status.isPaused()) {
            return;
        }

        window.cancelAnimationFrame(this.rafId);

        this.rafId = 0;
        this.status.pause();
        this.emitter.emit('paused');
    }

    stop() {
        if (this.status.isStopped()) {
            return;
        }

        window.cancelAnimationFrame(this.rafId);

        this.pastTime = 0;
        this.rafId = 0;
        this.status.stop();
        this.emitter.emit('stopped');
    }
}

export default Stepper;
