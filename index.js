'use strict';

module.exports = function AutoCamera(mod) {
  const cmd = mod.command;

  let settings = mod.settings;

  let myDistance = 0;
  let myName = '';

  // command
  cmd.add('cam', {
    '$none': () => {
      settings.enable = !settings.enable;
      send(`${settings.enable ? 'En' : 'Dis'}abled`);
    },
    'add': (num) => {
      num = parseInt(num);
      if (!isNaN(num)) {
        myDistance = settings.characterDefault[myName] = num;
        setCamera(num);
        send(`Default distance set for &lt;${myName}&gt; set at ${num}.`);
      } else {
        send(`Invalid argument. usage : cam add (num)`);
      }
    },
    'rm': () => {
      if (settings.characterDefault[myName]) {
        delete settings.characterDefault[myName];
        myDistance = settings.distance;
        setCamera(myDistance);
        send(`Removed character-specific distance setting for &lt;${myName}&gt;.`);
      } else {
        send(`Invalid argument. character-specific distance setting for &lt;${myName}&gt; is not set.`);
      }
    },
    '$default': (num) => {
      num = parseInt(num);
      if (!isNaN(num)) {
        myDistance = settings.distance = num;
        setCamera(num);
        send(`Distance set at : ${num}`);
      } else {
        send(`Invalid argument. usage : cam [(num)|add|rm]`);
      }
    }
  });

  // game state
  mod.game.on('enter_game', () => {
    myName = mod.game.me.name;
    if (settings.characterDefault[myName]) {
      myDistance = settings.characterDefault[myName];
    } else {
      myDistance = settings.distance;
    }
  });

  mod.game.on('leave_loading_screen', () => {
    if (settings.enable) {
      mod.setTimeout(() => { setCamera(myDistance) }, 1000);
    }
  });

  /* mod.hook('S_LOGIN', mod.majorPatchVersion >= 81 ? 13 : 12, { order: -1000 }, (e) => {
    myName = e.name;
    if (settings.characterDefault[myName]) {
      myDistance = settings.characterDefault[myName];
    } else {
      myDistance = settings.distance;
    }
  });

  // code
  mod.hook('S_SPAWN_ME', 'raw', { order: 10}, () => {
    if (settings.enable) {
      mod.setTimeout(() => { setCamera(myDistance); }, 1000);
    }
  }); */

  // helper
  function setCamera(distance) {
    let _ = mod.trySend('S_DUNGEON_CAMERA_SET', 1, {
      enabled: true,
      default: distance,
      max: distance
    });
    if (!_) {
      mod.warn('Unmapped protocol packet \<S_DUNGEON_CAMERA_SET\>.');
    }
  }

  function send(msg) { cmd.message(': ' + msg); }

  // reload
  this.saveState = () => {
    let state = {
      myName: myName,
      myDistance: myDistance
    };
    return state;
  }

  this.loadState = (state) => {
    myName = state.myName;
    myDistance = state.myDistance;
  }

  this.destructor = () => { cmd.remove('cam'); }

}