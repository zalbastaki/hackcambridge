// @file signup.js
// @path /routes/views/signup.js
// @description Handles the post request when the user tries to sign up.
// @url https://github.com/keystonejs/generator-keystone/issues/10
//
var keystone = require('keystone');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	
	// Render the view
	view.render('signup');
};
