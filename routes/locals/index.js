const zipObject = require('lodash/zipObject');
const defaultLocals = [
	'user',
	'word',
	'stickers',
	'score',
	'rank',
	'leaderboard',
	'recordings',
];

module.exports = function initLocals (req, res, next) {
	return Promise.all(defaultLocals.map(key => require('./' + key)(req)))
		.then((values) => zipObject(defaultLocals, values))
		.then((locals) => { Object.assign(res.locals, locals) })
		.then(next);
};
