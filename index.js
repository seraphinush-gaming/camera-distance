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
      if (!isNaN(num)) {
        if (settings.characterDefault[myName]) {
          settings.characterDefault[myName] = num;
          myDistance = num;
          send(`Default distance set for &lt;${myName}&gt; set at ${num}.`);
        }
      } else {
        send(`Invalid argument. usage : cam add (num)`);
      }
    },
    'rm': () => {
      if (settings.characterDefault[myName]) {
        delete settings.characterDefault[myName];
        send(`Removed character-specific distance setting for &lt;${myName}&gt;.`);
      } else {
        send(`Invalid. character-specific distance setting for &lt;${myName}&gt; is not set.`);
      }
    },
    '$default': (num) => {
      if (!isNaN(num)) {
        settings.distance = num;
        myDistance = num;
        setCamera(num);
        send(`Distance set at : ${num}`);
      } else {
        send(`Invalid argument. usage : cam [(num)|add|rm]`);
      }
    }
  });

  // code
  mod.hook('S_SPAWN_ME', 'raw', () => {
    if (settings.enable) {
      mod.setTimeout(() => { setCamera(myDistance); }, 1000);
    }
  });

  mod.hook('S_LOGIN', mod.majorPatchVersion >= 81 ? 13 : 12, { order: -1000 }, (e) => {
    myName = e.name;
    if (settings.characterDefault[myName]) {
      myDistance = settings.characterDefault[myName];
    } else {
      myDistance = settings.distance;
    }
  });

  // helper
  function setCamera(distance) {
    let _ = mod.trySend('S_DUNGEON_CAMERA_SET', 1, {
      enabled: true,
      default: distance,
      max: distance
    });
    if (!_) {
      mod.settings.enable = false;
      console.log('Unmapped protocol packet \<S_DUNGEON_CAMERA_SET\>.');
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