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
  var base = layoutsArray[0];
  if(layoutsArray.length > 1){
    for (var i = 1; i < layoutsArray.length; i++) {
      base = jsonMerge(base,layoutsArray[i]);
    }
  }
  return base;
}

function loadLayouts(handles) {
  var layouts = [];
  handles.forEach(function(handle){
    try {
      var layout = fallback('@layout/handles/'+handle);
      layouts.push(layout);
    } catch (e) {
      logger.log('error',e);
    }
  });
  return layouts;
}

function renderBlock(viewpath, block, content, request, response, callback){
  var viewpath = path.join(viewpath, block.name);
  content.user = request.user ? request.user : false;
  var renderData = {
    "block": block,
    "content": content,
    "viewpath": viewpath
  }
  var blockInstance = fallback('@block/'+block.type)(renderData, request);
  blockInstance.render(request, response, function(content){
    callback(content);
  });
}

function loadBlock(viewpath, block, db, request, response, callback){
  var parentViewpath = path.join(viewpath, block.name); //Set viewpath for self and childblocks
  var childrenBlocks = block.blocks; //First load child blocks

  if(childrenBlocks && childrenBlocks.length > 0){
    var renderedChildrenBlocks = {};
    async.each(childrenBlocks, function(block, asyncCallback){
      loadBlock(parentViewpath, block, db, request, response, function(renderedBlock){
        renderedChildrenBlocks[block.name] = renderedBlock
        asyncCallback();
      });
    }, function( err){
      if(!err) {
        var content = {};
        content.childBlocks = renderedChildrenBlocks;
        if(block.model){
          //Start of model load
          var model = fallback("@model/"+block.model)(db, request, response, function(data){
            content.data = data;
            renderBlock(viewpath, block, content, request, response, function(renderedBlock){
              callback(renderedBlock);
            });
          });
        } else {
          renderBlock(viewpath, block, content, request, response, function(renderedBlock){
            callback(renderedBlock);
          });
        }
      } else {
        console.log(err);
      }
    });
  } else {
    var content = {};
    if(block.model){
      //Start of model load
      var model = fallback("@model/"+block.model)(db, request, response, function(data){
        content.data = data;
        renderBlock(viewpath, block, content, request, response, function(renderedBlock){
          callback(renderedBlock);
        });
      });
    } else {
      renderBlock(viewpath, block, content, request, response, function(renderedBlock){
        callback(renderedBlock);
      });
    }
  }
}

function initLayout(block, db, request, response){
  loadBlock('', block, db, request, response);
}

module.exports = function(handles, db, request, response){
  //Load Layouts
  var layoutsArray = loadLayouts(handles);
  //Merge Layouts
  var mergedLayout = mergeLayouts(layoutsArray);
  //Render Blocks
  initLayout(mergedLayout, db, request, response);
}
