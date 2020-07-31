'use strict';

class auto_camera {

  constructor(mod) {

    this.mod = mod;
    this.command = mod.command;

    this.dist = 0;

    // command
    mod.command.add('cam', {
      '$none': () => {
        mod.settings.enable = !mod.settings.enable;
        this.send(`${mod.settings.enable ? 'En' : 'Dis'}abled`);
      },
      'add': (n) => {
        n = parseInt(n);
        if (!isNaN(n)) {
          this.dist = mod.settings.characterDefault[mod.game.me.name] = n;
          this.set_camera(this.dist);
          this.send(`Default distance set for &lt;${mod.game.me.name}&gt; set at ${n}.`);
        } else {
          this.send(`Invalid argument. usage : cam add &lt;num&gt;`);
        }
      },
      'rm': () => {
        if (mod.settings.characterDefault[mod.game.me.name]) {
          delete mod.settings.characterDefault[mod.game.me.name];
          this.dist = mod.settings.distance;
          this.set_camera(this.dist);
          this.send(`Removed character-specific distance setting for &lt;${mod.game.me.name}&gt;.`);
        } else {
          this.send(`Invalid argument. character-specific distance setting for &lt;${mod.game.me.name}&gt; is not set.`);
        }
      },
      '$default': (n) => {
        n = parseInt(n);
        if (!isNaN(n)) {
          this.dist = mod.settings.distance = n;
          this.set_camera(this.dist);
          this.send(`Distance set at : ${n}`);
        } else {
          this.send(`Invalid argument. usage : cam [&lt;num&gt;|add|rm]`);
        }
      }
    });

    // game state
    mod.game.on('enter_game', () => {
      this.dist = mod.settings.characterDefault[mod.game.me.name] || mod.settings.distance;
    });

    mod.game.on('leave_loading_screen', () => {
      mod.settings.enable ? mod.setTimeout(() => { this.set_camera(this.dist) }, 1000) : null;
    });

  }

  destructor() {
    this.command.remove('cam');
  }

  // helper
  set_camera(distance) {
    this.mod.send('S_DUNGEON_CAMERA_SET', 1, {
      enabled: true,
      default: distance,
      max: distance
    });
  }

  send(msg) { this.command.message(': ' + msg); }

}

module.exports = { NetworkMod: auto_camera };