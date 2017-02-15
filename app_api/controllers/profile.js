var mongoose = require('mongoose');
require('../models/users');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {
	// If there is not user ID in JET, return 401
	if (!req.payload._id) {
		res.status(401).json({"message": "UnauthorizedError: private profile"});
	} else {
		User.findById(req.payload._id).exec(function(err, user) {
			res.status(200).json(user);
		});
	}
};