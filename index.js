// Version 1.48 r:00

const config = require('./config.json');

module.exports = function AutoCamera(m) {
	const cmd = m.command || m.require.command

	// config
	let enable = config.enable,
		setDistance = config.defaultDistance;

	// command
	cmd.add(['camera', 'cam'], {
		// toggle
		$none() {
			enable = !enable;
			send(`${enable ? 'Enabled' : 'Disabled'}`);
		},
		// set distance
		$default(distance) {
			if (!isNaN(distance)) {
				setCamera(distance);
				send(`Distance set at : ${distance}`);
			}
			else send(`Invalid argument. usage : cam (num)`);
		}
	});

	// code
	m.hook('S_SPAWN_ME', 'raw', () => {
		if (enable) setTimeout(() => { setCamera(setDistance); }, 1000)
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

	function send(msg) { cmd.message(`: ` + msg); }

}