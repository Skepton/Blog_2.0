// Returns all modification references in modification layout
function getReferences(modifications){
  var references = [];
  for(var key in modifications){
    references.push(modifications[key]);
  }
  return references;
}

//Returns keys & values used for mathing for a reference
function getMatches(reference){
  var matches = [];
  for (var key in reference){
    if(key.indexOf('@') < 0){
      var match = {};
      match[key] = reference[key];
      matches.push(match);
    }
  }
  return matches;
}

//Returns all actions for a reference
function getActions(reference){
  return reference['@actions'];
}

function matchBlock(block, matches){
  var matching = true;
  matches.forEach(function(match){
    for(var key in match){
      if(block[key] !== match[key]){
        matching = false;
      }
    }
  });
  return matching;
}

function performAction(block, actions){
  actions.forEach(function(action){
    for(var key in action){
      var actionObject = action[key];
      switch (key) {
        //Modify Action
        case "@modify":
          block[actionObject.key] = actionObject.value;
          break;
        case "@addChildBlock" ||  "@addChildBlockAfter":
          block["blocks"].push(actionObject);
          break;
        case "@addChildBlockBefore":
          block["blocks"].unshift(actionObject);
          break;
        case "@removeChildBlock":
          block['blocks'] = block["blocks"].filter(function(childBlock){
            var keep = true;
            for(var key in actionObject){
              if(childBlock[key] === actionObject[key]){
                keep = false;
              }
            }
            return keep;
          });
          break;
      }
    }
  });
}

function iterateBlocks(parentBlock, modifications){
  parentBlock.blocks.forEach(function(block){
    var isMatch = matchBlock(block, modifications.matches);
    if(isMatch){
      performAction(block, modifications.actions);
    }
    iterateBlocks(block, modifications);
  });
}

function performActionsOnMatches(base, modifications){
  iterateBlocks(base, modifications);
}

module.exports = function(base, modification){
  var references = getReferences(modification);
  references.forEach(function(reference){
    var modifications = {
      "matches": [],
      "actions": []
    }
    modifications.matches = getMatches(reference);
    modifications.actions = getActions(reference);
    performActionsOnMatches(base, modifications);
  });
  return base;
}
