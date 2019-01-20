const keystone = require('keystone');
const Recording = keystone.list('Recording');
const getUser = require('./user.js');
const getWord = require('./word.js');

module.exports = async function (req) {
	const [
		user,
		word,
	] = await Promise.all([
		getUser(req),
		getWord(req),
	]);
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
