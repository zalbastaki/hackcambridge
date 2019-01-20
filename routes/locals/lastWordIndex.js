const keystone = require('keystone');
const Word = keystone.list('Word');

module.exports = async function (req) {
	const count = await Word.model.find({}).count();
	return count - 1;
};
