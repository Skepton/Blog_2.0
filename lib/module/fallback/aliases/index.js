module.exports = function(config){
  var theme = config.theme;

  var aliases = {
    "@block":     ['theme/'+theme+'/lib/block','theme/base/lib/block','lib/block'],
    "@layout":    ['theme/'+theme+'/frontend/layout','theme/base/frontend/layout'],
    "@template":  ['theme/'+theme+'/frontend/view','theme/base/frontend/view'],
    "@module":    ['lib/module'],
    "@router":    ['lib/router']
  }

  return aliases;
}
