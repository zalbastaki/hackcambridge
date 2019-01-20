const keystone = require('keystone');
const Recording = keystone.list('Recording');

exports = module.exports = async function (req, res) {
	const {
		user,
		word,
	} = res.locals;
	if (user && word) {
		const recording = await Recording.model.create({
			word: word._id,
			user: user._id,
		});
		Recording.fields.file.upload(recording, req.files.recording, async (err) => {
			if (err) {
				res.status(500);
				res.json({
					success: false,
				});
				return;
			}
			await recording.save();
			res.json({
				success: true,
			});
		});
	} else {
		res.status(401);
		res.json({
			success: false,
		});
	}
};
