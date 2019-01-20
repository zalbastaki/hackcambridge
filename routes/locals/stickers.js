const keystone = require('keystone');
const Sticker = keystone.list('Sticker');
const getUser = require('./user');

module.exports = async function (req) {
	const user = await getUser(req);
	if (user) {
		return Sticker.model.find({
			user: user._id,
		}).populate('word');
	} else {
		return null;
	}
};
