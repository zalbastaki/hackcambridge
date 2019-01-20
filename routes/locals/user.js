module.exports = function (req) {
	const user = req.user;
	if (user) {
		user.hasAvatar = user.avatar && user.avatar.secure_url;
	}
	return user;
};
