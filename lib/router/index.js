var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    routes = fallback('@layout/handles'),
    postman = fallback('@module/postman'),
    conditional = fallback('@module/conditional'),
    render = fallback('@module/layoutRenderer');

module.exports = function(app, db){

  routes.get.forEach(function(route){
    app.get(route.path, function(req,res){
      if(!route.conditional || (route.conditional && conditional(route.conditional, req))){
        render(route.handles, db, req, res);
      } else {
        res.redirect('/');
      }
    });
  });

  routes.post.forEach(function(route){
    app.post(route.path, function(req,res){
      if(!route.conditional || (route.conditional && conditional(route.conditional, req))){
        postman(route.model, db, req, res);
      } else {
        res.redirect('/');
      }
    });
  });

  routes.setupRedirects.forEach(function(route){
    app.get(route.path, function(req,res){
      if(!route.conditional || (route.conditional && conditional(route.conditional, req))){
        postman(route.model, db, req, res);
      } else {
        res.redirect('/');
      }
    });
  });

}
