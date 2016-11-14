class Status {
    constructor() {
        this.toStop();
    }

    toPlay() {
        if (this.isPlaying()) {
            return false;
        }

        this.pending = false;
        this.paused = false;

        return true;
    }

    toPause() {
        if (this.isPending()) {
            return false;
        }

        this.pending = true;
        this.paused = true;

        return true;
    }

    toStop() {
        if (this.isStopped()) {
            return false;
        }

        this.pending = true;
        this.paused = false;

        return true;
    }

    isPending() {
        return this.pending;
    }

    isPlaying() {
        return !this.pending;
    }

    isPaused() {
        return this.paused;
    }

    isStopped() {
        return this.isPending() && !this.isPaused();
    }
}

export default Status;
