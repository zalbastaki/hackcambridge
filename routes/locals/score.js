const keystone = require('keystone');
const Recording = keystone.list('Recording');
const getWord = require('./word.js');

module.exports = async function (req) {
	const user = req.user;
	const word = await getWord(req);
	if (user && word) {
		return Recording.model.count({
			user: user._id,
			word: word._id,
			isValid: true,
		});
	} else {
		return null;
	}
};
