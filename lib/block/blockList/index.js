var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@block/abstract'),
    nunjucks = require('nunjucks');

class blockList extends abstract {

  constructor(data){
    super(data.block);
    this.setContent(data.content);
  }

  setContent(content){
    this.content = content;
  }

  render(callback){

    var name = this.name;
    var childBlocks = {};
    childBlocks[name] = '';
    if(this.content) {
      for(var blockName in this.content){
        childBlocks[name] = this.content[blockName];
      }
      callback(childBlocks);
    } else {
      callback(childBlocks[name]);
    }

  }

}

module.exports = function(renderData){
  return new blockList(renderData);
}
