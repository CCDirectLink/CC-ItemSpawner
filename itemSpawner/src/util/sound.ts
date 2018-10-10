export class Sound {
    private audio : HTMLAudioElement;
    private lastVolume : number = 1;

    /**
     * Instantiates a new sound object to play sounds.
     * @param source Audio source. Relative or absolute address.
     */
    constructor(source : string) {
        this.audio = document.createElement('audio');
        this.audio.src = source;
    }

    /**
     * Plays the sound.
     * @param reset If true and the sound is already playing, resets it.
     * @returns True if the sound is being played or reset, false if it was already playing.
     */
    play(reset : boolean = true) {
        if (reset) {
            this.audio.currentTime = 0;
        }

        if (this.audio.paused) {
            this.audio.play();
            return true;
        }

        return reset;
    }

    /**
     * Pauses the sound.
     */
    pause() {
        this.audio.pause();
    }

    /**
     * Stops the sound.
     */
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    get volume() : number {
        return this.audio.volume;
    }

    set volume(volume : number) {
        volume = Math.min(Math.max(volume, 0), 1);
        this.audio.volume = volume;
    }

    /**
     * Mutes the audio.
     */
    mute() {
        this.lastVolume = this.audio.volume;
        this.audio.volume = 0;
    }

    /**
     * Restores the volume before the audio was muted.
     */
    unmute() {
        this.audio.volume = this.lastVolume;
    }

    /**
     * Gets the audio source.
     */
    get source() : string {
        return this.audio.src;
    }

    /**
     * Sets the audio source.
     * @param newSource New audio source.
     */
    set source(newSource : string) {
        this.audio.src = newSource;
    }
}
