module.exports = function(sequelize, DataTypes) {
  // How do we want to filter out our favorites?
  const products = sequelize.define("products", {
    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    tags: {
      type: DataTypes.TEXT
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numFavorers: {
      type: DataTypes.INTEGER
    },
    taxonomyPath: {
      type: DataTypes.STRING
    },
    imageURL: {
      type: DataTypes.TEXT
    }
  });

  return products;
};
