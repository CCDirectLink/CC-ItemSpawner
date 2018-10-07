var Sound = function(src) {
    this.audio = document.createElement('audio');
    this.audio.src = src;
};

Sound.prototype.play = function() {
    if (this.audio.paused) {
        this.audio.play();
    } else {
        this.audio.currentTime = 0;
    }
};
