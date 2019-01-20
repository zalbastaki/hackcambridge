const keystone = require('keystone');
const Recording = keystone.list('Recording');
const getWord = require('./word');

module.exports = async function (req) {
	const user = req.user;
	if (user) {
		const word = await getWord(req);
		return Recording.model.find({
			user: user._id,
			word: word._id,
		});
	} else {
		return null;
	}
};
