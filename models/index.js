'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {...config,logging: false,});
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {...config,logging: false,});
}

// Load models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Apply associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Create tables one after another
(async () => {
  try {
    // Array of model names in the order you want to create tables
    const modelCreationOrder = [
      'UserTable',
      'ItemCategory',
      'ItemFeature',
      'Item',
      'Permission',
      'Vendor',
      'MaterialInward',
      'UserPermission',
      'ContractorUnit',
      'ContractorCategory',
      'Contractor',
      'ContractorUnitAssignment',
      'Site',
      'Dispatch',
      'Stock',
      'WorkOrder',
      'WareHouse',
      'MaterialIssue',
      'MaterialIssueItem',
      'WareHouseStockItem'
    ];

    for (const modelName of modelCreationOrder) {
      if (db[modelName]) {
        await db[modelName].sync({ alter: true });
        console.log(`Table for model ${modelName} synchronized`);
      } else {
        console.warn(`Model ${modelName} not found`);
      }
    }

    console.log('All tables synchronized');
  } catch (err) {
    console.error('Error synchronizing tables:', err);
  }
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
