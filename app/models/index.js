const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB_URL, {
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

const permissions = require("./permission.model.js")(sequelize, Sequelize);
const users = require("./user.model.js")(sequelize, Sequelize);
const userPermissions = require("./userPermission.model.js")(
  sequelize,
  Sequelize
);


users.belongsToMany(permissions, { through: userPermissions, foreignKey: "userId" });
permissions.belongsToMany(users, { through: userPermissions, foreignKey: "permissionId" });



db.permissions = permissions;
db.users = users;
db.userPermission = userPermissions;

module.exports = db;
