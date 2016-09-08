var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback'));

module.exports = function(db, request, response, callback){
  callback(request.params.parentCategory);
}
