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
      currentAlias = alias;
      aliasArray[alias].forEach(function(string){
        fallbackArray.push(filePath.replace(alias,string));
      });
    }
  }

  for(fallbackPath in fallbackArray){
    var fallbackFullPath = path.join(appRoot,fallbackArray[fallbackPath]);
    try {
      if(path.extname(fallbackFullPath) !== '.html'){
        return require(fallbackFullPath);
      } else {
        stats = fs.lstatSync(fallbackFullPath);

        if (stats.isFile()) {
          return fallbackFullPath;
        }
      }
    } catch(e){
      //console.log(e);
      continue;
    }
  }

  console.log('fallback for: '+filePath+' not found');
}
