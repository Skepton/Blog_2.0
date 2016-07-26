var Sequelize = require('sequelize'),
    path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback'));

var sequelize = new Sequelize('postgres', 'pgsql', 'ettfyra14',{
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = function(callback){
  sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
    fallback('@database/schemas')(sequelize, function(schemas){
      callback(schemas);
    });
  }).catch(function (err) {
    //console.log('Unable to connect to the database:', err);
  });
};
