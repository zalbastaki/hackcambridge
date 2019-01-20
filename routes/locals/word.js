const keystone = require('keystone');
const Word = keystone.list('Word');

module.exports = function (req) {
	return Word.model.findOne({
		endsAt: {
			$gt: new Date(),
		},
	}).sort('+endsAt');
};
