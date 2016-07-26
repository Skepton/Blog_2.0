var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    routes = fallback('@layout/handles'),
    render = fallback('@module/layoutRenderer');

module.exports = function(app, models){

  routes.get.forEach(function(route){
    app.get(route.path,function(res,req){
      render(route.handles, function(page){
        req.send(page.root);
      });
    });
  });

}
