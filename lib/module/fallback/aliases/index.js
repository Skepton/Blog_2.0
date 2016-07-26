module.exports = function(config){
  var theme = config.theme;

  var aliases = {
    "@block":     ['theme/base/lib/block','lib/block'],
    "@layout":    ['theme/base/frontend/layout'],
    "@template":  ['theme/base/frontend/view'],
    "@module":    ['lib/module'],
    "@router":    ['lib/router'],
    "@database":  ['db']
  }

  return aliases;
}
