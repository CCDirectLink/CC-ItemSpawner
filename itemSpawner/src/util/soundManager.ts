import { Sound } from './sound.js';

class Sounds {
    [key:string]: Sound;
}

export class SoundManager {
    static default : SoundManager;

    private sounds : Sounds;

    constructor() {
        this.sounds = new Sounds();
    }

    createSound(name : string, source: string) {
        this.sounds[name] = new Sound(source);
    }
    
    getSound(name : string) {
        if (!this.sounds.hasOwnProperty(name)) {
            throw "Sound not found";
        }
        
        return this.sounds[name];
    }
}

SoundManager.default = new SoundManager();
SoundManager.default.createSound('hover', '/assets/media/sound/menu/menu-hover.ogg');
SoundManager.default.createSound('cancel', '/assets/media/sound/menu/menu-cancel.ogg');
SoundManager.default.createSound('submit', '/assets/media/sound/menu/menu-submit.ogg');
