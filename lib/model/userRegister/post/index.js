var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@model/abstract');

class userRegisterPost extends abstract {

  constructor(db, request){
    super(db, request);
    this.processRequest();
  }

  processRequest(){
    var requestParams = this.request.body;
    this.modelData = {
      "admin": false,
      "username": requestParams.username,
      "password": requestParams.password,
      "about": ""
    }
  }

  generateUser(callback){
    this.models.user.create(this.modelData).then(function(user){
      callback(user, undefined);
    }).catch(function(err){
      callback(undefined, err);
    });
  }

  successAction(request, response){
    response.redirect('/login');
  }

  failureAction(request, response, errors){
    var errorMsg = '';
    errors.errors.forEach(function(error){
      errorMsg += error.message;
    });
    request.flash('error',errorMsg);
    response.redirect('/register');
  }

}

module.exports = function(db, request, callback){
  var registerUser = new userRegisterPost(db, request);
  registerUser.generateUser(function(user, err){
    callback(registerUser, err);
  });
}
