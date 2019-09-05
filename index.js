'use strict';

class AutoCamera {

  constructor(mod) {

    this.mod = mod;
    this.cmd = mod.command;
    this.game = mod.game;
    this.settings = mod.settings;

    this.distance = 0;
    this.name = '';

    // command
    this.cmd.add('cam', {
      '$none': () => {
        this.settings.enable = !this.settings.enable;
        this.send(`${this.settings.enable ? 'En' : 'Dis'}abled`);
      },
      'add': (num) => {
        num = parseInt(num);
        if (!isNaN(num)) {
          this.distance = this.settings.characterDefault[name] = num;
          this.setCamera(num);
          this.send(`Default distance set for &lt;${this.name}&gt; set at ${num}.`);
        } else {
          this.send(`Invalid argument. usage : cam add (num)`);
        }
      },
      'rm': () => {
        if (this.settings.characterDefault[name]) {
          delete this.settings.characterDefault[name];
          this.distance = this.settings.distance;
          this.setCamera(this.distance);
          this.send(`Removed character-specific distance setting for &lt;${this.name}&gt;.`);
        } else {
          this.send(`Invalid argument. character-specific distance setting for &lt;${this.name}&gt; is not set.`);
        }
      },
      '$default': (num) => {
        num = parseInt(num);
        if (!isNaN(num)) {
          this.distance = this.settings.distance = num;
          this.setCamera(num);
          this.send(`Distance set at : ${num}`);
        } else {
          this.send(`Invalid argument. usage : cam [(num)|add|rm]`);
        }
      }
    });

    // game state
    this.game.on('enter_game', () => {
      this.name = this.game.me.name;
      if (this.settings.characterDefault[this.name]) {
        this.distance = this.settings.characterDefault[this.name];
      } else {
        this.distance = this.settings.distance;
      }
    });

    this.game.on('leave_loading_screen', () => {
      if (this.settings.enable) {
        this.mod.setTimeout(() => { this.setCamera(this.distance) }, 1000);
      }
    });

  }

  destructor() {
    this.cmd.remove('cam');

    this.name = undefined;
    this.distance = undefined;
  }

  // helper
  setCamera(distance) {
    let _ = this.mod.trySend('S_DUNGEON_CAMERA_SET', 1, {
      enabled: true,
      default: distance,
      max: distance
    });
    if (!_) {
      this.mod.warn('Unmapped protocol packet \<S_DUNGEON_CAMERA_SET\>.');
    }
  }

  send() { this.cmd.message(': ' + [...arguments].join('\n\t - ')); }

  // reload
  saveState() {
    let state = {
      name: this.name,
      distance: this.distance
    };
    return state;
  }

  loadState(state) {
    this.name = state.name;
    this.distance = state.distance;
  }

}

module.exports = AutoCamera;