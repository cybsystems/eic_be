const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB_URL,{
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model.js")(sequelize, Sequelize);

module.exports = db;
