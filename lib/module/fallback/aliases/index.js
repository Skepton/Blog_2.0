module.exports = function(config){
  var theme = config.theme;

  var aliases = {
    "@block": ['theme/'+theme+'/lib/block','theme/base/lib/block','lib/block'],
    "@layout": ['theme/'+theme+'/lib/layout','theme/base/lib/layout'],
    "@template": ['theme/'+theme+'/view','theme/base/view'],
    "@module": ['lib/module'],
    "@router": ['lib/router']
  }

  return aliases;
}
