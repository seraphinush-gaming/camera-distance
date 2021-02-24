'use strict';

class auto_camera {

  constructor(mod) {

    this.mod = mod;
    this.command = mod.command;

    // init
    this.dist = 0;

    // command
    mod.command.add('cam', {
      '$none': () => {
        mod.settings.enable = !mod.settings.enable;
        this.send(`${mod.settings.enable ? 'En' : 'Dis'}abled`);
      },
      'add': (num) => {
        num = parseInt(num);
        if (!isNaN(num)) {
          this.dist = mod.settings.characterDefault[mod.game.me.name] = num;
          this.set_camera(this.dist);
          this.send(`Default distance set for &lt;${mod.game.me.name}&gt; set at ${num}.`);
        } else {
          this.send(`Invalid argument. usage : cam add &lt;num&gt;`);
        }
      },
      'rm': () => {
        if (mod.settings.characterDefault[mod.game.me.name]) {
          delete mod.settings.characterDefault[mod.game.me.name];
          this.set_camera(this.dist = mod.settings.distance);
          this.send(`Removed character-specific distance setting for &lt;${mod.game.me.name}&gt;.`);
        } else {
          this.send(`Invalid argument. character-specific distance setting for &lt;${mod.game.me.name}&gt; is not set.`);
        }
      },
      'usage': () => this.send(`Usage : cam [&lt;num&gt;|add|rm]`),
      '$default': (num) => {
        num = parseInt(num);
        if (!isNaN(num)) {
          this.dist = mod.settings.distance = num;
          this.set_camera(this.dist);
          this.send(`Distance set at : ${num}`);
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

    // code
    mod.hook('S_DUNGEON_CAMERA_SET', 'event', () => {
      return mod.settings.enable ? false : undefined;
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