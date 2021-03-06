var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@block/abstract');

class blockList extends abstract {
  constructor(data){
    super(data.block);
    this.setContent(data.content);
  }

  setContent(content){
    this.content = content;
  }

  render(request, response, callback){
    var name = this.name;
    var childBlocks = '';
    if(this.content) {
      for(var key in this.content.childBlocks){
        childBlocks += this.content.childBlocks[key];
      }
      callback(childBlocks);
    } else {
      callback(childBlocks);
    }
  }
}

module.exports = function(renderData){
  return new blockList(renderData);
}
