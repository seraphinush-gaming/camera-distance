<p align="center">
<a href="#">
<img src="https://github.com/seraphinush-gaming/pastebin/blob/master/logo_ttb_trans.png?raw=true" width="200" height="200" alt="tera-toolbox, logo by Foglio">
</a>
</p>

# auto-camera [![paypal](https://img.shields.io/badge/paypal-donate-333333.svg?colorA=253B80&colorB=333333)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B7QQJZV9L5P2J&source=url) [![paypal.me](https://img.shields.io/badge/paypal.me-donate-333333.svg?colorA=169BD7&colorB=333333)](https://www.paypal.me/seraphinush) 
tera-proxy module to unlock maximum viewing distance
```
Support seraph via paypal donations, thanks in advance !
```

## Auto-update guide
- Create a folder called `auto-camera` in `tera-toolbox/mods` and download >> [`module.json`](https://raw.githubusercontent.com/seraphinush-gaming/auto-camera/master/module.json) << (right-click this link and save link as..) into the folder

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
- Normal camera maximum distance is 500
- Harrowhold camera maximum distance is 1200
- By default, the initial viewing distance (not max) when you login is 170

## Changelog
<details>

    1.52
    - Removed `tera-game-state` usage
    1.51
    - Add hot-reload support
    1.50
    - Updated for caali-proxy-nextgen
    1.49
    - Removed `camera` from name space
    - Forced hardcoded config update
    - Added `add` option
    - Added `rm` option
    - Added `set` option
    1.48
    - Removed `Command` require()
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