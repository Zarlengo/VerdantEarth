"use strict";
// Load all the dependencies
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
db.Sequelize = Sequelize;


// Checks if in production // Checks if in production 
if (config.use_env_variable) {
  db.sequelize = new Sequelize(process.env[config.use_env_variable],
    {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    });
} else {
  db.sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Cycles through each '.js' file within the models folder and adds the database information to the db object
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = db.sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// Cycles throuh each database and creates any associations between tables
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
