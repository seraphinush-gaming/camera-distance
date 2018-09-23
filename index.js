// Version 1.49 r:00
'use strict';

const fs = require('fs');
const path = require('path');

const config = require('./config.json');

module.exports = function AutoCamera(m) {
	const cmd = m.command || m.require.command;

	let data = config;

	// to remove at next update
	const default_config = {
		"enable": true,
		"defaultDistance": "800",
		"characterDefault": []
	}
	if (!data.characterDefault) {
		data = default_config;
		saveJsonData();
		console.log(`[auto-camera] : Updated config as necessary.`);
		console.log(`[auto-camera] : Default distance can now be set via : 'cam set (distance)'.`);
		console.log(`[auto-camera] : Character-specific distance can now be set via : 'cam add (distance)'.`);
		console.log(`[auto-camera] : Character-specific distance can be removed via : 'cam rm'.`);
	}
	//

	// config
	let enable = data.enable,
		setDistance = 0;
	
	let playerName = '';

	// command
	cmd.add('cam', {
		// toggle
		$none() {
			enable = !enable;
			send(`${enable ? 'En' : 'Dis'}abled`);
		},
		$default(num) {
			if (!isNaN(num)) {
				setCamera(num);
				send(`Distance set at : ${num}`);
			}
			else send(`Invalid argument. usage : cam (num)`);
		},
		// set default
		add(num) {
			if (!isNaN(num)) {
				let exist = false;
				for (let i = 0, n = data.characterDefault.length; i < n; i++) {
					if (data.characterDefault[i].name === playerName) {
						exist = true;
						data.characterDefault[i].distance = num;
						saveJsonData();
						break;
					}
				}
				if (!exist) {
					let temp = {
						name: playerName,
						distance: num
					};
					data.characterDefault.push(temp);
					saveJsonData();
				}
				setDistance = num;
				send(`Default distance set for ${playerName} set at ${num}`);
			}
			else send(`Invalid argument. usage : cam [add (num)|rm]`);
		},
		rm() {
			for (let i = 0, n = data.characterDefault.length; i < n; i++) {
				if (data.characterDefault[i].name === playerName) {
					data.characterDefault.splice(i, 1);
					saveJsonData();
					send(`Removed character-specific distance setting for "${playerName}"`);
					break;
				}
			}
		},
		set(num) {
			if (!isNaN(num)) {
				data.defaultDistance = num;
				setDistance = num;
				saveJsonData();
				send(`Default distance set at ${num}`);
			}
			else send(`Invalid argument. usage : cam set (num)`)
		}
	});

	// mod.game
	m.game.on('enter_game', () => {
		playerName = m.game.me.name;
		setDistance = data.defaultDistance;
		for (let i = 0, n = data.characterDefault.length; i < n; i++) {
			if (data.characterDefault[i].name === playerName) {
				setDistance = data.characterDefault[i].distance;
				break;
			}
		}
	})

	// code
	m.hook('S_SPAWN_ME', 'raw', () => {
		if (enable) setTimeout(() => { setCamera(setDistance); }, 1000)
		//(zone === 9950) ? setDistance = data.defaultDistanceHH : setDistance = data.defaultDistance
	});

	// helper
	function setCamera(distance) {
		setDistance = distance;
		m.send('S_DUNGEON_CAMERA_SET', 1, {
			enabled: true,
			default: setDistance,
			max: distance
		});
	}

	function saveJsonData() {
		fs.writeFileSync(path.join(__dirname, './config.json'), JSON.stringify(data));
	}

	function send(msg) { cmd.message(`: ` + msg); }

}