var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@model/abstract');

class composer extends abstract {
  constructor(db){
    super(db);
  }
  getPost(request, callback){
    var self = this, data;
    var hashid = request.params.hashid;
    self.models.post.findOne({where: {hashid: hashid}}).then(function(post){
      self.models.category.findAll().then(function(categories){
        callback({"post": post, "categories": categories});
      });
    });
  }
}

module.exports = function(db, request, response, callback){
  var composerInstance = new composer(db);
  composerInstance.getPost(request, function(data){
    callback(data);
  });
}
