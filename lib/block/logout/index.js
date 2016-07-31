var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    abstract = fallback('@block/abstract');

class logout extends abstract {

  constructor(data){
    super(data.block);
    this.setContent(data.content);
  }

  setContent(content){
    this.content = content;
  }

  render(request, response, callback){
    request.flash('notice', 'Logged out!');
    request.logout();
    response.redirect('/');
  }

}

module.exports = function(renderData){
  return new logout(renderData);
}
