'use strict';
module.exports = function(sequelize, DataTypes) {
  var BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publishDate: DataTypes.DATE,
    slug: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BlogPost;
};