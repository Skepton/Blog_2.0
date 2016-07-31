var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    coreHtml = fallback('@block/coreHtml'),
    nunjucks = require('nunjucks');

module.exports = function(renderData, request){
  renderData.content.errorMessage = request.flash('error');
  renderData.content.noticeMessage = request.flash('notice');

  return new coreHtml(renderData);
}
