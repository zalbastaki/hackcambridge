module.exports = function (req) {
	return req.query.skip || 0;
};
