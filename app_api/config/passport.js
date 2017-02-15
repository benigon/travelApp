var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
	usernameField: 'email'
}, function(username, password, done) {
	User.findOne(({email: username}, function(err, user) {
		if (err) {
			return done(err);
		}
		// If user does not exist
		if (!user) {
			return done(null, false, {message: "User not found"});
		}

		// If password is incorrect
		if (!user.validPassword(password)) {
			return done(null, false, {message: "Password is invalid"});
		}

		// If everything is correct, return user
		return done(null, user);
	}))
}))