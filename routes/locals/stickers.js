const keystone = require('keystone');
const Sticker = keystone.list('Sticker');

module.exports = function (req) {
	const user = req.user;
	if (user) {
		return Sticker.model.find({
			user: user._id,
		}).populate('word');
	} else {
		return null;
	}
};
