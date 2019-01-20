const getLeaderboard = require('./leaderboard.js');

module.exports = async function (req) {
	const user = req.user;
	const leaderboard = await getLeaderboard(req);
	if (user && leaderboard) {
		const rank = leaderboard
			.map((x) => String(x._id))
			.indexOf(String(user._id));
		if (rank === -1) {
			return '';
		} else {
			return rank + 1;
		}
	} else {
		return null;
	}
};
