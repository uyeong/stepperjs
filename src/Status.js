class Status {
    constructor() {
        this.stopped = true;
        this.paused = false;
    }

    play() {
        this.stopped = false;
        this.paused = false;
    }

    pause() {
        this.paused = true;
    }

    stop() {
        this.stopped = true;
    }

    isPlaying() {
        return (!this.stopped && !this.paused);
    }

    isPaused() {
        return this.paused;
    }

    isStopped() {
        return this.stopped;
    }
}

export default Status;
