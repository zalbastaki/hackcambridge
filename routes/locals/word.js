const keystone = require('keystone');
const Word = keystone.list('Word');

module.exports = async function (req) {
	return Word.model.findOne({})
		.skip(Number(req.query.skip || 0))
		.limit(1)
		.sort('+endsAt');
};
