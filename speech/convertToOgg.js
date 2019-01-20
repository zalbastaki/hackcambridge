const ffmpeg = require('fluent-ffmpeg');

/**
 * @param {String} path path to audio file
 */
function convertToOgg(path) {
	return new Promise((resolve, reject) => {
		const fileName = path + '.ogg';
		ffmpeg(path)
			.audioCodec('opus')
			.format('ogg')
			.noVideo()
			.on('error', reject)
			.on('end', (stdout, stderr) => {
				resolve(fileName);
			})
			.save(fileName);
	});
}

module.exports = convertToOgg;
