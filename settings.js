'use strict';

const DefaultSettings = {
  "enabled": true,
  "distance": "800",
  "characterDefault": {}
}

function MigrateSettings(from_ver, to_ver, settings) {
  if (from_ver === undefined) {
    return Object.assign(Object.assign({}, DefaultSettings), settings);
  }
  else if (from_ver === null) {
    return DefaultSettings;
  }
  else {
    if (from_ver + 1 < to_ver) {
      settings = MigrateSettings(from_ver, from_ver + 1, settings);
      return MigrateSettings(from_ver + 1, to_ver, settings);
    }
    switch (to_ver) {
      case 2:
        settings.enabled = settings.enable;
        delete settings.enable;
        break;   
    }

    return settings;
  }
}

module.exports = MigrateSettings;