var Sequelize = require('sequelize');

function slugify(str) {
  var from  = "ąàáäâãåæćęèéëêìíïîłńòóöôõøśùúüûñçżź",
      to    = "aaaaaaaaceeeeeiiiilnoooooosuuuunczz",
      regex = new RegExp('[' + from.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1') + ']', 'g');

  if (str == null) return '';

  str = String(str).toLowerCase().replace(regex, function(c) {
    return to.charAt(from.indexOf(c)) || '-';
  });

  return str.replace(/[^\w\s-]/g, '').replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}

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
      type: Sequelize.STRING(64),
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models){
        category.hasMany(models.category, {as: 'children', foreignKey: 'parentId'});
        category.belongsTo(models.category, {as: 'parent', foreignKey: 'parentId'});
        category.hasMany(models.post);

        category.addHook('beforeFind', function(options){
          if(options.modelInclude){
            options.include = [{model: models.category, as: 'children'}];
          }
          return options;
        });

      }
    },
    setterMethods: {
      title: function(title){
        this.setDataValue('slug', slugify(title));
        this.setDataValue('title', title);
        return title;
      }
    }
  });
  return category;
}
