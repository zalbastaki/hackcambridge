var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (req, res, next) {
	var locals = res.locals;
	locals.section = 'signup';
	locals.filters = {};
	locals.data = {};
	locals.formData = req.body || {};

	// if (!keystone.security.csrf.validate(req)) {
	// 	req.flash('error', 'There was an error with your request, please try again.');
	// 	return renderView();
	// }

	if (locals.formData.password !== locals.formData.password_confirm) {
		console.log('Passwords do not match')
		next();
		return;
	}

	var newUser = new User.model({
		name: {
			first: locals.formData.first,
			last: locals.formData.last
		},
		email: locals.formData.email,
		password: locals.formData.password
	});

	newUser.isAdmin = false;

	newUser.save(function (err, result) {
		if (err) {
			if (err.message.match('index: email_1 dup key')) {
				return res.redirect('/keystone/signin');
			}
			console.error(err)
			locals.data.validationErrors = err.errors;
			return res.redirect('/signup');
		} else {
			return res.redirect('/keystone/signin');
		}
	});

}
