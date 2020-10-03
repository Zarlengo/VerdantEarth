module.exports = function(sequelize, DataTypes) {
  // How do we want to filter out our favorites?
  const products = sequelize.define("products", {
    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numFavorers: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    taxonomyPath: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return products;
};
