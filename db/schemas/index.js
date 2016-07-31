var path = require('path'),
    async = require('async'),
    loadedSchemas = {},
    fallback = require(path.join(appRoot,'/lib/module/fallback'));
var schemas = ['user','post', 'category', 'comment', 'tracking'];

module.exports = function(sequelize, callback){
  schemas.forEach(function(schema){
    loadedSchemas[schema] = fallback('@database/schemas/'+schema)(sequelize);
  });
  async.eachSeries(loadedSchemas, function(loadedSchema, asyncCallback){
    if ("associate" in loadedSchema) {
      loadedSchema.associate(loadedSchemas);
    }
    loadedSchema.sync(/*{force: true}*/).then(function(){
      asyncCallback();
    });
  }, function(){

    callback(loadedSchemas);
  });
};
