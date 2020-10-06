module.exports = function(sequelize, DataTypes) {
  const articles = sequelize.define("articles", {
    author: DataTypes.STRING,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    url: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT,
    typeId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  });
  return articles;
};
