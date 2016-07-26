var Sequelize = require('sequelize');

module.exports = function(sequelize){

  var category = sequelize.define('category', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sorting: {
      type: Sequelize.INTEGER,
      defaultValue: -1
    },
    title: {
      type: Sequelize.STRING(64),
      unique: true
    },
    slug: {
      type: Sequelize.STRING(64)
    }
  }, {
    classMethods: {
      associate: function(models){
        category.hasMany(models.post);
      }
    }
  });
  return category;
}
