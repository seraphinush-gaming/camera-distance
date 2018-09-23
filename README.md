# auto-camera
tera-proxy module to unlock maximum viewing distance

## Dependency
- `command` module
- `tera-game-state` module

## Usage
- __`cam`__
  - Toggle on/off
- __`cam num`__
  - Set distance at `num`, where `num` is a value between `0` and `inf`
### Arguments
- __`cam add num`__
  - Set character-specific distance at `num`, where `num` is a value between `0` and `inf`
- __`cam rm`__
  - Remove character-specific distance setting
- __`cam set num`__
  - Set default distance at `num`, where `num` is a value between `0` and `inf`

## Config
- __`enable`__
  - Initialize module on/off
  - Default is `true`
- __`defaultDistance`__
  - Initialize camera distance
  - Default distance is `800`

## Info
- Original author : [teralove](https://github.com/teralove)
- **Support seraph via paypal donations, thanks in advance : [paypal](https://www.paypal.me/seraphinush)**
- Normal camera maximum distance is 500
- Harrowhold camera maximum distance is 1200
- By default, the initial viewing distance (not max) when you login is 170

## Changelog
<details>

    1.49
    - Removed `camera` from name space
    - Forced hardcoded config update
    - Added `add` option
    - Added `rm` option
    - Added `set` option
    1.48
    - Removed `command` require()
    - Updated to `mod.command`
    1.47
    - Removed font color bloat
    1.46
    - Added auto-update support
    - Refactored config file
    -- Added `enable`
    -- Added `defaultDistance`
    1.45
    - Updated name and font color
    1.44
    - Updated code aesthetics
    1.43
    - Updated code
    - Added string function
    1.42
    - Updated code aesthetics
    1.41
    - Updated code aesthetics
    1.31
    - Updated code
    1.30
    - Updated code
    - Removed protocol version restriction
    1.21
    - Added `Command` dependency
    - Removed slash support
    1.20
    - Initial Fork
    1.1.0
    - Changed command to require exclamation prefix '!'
    - Added slash support

</details>

---
![Screenshot](http://i.imgur.com/LzxGSgm.jpg)