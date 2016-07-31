var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@block/abstract'),
    nunjucks = require('nunjucks');

class coreHtml extends abstract {

  constructor(data){
    super(data.block);
    this.setTemplate(data.block.template);
    this.setContent(data.content);
    this.setViewpath(data.viewpath);
  }

  setTemplate(template){
    this.template = template;
  }

  setViewpath(viewpath){
    this.viewpath = viewpath;
  }

  setContent(content){
    this.content = content;
  }

  getFullTemplatePath(){
    return fallback('@template/'+path.join(this.viewpath,this.template));
  }

  render(request, response, callback){

    var name = this.name;
    var content = {};
    nunjucks.render(this.getFullTemplatePath(),this.content,function(err,html){
      if(err){
        console.log(err);
      }
      response.send(html);
    });

  }

}

module.exports = function(renderData, request){
  return new coreHtml(renderData);
}
