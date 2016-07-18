var path = require('path'),
    Abstract = require(path.join('_/', 'block', 'abstract')),
    nunjucks = require('nunjucks');

class coreHtml extends Abstract {

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
    return path.join(this.viewpath,this.template);
  }

  render(callback){

    var name = this.name;
    var content = {};

    nunjucks.render(this.getFullTemplatePath(),this.content,function(err,html){
      if(err){
        content[name+'error'] = err;
      }
      content[name] = html;
      callback(content);
    });

  }

}

module.exports = coreHtml;
