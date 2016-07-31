var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@model/abstract'),
    hashPassword = fallback('@module/handlePassword').hashPassword;

class userRegisterPost extends abstract {

  constructor(db, requestParams){
    super(db);
    this.processRequest(requestParams);
  }

  processRequest(request){
    var requestParams = request.body;
    this.modelData = {
      "admin": requestParams.admin ? true : true,
      "username": requestParams.username.toLowerCase(),
      "displayname": requestParams.username,
      "password": requestParams.password,
      "about": ""
    }
  }

  getPassword(){
    return this.modelData.password;
  }

  setPassword(password){
    this.modelData.password = password;
  }

  generatePassword(callback){
    var self = this;
    hashPassword(self.getPassword(), function(hash){
      self.setPassword(hash);
      callback();
    });
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
  registerUser.generatePassword(function(){
    registerUser.generateUser(function(user, err){
      callback(registerUser, err);
    });
  });
}
