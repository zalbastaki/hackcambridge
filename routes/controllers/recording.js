const fs = require('fs');
const keystone = require('keystone');
const Recording = keystone.list('Recording');
const convertToOgg = require('../../speech/convertToOgg');
const speechToText = require('../../speech/speechToText');

exports = module.exports = async function (req, res) {
	try {
		const {
			user,
			word,
		} = res.locals;
		if (user && word) {
			const recording = await Recording.model.create({
				word: word._id,
				user: user._id,
			});
			await new Promise((resolve, reject) =>
				Recording.fields.file.upload(recording, req.files.recording, async (err) => {
					if (err) return reject(err);
					resolve();
				}));
			const audioOgg = await convertToOgg(req.files.recording.path);
			const audioOggData = await new Promise((resolve, reject) =>
				fs.readFile(audioOgg, function(err, data) {
					if (err) return reject(err);
					resolve(data);
				}));
			const audioText = await speechToText(audioOggData);
			recording.isValid = fuzzyMatch(audioText, word);
			await recording.save();
			res.json({
				success: true,
				text: audioText,
			});
		} else {
			res.status(401);
			res.json({
				success: false,
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500);
		res.json({
			success: false,
			error: err.message,
		});
	}
};

function fuzzyMatch(audioText, word) {
	const str1 = audioText.toLowerCase().replace(/[^\w]/g, '');
	const str2 = word.name.toLowerCase().replace(/[^\w]/g, '');
	return str1 === str2;
}
