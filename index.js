// Version 1.47 r:00

const Command = require('command')

const config = require('./config.json')

module.exports = function AutoCamera(d) {
	const command = Command(d)

	// config
	let enable = config.enable,
		setDistance = config.defaultDistance

	// command
	command.add(['camera', 'cam'], (distance) => {
		// toggle
		if (!distance) {
			enable = !enable
			send(`${enable ? 'Enabled' : 'Disabled'}`)
		}
		// set distance
		else if (!isNaN(distance)) {
			setCamera(distance)
			send(`Distance set at : ` + `${distance}`)
		}
		else send(`Invalid argument.`)
	})

	// code
	d.hook('S_SPAWN_ME', 'raw', () => {
		if (enable) setTimeout(() => { setCamera(setDistance) }, 1000)
	})

	// helper
	function setCamera(distance) {
		setDistance = distance
		d.send('S_DUNGEON_CAMERA_SET', 1, { 
			enabled: true,
			default: setDistance,
			max: distance
		})
	}

	function send(msg) { command.message(`[auto-camera] : ` + msg) }

}