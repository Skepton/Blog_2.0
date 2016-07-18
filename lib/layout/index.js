module.exports = function(app){

  var routes = require('./handles');
  var render = require('./render');

  routes.forEach(function(route){
    app.get(route.path,function(res,req){
      render(route.handles, function(page){
        req.send(page.root);
      });
    });
  });

}
