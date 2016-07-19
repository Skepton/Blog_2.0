var winston = require('winston'),
    async = require('async'),
    path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback'));

var logger = new winston.Logger({
  level: 'info',
  transports: [
    //new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'logs/errors.log' })
  ]
});

function loadLayouts(handles) {

  var layouts = [];
  handles.forEach(function(handle){
    try {
      var handleLayouts = fallback('@layout/handles/'+handle);
      layouts.push(handleLayouts);
    } catch (e) {
      logger.log('error',e);
    }
  });
  return layouts;
}

function initBlock(viewpath, blocks, callback){
  var parentViewpath = viewpath;
  blocks.forEach(function(block){
    var blocks = {};
    async.eachOf(block, function(value, name, asyncCallback){

      var blockElement = value;
      var viewpath = path.join(parentViewpath,name);
      var childBlocks = blockElement.blocks;

      if(childBlocks){

        initBlock(viewpath, childBlocks, function(content){
          var renderData = {
            "block": blockElement,
            "content": content,
            "viewpath": viewpath
          }
          fallback('@block/'+blockElement.type)(renderData, function(renderedBlock){
            blocks[name] = renderedBlock[name];
            asyncCallback();
          });
        });

      } else {

        var renderData = {
          "block": blockElement,
          "content": {},
          "viewpath": viewpath
        }
        fallback('@block/'+blockElement.type)(renderData, function(renderedBlock){
          blocks[name] = renderedBlock[name];
          asyncCallback();
        });

      }

    }, function(renderedBlock, err){
      if(!err) {
        callback(blocks);
      }
    });

  });

}

module.exports = function(handles, callback){

  //Load Layouts
  var layouts = loadLayouts(handles);

  //Merge Layouts
  var mergedLayout = layouts[0];

  //Render Blocks
  initBlock("", mergedLayout.blocks, function(renderedLayout){
    callback(renderedLayout);
  });
}
