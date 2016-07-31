var bcrypt = require('bcryptjs');

function hashPassword(password, callback) {
	bcrypt.genSalt(10, function(err, salt){
		if(err) {
			callback(false);
		} else {
			bcrypt.hash(password, salt, function(err, hash){
				if(err) {
					callback(false);
				} else {
 					callback(hash);
				}
			});
		}
	});
}

function compareHash(password, expected, callback){
	bcrypt.compare(password, expected, function(err, compare){
		callback(compare);
	});
}

module.exports.hashPassword = hashPassword;
module.exports.compareHash = compareHash;
