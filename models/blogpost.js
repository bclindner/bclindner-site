'use strict'
module.exports = function (sequelize, DataTypes) {
  var blogpost = sequelize.define('blogpost', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    slug: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return blogpost
}
