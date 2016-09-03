var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    routes = fallback('@layout/handles'),
    postman = fallback('@module/postman'),
    conditional = fallback('@module/conditional'),
    render = fallback('@module/layoutRenderer');

function setupRoute(route, app, db, parentPath, parentConditional){
  var type = route.type;
  var fullPath = parentPath+route.path;
  var carriedConditional = parentConditional ? parentConditional : (route.conditional || false);

  switch (type) {
    case 'get':
      app.get(fullPath, function(req,res){
        console.log(carriedConditional);
        if(!carriedConditional || (carriedConditional && conditional(carriedConditional, req))){
          render(route.handles, db, req, res);
        } else {
          res.redirect('/');
        }
      });
      break;
    case 'post':
      app.post(fullPath, function(req,res){
        if(!carriedConditional || (carriedConditional && conditional(carriedConditional, req))){
          postman(route.model, db, req, res);
        } else {
          res.redirect('/');
        }
      });
      break;
    case 'setupRedirects':
      app.get(fullPath, function(req,res){
        if(!carriedConditional || (carriedConditional && conditional(carriedConditional, req))){
          postman(route.model, db, req, res);
        } else {
          res.redirect('/');
        }
      });
      break;
  }

  if(route.childRoutes){
    route.childRoutes.forEach(function(route){
      setupRoute(route, app, db, fullPath, carriedConditional);
    });
  }

}

module.exports = function(app, db){
  routes.forEach(function(route){
    setupRoute(route, app, db, '', false);
  });
}
