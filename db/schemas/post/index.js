var Sequelize = require('sequelize');

module.exports = function(sequelize){

  var post = sequelize.define('post', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    hashid: {
      type: Sequelize.STRING,
      unique: true
    },
    headline: {
      type: Sequelize.STRING
    },
    header: {
      type: Sequelize.STRING
    },
    body: {
      type: Sequelize.TEXT
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    source: {
      type: Sequelize.STRING(1024)
    },
    tags: {
      type: Sequelize.STRING(1024)
    },
    slug: {
      type: Sequelize.STRING,
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models){
        post.belongsTo(models.user, {as: 'author'});
        post.belongsTo(models.category);
      }
    }
  });

  return post;
}
