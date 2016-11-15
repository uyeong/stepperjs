class Status {
    constructor() {
        this.stopped = true;
        this.paused = false;
    }

    play() {
        if (this.isPlaying()) {
            return false;
        }

        this.stopped = false;
        this.paused = false;

        return true;
    }

    pause() {
        if (this.isStopped()) {
            return false;
        }

        this.paused = true;
        return true;
    }

    stop() {
        if (this.isStopped()) {
            return false;
        }

        this.stopped = true;
        return true;
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
