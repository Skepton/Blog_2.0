var Sequelize = require('sequelize'),
    path = require('path'),
    fallback = require(path.join(appRoot,'/lib/module/fallback')),
    hashPassword = fallback('@module/handlePassword').hashPassword;

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

        user.beforeCreate(function(instance) {
          if (!instance.changed('password')) return instance;
          return hashPassword(instance.get('password')).then(function(hash){
            instance.set('password', hash);
          });

        });
      }
    },
    setterMethods: {
      username: function(username){
        this.setDataValue('username', username.toLowerCase());
        this.setDataValue('displayname', username);
      }
    }
  });

  return user;
}
