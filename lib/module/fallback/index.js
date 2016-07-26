var path = require('path'),
    config = require(path.join(appRoot,'config')),
    aliases = require('./aliases'),
    async = require('async'),
    fs = require('fs');

var aliasArray = aliases(config);

module.exports = function(filePath, arguments){
  var fallbackArray = [], currentAlias;

  for(alias in aliasArray){
    if(filePath.indexOf(alias) > -1){
      aliasArray[alias].forEach(function(string){
        fallbackArray.push({alias: alias, path: filePath.replace(alias,string)});
      });
    }
  }

  for(var fallbackPath in fallbackArray){
    var fallbackFullPath = path.join(appRoot,fallbackArray[fallbackPath].path);
    try {
      switch (fallbackArray[fallbackPath]['alias']) {
        case "@template":
          stats = fs.lstatSync(fallbackFullPath);
          if (stats.isFile()) {
            return fallbackFullPath;
          }
          break;
        case "@layout":
          delete require.cache[require.resolve(fallbackFullPath)];
        default:
          var module = require(fallbackFullPath);
          return module;
      }
    } catch(e){
      //console.log(e);
      continue;
    }
  }

  console.log('fallback for: '+filePath+' not found');
}
