'use strict';

class auto_camera {

  constructor(mod) {

    this.m = mod;
    this.c = mod.command;
    this.g = mod.game;
    this.s = mod.settings;

    this.dist = 0;
    this.name = '';

    // command
    this.c.add('cam', {
      '$none': () => {
        this.s.enable = !this.s.enable;
        this.send(`${this.s.enable ? 'En' : 'Dis'}abled`);
      },
      'add': (n) => {
        n = parseInt(n);
        if (!isNaN(n)) {
          this.dist = this.s.characterDefault[this.name] = n;
          this.set_camera(n);
          this.send(`Default distance set for &lt;${this.name}&gt; set at ${n}.`);
        } else {
          this.send(`Invalid argument. usage : cam add &lt;num&gt;`);
        }
      },
      'rm': () => {
        if (this.s.characterDefault[this.name]) {
          delete this.s.characterDefault[this.name];
          this.dist = this.s.distance;
          this.set_camera(this.dist);
          this.send(`Removed character-specific distance setting for &lt;${this.name}&gt;.`);
        } else {
          this.send(`Invalid argument. character-specific distance setting for &lt;${this.name}&gt; is not set.`);
        }
      },
      '$default': (n) => {
        n = parseInt(n);
        if (!isNaN(n)) {
          this.dist = this.s.distance = n;
          this.set_camera(n);
          this.send(`Distance set at : ${n}`);
        } else {
          this.send(`Invalid argument. usage : cam [&lt;num&gt;|add|rm]`);
        }
      }
    });

    // game state
    this.g.on('enter_game', () => {
      this.name = this.g.me.name;
      this.dist = this.s.characterDefault[this.name] || this.s.distance;
    });

    this.g.on('leave_loading_screen', () => {
      this.s.enable ? this.m.setTimeout(() => { this.set_camera(this.dist) }, 1000) : null;
    });

  }

  destructor() {
    this.c.remove('cam');
  }

  // helper
  set_camera(distance) {
    this.m.send('S_DUNGEON_CAMERA_SET', 1, {
      enabled: true,
      default: distance,
      max: distance
    });
  }

  send(msg) { this.c.message(': ' + msg); }

}

module.exports = auto_camera;