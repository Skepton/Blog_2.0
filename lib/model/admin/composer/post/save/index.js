var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@model/abstract');

class composerSave extends abstract {
  constructor(db, request){
    super(db, request);
  }

  savePost(callback){
    var self = this;
    var hashid = self.request.params.hashid;
    var postBody = self.request.body;
    self.models.post.update(postBody,{where: {hashid: hashid}}).then(function(post){
      if(post){
        callback(false);
      } else {
        callback(true);
      }
    });
  }
  successAction(request, response){
    request.flash('notice', 'Post saved successful!');
    response.redirect('/admin');
  }

  failureAction(request, response, error){
    request.flash('error', 'Error saving post!');
    response.redirect('/admin');
  }
}

module.exports = function(db, request, callback){
  var composerSaveInstance = new composerSave(db, request);
  composerSaveInstance.savePost(function(data){
    callback(composerSaveInstance, data);
  });
}
