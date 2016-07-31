module.exports = function(config){
  var theme = config.theme;

  var aliases = {
    "@block":     ['theme/base/lib/block','lib/block'],
    "@model":     ['theme/base/lib/model','lib/model'],
    "@layout":    ['theme/base/frontend/layout'],
    "@template":  ['theme/base/frontend/view'],
    "@module":    ['lib/module'],
    "@router":    ['lib/router'],
    "@database":  ['db']
  }

  return aliases;
}
