var path = require('path'),
    coreHtml = require(path.join('_/', 'block', 'coreHtml')),
    nunjucks = require('nunjucks');

module.exports = function(data, callback){


  data.content.listItem = "cool!";

  //Instanciate Object
  var blockInstance = new coreHtml(data);

  blockInstance.render(function(html){
    callback(html);
  });
}
