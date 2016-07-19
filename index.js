var path = require('path');
global.appRoot = path.resolve(__dirname);

var config = require(path.join(appRoot,'config')),
    http = require('http'),
    async = require('async'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    //favicon = require('serve-favicon'),
    redis = require("redis").createClient(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    nunjucks = require('nunjucks'),
    session = require('express-session'),
    passport = require('passport'),
    RedisStore = require('connect-redis')(session),
    express = require('express');

var  app = express();

app.set('view engine', 'html');
app.set('view cache', false);

nunjucks.configure('', {
    autoescape: false,
    noCache: true,
    express: app
});

app.use(express.static(path.join(__dirname, 'frontend')))
   //.use(favicon())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({extended: true}))
   .use(cookieParser())
   .use(session({
     store: new RedisStore({client: redis }),
     secret: 'Tango Down',
     cookie: { maxAge : 604800000 },
     saveUninitialized: false,
     resave: false
   }))
   .use(passport.initialize())
   .use(passport.session());


 // production error handler
 app.use(function(err, req, res, next) {
 	res.status(err.status || 500);
 	res.render('error', {
 		message: err.message,
 		error: {}
 	});
 });

// development error handler
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

var server = app.listen(config.port, config.ip, function(){
  var addr = server.address();
  console.log('Server listening at '+addr.address+':'+addr.port);
});

var router = fallback('@router')(app);
