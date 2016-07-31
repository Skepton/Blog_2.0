var async = require('async'),
    path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback'));

function loadModel(modelAlias, db, requestParams, callback){
  return fallback('@model/'+modelAlias)(db, requestParams, callback);
}

module.exports = function(modelAlias, db, request, response){
  loadModel(modelAlias, db, request, function(modelInstance, err){
    if(err){
      modelInstance.failureAction(request, response, err);
    } else {
      modelInstance.successAction(request, response);
    }
  });
}
