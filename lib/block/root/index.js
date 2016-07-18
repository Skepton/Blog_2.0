var path = require('path'),
    coreHtml = require(path.join('_/', 'block', 'coreHtml'));


module.exports = function(data, callback){

  /// Set data for block rendering
  data.content.page = {
    "title": "test"
  }

  //Instanciate Object
  var blockInstance = new coreHtml(data);

  blockInstance.render(function(html){
    callback(html);
  });
}
