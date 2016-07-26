var Sequelize = require('sequelize');

module.exports = function(sequelize){

  var user = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    username: {
      type: Sequelize.STRING(32),
      unique: true
    },
    displayname: {
      type: Sequelize.STRING(32),
      unique: true
    },
    password: {
      type: Sequelize.STRING(60)
    },
    picture: {
      type: Sequelize.BOOLEAN,
      defaultValue: null
    },
    about: {
      type: Sequelize.STRING,
    }
  }, {
    classMethods: {
      associate: function(models){
        user.hasMany(models.post);
        user.hasMany(models.comment);
      }
    }
  });

  return user;
}
