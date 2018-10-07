class CCSound {
    constructor(src) {
        this.audio = document.createElement('audio');
        this.audio.src = src;
    }

    play() {
        if (this.audio.paused) {
            this.audio.play();
        } else {
            this.audio.currentTime = 0;
        }
    }
}
