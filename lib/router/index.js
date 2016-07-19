var path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback'));

module.exports = function(app){
  var routes = fallback('@layout/handles');
  var render = fallback('@module/layoutRenderer');

  routes.forEach(function(route){
    app.get(route.path,function(res,req){
      render(route.handles, function(page){
        req.send(page.root);
      });
    });
  });

}
