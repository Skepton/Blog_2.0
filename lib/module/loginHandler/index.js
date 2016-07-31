var passport = require('passport');

module.exports = function(db){
  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });
  passport.deserializeUser(function(id, callback) {
    db.user.findById(id).then(function(user){
      if (!user) {
        callback(null, false);
      } else {
        callback(null, user);
      }
    });
  });
  return passport;
}
