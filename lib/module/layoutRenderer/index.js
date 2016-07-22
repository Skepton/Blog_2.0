var winston = require('winston'),
    async = require('async'),
    path = require('path'),
    jsonMerge = require('./jsonMerge'),
    fallback = require(path.join(appRoot,'/lib/module/fallback'));

var util = require('util');

var logger = new winston.Logger({
  level: 'info',
  transports: [
    //new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'logs/errors.log' })
  ]
});

function mergeLayouts(layoutsArray){
  var merged = jsonMerge(layoutsArray[0],layoutsArray[1]);
  return layoutsArray[0];
}

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
  var renderedBlocks = {};
  async.eachOf(blocks, function(block, key, asyncCallback){

    var name = block.name;
    var viewpath = path.join(parentViewpath, name);
    var childBlocks = block.blocks;

    if(childBlocks && childBlocks.length > 0){
      initBlock(viewpath, childBlocks, function(content){
        var renderData = {
          "block": block,
          "content": content,
          "viewpath": viewpath
        }
        fallback('@block/'+block.type)(renderData, function(renderedBlock){
          renderedBlocks[name] = renderedBlock[name];
          asyncCallback();
        });
      });

    } else {

      var renderData = {
        "block": block,
        "content": {},
        "viewpath": viewpath
      }
      fallback('@block/'+block.type)(renderData, function(renderedBlock){
        renderedBlocks[name] = renderedBlock[name];
        asyncCallback();
      });

    }

  }, function(renderedBlock, err){
    if(!err) {
      callback(renderedBlocks);
    } else {
      console.log(err);
    }
  });

}

module.exports = function(handles, callback){

  //Load Layouts
  var layoutsArray = loadLayouts(handles);

  //Merge Layouts
  var mergedLayout = mergeLayouts(layoutsArray);

  //Render Blocks
  initBlock("", layoutsArray[0].blocks, function(renderedLayout){
    callback(renderedLayout);
  });
}
