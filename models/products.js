// Creates the product model
module.exports = function(sequelize, DataTypes) {
  const products = sequelize.define("products", {
    // The listing ID cannot be null and must not already be in the database (prevents duplicates when seeding)
    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    // The title cannot be null
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
    // The URL cannot be null
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
