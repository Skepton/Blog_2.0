var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    coreHtml = fallback('@block/coreHtml');

module.exports = function(data, callback){

  data.content.listItem = "cooler!";

  //Instanciate Object
  var blockInstance = new coreHtml(data);

  blockInstance.render(function(html){
    callback(html);
  });
}
