var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@model/abstract'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    compareHash = fallback('@module/handlePassword').compareHash;

class userLogin extends abstract {

  constructor(db, request){
    super(db, request);
    this.processRequest();
  }

  processRequest(){
    this.modelData = {
      "username": this.request.body.username.toLowerCase(),
      "password": this.request.body.password
    }
    this.loginSetup();
  }

  loginSetup(){
    var self = this;
    passport.use(new LocalStrategy(self.modelData, function(username, password, callback) {
    	username = username.toLowerCase();
    	self.models.user.findOne({where: {username: username}}).then(function(user){
    		if (!user) {
          callback(false, 'User not found!');
        } else {
          compareHash(password, user.password, function(compare){
            if(!compare){
              callback(null, 'Wrong password!');
            }else {
              callback(user, false);
            }
          });
        }
    	});
    }));
  }

  authenticate(callback){
    var self = this;
    passport.authenticate('local', function(user, err) {
      if (err || !user) {
        callback(user, err);
      }
      self.request.logIn(user, function(err) {
        if (err) {
          callback(user, err);
        } else {
          callback(user, false);
        }
      });
    })(this.request);
  }

  successAction(request, response){
    request.flash('notice', 'Login Successful');
    response.redirect('/');
  }

  failureAction(request, response, error){
    request.flash('error', error);
    response.redirect('/login');
  }

}

module.exports = function(db, request, callback){
  var userLoginInstance = new userLogin(db, request);
  userLoginInstance.authenticate(function(user, err){
    callback(userLoginInstance, err);
  });
}
