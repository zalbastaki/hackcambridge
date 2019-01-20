const keystone = require('keystone');
const Recording = keystone.list('Recording');
const getWord = require('./word.js');

module.exports = async function (req) {
	const word = await getWord(req);
	if (word) {
		return Recording.model.aggregate([{
			$match: {
				word: word._id,
				isValid: true,
			}
		}, {
			$group : {
				_id: "$user",
				score: {
					$sum: 1,
				},
			},
		}, {
			$sort: {
				score: -1,
			},
		}, {
			$lookup: {
				from: 'users',
				localField: '_id',
				foreignField: '_id',
				as: 'user',
			},
		}, {
			$unwind : "$user",
		}]);
	} else {
		return null;
	}
};
